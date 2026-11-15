#!/usr/bin/env python3
"""Safely refresh Camden United fixtures from public league fixture listings.

The sync never treats an unreachable page or an unrecognisable table as proof
that fixtures were cancelled. It preserves the last confirmed data instead.
"""
import json
import os
import re
import sys
from datetime import datetime, date, timezone
from pathlib import Path
from urllib.parse import urlencode
from zoneinfo import ZoneInfo

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "src/data/fixtures-synced.json"
LONDON = ZoneInfo("Europe/London")
FA = "https://fulltime.thefa.com"
MI = "https://mitoofootball.com/TeamHistAll.cfm?CI=68&TblName=Matches&LeagueCode=MDX2026&DivisionID=64"
SOURCES = {
    "first": [MI],
    "midweek": [
        FA + "/fixtures.html?" + urlencode({
            "selectedSeason": "224702165", "selectedFixtureGroupKey": "",
            "selectedDateCode": "all", "selectedClub": "652338347",
            "selectedTeam": "380596793", "selectedRelatedFixtureOption": "3",
            "selectedFixtureDateStatus": "", "selectedFixtureStatus": "",
            "previousSelectedFixtureGroupAgeGroup": "",
            "previousSelectedFixtureGroupKey": "",
            "previousSelectedClub": "652338347", "itemsPerPage": "25",
        }),
        FA + "/displayTeam.html?id=380596793",
    ],
    "ogs": [
        FA + "/fixtures.html?" + urlencode({
            "selectedSeason": "224702165", "selectedFixtureGroupKey": "",
            "selectedDateCode": "all", "selectedClub": "652338347",
            "selectedTeam": "144179498", "selectedRelatedFixtureOption": "3",
            "selectedFixtureDateStatus": "", "selectedFixtureStatus": "",
            "previousSelectedFixtureGroupAgeGroup": "",
            "previousSelectedFixtureGroupKey": "",
            "previousSelectedClub": "652338347", "itemsPerPage": "25",
        }),
        FA + "/displayTeam.html?id=144179498",
    ],
}
LABELS = {"first": "Camden United", "midweek": "Camden United", "ogs": "Camden United OG's"}
DATE_RE = re.compile(r"\b(\d{1,2}/\d{1,2}/\d{2,4})(?:\s+(\d{1,2}:\d{2}))?\b")
ISO_RE = re.compile(r"\b(20\d{2}-\d{2}-\d{2})\b")
TIME_RE = re.compile(r"^\d{1,2}:\d{2}$")
COMP_RE = re.compile(r"^(?:Cup|PREM|DIV\d+|D\d+|CC|League|Friendly|County Cup)$", re.I)
NAME_RE = {
    "midweek": re.compile(r"^Camden United(?: FC Midweek)?$", re.I),
    "ogs": re.compile(r"^Camden United OG['’]s$", re.I),
}
USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
NOW = datetime.now(LONDON)
TODAY = NOW.date()
SUNDAY_KEY = TODAY.isoformat()


def fetch(url):
    result = requests.get(url, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "Accept-Language": "en-GB,en;q=0.9"}, timeout=25)
    result.raise_for_status()
    if len(result.content) < 900:
        raise ValueError("Response too short to contain verified fixtures")
    soup = BeautifulSoup(result.text, "html.parser")
    text = soup.get_text(" ", strip=True).lower()
    if not soup.find("table") or any(block in text[:400] for block in ["access denied", "captcha", "enable javascript"]):
        raise ValueError("No usable HTML fixture table found")
    return soup


def parse_day(raw):
    raw = raw.strip()
    try:
        return datetime.strptime(raw, "%d/%m/%y").date()
    except ValueError:
        return datetime.strptime(raw, "%d/%m/%Y").date()


def is_team(team, candidate):
    return bool(NAME_RE[team].fullmatch(candidate.strip(" .\u00a0")))


def normalise_competition(abbreviation):
    return {
        "DIV1": "Division 1", "DIV2": "Division 2", "DIV3": "Division 3",
        "PREM": "Premier Division", "CUP": "Cup",
    }.get(abbreviation.upper(), abbreviation)


def parse_fa(soup, team):
    """Read future 'VS' fixture rows; ignore scores, league tables and results.

    Works on the public fixtures.html listing and displayTeam.html's Upcoming
    Fixtures table, including layouts with empty image/logo cells.
    """
    matches = []
    saw_fixture_layout = False
    for table in soup.select("table"):
        head = table.get_text(" ", strip=True).lower()[:450]
        if "home team" in head and "away team" in head:
            saw_fixture_layout = True
        for tr in table.select("tr"):
            cols = [c.get_text(" ", strip=True) for c in tr.find_all("td", recursive=False)]
            cols = [re.sub(r"\s+", " ", c).strip() for c in cols if c.strip()]
            if not cols:
                continue
            vs_index = next((i for i, value in enumerate(cols) if value.upper() in ("VS", "V")), -1)
            if vs_index == -1:
                continue
            before = cols[:vs_index]
            after = cols[vs_index + 1:]
            if not before or not after:
                continue
            date_pos = next((i for i, value in enumerate(before) if DATE_RE.search(value)), -1)
            if date_pos < 0:
                continue
            date_match = DATE_RE.search(before[date_pos])
            try:
                match_date = parse_day(date_match.group(1))
            except ValueError:
                continue
            if match_date < TODAY:
                continue
            time_raw = date_match.group(2)
            if not time_raw and len(before) > date_pos + 1 and TIME_RE.fullmatch(before[date_pos+1]):
                time_raw = before[date_pos+1]
            try:
                kickoff = datetime.strptime(time_raw, "%H:%M").strftime("%-I:%M %p") if time_raw else None
            except ValueError:
                kickoff = None
            first_home_pos = date_pos + 1 + int(not date_match.group(2) and bool(time_raw))
            home_candidates = [v for v in before[first_home_pos:] if not TIME_RE.fullmatch(v)]
            if not home_candidates:
                continue
            home = home_candidates[-1]
            away = after[0]
            if not (is_team(team, home) or is_team(team, away)):
                continue
            # No mixing the OG's and Midweek teams just because they share a club.
            if not (is_team(team, home) ^ is_team(team, away)):
                continue
            comp = next((c for c in before[:date_pos] if COMP_RE.fullmatch(c)), "Fixture")
            matches.append({
                "id": f"{team}-{match_date.isoformat()}-{slug(home)}-{slug(away)}",
                "team": team,
                "dateISO": match_date.isoformat(),
                "date": f"{match_date:%A}, {match_date.day} {match_date:%B %Y}",
                "home": home, "away": away,
                "kickoff": kickoff,
                "ground": "Market Road Football Pitches",
                "venue": "Home" if is_team(team, home) else "Away",
                "competition": normalise_competition(comp),
                "played": False,
            })
    if not saw_fixture_layout:
        # The fallback team page can contain the fixture table even if the
        # heading differs. Its explicit 'Upcoming Fixtures' section is enough.
        text = soup.get_text(" ", strip=True).lower()
        if "upcoming fixtures" not in text and "fixtures & results" not in text:
            raise ValueError("FA page did not contain recognisable fixture headings")
    return unique(matches)


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:65]


