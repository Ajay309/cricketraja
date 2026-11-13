// backend/odds-api.js
// The Odds API (https://the-odds-api.com) adapter.
// Professor API jaisa hi format return karta hai, taaki router me kuch na badalna pade.
//
// Env variables:
//   ODDS_API_KEY              (required) tumhari key
//   ODDS_API_REGIONS          default "uk"   (uk | eu | au | us, comma separated allowed)
//   ODDS_API_CACHE_SECONDS    default 600    (credits bachane ke liye cache)
//   ODDS_API_MAX_KEYS         default 3      (ek sport ke kitne leagues/series fetch karne hain)
//   ODDS_API_KEYS_CRICKET     optional, e.g. "cricket_ipl,cricket_test_match" (auto-detect ki jagah)
//   ODDS_API_KEYS_SOCCER / ODDS_API_KEYS_TENNIS   same
//   ODDS_API_LAY_SPREAD       default 0.02   (lay price = back + spread, kyunki API lay nahi deti)
//   ODDS_API_PLACEHOLDER_SIZE default 100000 (back/lay size, ye bhi API se nahi aata)
//   ODDS_API_TIME_FORMAT      default "slash" ("iso" => 2026-11-12 19:30:00, "slash" => 11/12/2026 7:30:00 PM)

const axios = require("axios");

const API_BASE = "https://api.the-odds-api.com/v4";
const SPORT_GROUPS = { cricket: "Cricket", soccer: "Soccer", tennis: "Tennis" };
const SPORT_ETID = { cricket: 4, soccer: 1, tennis: 2 };

const cacheMs = () => Math.max(30, Number(process.env.ODDS_API_CACHE_SECONDS || 600)) * 1000;
const maxKeys = () => Math.max(1, Number(process.env.ODDS_API_MAX_KEYS || 3));
const regions = () => process.env.ODDS_API_REGIONS || "uk";
const laySpread = () => Number(process.env.ODDS_API_LAY_SPREAD || 0.02);
const placeholderSize = () => Number(process.env.ODDS_API_PLACEHOLDER_SIZE || 100000);

const listCache = new Map(); // sportName -> { at, matches, byId }
const inflight = new Map();
let sportsCache = { at: 0, rows: [] };

async function oddsGet(pathname, params = {}) {
  const apiKey = String(process.env.ODDS_API_KEY || "").trim();
  if (!apiKey) {
    throw new Error("ODDS_API_KEY is required to fetch live sports data.");
  }

  const res = await axios.get(`${API_BASE}${pathname}`, {
    headers: { "x-api-key": apiKey },
    params,
    timeout: 8000
  });
  const left = res.headers && res.headers["x-requests-remaining"];
  if (left !== undefined) {
    console.log(`[OddsAPI] ${pathname} ok | credits remaining: ${left}`);
  }
  return res.data;
}

