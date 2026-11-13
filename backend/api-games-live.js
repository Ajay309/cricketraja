const fs = require("fs");
const path = require("path");
const {
  API_GAMES_ENABLED,
  API_GAMES_PROXY_URL,
  API_GAMES_KEY,
  API_GAMES_SECRET,
  API_GAMES_TIMEOUT_MS,
  API_GAMES_CURRENCY,
  API_GAMES_LANGUAGE,
  API_GAMES_DEFAULT_CREDIT,
  API_GAMES_LIST_FILE,
  ROOT_DIR
} = require("./config");
const { encryptPayload } = require("./crypto");
const { pickFirstValue, toNumber } = require("./http-utils");

const DEFAULT_IMAGE = "/casino/casino-icons/lc/default.jpg";
const DEFAULT_LOCAL_ICON = "default.jpg";
const LOCAL_CASINO_ICON_DIR = path.join(ROOT_DIR, "casino", "casino-icons", "lc");
const LOCAL_CASINO_ICON_VC_DIR = path.join(ROOT_DIR, "casino", "casino-icons", "vc");
const REFERENCE_LIVE_ICON_PATTERN = /^ref-(\d+)\.(png|jpe?g|gif|webp|svg)$/i;
const REFERENCE_LIVE_ICON_POOL = (() => {
  try {
    return fs
      .readdirSync(LOCAL_CASINO_ICON_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile() && REFERENCE_LIVE_ICON_PATTERN.test(entry.name))
      .map((entry) => {
        const match = entry.name.match(REFERENCE_LIVE_ICON_PATTERN);
        return {
          fileName: entry.name,
          order: Number(match && match[1] ? match[1] : 0)
        };
      })
      .sort((left, right) => {
        if (left.order !== right.order) {
          return left.order - right.order;
        }
        return left.fileName.localeCompare(right.fileName);
      })
      .map((entry) => entry.fileName);
  } catch {
    return [];
  }
})();
const DEFAULT_LOCAL_ICON_PATH = path.join(LOCAL_CASINO_ICON_DIR, DEFAULT_LOCAL_ICON);
const GAME_LIST_CACHE_TTL_MS = Math.max(
  30 * 1000,
  Number(process.env.API_GAMES_GAME_LIST_CACHE_TTL_MS || 15 * 60 * 1000)
);
const RESPONSE_CACHE_TTL_MS = 8 * 1000;
const IMAGE_FETCH_TIMEOUT_MS = Math.max(12000, Number(API_GAMES_TIMEOUT_MS || 0), 4000);
const LOCAL_ICON_CATALOG_TTL_MS = 5 * 60 * 1000;
const FRONT_CASINO_ICON_DIR = path.join(ROOT_DIR, "front", "v93", "static", "front", "img", "casino");
const GAME_LIST_DISK_CACHE_FILE = path.join(ROOT_DIR, "backend", "data", "api-games-cache.json");
const GAME_LIST_DISK_CACHE_MAX_AGE_MS = Math.max(
  GAME_LIST_CACHE_TTL_MS,
  Number(process.env.API_GAMES_GAME_LIST_DISK_CACHE_MAX_AGE_MS || 24 * 60 * 60 * 1000)
);

const HANDLED_ENDPOINTS = new Set([
  "/api/front/casino/alllist",
  "/api/front/get_casino_list",
  "/api/front/casino/catlist",
  "/api/front/cat_list_open",
  "/api/front/casino/providerlist",
  "/api/front/provider_list_open",
  "/api/front/casino/slotlist",
  "/api/front/slot_list_open",
  "/api/front/casino/other",
  "/api/front/other_open",
  "/api/front/casino/tablist",
  "/api/front/get_casino_tab_list",
  "/api/front/casino/tablelist",
  "/api/front/get_casino_table_list",
  "/api/front/casino/data2",
  "/api/front/vcasino/data2",
  "/api/front/casino/launch",
  "/api/front/casino/launchother"
]);

const LEGACY_ALIAS_PATTERNS = [
  {
    aliases: [
      "superover2",
      "superover3",
      "teen20v1",
      "teen20c",
      "teen62",
      "teen41",
      "teen42",
      "teen33",
      "teenunique",
      "poison",
      "poison20",
      "joker20",
      "joker120",
      "btable2",
      "dolidana",
      "mogambo"
    ],
    pattern: /teen\s*patti|casino\s*war|joker|super\s*over|one\s*day/i
  },
  { aliases: ["worli3", "matka", "matkamarket", "matka-market"], pattern: /dragon\s*&?\s*tiger/i },
  { aliases: ["teen20", "teenpatti", "vipteenpatti", "vteens"], pattern: /teen\s*patti/i },
  { aliases: ["dt20", "dragon", "tiger"], pattern: /dragon\s*&?\s*tiger/i },
  { aliases: ["roulette11", "goldenroulette", "roulette"], pattern: /roulette/i },
  { aliases: ["roulette12", "roulette13", "ourroullete"], pattern: /roulette/i },
  { aliases: ["baccarat", "baccarat2"], pattern: /baccarat/i },
  { aliases: ["lucky7", "lucky"], pattern: /lucky\s*7|7\s*up\s*down/i },
  { aliases: ["lucky5", "lucky15"], pattern: /lucky\s*(5|6|7|15)/i },
  { aliases: ["andarbahar", "andar"], pattern: /andar\s*bahar/i },
  { aliases: ["ab4"], pattern: /andar\s*bahar/i },
  { aliases: ["sicbo", "sicbo2"], pattern: /sic\s*bo/i },
  { aliases: ["poker", "pokerday", "poker20"], pattern: /poker/i },
  { aliases: ["aviator", "crash"], pattern: /aviator|crash/i },
  { aliases: ["mines"], pattern: /mines/i }
];

const responseCache = new Map();
const localIconByGameId = new Map();
let localIconCatalogCache = { at: 0, byKey: new Map(), entries: [] };
let gamesCatalogCache = { at: 0, value: null };
let gamesCatalogRefreshPromise = null;
const LIVE_HOME_LAUNCH_CACHE_TTL_MS = Math.max(
  2 * 60 * 1000,
  Number(process.env.API_GAMES_HOME_LAUNCH_CACHE_TTL_MS || 20 * 60 * 1000)
);
const LIVE_HOME_PROBE_LIMIT = Math.max(
  0,
  Number(process.env.API_GAMES_HOME_PROBE_LIMIT || 24)
);
const LIVE_HOME_PROBE_CONCURRENCY = Math.max(
  1,
  Number(process.env.API_GAMES_HOME_PROBE_CONCURRENCY || 4)
);
const LIVE_HOME_PROBE_TIMEOUT_MS = Math.max(
  1500,
  Number(process.env.API_GAMES_HOME_PROBE_TIMEOUT_MS || 3500)
);
const GAME_LIST_TIMEOUT_MS = Math.max(
  Number(API_GAMES_TIMEOUT_MS || 0),
  Number(process.env.API_GAMES_GAME_LIST_TIMEOUT_MS || 20000),
  12000
);
const LIVE_HOME_PROBE_MEMBER = String(process.env.API_GAMES_HOME_PROBE_MEMBER || "homepreview")
  .trim()
  .replace(/[^a-zA-Z0-9_-]/g, "")
  .slice(0, 32) || "homepreview";
