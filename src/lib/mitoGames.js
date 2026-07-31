const MITOO_GAMES_URL =
  'https://mitoofootball.com/TeamHist.cfm?CI=68&DivisionID=64&TblName=Matches&LeagueCode=MDX2026';

const DATE_RE =
  /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s+\d{1,2}\s+\w+\s+\d{4}$/;
const SCORE_RE = /^\d+$/;

function stripTags(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSpanTexts(rowHtml) {
  return [...rowHtml.matchAll(/class="pix13realblack">([\s\S]*?)<\/span>/gi)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
}

function parseMatchRow(texts) {
  if (texts.length < 3) return null;

  const date = texts[texts.length - 1];
  if (!DATE_RE.test(date)) return null;

  const body = texts.slice(0, -1);
  let home;
  let away;
  let homeScore = null;
  let awayScore = null;

  if (body.length === 2) {
    [home, away] = body;
  } else if (body.length === 4 && SCORE_RE.test(body[1]) && SCORE_RE.test(body[2])) {
    home = body[0];
    homeScore = body[1];
    awayScore = body[2];
    away = body[3];
  } else if (body.length >= 2) {
    home = body[0];
    away = body[body.length - 1];
    const maybeScores = body.slice(1, -1).filter((part) => SCORE_RE.test(part));
    if (maybeScores.length >= 2) {
      homeScore = maybeScores[0];
      awayScore = maybeScores[1];
    }
  } else {
    return null;
  }

  const isHome = /camden united/i.test(home);
  const opponent = isHome ? away : home;
  const played = homeScore !== null && awayScore !== null;

  let result = 'fixture';
  if (played) {
    const ours = Number(isHome ? homeScore : awayScore);
    const theirs = Number(isHome ? awayScore : homeScore);
    if (ours > theirs) result = 'win';
    else if (ours < theirs) result = 'loss';
    else result = 'draw';
  }

  return {
    id: `${date}-${home}-${away}`,
    date,
    home,
    away,
    homeScore,
    awayScore,
    opponent,
    venue: isHome ? 'Home' : 'Away',
    played,
    result,
    competition: 'Premier Division',
  };
}

export function parseMitooGamesHtml(html) {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  const listMarker = clean.search(/\d+\s+in list/i);
  const section = listMarker >= 0 ? clean.slice(listMarker) : clean;
  const rows = [...section.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((match) => match[0]);

  const games = [];
  const seen = new Set();

  for (const row of rows) {
    const texts = extractSpanTexts(row);
    const game = parseMatchRow(texts);
    if (!game || seen.has(game.id)) continue;
    seen.add(game.id);
    games.push(game);
  }

  return games;
}

export async function fetchCamdenGames() {
  const response = await fetch(MITOO_GAMES_URL, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
    },
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`Unable to load fixtures (${response.status})`);
  }

  const html = await response.text();
  const games = parseMitooGamesHtml(html);

  return {
    games,
    sourceUrl: MITOO_GAMES_URL,
    fetchedAt: new Date().toISOString(),
  };
}
