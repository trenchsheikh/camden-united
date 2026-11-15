#!/usr/bin/env python3
"""Update Camden United 2026/27 league tables from public league pages.

The published FA team page identifies the *current* division/season.
Never copy a table unless the returned season, division and Camden club
all match expectations. On a source failure, retain previously verified data.
"""
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from zoneinfo import ZoneInfo

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "src/data/league-tables.json"
LONDON = ZoneInfo("Europe/London")
NOW = datetime.now(LONDON)
TODAY = NOW.date().isoformat()
FA_HOST = "https://fulltime.thefa.com"
FA_LEAGUE = "695549151"
FA_SEASON = "224702165"
MITOO = "https://mitoofootball.com/LeagueTab.cfm?TblName=Matches&DivisionID=64&LeagueCode=MDX2026"
NLM = "https://www.nonleaguematters.co.uk/divisions/62/"
TEAMS = {
    "midweek": {
        "page": FA_HOST + "/displayTeam.html?id=380596793",
        "division": "436230581",
        "label": "Division 1",
        "club": re.compile(r"^Camden United(?: FC)?$", re.I),
    },
    "ogs": {
        "page": FA_HOST + "/displayTeam.html?id=144179498",
        "division": "954226676",
        "label": "Division 3",
        "club": re.compile(r"^Camden United OG['\u2019]s(?: FC)?$", re.I),
    },
}
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"


def read_public_page(url):
    """Read the public website's indexed representation from a fixed URL.

    Direct FA requests are denied to GitHub runners; the same public text
    reader already used by the working weekly fixtures updater is supported.
    """
    # Match the simple public-reader request used by the verified fixtures job.
    res = requests.get("https://r.jina.ai/" + url, timeout=38)
    if res.status_code != 200:
        raise ValueError(f"Public reader HTTP {res.status_code}: {res.text[:100]}")
    res.raise_for_status()
    body = res.text
    if len(body) < 900 or "Just a moment" in body[:200] or "security verification" in body[:500]:
        raise ValueError("The provider is blocking automatic retrieval")
    return body


def current_division_url(team):
    meta = TEAMS[team]
    page = read_public_page(meta["page"])
    links = re.findall(r"\[Home\]\((https://fulltime\.thefa\.com/index\.html\?[^)]+)\)", page)
    if not links:
        raise ValueError("FA team page has no current division link")
    for url in links:
        params = parse_qs(urlparse(url).query)
        if (params.get("league") == [FA_LEAGUE]
                and params.get("selectedSeason") == [FA_SEASON]
                and params.get("selectedDivision") == [meta["division"]]
                and params.get("selectedFixtureGroupKey")):
            return url
    raise ValueError("FA team page does not confirm the required 2026/27 division")


def get_cell_name(text):
    link = re.fullmatch(r"\[([^\]]+)\]\(https://fulltime\.thefa\.com/[^)]+\)", text.strip())
    return (link.group(1) if link else text).strip()


def parse_standings(markdown, team):
    meta = TEAMS[team]
    # Season + division must be present in the official page's resolved
    # table link, not merely in the URL we requested.
    link = re.search(r"\[Full Table detail\]\((https://fulltime\.thefa\.com/table\.html\?[^)]+)\)", markdown)
    if not link:
        raise ValueError("No official Full Table detail link")
    params = parse_qs(urlparse(link.group(1).split(" ")[0]).query)
    if params.get("selectedSeason") != [FA_SEASON] or params.get("selectedDivision") != [meta["division"]]:
        raise ValueError("League table returned a different season or division")
    if f"# {meta['label']}\n" not in markdown and f"# {meta['label']}\r\n" not in markdown:
        raise ValueError("Unexpected division heading")

    index = markdown.find("## League Table")
    end = markdown.find("## Latest", index)
    if index < 0 or end < index:
        raise ValueError("Missing standings table section")
    section = markdown[index:end]
    rows = []
    header = None
    for raw in section.splitlines():
        raw = raw.strip()
        if not raw.startswith("|"):
            continue
        cols = [x.strip() for x in raw.strip("|").split("|")]
        if cols and cols[0].lower() == "pos":
            header = [re.sub(r"[^A-Z]", "", x.upper()) for x in cols]
            continue
        if not header or not re.fullmatch(r"\d+", cols[0]):
            continue
        if len(cols) != len(header):
            raise ValueError("Unexpected league table row format")
        values = dict(zip(header, cols))
        required = ["POS", "TEAM", "P", "W", "D", "L", "GD", "PTS"]
        if not all(key in values for key in required):
            raise ValueError("League table missing expected numeric columns")
        try:
            row = {
                "position": int(values["POS"]),
                "name": get_cell_name(values["TEAM"]),
                "played": int(values["P"]),
                "won": int(values["W"]),
                "drawn": int(values["D"]),
                "lost": int(values["L"]),
                "goalDifference": int(values["GD"].replace("+", "")),
                "points": int(re.sub(r"\s*\*.*$", "", values["PTS"])),
            }
        except (ValueError, KeyError) as exc:
            raise ValueError("Invalid league table statistic") from exc
        if row["played"] < row["won"] + row["drawn"] + row["lost"] or row["position"] < 1:
            raise ValueError("Inconsistent league record")
        rows.append(row)
    if len(rows) < 3 or len({row["position"] for row in rows}) != len(rows):
        raise ValueError("League table is too short or positions repeat")
    if not any(meta["club"].fullmatch(row["name"]) for row in rows):
        raise ValueError("Camden team absent from the returned division table")
    if all(row["played"] == 0 for row in rows):
        raise ValueError("Table contains no played league matches and may be out of date")
    return rows