const LIVE_LAUNCH_STATUS = {
  ok: "ok",
  bad: "bad",
  unknown: "unknown"
};
const liveLaunchHealthCache = new Map();
let lastApiGamesError = null;

function setLastApiGamesError(details = {}) {
  lastApiGamesError = {
    at: Date.now(),
    action: String(details.action || "").trim(),
    code: Number(details.code || 0),
    status: Number(details.status || 0),
    msg: String(details.msg || "").trim()
  };
}

function clearLastApiGamesError() {
  lastApiGamesError = null;
}

function getLastApiGamesError(maxAgeMs = 90 * 1000) {
  if (!lastApiGamesError || typeof lastApiGamesError !== "object") {
    return null;
  }
  if (Date.now() - Number(lastApiGamesError.at || 0) > Math.max(1000, Number(maxAgeMs || 0))) {
    return null;
  }
  return { ...lastApiGamesError };
}

function isProviderConfigured() {
  return Boolean(
    API_GAMES_ENABLED &&
      String(API_GAMES_PROXY_URL || "").trim() &&
      String(API_GAMES_KEY || "").trim() &&
      String(API_GAMES_SECRET || "").trim()
  );
}

function normalizeSpace(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function slugify(value = "") {
  return normalizeSpace(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function normalizeGameKey(value = "") {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function asEncryptedEnvelope(data, msg = "success") {
  return {
    data: encryptPayload({
      success: true,
      status: 200,
      msg,
      data
    })
  };
}

function categoryToType(category = "", gameName = "") {
  const normalizedCategory = String(category || "").trim().toLowerCase();
  const normalizedName = String(gameName || "").trim().toLowerCase();
  const searchable = `${normalizedCategory} ${normalizedName}`.trim();

  if (!searchable) {
    return "xgame";
  }

  if (
    searchable.includes("slot") ||
    searchable.includes("fruit machine") ||
    searchable.includes("reel")
  ) {
    return "slot";
  }

  if (
    searchable.includes("crash") ||
    searchable.includes("aviator") ||
    searchable.includes("mines") ||
    searchable.includes("plinko") ||
    searchable.includes("limbo") ||
    searchable.includes("instant") ||
    searchable.includes("arcade") ||
    searchable.includes("casual") ||
    searchable.includes("mini") ||
    searchable.includes("marble") ||
    searchable.includes("sports")
  ) {
    return "xgame";
  }

  if (
    searchable.includes("virtual") ||
    searchable.includes("lottery") ||
    searchable.includes("scratch") ||
    searchable.includes("fish") ||
    searchable.includes("bingo")
  ) {
    return "vc";
  }

  if (
    searchable.includes("live") ||
    searchable.includes("table") ||
    searchable.includes("tablegame") ||
    searchable.includes("card") ||
    searchable.includes("casino") ||
    searchable.includes("roulette") ||
    searchable.includes("poker") ||
    searchable.includes("blackjack") ||
    searchable.includes("baccarat") ||
    searchable.includes("dragon") ||
    searchable.includes("sicbo") ||
    searchable.includes("teen") ||
    searchable.includes("andar") ||
    searchable.includes("lobby") ||
    searchable.includes("multiplayer")
  ) {
    return "lc";
  }

  return "xgame";
}

function toSafeImageUrl(value = "") {
  return normalizeImageSources(value).safeUrl;
}

function parseProxyWrappedImageUrl(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  const proxyMarker = "/api/front/image-proxy?";
  const markerIndex = raw.toLowerCase().indexOf(proxyMarker);
  const proxyPath = markerIndex >= 0 ? raw.slice(markerIndex) : raw;
  if (!proxyPath.toLowerCase().startsWith(proxyMarker)) {
    return "";
  }

  try {
    const parsed = new URL(proxyPath, "http://localhost");
    const encodedUpstream =
      String(parsed.searchParams.get("u") || "").trim() ||
      String(parsed.searchParams.get("url") || "").trim();
    if (!encodedUpstream) {
      return "";
    }
    const upstream = decodeURIComponent(encodedUpstream);
    return /^https?:\/\//i.test(upstream) ? upstream : "";
  } catch {
    return "";
  }
}

function extractAbsoluteImageUrl(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }
  return parseProxyWrappedImageUrl(raw);
}

function normalizeImageSources(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return { safeUrl: "", rawUrl: "" };
  }

  const absoluteUrl = extractAbsoluteImageUrl(raw);
  if (absoluteUrl) {
    return {
      safeUrl: `/api/front/image-proxy?u=${encodeURIComponent(absoluteUrl)}`,
      rawUrl: absoluteUrl
    };
  }

  if (raw.startsWith("/")) {
    return { safeUrl: raw, rawUrl: "" };
  }

  return { safeUrl: "", rawUrl: "" };
}

function normalizeProviderGames(input) {
  if (!Array.isArray(input)) {
    return [];
  }
  const normalized = input
    .map((row) => {
      const imageSource =
        row && row.img
          ? row.img
          : row && row.imgUrl2
            ? row.imgUrl2
            : row && row.imgpath
              ? row.imgpath
              : "";
      const image = normalizeImageSources(imageSource);
      return {
        gameID: String(row && row.gameID ? row.gameID : "").trim(),
        gameNameEn: normalizeSpace(row && row.gameNameEn ? row.gameNameEn : ""),
        img: image.safeUrl,
        imgRaw: image.rawUrl,
        vendorCode: normalizeSpace(row && row.vendorCode ? row.vendorCode : "UNKNOWN") || "UNKNOWN",
        category: normalizeSpace(row && row.category ? row.category : "Live") || "Live"
      };
    })
    .filter((row) => row.gameID && row.gameNameEn);

  return normalized;
}

function safeImageExtension(raw = "") {
  try {
    const pathname = new URL(String(raw || "")).pathname || "";
    const ext = path.extname(pathname).toLowerCase();
    if (/^\.(png|jpe?g|gif|webp|svg)$/.test(ext)) {
      return ext;
    }
  } catch {
    // ignore parse errors
  }
  return ".png";
}

function buildLocalImageName(game = {}) {
  const vendor = slugify(String(game.vendorCode || "mac88").toLowerCase()) || "mac88";
  const gameId = String(game.gameID || "").replace(/[^a-zA-Z0-9_-]/g, "");
  const ext = safeImageExtension(game.imgRaw || game.img);
  if (!gameId) {
    return DEFAULT_LOCAL_ICON;
  }
  return `${vendor}-${gameId}${ext}`;
}

function ensureLocalDefaultIcon() {
  try {
    fs.mkdirSync(LOCAL_CASINO_ICON_DIR, { recursive: true });
    if (fs.existsSync(DEFAULT_LOCAL_ICON_PATH) && fs.statSync(DEFAULT_LOCAL_ICON_PATH).size > 0) {
      return;
    }
  } catch {
    return;
  }

  const candidates = [
    path.join(ROOT_DIR, "front", "v93", "static", "front", "img", "casino", "default.jpeg"),
    path.join(ROOT_DIR, "front", "v93", "static", "front", "img", "casino", "default.jpg"),
    path.join(ROOT_DIR, "casino", "casino-icons", "lc", "baccarat.jpg")
  ];

  for (const sourcePath of candidates) {
    try {
      if (!sourcePath || !fs.existsSync(sourcePath)) {
        continue;
      }
      const bytes = fs.readFileSync(sourcePath);
      if (!bytes || !bytes.length) {
        continue;
      }
      fs.writeFileSync(DEFAULT_LOCAL_ICON_PATH, bytes);
      return;
    } catch {
      // try next candidate
    }
  }
}

function buildLocalIconCatalog() {
  const now = Date.now();
  if (localIconCatalogCache.entries.length && now - localIconCatalogCache.at <= LOCAL_ICON_CATALOG_TTL_MS) {
    return localIconCatalogCache;
  }

  const byKey = new Map();
  const entries = [];
  const sourceDirs = [LOCAL_CASINO_ICON_DIR, LOCAL_CASINO_ICON_VC_DIR, FRONT_CASINO_ICON_DIR];

  for (const dirPath of sourceDirs) {
    try {
      if (!dirPath || !fs.existsSync(dirPath)) {
        continue;
      }
      const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of dirEntries) {
        if (!entry.isFile()) {
          continue;
        }
        const fullPath = path.join(dirPath, entry.name);
        if (!/\.(png|jpe?g|gif|webp|svg)$/i.test(entry.name)) {
          continue;
        }
        const parsed = path.parse(entry.name);
        const key = normalizeGameKey(parsed.name);
        if (!key) {
          continue;
        }
        const row = {
          key,
          fileName: entry.name,
          sourcePath: fullPath
        };
        if (!byKey.has(key)) {
          byKey.set(key, []);
        }
        byKey.get(key).push(row);
        entries.push(row);
      }
    } catch {
      // ignore directory scan errors
    }
  }

  localIconCatalogCache = { at: now, byKey, entries };
  return localIconCatalogCache;
}

function ensureLocalIconFile(entry) {
  if (!entry || !entry.fileName) {
    return "";
  }
  const targetPath = path.join(LOCAL_CASINO_ICON_DIR, entry.fileName);
  try {
    fs.mkdirSync(LOCAL_CASINO_ICON_DIR, { recursive: true });
    if (!fs.existsSync(targetPath) || fs.statSync(targetPath).size <= 0) {
      const bytes = fs.readFileSync(entry.sourcePath);
      if (bytes && bytes.length) {
        fs.writeFileSync(targetPath, bytes);
      }
    }
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
      return entry.fileName;
    }
  } catch {
    return "";
  }
  return "";
}