def unique(items):
    deduped = {}
    for item in items:
        deduped[item["id"]] = item
    return sorted(deduped.values(), key=lambda x: (x["dateISO"], x.get("kickoff") or "99:99", x["id"]))


def parse_mitoo(soup):
    """Conservative public-table parser. Never infer home/away from ambiguous text."""
    matches = []
    for tr in soup.select("tr"):
        cols = [re.sub(r"\s+", " ", c.get_text(" ", strip=True)).strip()
                for c in tr.find_all("td", recursive=False) if c.get_text(" ", strip=True).strip()]
        joined = " ".join(cols)
        # Only act on confidently structured rows with a fixture separator.
        m = re.search(r"\b(20\d{2}-\d{2}-\d{2})\b", joined)
        dm = DATE_RE.search(joined)
        if m:
            day = date.fromisoformat(m.group(1))
        elif dm:
            try:
                day = parse_day(dm.group(1))
            except ValueError:
                continue
        else:
            continue
        if day < TODAY:
            continue
        fixture_text = re.search(r"(?P<home>[^|]{2,100}?)\s+(?:VS|V)\s+(?P<away>[^|]{2,100})", joined, re.I)
        if not fixture_text:
            continue
        home, away = fixture_text.group("home").strip(), fixture_text.group("away").strip()
        if not (home.lower().endswith("camden united") or away.lower().startswith("camden united")):
            continue
        if len(home) > 60 or len(away) > 60 or not (home.lower() == "camden united" or away.lower() == "camden united"):
            continue
        matches.append({
            "id": f"first-{day.isoformat()}-{slug(home)}-{slug(away)}",
            "team": "first", "dateISO": day.isoformat(),
            "date": f"{day:%A}, {day.day} {day:%B %Y}",
            "home": home, "away": away, "kickoff": None,
            "venue": "Home" if home.lower() == "camden united" else "Away",
            "competition": "Premier Division", "played": False,
        })
    return unique(matches)


def main():
    if NOW.weekday() != 6 or NOW.hour < 20:
        print("Skipped: automatic sync is Sunday from 8pm UK time only.")
        return 0
    cache = json.loads(DEST.read_text())
    if cache.get("lastSuccessfulSunday") == SUNDAY_KEY:
        print("This Sunday's full sync already succeeded; skip retry.")
        return 0

    old = json.loads(json.dumps(cache))
    errors = {}
    for team in ("first", "midweek", "ogs"):
        candidates = []
        responses = 0
        failures = []
        for url in SOURCES[team]:
            try:
                soup = fetch(url)
                responses += 1
                new_matches = parse_mitoo(soup) if team == "first" else parse_fa(soup, team)
                candidates.extend(new_matches)
                if candidates:
                    break
            except Exception as exc:
                failures.append(str(exc)[:180])
        candidates = unique(candidates)
        if candidates:
            # Keep manually confirmed first-team cup games which the Mitoo
            # Premier Division listing may not contain.
            if team == "first":
                previous = cache.get("teams", {}).get("first", [])
                cup = [x for x in previous if "cup" in x.get("competition", "").lower() and x["dateISO"] >= SUNDAY_KEY]
                candidates = unique(candidates + cup)
            cache["teams"][team] = candidates
            print(f"{team}: {len(candidates)} upcoming fixtures")
        elif team == "first" and responses:
            errors[team] = "Mitoo responded, but its fixture rows could not be safely verified. Existing first-team fixtures preserved."
        elif responses:
            # Do not erase previously verified matches on an apparently empty
            # or incompletely loaded listing.
            errors[team] = "Public FA page returned no verified upcoming matches; existing fixtures preserved."
        else:
            errors[team] = "; ".join(failures)[:350] or "Source temporarily unavailable."
        if team in errors:
            print(f"{team}: {errors[team]}", file=sys.stderr)

    cache["errors"] = errors
    if not errors:
        cache["lastSuccessfulSunday"] = SUNDAY_KEY
    if cache != old:
        cache["updatedAt"] = NOW.isoformat()
        DEST.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n")
        print("Fixture cache updated")
    else:
        print("No changes")
    # Failure signals retry. Successful teams are preserved and need no re-entry.
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