def parse_first_team_table():
    """Read the current 2026/27 Premier Division standings from NonLeagueMatters.

    Its source includes the most recent results and an actual populated league
    table. Do not use the FA's all-zero placeholder or an older season.
    """
    response = requests.get(NLM, timeout=30, headers={"User-Agent": UA, "Accept": "text/html"})
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    title = soup.title.get_text(" ", strip=True) if soup.title else ""
    if "Middlesex County League Premier Division" not in title:
        raise ValueError("Unexpected Premier Division source page")
    content = soup.get_text(" ", strip=True)
    if not re.search(r"2026\s*-\s*2027", content):
        raise ValueError("2026/27 league season could not be verified")

    last_update = re.search(
        r"Division Last Updated:\s*(?:\d{1,2}:\d{2},?\s*)?"
        r"(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+"
        r"(\d{1,2})(?:st|nd|rd|th)\s+([A-Za-z]+)\s+(20\d{2})",
        content, re.I
    )
    if not last_update:
        raise ValueError("Cannot establish the published table's update date")
    published_day = datetime.strptime(
        f"{last_update.group(1)} {last_update.group(2)} {last_update.group(3)}",
        "%d %B %Y"
    ).date()
    age = (NOW.date() - published_day).days
    if age < -2 or age > 90:
        raise ValueError(f"League table source update is out of season range ({age} days)")

    heading = next((tag for tag in soup.find_all("h2")
                    if tag.get_text(" ", strip=True).lower() == "league table"), None)
    table = heading.find_next("table", class_="league") if heading else None
    if table is None:
        raise ValueError("No readable Premier Division league table")

    rows = []
    for tr in table.find_all("tr"):
        cells = [cell.get_text(" ", strip=True) for cell in tr.find_all("td", recursive=False)]
        if not cells or not re.fullmatch(r"\d+", cells[0]):
            continue
        if len(cells) != 20:
            raise ValueError("League table record changed format")
        try:
            row = {
                "position": int(cells[0]),
                "name": cells[1],
                "played": int(cells[2]),
                "won": int(cells[3]),
                "drawn": int(cells[4]),
                "lost": int(cells[5]),
                "goalDifference": int(cells[18].replace("+", "")),
                "points": int(cells[19]),
            }
        except ValueError as error:
            raise ValueError("Invalid numeric values in league table") from error
        if row["played"] != row["won"] + row["drawn"] + row["lost"]:
            raise ValueError("Premier Division record failed played-match validation")
        rows.append(row)
    if not 10 <= len(rows) <= 24:
        raise ValueError("Unexpected number of Premier Division clubs")
    if [row["position"] for row in rows] != list(range(1, len(rows) + 1)):
        raise ValueError("Table positions are incomplete or unsorted")
    camden = [row for row in rows if row["name"].casefold() == "camden united"]
    if len(camden) != 1 or camden[0]["played"] < 1:
        raise ValueError("The current First Team record was not found")
    return rows, published_day.isoformat()


def sync():
    # A manual dispatch may be used for testing, but never runs outside Sunday.
    if NOW.weekday() != 6 or NOW.hour < 20:
        print("Skipped: standings automation is Sunday evening UK time only.")
        return 0

    data = json.loads(DEST.read_text())
    if data.get("lastSuccessfulSunday") == TODAY:
        print("This Sunday's complete league-table sync already succeeded.")
        return 0

    changed = False
    errors = {}
    try:
        first_rows, source_date = parse_first_team_table()
        current = data["teams"]["first"]
        snapshot = {
            "division": "Premier Division",
            "source": NLM,
            "officialSource": MITOO,
            "sourceUpdatedAt": source_date,
            "rows": first_rows,
        }
        existing = {k: current.get(k) for k in snapshot}
        if snapshot != existing or not current.get("updatedAt"):
            data["teams"]["first"] = {**snapshot, "updatedAt": NOW.isoformat()}
            changed = True
        camden = next(x for x in first_rows if x["name"].casefold() == "camden united")
        print(f"first: {len(first_rows)} clubs; Camden {camden['position']}th/rd place, {camden['points']} points, source {source_date}")
    except Exception as exc:
        errors["first"] = f"First Team standings: {str(exc)[:180]}"
        print(errors["first"], file=sys.stderr)

    for team in ("midweek", "ogs"):
        try:
            page_url = current_division_url(team)
            markdown = read_public_page(page_url)
            rows = parse_standings(markdown, team)
            current = data["teams"][team]
            snapshot = {"division": TEAMS[team]["label"], "source": page_url, "rows": rows}
            existing = {k: current.get(k) for k in snapshot}
            if snapshot != existing or not current.get("updatedAt"):
                data["teams"][team] = {**snapshot, "updatedAt": NOW.isoformat()}
                changed = True
            print(f"{team}: confirmed {len(rows)} teams, Camden position " +
                  str(next(x["position"] for x in rows if TEAMS[team]["club"].fullmatch(x["name"]))))
        except Exception as exc:
            errors[team] = f"{team}: {str(exc)[:180]}"
            print(errors[team], file=sys.stderr)

    # Log the partial failure for diagnostics while keeping the last good table.
    if data.get("errors") != errors:
        data["errors"] = errors
        changed = True
    if not errors and data.get("lastSuccessfulSunday") != TODAY:
        data["lastSuccessfulSunday"] = TODAY
        changed = True
    if changed:
        data["updatedAt"] = NOW.isoformat()
        DEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        print("Wrote updated league tables")
    else:
        print("Standings unchanged")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(sync())