function stableStringHash(value = "") {
  const text = String(value || "");
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function resolveFallbackPool(catalog, preferredType = "lc") {
  const defaultKey = normalizeGameKey(path.parse(DEFAULT_LOCAL_ICON).name);
  const entries = Array.isArray(catalog && catalog.entries) ? catalog.entries : [];
  if (!entries.length) {
    return [];
  }

  return entries
    .filter((entry) => {
      const key = normalizeGameKey(path.parse(String(entry.fileName || "")).name);
      return key && key !== defaultKey;
    })
    .sort((left, right) => {
      const leftPath = String(left && left.sourcePath ? left.sourcePath : "").toLowerCase();
      const rightPath = String(right && right.sourcePath ? right.sourcePath : "").toLowerCase();
      const leftIsVc = /[\\/](vc)[\\/]/i.test(leftPath) ? 1 : 0;
      const rightIsVc = /[\\/](vc)[\\/]/i.test(rightPath) ? 1 : 0;
      const leftIsLc = /[\\/](lc)[\\/]/i.test(leftPath) ? 1 : 0;
      const rightIsLc = /[\\/](lc)[\\/]/i.test(rightPath) ? 1 : 0;

      const leftRank = preferredType === "vc" ? (leftIsVc ? 0 : leftIsLc ? 1 : 2) : leftIsLc ? 0 : leftIsVc ? 1 : 2;
      const rightRank =
        preferredType === "vc" ? (rightIsVc ? 0 : rightIsLc ? 1 : 2) : rightIsLc ? 0 : rightIsVc ? 1 : 2;

      if (leftRank !== rightRank) {
        return leftRank - rightRank;
      }
      const leftKey = String(left && left.key ? left.key : "");
      const rightKey = String(right && right.key ? right.key : "");
      if (leftKey < rightKey) {
        return -1;
      }
      if (leftKey > rightKey) {
        return 1;
      }
      return String(left.fileName || "").localeCompare(String(right.fileName || ""));
    });
}

function pickLocalFallbackIcon(game = {}) {
  const catalog = buildLocalIconCatalog();
  if (!catalog || !catalog.entries.length) {
    return DEFAULT_LOCAL_ICON;
  }

  const keyCandidates = new Set([
    normalizeGameKey(game.gameID),
    normalizeGameKey(game.gameNameEn),
    normalizeGameKey(slugify(game.gameNameEn)),
    normalizeGameKey(`${game.vendorCode || ""}-${game.gameNameEn || ""}`)
  ]);

  for (const key of keyCandidates) {
    if (!key) {
      continue;
    }
    const matches = catalog.byKey.get(key);
    if (!matches || !matches.length) {
      continue;
    }
    for (const match of matches) {
      const fileName = ensureLocalIconFile(match);
      if (fileName) {
        return fileName;
      }
    }
  }

  const searchable = [...keyCandidates].filter((key) => key && key.length >= 4);
  for (const searchKey of searchable) {
    const partial = catalog.entries.find(
      (entry) => entry.key.includes(searchKey) || searchKey.includes(entry.key)
    );
    if (!partial) {
      continue;
    }
    const fileName = ensureLocalIconFile(partial);
    if (fileName) {
      return fileName;
    }
  }

  const preferredType = categoryToType(game.category, game.gameNameEn) === "vc" ? "vc" : "lc";
  const pool = resolveFallbackPool(catalog, preferredType);
  if (pool.length) {
    const seed =
      normalizeGameKey(game.gameID) ||
      normalizeGameKey(game.gameNameEn) ||
      normalizeGameKey(`${game.vendorCode || ""}-${game.category || ""}`) ||
      "fallback";
    const startIndex = stableStringHash(seed) % pool.length;
    for (let index = 0; index < pool.length; index += 1) {
      const candidate = pool[(startIndex + index) % pool.length];
      const fileName = ensureLocalIconFile(candidate);
      if (fileName) {
        return fileName;
      }
    }
  }

  return DEFAULT_LOCAL_ICON;
}

async function cacheLocalIconForGame(game = {}) {
  const gameId = String(game.gameID || "").trim();
  if (!gameId) {
    return DEFAULT_LOCAL_ICON;
  }
  const existing = localIconByGameId.get(gameId);
  if (existing && existing !== DEFAULT_LOCAL_ICON) {
    return existing;
  }

  const imageUrl = extractAbsoluteImageUrl(game.imgRaw || game.img || game.imgUrl2 || "");
  if (!/^https?:\/\//i.test(imageUrl)) {
    const localFallback = pickLocalFallbackIcon(game);
    localIconByGameId.set(gameId, localFallback || DEFAULT_LOCAL_ICON);
    return localFallback || DEFAULT_LOCAL_ICON;
  }

  const fileName = buildLocalImageName(game);
  const filePath = path.join(LOCAL_CASINO_ICON_DIR, fileName);
  try {
    fs.mkdirSync(LOCAL_CASINO_ICON_DIR, { recursive: true });
    const hasValidLocalFile = fs.existsSync(filePath) && fs.statSync(filePath).size > 0;
    if (!hasValidLocalFile) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT_MS);
      try {
        const response = await fetch(imageUrl, {
          method: "GET",
          headers: { "user-agent": "allpanelex-local-mirror/1.0" },
          signal: controller.signal
        });
        if (!response.ok) {
          throw new Error("image fetch failed");
        }
        const bytes = Buffer.from(await response.arrayBuffer());
        if (!bytes.length) {
          throw new Error("empty image");
        }
        fs.writeFileSync(filePath, bytes);
      } finally {
        clearTimeout(timeout);
      }
    }
    localIconByGameId.set(gameId, fileName);
    return fileName;
  } catch {
    const localFallback = pickLocalFallbackIcon(game);
    localIconByGameId.set(gameId, localFallback || DEFAULT_LOCAL_ICON);
    return localFallback || DEFAULT_LOCAL_ICON;
  }
}