async function getSportKeys(sportName) {
  const override = String(process.env[`ODDS_API_KEYS_${sportName.toUpperCase()}`] || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (override.length) return override;

  if (!sportsCache.rows.length || Date.now() - sportsCache.at > 60 * 60 * 1000) {
    const rows = await oddsGet("/sports/"); // ye call free hai
    sportsCache = { at: Date.now(), rows: Array.isArray(rows) ? rows : [] };
  }
  const group = SPORT_GROUPS[sportName];
  return sportsCache.rows
    .filter((r) => r.group === group && r.active && !r.has_outrights)
    .map((r) => r.key)
    .slice(0, maxKeys());
}

function toNumericId(id) {
  const hex = String(id).replace(/[^0-9a-f]/gi, "").slice(0, 8);
  return parseInt(hex || "0", 16);
}

function formatLocalTime(iso) {
  const d = new Date(iso);
  const p = (v) => String(v).padStart(2, "0");
  if (String(process.env.ODDS_API_TIME_FORMAT || "slash").toLowerCase() === "slash") {
    const hour24 = d.getHours();
    const ampm = hour24 >= 12 ? "PM" : "AM";
    const hour12 = hour24 % 12 || 12;
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${hour12}:${p(d.getMinutes())}:${p(
      d.getSeconds()
    )} ${ampm}`;
  }
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(
    d.getMinutes()
  )}:${p(d.getSeconds())}`;
}

function bestH2h(event) {
  const best = new Map();
  for (const bk of event.bookmakers || []) {
    const mk = (bk.markets || []).find((m) => m.key === "h2h");
    for (const o of (mk && mk.outcomes) || []) {
      const price = Number(o.price);
      if (Number.isFinite(price) && price > (best.get(o.name) || 0)) {
        best.set(o.name, price);
      }
    }
  }
  return best;
}

const unavailableMarketSections = [
  { id: "super-over", name: "Who Will Win The Match? (Inc Super Over)", gtype: "match", dtype: 1 },
  { id: "bookmaker", name: "Bookmaker", gtype: "book", dtype: 2 },
  { id: "fancy", name: "Fancy", gtype: "match", dtype: 1 },
  { id: "premium-fancy", name: "Premium Fancy", gtype: "match", dtype: 1 },
  { id: "multi-runners", name: "Multi Runners Market", gtype: "match", dtype: 1 },
  { id: "line-markets", name: "Line Markets", gtype: "match", dtype: 1 },
  { id: "session-markets", name: "Session Markets", gtype: "match", dtype: 1 },
  { id: "over-session", name: "Over Session Market", gtype: "match", dtype: 1 }
];

function buildUnavailableMarkets(match) {
  return unavailableMarketSections.map((section) => ({
    mid: `${match.gmid}-${section.id}`,
    mname: `${section.name} (Odds unavailable)`,
    dtype: section.dtype,
    gtype: section.gtype,
    status: "SUSPENDED",
    min: 0,
    max: 0,
    l: 0,
    maxb: 0,
    umaxbof: 0,
    is_cashout: 0,
    t2: [],
    nation: [],
    runners: [],
    bhav: [],
    t1: [],
    matchedBet: [],
    match_bet: []
  }));
}

function ladder(price) {
  const zero = { b1: 0, bs1: 0, b2: 0, bs2: 0, b3: 0, bs3: 0, l1: 0, ls1: 0, l2: 0, ls2: 0, l3: 0, ls3: 0 };
  if (!price) return zero;
  const size = placeholderSize();
  const r = (v) => Number(v.toFixed(2));
  const l1 = price + laySpread();
  return {
    b1: r(price), bs1: size,
    b2: r(Math.max(1.01, price - 0.01)), bs2: size,
    b3: r(Math.max(1.01, price - 0.02)), bs3: size,
    l1: r(l1), ls1: size,
    l2: r(l1 + 0.01), ls2: size,
    l3: r(l1 + 0.02), ls3: size
  };
}

function buildMatch(event, sportName) {
  const etid = SPORT_ETID[sportName] || 4;
  const gmid = toNumericId(event.id);
  const name = `${event.home_team} v ${event.away_team}`;
  const iplay = new Date(event.commence_time).getTime() <= Date.now();
  return {
    etid,
    etId: etid,
    gmid,
    mid: String(gmid),
    etype: sportName.charAt(0).toUpperCase() + sportName.slice(1),
    ename: name,
    gname: name,
    status: iplay ? "IN-PLAY" : "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay,
    stime: formatLocalTime(event.commence_time),
    bname: "MATCH_ODDS"
  };
}

function buildOddsPayload(event, match) {
  const best = bestH2h(event);
  const names = [event.home_team, event.away_team].filter(Boolean);
  for (const n of best.keys()) {
    if (!names.includes(n)) names.push(n); // e.g. "Draw"
  }
  const runners = names.map((name, i) => ({
    sid: String(i + 1),
    selectionId: String(i + 1),
    runnerName: name,
    selectionName: name,
    nat: name,
    n: name,
    pnl: 0,
    amt: 0,
    sdata: 0,
    ...ladder(best.get(name) || 0)
  }));
  const hasOdds = best.size > 0;
  const lmt = 50000;
  return {
    t1: [
      {
        mid: `${match.gmid}-m1`,
        mname: "MATCH_ODDS",
        dtype: 1,
        gtype: "match",
        status: hasOdds ? "OPEN" : "SUSPENDED",
        min: 100,
        max: lmt,
        l: lmt,
        maxb: lmt,
        umaxbof: lmt,
        is_cashout: 0,
        t2: runners,
        nation: runners,
        runners,
        bhav: runners,
        t1: runners,
        matchedBet: [],
        match_bet: []
      },
      ...buildUnavailableMarkets(match)
    ]
  };
}

async function loadSport(sportName) {
  const cached = listCache.get(sportName);
  if (cached && Date.now() - cached.at < cacheMs()) return cached;
  if (inflight.has(sportName)) return inflight.get(sportName);

  const job = (async () => {
    try {
      const keys = await getSportKeys(sportName);
      const seen = new Set();
      const events = [];
      for (const key of keys) {
        const rows = await oddsGet(`/sports/${key}/odds/`, {
          regions: regions(),
          markets: "h2h",
          oddsFormat: "decimal"
        });
        for (const ev of Array.isArray(rows) ? rows : []) {
          if (!seen.has(ev.id)) {
            seen.add(ev.id);
            events.push(ev);
          }
        }
      }
      events.sort((a, b) => new Date(a.commence_time) - new Date(b.commence_time));

      const matches = [];
      const byId = new Map();
      for (const ev of events) {
        const match = buildMatch(ev, sportName);
        matches.push(match);
        byId.set(match.gmid, { match, event: ev });
      }
      const entry = { at: Date.now(), matches, byId };
      console.log(`[OddsAPI] ${sportName}: ${matches.length} matches loaded`);
      listCache.set(sportName, entry);
      return entry;
    } catch (err) {
      console.error(`[OddsAPI] ${sportName} fetch failed:`, err.message);
      // 30 sec baad dobara try karo, har request pe API ko mat maaro
      const fallback = cached || { matches: [], byId: new Map() };
      const entry = { ...fallback, at: Date.now() - cacheMs() + 30 * 1000 };
      listCache.set(sportName, entry);
      return entry;
    } finally {
      inflight.delete(sportName);
    }
  })();

  inflight.set(sportName, job);
  return job;
}

async function fetchOddsApiMatches(sportName = "cricket") {
  const entry = await loadSport(sportName);
  return entry.matches;
}

async function fetchOddsApiOdds(sportName, gmid) {
  const entry = await loadSport(sportName);
  const item = entry.byId.get(Number(gmid));
  if (!item) return null; // null => router mock data pe fallback karega
  return buildOddsPayload(item.event, item.match);
}

async function fetchOddsApiMatchDetail(sportName, gmid) {
  const entry = await loadSport(sportName);
  const item = entry.byId.get(Number(gmid));
  if (!item) return null;
  const { match } = item;
  return [
    {
      gmid: match.gmid,
      oldgmid: match.gmid,
      etid: match.etid,
      ename: match.ename,
      stime: match.stime,
      gtype: match.gtype,
      iplay: Boolean(match.iplay),
      scard: 1,
      gtv: "",
      status: match.status
    }
  ];
}

module.exports = {
  fetchOddsApiMatches,
  fetchOddsApiOdds,
  fetchOddsApiMatchDetail
};