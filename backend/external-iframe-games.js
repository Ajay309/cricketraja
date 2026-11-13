const fs = require("fs");
const path = require("path");

const DEFAULT_GAME_SET = new Set([
  "teen20",
  "dt20",
  "baccarat",
  "roulette11",
  "worli3",
  "vteen20",
  "aviator",
  "mines",
  "trb-turbomines",
  "trb-aero",
  "sports-tv",
  "cricketv",
  "cricketv2",
  "cricketv3"
]);

const DEFAULT_URL_TEMPLATE = "https://11xplay.global/casino-detail/99995/150001";
const EXTERNAL_IFRAME_ENABLED = process.env.EXTERNAL_IFRAME_ENABLED !== "0";
const EXTERNAL_IFRAME_DEFAULT_URL =
  String(process.env.EXTERNAL_IFRAME_DEFAULT_URL || DEFAULT_URL_TEMPLATE).trim() || DEFAULT_URL_TEMPLATE;
const EXTERNAL_IFRAME_FORCE_ALL = process.env.EXTERNAL_IFRAME_FORCE_ALL !== "0";
const EXTERNAL_IFRAME_MAP_FILE = path.resolve(
  process.env.EXTERNAL_IFRAME_MAP_FILE || path.join(__dirname, "data", "external-iframe-games.json")
);

let cachedMap = null;
let cachedMapMtimeMs = 0;

function sanitizeGameId(value = "") {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) {
    return "";
  }
  if (raw === "tv" || /^worli3_/i.test(raw)) {
    return "worli3";
  }
  return raw.replace(/[^a-z0-9_-]/g, "");
}

function readJsonMap() {
  try {
    const stat = fs.statSync(EXTERNAL_IFRAME_MAP_FILE);
    if (cachedMap && stat.mtimeMs === cachedMapMtimeMs) {
      return cachedMap;
    }
    const raw = fs.readFileSync(EXTERNAL_IFRAME_MAP_FILE, "utf8");
    const parsed = JSON.parse(raw);
    cachedMap = parsed && typeof parsed === "object" ? parsed : {};
    cachedMapMtimeMs = stat.mtimeMs;
    return cachedMap;
  } catch {
    cachedMap = {};
    cachedMapMtimeMs = 0;
    return cachedMap;
  }
}

function replaceTemplate(template, context = {}) {
  const safeTemplate = String(template || "").trim();
  if (!safeTemplate) {
    return "";
  }
  const replacements = {
    "{game}": encodeURIComponent(String(context.game || "")),
    "{raw}": encodeURIComponent(String(context.raw || "")),
    "{user}": encodeURIComponent(String(context.user || "")),
    "{token}": encodeURIComponent(String(context.token || ""))
  };
  let out = safeTemplate;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.split(key).join(value);
  }
  return out;
}

function normalizeAbsoluteHttpUrl(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }
  try {
    const url = new URL(raw);
    if (!/^https?:$/i.test(url.protocol)) {
      return "";
    }
    return url.toString();
  } catch {
    return "";
  }
}

function resolveExternalIframeLaunch({
  gameId = "",
  rawId = "",
  username = "",
  token = ""
} = {}) {
  if (!EXTERNAL_IFRAME_ENABLED) {
    return null;
  }

  const normalizedGame = sanitizeGameId(gameId || rawId);
  if (!normalizedGame) {
    return null;
  }

  const map = readJsonMap();
  const mappingByGame = map && typeof map.byGame === "object" ? map.byGame : {};
  const enabledGames = new Set(DEFAULT_GAME_SET);

  const listFromMap = Array.isArray(map.enabledGames) ? map.enabledGames : [];
  for (const value of listFromMap) {
    const normalized = sanitizeGameId(value);
    if (normalized) {
      enabledGames.add(normalized);
    }
  }

  const directMapping = mappingByGame[normalizedGame] || mappingByGame[String(rawId || "").trim()];
  const mappedTemplate =
    directMapping && typeof directMapping === "object"
      ? String(directMapping.url || "")
      : String(directMapping || "");

  const shouldUseDefault = EXTERNAL_IFRAME_FORCE_ALL || enabledGames.has(normalizedGame);
  const template = mappedTemplate || (shouldUseDefault ? EXTERNAL_IFRAME_DEFAULT_URL : "");
  const externalUrl = normalizeAbsoluteHttpUrl(
    replaceTemplate(template, {
      game: normalizedGame,
      raw: String(rawId || ""),
      user: String(username || ""),
      token: String(token || "")
    })
  );

  if (!externalUrl) {
    return null;
  }

  return {
    url: externalUrl,
    provider: "external-iframe",
    game: normalizedGame,
    external: true
  };
}

module.exports = {
  resolveExternalIframeLaunch
};