async function hydrateLocalIconCache(gameRows = []) {
  ensureLocalDefaultIcon();
  if (!Array.isArray(gameRows) || !gameRows.length) {
    return;
  }
  const workers = [];
  const batchSize = 10;
  for (let index = 0; index < gameRows.length; index += batchSize) {
    workers.push(
      Promise.all(gameRows.slice(index, index + batchSize).map((row) => cacheLocalIconForGame(row)))
    );
  }
  for (const worker of workers) {
    await worker;
  }
}

function toSerializableGameList(list = []) {
  if (!Array.isArray(list) || !list.length) {
    return [];
  }
  return list
    .map((row) => ({
      gameID: String(row && row.gameID ? row.gameID : "").trim(),
      gameNameEn: normalizeSpace(row && row.gameNameEn ? row.gameNameEn : ""),
      img:
        extractAbsoluteImageUrl(row && row.imgRaw ? row.imgRaw : row && row.img ? row.img : "") ||
        toSafeImageUrl(row && row.img ? row.img : ""),
      vendorCode: normalizeSpace(row && row.vendorCode ? row.vendorCode : "UNKNOWN") || "UNKNOWN",
      category: normalizeSpace(row && row.category ? row.category : "Live") || "Live"
    }))
    .filter((row) => row.gameID && row.gameNameEn);
}

function loadGamesFromDiskCache(maxAgeMs = GAME_LIST_DISK_CACHE_MAX_AGE_MS) {
  try {
    if (!fs.existsSync(GAME_LIST_DISK_CACHE_FILE)) {
      return { list: [], updatedAt: 0 };
    }
    const parsed = JSON.parse(fs.readFileSync(GAME_LIST_DISK_CACHE_FILE, "utf8"));
    const updatedAt = Number(
      parsed && typeof parsed === "object"
        ? parsed.updatedAt || parsed.at || parsed.timestamp || 0
        : 0
    );
    if (Number.isFinite(maxAgeMs) && maxAgeMs > 0 && updatedAt > 0) {
      const age = Date.now() - updatedAt;
      if (age > maxAgeMs) {
        return { list: [], updatedAt };
      }
    }

    let sourceList = [];
    if (Array.isArray(parsed)) {
      sourceList = parsed;
    } else if (parsed && typeof parsed === "object") {
      if (Array.isArray(parsed.gameLists)) {
        sourceList = parsed.gameLists;
      } else if (Array.isArray(parsed.list)) {
        sourceList = parsed.list;
      } else if (parsed.data && Array.isArray(parsed.data.gameLists)) {
        sourceList = parsed.data.gameLists;
      }
    }

    const list = normalizeProviderGames(sourceList);
    return {
      list,
      updatedAt: updatedAt > 0 ? updatedAt : 0
    };
  } catch {
    return { list: [], updatedAt: 0 };
  }
}

function saveGamesToDiskCache(list = []) {
  if (!Array.isArray(list) || !list.length) {
    return;
  }
  try {
    fs.mkdirSync(path.dirname(GAME_LIST_DISK_CACHE_FILE), { recursive: true });
    fs.writeFileSync(
      GAME_LIST_DISK_CACHE_FILE,
      JSON.stringify(
        {
          updatedAt: Date.now(),
          gameLists: toSerializableGameList(list)
        },
        null,
        2
      ),
      "utf8"
    );
  } catch {
    // ignore disk cache write errors
  }
}

function loadGamesFromFileFallback() {
  const candidates = [];
  if (API_GAMES_LIST_FILE) {
    candidates.push(path.resolve(API_GAMES_LIST_FILE));
  }
  candidates.push(GAME_LIST_DISK_CACHE_FILE);
  candidates.push(path.join(ROOT_DIR, "all-games.json"));
  candidates.push(path.join(ROOT_DIR, "..", "all-games.json"));

  for (const filePath of candidates) {
    try {
      if (!filePath || !fs.existsSync(filePath)) {
        continue;
      }
      const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
      let sourceList = [];
      if (Array.isArray(parsed)) {
        sourceList = parsed;
      } else if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.gameLists)) {
          sourceList = parsed.gameLists;
        } else if (Array.isArray(parsed.list)) {
          sourceList = parsed.list;
        } else if (parsed.data && Array.isArray(parsed.data.gameLists)) {
          sourceList = parsed.data.gameLists;
        }
      }
      const list = normalizeProviderGames(sourceList);
      if (list.length) {
        return list;
      }
    } catch {
      // ignore file fallback errors
    }
  }
  return [];
}

async function callUserApi(action, params = {}, timeoutMs = Math.max(1000, API_GAMES_TIMEOUT_MS)) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Math.max(1000, Number(timeoutMs || API_GAMES_TIMEOUT_MS)));
  try {
    const response = await fetch(API_GAMES_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_GAMES_KEY,
        "x-api-secret": API_GAMES_SECRET
      },
      body: JSON.stringify({
        action,
        params
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      let errMsg = `HTTP ${response.status}`;
      try {
        const errPayload = await response.json();
        if (errPayload && typeof errPayload === "object" && errPayload.msg) {
          errMsg = String(errPayload.msg || errMsg);
        }
      } catch {
        // ignore parse errors for non-json upstream failures
      }
      setLastApiGamesError({
        action,
        status: response.status,
        msg: errMsg
      });
      return null;
    }

    const payload = await response.json().catch(() => null);
    if (!payload || typeof payload !== "object") {
      setLastApiGamesError({
        action,
        status: response.status,
        msg: "Invalid JSON response from provider API"
      });
      return null;
    }
    if (Number(payload.code) !== 0) {
      setLastApiGamesError({
        action,
        status: response.status,
        code: Number(payload.code || 0),
        msg: String(payload.msg || "Provider API returned error")
      });
      return null;
    }
    clearLastApiGamesError();
    return payload;
  } catch (error) {
    const errorMessage =
      error && error.name === "AbortError"
        ? "Provider API request timed out"
        : String((error && error.message) || "Provider API request failed");
    setLastApiGamesError({
      action,
      msg: errorMessage
    });
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function readLaunchHealth(gameId = "") {
  const key = String(gameId || "").trim();
  if (!key) {
    return null;
  }
  const cached = liveLaunchHealthCache.get(key);
  if (!cached) {
    return null;
  }
  if (Date.now() - Number(cached.at || 0) > LIVE_HOME_LAUNCH_CACHE_TTL_MS) {
    liveLaunchHealthCache.delete(key);
    return null;
  }
  return cached;
}

function writeLaunchHealth(gameId = "", status = LIVE_LAUNCH_STATUS.unknown) {
  const key = String(gameId || "").trim();
  if (!key) {
    return;
  }
  const normalizedStatus =
    status === LIVE_LAUNCH_STATUS.ok || status === LIVE_LAUNCH_STATUS.bad
      ? status
      : LIVE_LAUNCH_STATUS.unknown;
  liveLaunchHealthCache.set(key, {
    status: normalizedStatus,
    at: Date.now()
  });
}

function getLaunchHealthStatus(gameId = "") {
  const cached = readLaunchHealth(gameId);
  return cached ? cached.status : LIVE_LAUNCH_STATUS.unknown;
}

function launchHealthRank(status = LIVE_LAUNCH_STATUS.unknown) {
  if (status === LIVE_LAUNCH_STATUS.ok) {
    return 0;
  }
  if (status === LIVE_LAUNCH_STATUS.unknown) {
    return 1;
  }
  return 2;
}

function isMac88Vendor(vendorCode = "") {
  return /mac88/i.test(String(vendorCode || "").trim());
}

function isLiveStyleCategory(category = "") {
  const normalized = String(category || "").trim().toLowerCase();
  if (!normalized) {
    return false;
  }
  return (
    normalized.includes("live") ||
    normalized.includes("table") ||
    normalized.includes("casino") ||
    normalized.includes("card")
  );
}

async function mapWithConcurrency(items, concurrency, worker) {
  if (!Array.isArray(items) || !items.length) {
    return [];
  }
  const normalizedConcurrency = Math.max(1, Number(concurrency || 1));
  const output = new Array(items.length);
  let nextIndex = 0;
  const workers = new Array(Math.min(normalizedConcurrency, items.length))
    .fill(null)
    .map(async () => {
      while (true) {
        const current = nextIndex;
        nextIndex += 1;
        if (current >= items.length) {
          break;
        }
        output[current] = await worker(items[current], current);
      }
    });
  await Promise.all(workers);
  return output;
}

async function probeLaunchHealthForGame(game = {}) {
  const gameId = String(game && game.gameID ? game.gameID : "").trim();
  if (!gameId) {
    return LIVE_LAUNCH_STATUS.unknown;
  }

  const cached = readLaunchHealth(gameId);
  if (cached) {
    return cached.status;
  }

  const launchPayload = {
    member_account: LIVE_HOME_PROBE_MEMBER,
    game_uid: gameId,
    credit_amount: Number(API_GAMES_DEFAULT_CREDIT || 100).toFixed(2),
    currency_code: API_GAMES_CURRENCY,
    language: API_GAMES_LANGUAGE
  };
  const launchResult = await callUserApi("getGameUrl", launchPayload, LIVE_HOME_PROBE_TIMEOUT_MS);
  if (!launchResult) {
    writeLaunchHealth(gameId, LIVE_LAUNCH_STATUS.bad);
    return LIVE_LAUNCH_STATUS.bad;
  }

  const launchUrl =
    pickFirstValue(launchResult, ["raw_game_url"], "") ||
    pickFirstValue(launchResult.data || {}, ["game_launch_url", "game_url"], "");
  if (!String(launchUrl || "").trim()) {
    writeLaunchHealth(gameId, LIVE_LAUNCH_STATUS.bad);
    return LIVE_LAUNCH_STATUS.bad;
  }
  writeLaunchHealth(gameId, LIVE_LAUNCH_STATUS.ok);
  return LIVE_LAUNCH_STATUS.ok;
}

async function warmLiveLaunchHealth(gameRows = []) {
  if (!Array.isArray(gameRows) || !gameRows.length || LIVE_HOME_PROBE_LIMIT <= 0) {
    return;
  }
  const liveCandidates = gameRows
    .filter((game) => categoryToType(game.category, game.gameNameEn) === "lc")
    .map((game, index) => ({ game, index }))
    .sort((left, right) => {
      const leftVendor = isMac88Vendor(left.game.vendorCode) ? 0 : 1;
      const rightVendor = isMac88Vendor(right.game.vendorCode) ? 0 : 1;
      if (leftVendor !== rightVendor) {
        return leftVendor - rightVendor;
      }
      const leftLive = isLiveStyleCategory(left.game.category) ? 0 : 1;
      const rightLive = isLiveStyleCategory(right.game.category) ? 0 : 1;
      if (leftLive !== rightLive) {
        return leftLive - rightLive;
      }
      return left.index - right.index;
    })
    .map((entry) => entry.game);

  const toProbe = [];
  for (const game of liveCandidates) {
    const gameId = String(game && game.gameID ? game.gameID : "").trim();
    if (!gameId) {
      continue;
    }
    if (getLaunchHealthStatus(gameId) !== LIVE_LAUNCH_STATUS.unknown) {
      continue;
    }
    toProbe.push(game);
    if (toProbe.length >= LIVE_HOME_PROBE_LIMIT) {
      break;
    }
  }
  if (!toProbe.length) {
    return;
  }

  await mapWithConcurrency(toProbe, LIVE_HOME_PROBE_CONCURRENCY, async (game) =>
    probeLaunchHealthForGame(game)
  );
}

function reorderLiveRowsForHome(rows = []) {
  const sorted = rows
    .map((row, index) => {
      const gameId = String(row && (row.provider_game_uid || row.game_uid) ? row.provider_game_uid || row.game_uid : "")
        .trim();
      const status = getLaunchHealthStatus(gameId);
      const vendorRank = isMac88Vendor(row.vendorCode) ? 0 : 1;
      const categoryRank = isLiveStyleCategory(row.category) ? 0 : 1;
      return {
        index,
        status,
        vendorRank,
        categoryRank,
        row
      };
    })
    .sort((left, right) => {
      const healthDiff = launchHealthRank(left.status) - launchHealthRank(right.status);
      if (healthDiff !== 0) {
        return healthDiff;
      }
      if (left.vendorRank !== right.vendorRank) {
        return left.vendorRank - right.vendorRank;
      }
      if (left.categoryRank !== right.categoryRank) {
        return left.categoryRank - right.categoryRank;
      }
      return left.index - right.index;
    })
    .map((entry) => entry.row);

  const pinIndex = sorted.findIndex((row) => {
    const gameName = String(row && row.gname ? row.gname : "").trim().toLowerCase();
    const gameId = String(row && (row.provider_game_uid || row.game_uid || row.gmid) ? row.provider_game_uid || row.game_uid || row.gmid : "")
      .trim()
      .toLowerCase();
    return gameName === "mac excite lobby" || gameId.includes("mac-excite-lobby");
  });

  if (pinIndex <= 0) {
    return sorted;
  }

  const pinned = sorted[pinIndex];
  return [pinned, ...sorted.slice(0, pinIndex), ...sorted.slice(pinIndex + 1)];
}

function applyReferenceLiveCardImages(rows = []) {
  if (!Array.isArray(rows) || !rows.length || !REFERENCE_LIVE_ICON_POOL.length) {
    return rows;
  }

  const imageCount = REFERENCE_LIVE_ICON_POOL.length;
  return rows.map((row, index) => {
    const fileName = REFERENCE_LIVE_ICON_POOL[index % imageCount];
    const legacyIconUrl = toLegacyCasinoIconUrl(fileName);
    const legacyIconPath = toLegacyCasinoIconPath(fileName);
    return {
      ...row,
      img: legacyIconUrl,
      imgUrl2: legacyIconUrl,
      imgpath: legacyIconPath
    };
  });
}

function resolveCatalogIcon(game = {}) {
  const gameId = String(game && game.gameID ? game.gameID : "").trim();
  if (gameId) {
    const cached = String(localIconByGameId.get(gameId) || "").trim();
    if (cached) {
      return cached;
    }
  }
  const resolved = pickLocalFallbackIcon(game) || DEFAULT_LOCAL_ICON;
  if (gameId && resolved) {
    localIconByGameId.set(gameId, resolved);
  }
  return resolved || DEFAULT_LOCAL_ICON;
}

function toLegacyCasinoIconPath(fileName = "") {
  const normalized = String(fileName || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");
  if (!normalized) {
    return `/${DEFAULT_LOCAL_ICON}`;
  }
  return `/${normalized}`;
}

function toLegacyCasinoIconUrl(fileName = "") {
  return `/sitethemedata.com/casino_icons${toLegacyCasinoIconPath(fileName)}`;
}

function buildCatalog(gameRows = []) {
  const groups = {
    lc: new Map(),
    vc: new Map(),
    slot: new Map(),
    xgame: new Map()
  };

  for (const game of gameRows) {
    const type = categoryToType(game.category, game.gameNameEn);
    const bucket = groups[type] || groups.lc;
    const catName = game.category || "Live";
    if (!bucket.has(catName)) {
      bucket.set(catName, []);
    }
    bucket.get(catName).push(game);
  }

  const typeBases = { lc: 300, vc: 400, slot: 500, xgame: 600 };
  const tabsByType = { lc: [], vc: [], slot: [], xgame: [] };
  const rowsByType = { lc: [], vc: [], slot: [], xgame: [] };
  const lookup = new Map();

  for (const type of Object.keys(groups)) {
    const entries = [...groups[type].entries()];
    entries.forEach(([categoryName, items], index) => {
      const tabid = typeBases[type] + index + 1;
      tabsByType[type].push({ gmid: tabid, cname: categoryName || "Games" });

      items.forEach((game, itemIndex) => {
        const rowGameId = `${tabid}${String(itemIndex + 1).padStart(4, "0")}`;
        const baseSlug = slugify(game.gameNameEn) || slugify(game.gameID) || `game-${rowGameId}`;
        const routeSeed = normalizeGameKey(game.gameID).slice(0, 8) || String(itemIndex + 1);
        const routeId = `${baseSlug}-${routeSeed}`;
        const providerImageUrl = toSafeImageUrl(game.img || game.imgUrl2 || game.imgRaw || "");
        const localIconFile = String(resolveCatalogIcon(game) || DEFAULT_LOCAL_ICON)
          .trim()
          .replace(/\\/g, "/")
          .replace(/^\/+/, "") || DEFAULT_LOCAL_ICON;
        const localIconUrl = `/casino/casino-icons/lc/${localIconFile}`;
        const effectiveImageUrl = providerImageUrl || localIconUrl || DEFAULT_IMAGE;
        // Keep imgpath as a plain icon filename because legacy UI prefixes it
        // with `.../casino-icons/{type}/` internally.
        const effectiveImagePath = localIconFile;

        const row = {
          tabid,
          gmid: routeId,
          oldgmid: routeId,
          mid: routeId,
          id: routeId,
          gname: game.gameNameEn,
          ename: routeId,
          ctype: type,
          type,
          img: effectiveImageUrl,
          imgUrl2: effectiveImageUrl,
          imgpath: effectiveImagePath,
          l: 100,
          status: "OPEN",
          game_uid: game.gameID,
          provider_game_uid: game.gameID,
          vendorCode: game.vendorCode,
          category: game.category
        };

        rowsByType[type].push(row);

        const keys = new Set([
          normalizeGameKey(game.gameID),
          normalizeGameKey(game.gameNameEn),
          normalizeGameKey(baseSlug),
          normalizeGameKey(routeId),
          normalizeGameKey(rowGameId),
          normalizeGameKey(row.mid),
          normalizeGameKey(row.gmid)
        ]);
        for (const key of keys) {
          if (key && !lookup.has(key)) {
            lookup.set(key, game.gameID);
          }
        }
      });
    });
  }

  rowsByType.lc = reorderLiveRowsForHome(rowsByType.lc);

  return {
    gameRows,
    tabsByType,
    rowsByType,
    lookup
  };
}

async function getGamesCatalog() {
  const now = Date.now();
  if (gamesCatalogCache.value) {
    if (now - gamesCatalogCache.at <= GAME_LIST_CACHE_TTL_MS) {
      return gamesCatalogCache.value;
    }
    // Serve stale memory cache immediately; refresh happens in background.
    void refreshGamesCatalogFromProvider().catch(() => {});
    return gamesCatalogCache.value;
  }

  if (isProviderConfigured()) {
    const liveCatalog = await refreshGamesCatalogFromProvider();
    if (liveCatalog) {
      return liveCatalog;
    }
  }

  const diskCache = loadGamesFromDiskCache();
  if (diskCache.list.length) {
    const catalog = setCatalogCacheFromList(diskCache.list, diskCache.updatedAt || now);
    if (catalog) {
      if (
        isProviderConfigured() &&
        (!diskCache.updatedAt || now - Number(diskCache.updatedAt || 0) > GAME_LIST_CACHE_TTL_MS)
      ) {
        void refreshGamesCatalogFromProvider().catch(() => {});
      }
      return catalog;
    }
  }

  const fileFallbackList = loadGamesFromFileFallback();
  if (!fileFallbackList.length) {
    return null;
  }
  return setCatalogCacheFromList(fileFallbackList, now);
}

function setCatalogCacheFromList(list = [], cachedAt = Date.now()) {
  const normalizedList = normalizeProviderGames(list);
  if (!normalizedList.length) {
    return null;
  }
  const catalog = buildCatalog(normalizedList);
  gamesCatalogCache = {
    at: Number(cachedAt || 0) > 0 ? Number(cachedAt || 0) : Date.now(),
    value: catalog
  };

  // Keep first-response latency low; warm tasks can run in background.
  void hydrateLocalIconCache(normalizedList).catch(() => {});
  void warmLiveLaunchHealth(normalizedList).catch(() => {});
  return catalog;
}

async function refreshGamesCatalogFromProvider() {
  if (!isProviderConfigured()) {
    return null;
  }
  if (gamesCatalogRefreshPromise) {
    return gamesCatalogRefreshPromise;
  }

  const refreshTask = (async () => {
    const payload = await callUserApi("getGameList", {}, GAME_LIST_TIMEOUT_MS);
    const list = normalizeProviderGames(payload && payload.gameLists ? payload.gameLists : []);
    if (!list.length) {
      return null;
    }
    saveGamesToDiskCache(list);
    return setCatalogCacheFromList(list, Date.now());
  })();

  gamesCatalogRefreshPromise = refreshTask;
  try {
    return await refreshTask;
  } finally {
    if (gamesCatalogRefreshPromise === refreshTask) {
      gamesCatalogRefreshPromise = null;
    }
  }
}

async function primeApiGamesCatalog() {
  const catalog = await getGamesCatalog();
  void refreshGamesCatalogFromProvider().catch(() => {});
  return catalog;
}

function resolveType(payload = {}) {
  return String(pickFirstValue(payload, ["type", "ctype"], "lc") || "lc").trim().toLowerCase();
}

function resolveTableRows(catalog, payload = {}) {
  const type = resolveType(payload);
  const rows = Array.isArray(catalog.rowsByType[type]) ? catalog.rowsByType[type] : [];
  const requestedGmid = Number(pickFirstValue(payload, ["gmid", "tabid"], "0"));
  if (requestedGmid > 0) {
    const byTab = rows.filter((row) => Number(row.tabid) === requestedGmid);
    if (byTab.length) {
      return byTab;
    }
  }
  return rows;
}

function resolveGameUid(catalog, rawId = "") {
  const rawToken = String(rawId || "").trim();
  const key = normalizeGameKey(rawToken);
  if (!key) {
    return "";
  }

  if (catalog.lookup.has(key)) {
    return catalog.lookup.get(key);
  }

  const directByGameId = catalog.gameRows.find((row) => normalizeGameKey(row.gameID) === key);
  if (directByGameId) {
    return directByGameId.gameID;
  }

  const routeSeedMatch = rawToken.toLowerCase().match(/(?:-|_)([a-f0-9]{6,16})$/i);
  if (routeSeedMatch && routeSeedMatch[1]) {
    const seed = String(routeSeedMatch[1] || "").toLowerCase();
    const bySeed = catalog.gameRows.find((row) => normalizeGameKey(row.gameID).startsWith(seed));
    if (bySeed) {
      return bySeed.gameID;
    }
  }

  for (const aliasRule of LEGACY_ALIAS_PATTERNS) {
    if (!aliasRule.aliases.some((alias) => normalizeGameKey(alias) === key)) {
      continue;
    }
    const matched = catalog.gameRows.find((row) => aliasRule.pattern.test(row.gameNameEn));
    if (matched) {
      return matched.gameID;
    }
  }

  const partial = catalog.gameRows.find((row) => normalizeGameKey(row.gameNameEn).includes(key));
  if (partial) {
    return partial.gameID;
  }

  return "";
}

function resolveMemberAccount(payload = {}) {
  const raw = pickFirstValue(
    payload,
    ["member_account", "username", "uname", "user_name", "userId", "userid", "uid", "login"],
    "demo123"
  );
  const safe = String(raw || "demo123")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 32);
  return safe || "demo123";
}

function resolveCreditAmount(payload = {}) {
  const value = toNumber(
    pickFirstValue(
      payload,
      ["credit_amount", "wallet_balance", "user_balance", "balance", "amount", "amt"],
      String(API_GAMES_DEFAULT_CREDIT)
    ),
    API_GAMES_DEFAULT_CREDIT
  );
  const normalized = Number.isFinite(value) && value > 0 ? value : API_GAMES_DEFAULT_CREDIT;
  return normalized.toFixed(2);
}

function buildLocalProviderLaunchPath(gameUid = "", memberAccount = "", creditAmount = "") {
  const gid = String(gameUid || "").trim();
  if (!gid) {
    return "";
  }
  const query = new URLSearchParams({ gid });
  const member = String(memberAccount || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 32);
  if (member) {
    query.set("member", member);
  }
  const credit = Number(creditAmount);
  if (Number.isFinite(credit) && credit > 0) {
    query.set("amount", credit.toFixed(2));
  }
  return `/provider-game?${query.toString()}`;
}

function buildCacheKey(endpointStem, payload = {}) {
  const normalized = {
    endpointStem,
    type: resolveType(payload),
    gmid: pickFirstValue(payload, ["gmid", "tabid"], ""),
    id: pickFirstValue(
      payload,
      ["gid", "mid", "gmid", "oldgmid", "game_uid", "gameID", "ename", "id", "game", "gType", "gtype"],
      ""
    ),
    member: resolveMemberAccount(payload)
  };
  return JSON.stringify(normalized);
}

function shouldUseProviderData2(payload = {}) {
  const rawType = String(pickFirstValue(payload, ["type", "ctype"], "") || "")
    .trim()
    .toLowerCase();
  if (rawType && !["lc", "vc", "slot", "xgame"].includes(rawType)) {
    return false;
  }

  const rawGameToken = String(
    pickFirstValue(payload, ["gid", "gtype", "gType", "id", "game", "mid", "game_uid"], "") || ""
  )
    .trim()
    .toLowerCase();
  if (!rawGameToken) {
    return true;
  }

  if (["lc", "vc", "slot", "xgame", "live", "virtual"].includes(rawGameToken)) {
    return true;
  }
  return false;
}

function isLegacyLaunchAlias(rawId = "") {
  const normalized = normalizeGameKey(rawId);
  if (!normalized) {
    return false;
  }
  if (normalized === "tv") {
    return true;
  }

  const commonLegacy = new Set([
    "superover2",
    "superover3",
    "teen20",
    "dt20",
    "baccarat",
    "roulette11",
    "worli3",
    "vteen20",
    "aviator",
    "mines"
  ]);
  if (commonLegacy.has(normalized)) {
    return true;
  }

  for (const rule of LEGACY_ALIAS_PATTERNS) {
    if (rule.aliases.some((alias) => normalizeGameKey(alias) === normalized)) {
      return true;
    }
  }
  return false;
}

async function buildProviderEnvelope(endpointStem, payload = {}) {
  if (endpointStem === "/api/front/casino/data2" || endpointStem === "/api/front/vcasino/data2") {
    if (!shouldUseProviderData2(payload)) {
      return null;
    }
  }

  if (endpointStem === "/api/front/casino/launch" || endpointStem === "/api/front/casino/launchother") {
    const requestedStrongId = pickFirstValue(
      payload,
      ["gid", "mid", "gmid", "oldgmid", "game_uid", "gameID", "ename"],
      ""
    );
    const requestedLegacyId = pickFirstValue(payload, ["id", "game", "gType", "gtype"], "");
    if (!requestedStrongId && isLegacyLaunchAlias(requestedLegacyId)) {
      return null;
    }
  }

  const catalog = await getGamesCatalog();
  if (!catalog) {
    return null;
  }

  if (endpointStem === "/api/front/casino/alllist" || endpointStem === "/api/front/get_casino_list") {
    return asEncryptedEnvelope([
      { type: "lc", ctype: "lc", cname: "Live Casino", isown: true },
      { type: "vc", ctype: "vc", cname: "Virtual Casino", isown: true },
      { type: "slot", ctype: "slot", cname: "Slot Games", isown: false },
      { type: "xgame", ctype: "xgame", cname: "Crash Games", isown: false }
    ]);
  }

  if (endpointStem === "/api/front/casino/catlist" || endpointStem === "/api/front/cat_list_open") {
    const categories = [...new Set(catalog.gameRows.map((row) => row.category).filter(Boolean))]
      .map((name) => ({ id: slugify(name) || "cat", name }));
    return asEncryptedEnvelope([{ id: "all", name: "All" }, ...categories]);
  }

  if (endpointStem === "/api/front/casino/providerlist" || endpointStem === "/api/front/provider_list_open") {
    const providers = [...new Set(catalog.gameRows.map((row) => row.vendorCode).filter(Boolean))]
      .map((code) => ({ id: slugify(code) || "provider", name: code }));
    return asEncryptedEnvelope(providers);
  }

  if (endpointStem === "/api/front/casino/slotlist" || endpointStem === "/api/front/slot_list_open") {
    return asEncryptedEnvelope(catalog.rowsByType.slot || []);
  }

  if (endpointStem === "/api/front/casino/other" || endpointStem === "/api/front/other_open") {
    return asEncryptedEnvelope(catalog.rowsByType.xgame || []);
  }

  if (endpointStem === "/api/front/casino/tablist" || endpointStem === "/api/front/get_casino_tab_list") {
    const type = resolveType(payload);
    const tabs = Array.isArray(catalog.tabsByType[type]) ? catalog.tabsByType[type] : [];
    const fallbackTabs = tabs.length ? tabs : [{ gmid: 301, cname: "All Games" }];
    return asEncryptedEnvelope({ t1: fallbackTabs });
  }

  if (endpointStem === "/api/front/casino/tablelist" || endpointStem === "/api/front/get_casino_table_list") {
    const rows = resolveTableRows(catalog, payload);
    return asEncryptedEnvelope({ t1: rows });
  }

  if (endpointStem === "/api/front/casino/data2" || endpointStem === "/api/front/vcasino/data2") {
    return asEncryptedEnvelope([
      { t: "live", cname: "Live Casino", data: catalog.rowsByType.lc || [] },
      { t: "virtual", cname: "Virtual Casino", data: catalog.rowsByType.vc || [] },
      { t: "slot", cname: "Slots", data: catalog.rowsByType.slot || [] },
      { t: "xgame", cname: "Crash", data: catalog.rowsByType.xgame || [] }
    ]);
  }

  if (endpointStem === "/api/front/casino/launch" || endpointStem === "/api/front/casino/launchother") {
    const requestedLookupId = pickFirstValue(
      payload,
      ["gid", "mid", "gmid", "oldgmid", "game_uid", "gameID", "ename", "id", "game", "gType", "gtype"],
      ""
    );
    let gameUid = resolveGameUid(catalog, requestedLookupId);
    if (!gameUid && !String(requestedLookupId || "").trim() && catalog.gameRows.length) {
      gameUid = catalog.gameRows[0].gameID;
    }
    if (!gameUid) {
      return null;
    }

    const launchPayload = {
      member_account: resolveMemberAccount(payload),
      game_uid: gameUid,
      credit_amount: resolveCreditAmount(payload),
      currency_code: API_GAMES_CURRENCY,
      language: API_GAMES_LANGUAGE
    };

    const launchResult = await callUserApi("getGameUrl", launchPayload);
    if (!launchResult) {
      return null;
    }

    const launchUrl =
      pickFirstValue(launchResult, ["raw_game_url"], "") ||
      pickFirstValue(launchResult.data || {}, ["game_launch_url", "game_url"], "");

    if (!launchUrl) {
      return null;
    }

    const localLaunchUrl = buildLocalProviderLaunchPath(
      gameUid,
      launchPayload.member_account,
      launchPayload.credit_amount
    );

    return asEncryptedEnvelope({
      url: localLaunchUrl || launchUrl,
      game_uid: gameUid,
      member_account: launchPayload.member_account,
      raw_game_url: localLaunchUrl || pickFirstValue(launchResult, ["raw_game_url"], ""),
      upstream_game_url: launchUrl
    });
  }

  return null;
}

async function fetchApiGamesEnvelope(endpointStem, payload = {}) {
  const normalizedStem = String(endpointStem || "").trim();
  if (!isProviderConfigured() || !HANDLED_ENDPOINTS.has(normalizedStem)) {
    return null;
  }

  const cacheKey = buildCacheKey(normalizedStem, payload);
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.at <= RESPONSE_CACHE_TTL_MS) {
    return cached.value;
  }

  const envelope = await buildProviderEnvelope(normalizedStem, payload);
  if (!envelope) {
    return null;
  }

  responseCache.set(cacheKey, {
    at: Date.now(),
    value: envelope
  });

  return envelope;
}

function resolveImageValue(rawValue = "") {
  return toSafeImageUrl(rawValue);
}

module.exports = {
  fetchApiGamesEnvelope,
  primeApiGamesCatalog,
  getGamesCatalog,
  getLastApiGamesError,
  resolveImageValue
};
