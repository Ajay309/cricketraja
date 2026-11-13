const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const {
  PORT,
  HOST,
  SITE_DIR,
  MIRROR_HOST_DIRS,
  SECURITY_HEADERS,
  API_GAMES_SECRET,
  API_GAMES_CALLBACK_PATH,
  API_GAMES_CALLBACK_REQUIRE_SIGNATURE
} = require("./config");
const { sendText, sendFile, sendJson } = require("./http-utils");
const { resolveStaticPath, resolveForcedFile } = require("./static-store");
const { SnapshotStore } = require("./snapshot-store");
const { LocalDatabase } = require("./database");
const { handleApiFrontRequest } = require("./api-front-router");
const { handleImageProxy } = require("./image-proxy");
const { fetchUpstreamAsset } = require("./upstream-asset-proxy");
const {
  fetchApiGamesEnvelope,
  primeApiGamesCatalog,
  getLastApiGamesError,
  getGamesCatalog
} = require("./api-games-live");
const { decryptPayload } = require("./crypto");
const {
  handleAdminRequest,
  isAdminAuthenticated,
  isAdminPublicPath
} = require("./admin-router");
const { resolveExternalIframeLaunch } = require("./external-iframe-games");

const APP_ROOT_DIR = path.resolve(__dirname, "..");
const ROOT_DIR = APP_ROOT_DIR;
const HOME_LEGACY_ICON_DIR = path.join(APP_ROOT_DIR, "casino", "casino-icons", "lc");
const HOME_REFERENCE_IMAGE_PATTERN = /^ref-(\d+)\.(png|jpe?g|gif|webp|svg)$/i;
const HOME_REFERENCE_IMAGE_ORDER = (() => {
  try {
    return fs
      .readdirSync(HOME_LEGACY_ICON_DIR, { withFileTypes: true })
      .filter((entry) => entry.isFile() && HOME_REFERENCE_IMAGE_PATTERN.test(entry.name))
      .map((entry) => {
        const match = entry.name.match(HOME_REFERENCE_IMAGE_PATTERN);
        return {
          name: entry.name,
          order: Number(match && match[1] ? match[1] : 0)
        };
      })
      .sort((left, right) => {
        if (left.order !== right.order) {
          return left.order - right.order;
        }
        return left.name.localeCompare(right.name);
      })
      .map((entry) => `/casino/casino-icons/lc/${entry.name}`);
  } catch {
    return [];
  }
})();
const HOME_LEGACY_IMAGE_ORDER_FILENAMES = [
  "worli3.gif",
  "teen1.jpg",
  "dolidana.gif",
  "mogambo.gif",
  "teen20v1.jpg",
  "lucky15.jpg",
  "roulette11.jpg",
  "ourroullete.jpg",
  "poison.jpg",
  "teenunique.jpg",
  "poison20.jpg",
  "joker20.jpg",
  "joker120.jpg",
  "joker1.jpg",
  "teen20c.jpg",
  "btable2.jpg",
  "roulette12.jpg",
  "superover.jpg",
  "goal.jpg",
  "ab20.jpg",
  "superover2.jpg",
  "queen.jpg",
  "teen20b.jpg",
  "sicbo2.jpg",
  "teen120.jpg",
  "sicbo.jpg",
  "ballbyball.jpg",
  "teen20.jpg",
  "teensin.jpg",
  "teen3.jpg",
  "poker.jpg",
  "poker20.jpg",
  "poker6.jpg",
  "baccarat.jpg",
  "baccarat2.jpg",
  "dt20.jpg",
  "dt6.jpg",
  "dt202.jpg",
  "card32.jpg",
  "card32eu.jpg",
  "ab4.jpg",
  "ab3.jpg",
  "plucky7.jpg",
  "3cardj.jpg",
  "roulette13.jpg",
  "superover3.jpg",
  "teen42.jpg",
  "teen41.jpg"
];
const HOME_LEGACY_IMAGE_ORDER = HOME_REFERENCE_IMAGE_ORDER.length
  ? HOME_REFERENCE_IMAGE_ORDER
  : HOME_LEGACY_IMAGE_ORDER_FILENAMES
      .filter((fileName) => {
        try {
          const fullPath = path.join(HOME_LEGACY_ICON_DIR, fileName);
          return fs.existsSync(fullPath) && fs.statSync(fullPath).size > 0;
        } catch {
          return false;
        }
      })
      .map((fileName) => `/casino/casino-icons/lc/${fileName}`);
const HOME_PRIMARY_GAME_TARGET = Math.min(
  200,
  Math.max(100, Number(process.env.HOME_PRIMARY_GAME_TARGET || 100))
);
const HOME_SHOW_ALL_GAMES = String(process.env.HOME_SHOW_ALL_GAMES || "1").trim() !== "0";
const HOME_RANDOMIZE_PRIMARY_GAMES = process.env.HOME_RANDOMIZE_PRIMARY_GAMES !== "0";
const HOME_HEALTH_PROBE_MEMBER = String(process.env.HOME_HEALTH_PROBE_MEMBER || "admin")
  .trim()
  .replace(/[^a-zA-Z0-9_-]/g, "")
  .slice(0, 32) || "admin";
const HOME_API_GAMES_CACHE_TTL_MS = Math.max(
  5000,
  Number(process.env.HOME_API_GAMES_CACHE_TTL_MS || 60 * 1000)
);
const homeApiGamesPayloadCache = {
  at: 0,
  value: null,
  pending: null
};

function sanitizeMemberAccount(value = "") {
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 32);
}

function normalizeProviderCreditAmount(value = "") {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return "";
  }
  return numeric.toFixed(2);
}

let cachedPublicIp = "";
let cachedPublicIpAt = 0;
const PUBLIC_IP_TTL_MS = 5 * 60 * 1000;
const NORMALIZED_CALLBACK_PATH =
  String(API_GAMES_CALLBACK_PATH || "/api/provider/callback").replace(/\/+$/, "") ||
  "/api/provider/callback";
const API_GAMES_CALLBACK_ALIASES = new Set([
  NORMALIZED_CALLBACK_PATH.toLowerCase(),
  "/api/provider/callback",
  "/callback.php"
]);
const FORCE_EXTERNAL_IFRAME_ROUTES = process.env.FORCE_EXTERNAL_IFRAME_ROUTES === "1";
const ENABLE_PROVIDER_LOBBY_PAGES = process.env.ENABLE_PROVIDER_LOBBY_PAGES === "1";
const LEGACY_CASINO_ROUTE_IDS = new Set([
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
  "mogambo",
  "worli3",
  "matka",
  "matkamarket",
  "matkamarket",
  "teen20",
  "teenpatti",
  "vipteenpatti",
  "vteens",
  "dt20",
  "dragon",
  "tiger",
  "roulette11",
  "goldenroulette",
  "roulette",
  "roulette12",
  "roulette13",
  "ourroullete",
  "baccarat",
  "baccarat2",
  "lucky7",
  "lucky",
  "lucky5",
  "lucky15",
  "andarbahar",
  "andar",
  "ab4",
  "sicbo",
  "sicbo2",
  "poker",
  "pokerday",
  "poker20",
  "aviator",
  "crash",
  "mines",
  "vteen20",
  "trb-turbomines",
  "trb-aero",
  "tv"
]);
const INVALID_PROVIDER_GID_TOKENS = new Set([
  "casino",
  "casinos",
  "casinoicon",
  "casinoicons",
  "icon",
  "icons",
  "image",
  "images",
  "img",
  "lc",
  "vc",
  "slot",
  "xgame",
  "default",
  "defaultjpg",
  "defaultjpeg",
  "defaultpng"
]);

function normalizeLegacyToken(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function isInvalidProviderGid(value = "") {
  const normalized = normalizeLegacyToken(value);
  if (!normalized || normalized.length < 3) {
    return true;
  }
  if (INVALID_PROVIDER_GID_TOKENS.has(normalized)) {
    return true;
  }
  if (normalized.startsWith("casinoicons") || normalized.startsWith("casinoicon")) {
    return true;
  }
  return false;
}

function isProviderCasinoRouteRequest(pathname = "", urlObj) {
  const normalizedPath = String(pathname || "").trim().toLowerCase();
  if (normalizedPath !== "/casino/superover2") {
    return false;
  }
  if (!urlObj || !urlObj.searchParams) {
    return false;
  }
  const gid = String(urlObj.searchParams.get("gid") || "").trim();
  if (!gid) {
    return false;
  }
  const localFallback = String(urlObj.searchParams.get("local_fallback") || "").trim();
  if (localFallback === "1") {
    return false;
  }
  const normalizedGid = normalizeLegacyToken(gid);
  if (!normalizedGid || isInvalidProviderGid(normalizedGid)) {
    return false;
  }
  return !LEGACY_CASINO_ROUTE_IDS.has(normalizedGid);
}

function buildProviderFallbackPath(gid = "") {
  const safeGid = String(gid || "").trim();
  if (!safeGid) {
    return "/casino/superover2?local_fallback=1";
  }
  return `/casino/superover2?gid=${encodeURIComponent(safeGid)}&local_fallback=1`;
}

function resolveDirectProviderCasinoGid(pathname = "", urlObj) {
  const match = String(pathname || "").match(/^\/casino\/([a-z0-9_-]+)$/i);
  if (!match || !match[1]) {
    return "";
  }

  const routeId = String(match[1] || "").trim();
  if (!routeId) {
    return "";
  }

  const normalizedRoute = normalizeLegacyToken(routeId);
  if (
    !normalizedRoute ||
    LEGACY_CASINO_ROUTE_IDS.has(normalizedRoute) ||
    isInvalidProviderGid(normalizedRoute)
  ) {
    return "";
  }

  const explicitGid = String(urlObj && urlObj.searchParams ? urlObj.searchParams.get("gid") || "" : "")
    .trim();
  if (explicitGid) {
    return explicitGid;
  }
  return routeId;
}

function isProviderLaunchPageRequest(pathname = "") {
  const normalizedPath = String(pathname || "").trim().toLowerCase();
  return normalizedPath === "/provider-game";
}

async function resolveProviderLaunchUrlByGid(gid = "", memberAccount = "", creditAmount = "") {
  const requestedGid = String(gid || "").trim();
  if (!requestedGid) {
    return "";
  }

  const payload = {
    id: "tv",
    gid: requestedGid
  };
  const safeMemberAccount = sanitizeMemberAccount(memberAccount);
  if (safeMemberAccount) {
    payload.member_account = safeMemberAccount;
    payload.username = safeMemberAccount;
  }
  const safeCreditAmount = normalizeProviderCreditAmount(creditAmount);
  if (safeCreditAmount) {
    payload.credit_amount = safeCreditAmount;
    payload.wallet_balance = safeCreditAmount;
    payload.user_balance = safeCreditAmount;
  }

  const envelope = await fetchApiGamesEnvelope("/api/front/casino/launchother", payload);
  if (!envelope || typeof envelope.data !== "string") {
    return "";
  }

  try {
    const decoded = decryptPayload(envelope.data);
    const upstreamUrl = String(decoded?.data?.upstream_game_url || "").trim();
    if (upstreamUrl && /^https?:\/\//i.test(upstreamUrl)) {
      return upstreamUrl;
    }

    const rawUrl = String(decoded?.data?.raw_game_url || "").trim();
    if (rawUrl && /^https?:\/\//i.test(rawUrl)) {
      return rawUrl;
    }

    const launchUrl = String(decoded?.data?.url || "").trim();
    if (launchUrl && /^https?:\/\//i.test(launchUrl)) {
      return launchUrl;
    }
    return "";
  } catch {
    return "";
  }
}

function sanitizeAuthToken(rawValue = "") {
  const raw = String(rawValue == null ? "" : rawValue).trim();
  if (!raw) {
    return "";
  }
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "string") {
      return String(parsed || "").trim();
    }
  } catch {
    // ignore parse failures and return raw fallback
  }
  return raw.replace(/^"+|"+$/g, "").trim();
}

function parseCookieHeader(cookieHeader = "") {
  const output = {};
  const raw = String(cookieHeader || "").trim();
  if (!raw) {
    return output;
  }
  for (const chunk of raw.split(";")) {
    const segment = String(chunk || "").trim();
    if (!segment) {
      continue;
    }
    const separatorIndex = segment.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }
    const key = segment.slice(0, separatorIndex).trim().toLowerCase();
    const value = segment.slice(separatorIndex + 1).trim();
    if (key && value) {
      output[key] = value;
    }
  }
  return output;
}

function resolveRequestAuthToken(req, urlObj) {
  const authHeader = sanitizeAuthToken(req && req.headers ? req.headers.authorization || "" : "");
  if (/^bearer\s+/i.test(authHeader)) {
    return sanitizeAuthToken(authHeader.replace(/^bearer\s+/i, "").trim());
  }
  const directAuth = sanitizeAuthToken(authHeader);
  if (directAuth) {
    return directAuth;
  }

  const headerCandidates = [
    req && req.headers ? req.headers["x-access-token"] : "",
    req && req.headers ? req.headers["x-auth-token"] : "",
    req && req.headers ? req.headers["x-token"] : "",
    req && req.headers ? req.headers.token : ""
  ];
  for (const candidate of headerCandidates) {
    const token = sanitizeAuthToken(candidate);
    if (token) {
      return token;
    }
  }

  if (urlObj && urlObj.searchParams) {
    const queryCandidates = [
      urlObj.searchParams.get("token"),
      urlObj.searchParams.get("auth"),
      urlObj.searchParams.get("access_token"),
      urlObj.searchParams.get("authorization")
    ];
    for (const candidate of queryCandidates) {
      const token = sanitizeAuthToken(candidate);
      if (token) {
        return token;
      }
    }
  }

  const cookies = parseCookieHeader(req && req.headers ? req.headers.cookie || "" : "");
  const cookieCandidates = [cookies.token, cookies.auth, cookies.access_token, cookies.authorization];
  for (const candidate of cookieCandidates) {
    const token = sanitizeAuthToken(candidate);
    if (token) {
      return token;
    }
  }

  return "";
}

function resolveRequestMemberAccount(req, urlObj, db) {
  const token = resolveRequestAuthToken(req, urlObj);
  if (token && db && typeof db.getUserFromToken === "function") {
    try {
      const sessionUser = db.getUserFromToken(token);
      const sessionMember = sanitizeMemberAccount(sessionUser && sessionUser.username ? sessionUser.username : "");
      if (sessionMember) {
        return sessionMember;
      }
    } catch {
      // ignore token lookup failures and continue with explicit hints
    }
  }

  const queryCandidates = [
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("member") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("member_account") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("username") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("uname") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("user_name") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("login") : ""
  ];
  for (const candidate of queryCandidates) {
    const member = sanitizeMemberAccount(candidate);
    if (member) {
      return member;
    }
  }

  const headerCandidates = [
    req && req.headers ? req.headers["x-user-name"] : "",
    req && req.headers ? req.headers["x-username"] : "",
    req && req.headers ? req.headers["x-uname"] : ""
  ];
  for (const candidate of headerCandidates) {
    const member = sanitizeMemberAccount(candidate);
    if (member) {
      return member;
    }
  }

  return "";
}

function resolveMemberCreditAmount(db, memberAccount = "", urlObj = null) {
  const safeMember = sanitizeMemberAccount(memberAccount);
  if (safeMember && db && typeof db.findUserByLoginHint === "function") {
    try {
      const user = db.findUserByLoginHint(safeMember);
      if (user) {
        const userAmount = normalizeProviderCreditAmount(user.balance);
        if (userAmount) {
          return userAmount;
        }
      }
    } catch {
      // ignore DB lookup errors and continue with query fallbacks
    }
  }

  const queryCandidates = [
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("amount") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("credit_amount") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("balance") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("wallet_balance") : "",
    urlObj && urlObj.searchParams ? urlObj.searchParams.get("user_balance") : ""
  ];
  for (const candidate of queryCandidates) {
    const normalized = normalizeProviderCreditAmount(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "";
}

function isDemoMemberAccount(db, memberAccount = "") {
  const safeMember = sanitizeMemberAccount(memberAccount);
  if (!safeMember || !db || typeof db.findUserByLoginHint !== "function") {
    return false;
  }
  try {
    const user = db.findUserByLoginHint(safeMember);
    return Boolean(user && user.isDemoUser);
  } catch {
    return false;
  }
}

function resolveProviderRowType(row = {}, fallbackType = "lc") {
  return String(row && (row.type || row.ctype || fallbackType || "lc") ? row.type || row.ctype || fallbackType || "lc" : "lc")
    .trim()
    .toLowerCase() || "lc";
}

function resolveProviderVendorToken(row = {}) {
  if (!row || typeof row !== "object") {
    return "mac88";
  }
  const code = String(
    row.vendorCode ||
      row.vendor ||
      row.provider ||
      row.providerName ||
      row.provider_name ||
      row.vendorName ||
      row.company ||
      ""
  ).trim();
  return code || "mac88";
}

function isMac88VendorCode(vendorCode = "") {
  const code = String(vendorCode || "").trim().toLowerCase();
  return !code || code === "mac88" || code === "m88" || code === "5" || code === "local";
}



function isMac88ProviderRow(row = {}) {
  return isMac88VendorCode(resolveProviderVendorToken(row));
}

function isLiveCasinoLikeRow(row = {}) {
  const type = resolveProviderRowType(row, "lc");
  if (type === "lc") {
    return true;
  }
  const sample = `${String(row && row.category ? row.category : "")} ${String(row && row.gname ? row.gname : "")}`
    .trim()
    .toLowerCase();
  if (!sample) {
    return false;
  }
  return (
    sample.includes("live") ||
    sample.includes("casino") ||
    sample.includes("table") ||
    sample.includes("roulette") ||
    sample.includes("baccarat") ||
    sample.includes("teenpatti") ||
    sample.includes("teen patti")
  );
}

function isFishingLikeRow(row = {}) {
  const sample = `${String(row && row.category ? row.category : "")} ${String(
    row && row.gname ? row.gname : ""
  )}`
    .trim()
    .toLowerCase();
  if (!sample) {
    return false;
  }
  return sample.includes("fishing") || sample.includes("fish");
}

function normalizeProviderLobbyType(type = "") {
  const normalized = String(type || "")
    .trim()
    .toLowerCase();
  if (!normalized) {
    return "live";
  }
  const aliases = new Map([
    ["lc", "live"],
    ["live", "live"],
    ["casino", "live"],
    ["vc", "virtual"],
    ["virtual", "virtual"],
    ["slot", "slot"],
    ["slots", "slot"],
    ["xgame", "fantasy"],
    ["fantasy", "fantasy"],
    ["crash", "fantasy"],
    ["fishing", "fishing"],
    ["fish", "fishing"],
    ["all", "all"]
  ]);
  return aliases.get(normalized) || normalized;
}

function normalizeProviderCategorySlug(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function resolveProviderCategoryBucket(row = {}) {
  const category = String(row && row.category ? row.category : "").trim().toLowerCase();
  const gameName = String(row && row.gname ? row.gname : "").trim().toLowerCase();
  const sample = `${category} ${gameName}`.trim();
  if (sample) {
    if (sample.includes("fishing") || sample.includes("fish")) {
      return "fishing";
    }
    if (sample.includes("slot") || sample.includes("spin")) {
      return "slot";
    }
    if (
      sample.includes("fantasy") ||
      sample.includes("crash") ||
      sample.includes("aviator") ||
      sample.includes("mine")
    ) {
      return "fantasy";
    }
    if (sample.includes("virtual")) {
      return "virtual";
    }
    if (
      sample.includes("casino") ||
      sample.includes("live") ||
      sample.includes("table") ||
      sample.includes("roulette") ||
      sample.includes("baccarat") ||
      sample.includes("teenpatti") ||
      sample.includes("teen patti")
    ) {
      return "live";
    }
  }

  const fallbackType = resolveProviderRowType(row, "lc");
  if (fallbackType === "slot") {
    return "slot";
  }
  if (fallbackType === "vc") {
    return "virtual";
  }
  if (fallbackType === "xgame") {
    return "fantasy";
  }
  if (isFishingLikeRow(row)) {
    return "fishing";
  }
  if (fallbackType === "lc") {
    return "live";
  }
  return "other";
}

function rowMatchesProviderSection(row = {}, sectionType = "all") {
  const normalizedType = normalizeProviderLobbyType(sectionType);
  if (normalizedType === "all") {
    return true;
  }
  const bucket = resolveProviderCategoryBucket(row);
  if (normalizedType === "live") {
    return bucket === "live" || bucket === "other";
  }
  if (bucket === normalizedType) {
    return true;
  }
  const requestedCategory = normalizeProviderCategorySlug(sectionType);
  const rowCategory = normalizeProviderCategorySlug(row && row.category ? row.category : "");
  return Boolean(requestedCategory && rowCategory && requestedCategory === rowCategory);
}

function isHomeCasinoCandidateRow(row = {}) {
  const type = resolveProviderRowType(row, "lc");
  if (type === "lc" || type === "vc") {
    return true;
  }
  if (isMac88VendorCode(row && row.vendorCode ? row.vendorCode : "")) {
    return true;
  }
  return isLiveCasinoLikeRow(row);
}

function dedupeProviderRowsByGid(rows = []) {
  if (!Array.isArray(rows) || !rows.length) {
    return [];
  }
  const byKey = new Map();
  for (const row of rows) {
    const gid = getProviderRowGid(row);
    const normalizedGid = String(gid || "").trim().toLowerCase();
    const fallbackKey = String(row && row.gname ? row.gname : "").trim().toLowerCase();
    const key = normalizedGid || fallbackKey;
    if (!key || byKey.has(key)) {
      continue;
    }
    byKey.set(key, row);
  }
  return [...byKey.values()];
}

function filterKnownBadProviderRows(rows = []) {
  const list = Array.isArray(rows) ? rows : [];
  const filtered = list.filter(
    (row) => String(row && row.__health ? row.__health : "").trim().toLowerCase() !== PROVIDER_GAME_HEALTH_STATUS.bad
  );
  return filtered.length ? filtered : list;
}

function prioritizeRowsForHome(rows = []) {
  const list = Array.isArray(rows) ? rows : [];
  return list
    .map((row, index) => {
      const status = String(row && row.__health ? row.__health : PROVIDER_GAME_HEALTH_STATUS.unknown)
        .trim()
        .toLowerCase();
      const type = resolveProviderRowType(row, "lc");
      const typeRank = type === "lc" ? 0 : type === "vc" ? 1 : type === "xgame" ? 2 : 3;
      const vendorRank = isMac88VendorCode(row && row.vendorCode ? row.vendorCode : "") ? 0 : 1;
      const liveRank = isLiveCasinoLikeRow(row) ? 0 : 1;
      return {
        index,
        row,
        status,
        typeRank,
        vendorRank,
        liveRank
      };
    })
    .sort((left, right) => {
      if (left.vendorRank !== right.vendorRank) {
        return left.vendorRank - right.vendorRank;
      }
      const healthDiff = providerHealthRank(left.status) - providerHealthRank(right.status);
      if (healthDiff !== 0) {
        return healthDiff;
      }
      if (left.typeRank !== right.typeRank) {
        return left.typeRank - right.typeRank;
      }
      if (left.liveRank !== right.liveRank) {
        return left.liveRank - right.liveRank;
      }
      return left.index - right.index;
    })
    .map((entry) => entry.row);
}

function shuffleProviderRows(rows = []) {
  const list = Array.isArray(rows) ? rows.slice() : [];
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    if (swapIndex === index) {
      continue;
    }
    const temp = list[index];
    list[index] = list[swapIndex];
    list[swapIndex] = temp;
  }
  return list;
}

function selectHomeFeaturedRows(rows = [], targetCount = HOME_PRIMARY_GAME_TARGET) {
  const list = Array.isArray(rows) ? rows.slice() : [];
  const limit = Math.max(1, Number(targetCount || 0));
  if (!list.length || list.length <= limit) {
    return list;
  }
  if (!HOME_RANDOMIZE_PRIMARY_GAMES) {
    return list.slice(0, limit);
  }
  return shuffleProviderRows(list).slice(0, limit);
}

function resolveCachedWorkingGid(excludedGid = "") {
  const blocked = String(excludedGid || "").trim().toLowerCase();
  for (const [gidKey, entry] of providerGameHealthCache.entries()) {
    if (!gidKey || gidKey === blocked || !entry) {
      continue;
    }
    if (String(entry.status || "").trim().toLowerCase() === PROVIDER_GAME_HEALTH_STATUS.ok) {
      return gidKey;
    }
  }
  return "";
}

async function resolveWorkingProviderLaunch(gid = "", memberAccount = "", creditAmount = "") {
  const requestedGid = String(gid || "").trim();
  if (!requestedGid) {
    return { gid: "", url: "", status: PROVIDER_GAME_HEALTH_STATUS.bad };
  }

  const launchUrl = await resolveProviderLaunchUrlByGid(requestedGid, memberAccount, creditAmount);
  if (!launchUrl) {
    writeProviderGameHealth(requestedGid, PROVIDER_GAME_HEALTH_STATUS.bad, "missing_launch_url");
    return { gid: "", url: "", status: PROVIDER_GAME_HEALTH_STATUS.bad };
  }

  const inspected = await probeProviderGameHealthByGid(requestedGid, memberAccount, launchUrl);
  return {
    gid: requestedGid,
    url: String(inspected.launchUrl || launchUrl).trim(),
    status: inspected.status
  };
}

const PROVIDER_LOBBY_ROUTE_MAP = new Map([
  ["/home", { title: "Live Casino", type: "live" }],
  ["/casino-list", { title: "Our Casino", type: "all", public: true }],
  ["/open-casino-list", { title: "Our Casino", type: "all", public: true }],
  ["/casino-list/lc/lc", { title: "Live Casino", type: "live", public: true }],
  ["/open-casino-list/lc/lc", { title: "Live Casino", type: "live", public: true }],
  ["/live-casino-list", { title: "Live Casino", type: "live", public: true }],
  ["/open-live-casino-list", { title: "Live Casino", type: "live", public: true }],
  ["/live-casino-list/slot/slot", { title: "Live Casino", type: "live", public: true }],
  ["/open-live-casino-list/slot/slot", { title: "Slot Game", type: "slot", public: true }],
  ["/casino-list/vc/vc", { title: "Virtual Casino", type: "virtual", public: true }],
  ["/open-casino-list/vc/vc", { title: "Virtual Casino", type: "virtual", public: true }],
  ["/slot-list", { title: "Slot Game", type: "slot", public: true }],
  ["/open-slot-list", { title: "Slot Game", type: "slot", public: true }],
  ["/open-fantasy-list", { title: "Fantasy Game", type: "fantasy", public: true }],
  ["/casino", { title: "Live Casino", type: "live", public: true }],
  ["/slots", { title: "Slot Game", type: "slot", public: true }],
  ["/fantasy", { title: "Fantasy Game", type: "fantasy", public: true }],
  ["/crash", { title: "Fantasy Game", type: "fantasy", public: true }],
  ["/virtual", { title: "Virtual Casino", type: "virtual", public: true }],
  ["/fishing", { title: "Fishing Games", type: "fishing", public: true }]
]);
const PROVIDER_LOBBY_CATEGORY_TYPES = new Set(["all", "live", "virtual", "slot", "fantasy", "fishing"]);
const PROVIDER_LOBBY_PAGE_SIZE_DEFAULT = Math.min(
  120,
  Math.max(24, Number(process.env.PROVIDER_LOBBY_PAGE_SIZE_DEFAULT || 72))
);
const PROVIDER_LOBBY_PAGE_SIZE_MAX = Math.max(
  PROVIDER_LOBBY_PAGE_SIZE_DEFAULT,
  Number(process.env.PROVIDER_LOBBY_PAGE_SIZE_MAX || 120)
);

const PROVIDER_LOBBY_CACHE_TTL_MS = 15000;
const providerLobbyRowsCache = new Map();
const PROVIDER_GAME_HEALTH_CACHE_TTL_MS = Math.max(
  60 * 1000,
  Number(process.env.PROVIDER_GAME_HEALTH_CACHE_TTL_MS || 20 * 60 * 1000)
);
const PROVIDER_GAME_HEALTH_TIMEOUT_MS = Math.max(
  2000,
  Number(process.env.PROVIDER_GAME_HEALTH_TIMEOUT_MS || 2500)
);
const PROVIDER_GAME_HEALTH_SYNC_PROBE_LIMIT = Math.max(
  0,
  Number(process.env.PROVIDER_GAME_HEALTH_SYNC_PROBE_LIMIT || 0)
);
const PROVIDER_GAME_HEALTH_ASYNC_PROBE_LIMIT = Math.max(
  PROVIDER_GAME_HEALTH_SYNC_PROBE_LIMIT,
  Number(process.env.PROVIDER_GAME_HEALTH_ASYNC_PROBE_LIMIT || 120)
);
const PROVIDER_GAME_HEALTH_PROBE_CONCURRENCY = Math.max(
  1,
  Number(process.env.PROVIDER_GAME_HEALTH_PROBE_CONCURRENCY || 4)
);
const PROVIDER_GAME_HEALTH_STATUS = {
  ok: "ok",
  bad: "bad",
  unknown: "unknown"
};
const providerGameHealthCache = new Map();
const providerGameHealthPending = new Map();
const PROVIDER_LAUNCH_BAD_PATTERNS = [
  /game\s*not\s*found/i,
  /you\s*don'?t\s*have\s*access\s*to\s*this\s*game/i,
  /ip\s*not\s*whitelisted/i,
  /invalid\s*api\s*credentials/i,
  /insufficient\s*balance/i,
  /"code"\s*:\s*10001/i,
  /"code"\s*:\s*-1/i
];

function getProviderRowGid(row = {}) {
  return String(row && (row.gmid || row.mid || row.game_uid || row.id) ? row.gmid || row.mid || row.game_uid || row.id : "")
    .trim();
}

function readProviderGameHealth(gid = "") {
  const key = String(gid || "").trim().toLowerCase();
  if (!key) {
    return null;
  }
  const cached = providerGameHealthCache.get(key);
  if (!cached) {
    return null;
  }
  if (Date.now() - Number(cached.checkedAt || 0) > PROVIDER_GAME_HEALTH_CACHE_TTL_MS) {
    providerGameHealthCache.delete(key);
    return null;
  }
  return cached;
}

function writeProviderGameHealth(gid = "", status = PROVIDER_GAME_HEALTH_STATUS.unknown, reason = "") {
  const key = String(gid || "").trim().toLowerCase();
  if (!key) {
    return;
  }
  const normalizedStatus =
    status === PROVIDER_GAME_HEALTH_STATUS.ok || status === PROVIDER_GAME_HEALTH_STATUS.bad
      ? status
      : PROVIDER_GAME_HEALTH_STATUS.unknown;
  providerGameHealthCache.set(key, {
    status: normalizedStatus,
    reason: String(reason || "").trim(),
    checkedAt: Date.now()
  });
}

function getProviderGameHealthStatus(gid = "") {
  const cached = readProviderGameHealth(gid);
  return cached ? cached.status : PROVIDER_GAME_HEALTH_STATUS.unknown;
}

function providerHealthRank(status = "") {
  if (status === PROVIDER_GAME_HEALTH_STATUS.ok) {
    return 0;
  }
  if (status === PROVIDER_GAME_HEALTH_STATUS.unknown) {
    return 1;
  }
  return 2;
}

function classifyProviderLaunchBody(body = "") {
  const sample = String(body || "").slice(0, 120000);
  if (!sample.trim()) {
    return { status: PROVIDER_GAME_HEALTH_STATUS.unknown, reason: "empty_launch_body" };
  }

  for (const pattern of PROVIDER_LAUNCH_BAD_PATTERNS) {
    if (pattern.test(sample)) {
      return {
        status: PROVIDER_GAME_HEALTH_STATUS.bad,
        reason: "provider_unavailable"
      };
    }
  }

  if (/<html|<!doctype|<iframe|<script/i.test(sample)) {
    return {
      status: PROVIDER_GAME_HEALTH_STATUS.ok,
      reason: "launch_html_ok"
    };
  }

  return { status: PROVIDER_GAME_HEALTH_STATUS.unknown, reason: "launch_body_uncertain" };
}

async function probeProviderLaunchUrlHealth(launchUrl = "") {
  const target = String(launchUrl || "").trim();
  if (!target) {
    return { status: PROVIDER_GAME_HEALTH_STATUS.bad, reason: "missing_launch_url" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_GAME_HEALTH_TIMEOUT_MS);
  try {
    const response = await fetch(target, {
      method: "GET",
      redirect: "follow",
      headers: {
        accept: "text/html,application/xhtml+xml,*/*",
        "user-agent": "allpanelex-local-mirror/1.0"
      },
      signal: controller.signal
    });

    if (response.status === 404 || response.status === 410) {
      return { status: PROVIDER_GAME_HEALTH_STATUS.bad, reason: `launch_http_${response.status}` };
    }
    if (response.status >= 500) {
      return { status: PROVIDER_GAME_HEALTH_STATUS.unknown, reason: `launch_http_${response.status}` };
    }
    if (!response.ok) {
      return { status: PROVIDER_GAME_HEALTH_STATUS.unknown, reason: `launch_http_${response.status}` };
    }

    const body = await response.text().catch(() => "");
    const inspected = classifyProviderLaunchBody(body);
    if (inspected.status !== PROVIDER_GAME_HEALTH_STATUS.unknown) {
      return inspected;
    }

    const contentType = String(response.headers.get("content-type") || "").toLowerCase();
    if (contentType.includes("text/html") && body.trim()) {
      return { status: PROVIDER_GAME_HEALTH_STATUS.ok, reason: "launch_html_nonempty" };
    }
    return inspected;
  } catch {
    return { status: PROVIDER_GAME_HEALTH_STATUS.unknown, reason: "launch_probe_failed" };
  } finally {
    clearTimeout(timeout);
  }
}

async function probeProviderGameHealthByGid(gid = "", memberAccount = "", launchUrlHint = "") {
  const safeGid = String(gid || "").trim();
  if (!safeGid) {
    return {
      status: PROVIDER_GAME_HEALTH_STATUS.unknown,
      reason: "missing_gid",
      launchUrl: ""
    };
  }

  const cached = readProviderGameHealth(safeGid);
  if (cached) {
    return {
      status: cached.status,
      reason: cached.reason,
      launchUrl: ""
    };
  }

  const cacheKey = safeGid.toLowerCase();
  const pending = providerGameHealthPending.get(cacheKey);
  if (pending) {
    return pending;
  }

  const task = (async () => {
    const launchUrl = String(launchUrlHint || "").trim() || (await resolveProviderLaunchUrlByGid(safeGid, memberAccount));
    if (!launchUrl) {
      writeProviderGameHealth(safeGid, PROVIDER_GAME_HEALTH_STATUS.bad, "missing_launch_url");
      return {
        status: PROVIDER_GAME_HEALTH_STATUS.bad,
        reason: "missing_launch_url",
        launchUrl: ""
      };
    }
    const inspected = await probeProviderLaunchUrlHealth(launchUrl);
    writeProviderGameHealth(safeGid, inspected.status, inspected.reason);
    return {
      status: inspected.status,
      reason: inspected.reason,
      launchUrl
    };
  })();

  providerGameHealthPending.set(cacheKey, task);
  task.finally(() => {
    providerGameHealthPending.delete(cacheKey);
  });
  return task;
}

function sortRowsByProviderHealth(rows = []) {
  return rows
    .map((row, index) => {
      const gid = getProviderRowGid(row);
      const healthStatus = gid ? getProviderGameHealthStatus(gid) : PROVIDER_GAME_HEALTH_STATUS.unknown;
      return {
        index,
        healthStatus,
        row: {
          ...row,
          __health: healthStatus
        }
      };
    })
    .sort((left, right) => {
      const rankDiff = providerHealthRank(left.healthStatus) - providerHealthRank(right.healthStatus);
      if (rankDiff !== 0) {
        return rankDiff;
      }
      return left.index - right.index;
    })
    .map((entry) => entry.row);
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

async function primeProviderGameHealth(rows = [], options = {}) {
  if (!Array.isArray(rows) || !rows.length) {
    return;
  }
  const limit = Math.max(0, Number(options.limit || rows.length));
  const memberAccount = String(options.memberAccount || "").trim();
  const uniqueCandidates = [];
  const seen = new Set();
  for (const row of rows) {
    const gid = getProviderRowGid(row);
    if (!gid) {
      continue;
    }
    const normalizedGid = gid.toLowerCase();
    if (seen.has(normalizedGid)) {
      continue;
    }
    seen.add(normalizedGid);
    if (getProviderGameHealthStatus(gid) !== PROVIDER_GAME_HEALTH_STATUS.unknown) {
      continue;
    }
    uniqueCandidates.push(gid);
    if (limit && uniqueCandidates.length >= limit) {
      break;
    }
  }
  if (!uniqueCandidates.length) {
    return;
  }

  await mapWithConcurrency(
    uniqueCandidates,
    PROVIDER_GAME_HEALTH_PROBE_CONCURRENCY,
    async (gid) => probeProviderGameHealthByGid(gid, memberAccount)
  );
}

function summarizeProviderHealth(rows = []) {
  const summary = {
    ok: 0,
    bad: 0,
    unknown: 0
  };
  for (const row of rows) {
    const status = String(row && row.__health ? row.__health : PROVIDER_GAME_HEALTH_STATUS.unknown);
    if (status === PROVIDER_GAME_HEALTH_STATUS.ok) {
      summary.ok += 1;
      continue;
    }
    if (status === PROVIDER_GAME_HEALTH_STATUS.bad) {
      summary.bad += 1;
      continue;
    }
    summary.unknown += 1;
  }
  return summary;
}

async function resolveFallbackWorkingGid(currentGid = "", memberAccount = "") {
  const blocked = String(currentGid || "").trim().toLowerCase();
  const rows = await resolveProviderLobbyRows("all");
  if (!Array.isArray(rows) || !rows.length) {
    return "";
  }

  const unknownCandidates = [];
  for (const row of rows) {
    const gid = getProviderRowGid(row);
    if (!gid || gid.toLowerCase() === blocked) {
      continue;
    }
    const status = getProviderGameHealthStatus(gid);
    if (status === PROVIDER_GAME_HEALTH_STATUS.ok) {
      return gid;
    }
    if (status === PROVIDER_GAME_HEALTH_STATUS.unknown && unknownCandidates.length < 60) {
      unknownCandidates.push(gid);
    }
  }

  for (const candidateGid of unknownCandidates) {
    const inspected = await probeProviderGameHealthByGid(candidateGid, memberAccount);
    if (inspected && inspected.status === PROVIDER_GAME_HEALTH_STATUS.ok) {
      return candidateGid;
    }
  }
  return "";
}

function getProviderLobbyConfig(pathname = "") {
  const normalized = String(pathname || "")
    .trim()
    .toLowerCase()
    .replace(/\/+$/, "") || "/";
  const mapped = PROVIDER_LOBBY_ROUTE_MAP.get(normalized);
  if (mapped) {
    return mapped;
  }

  const dynamicTypeMatch = normalized.match(
    /^\/(?:open-)?(?:live-casino-list|casino-list)\/(lc|vc|slot|xgame)\/([a-z0-9_-]+)$/i
  );
  if (dynamicTypeMatch && dynamicTypeMatch[1]) {
    const dynamicType = normalizeProviderLobbyType(dynamicTypeMatch[1]);
    const titleMap = {
      live: "Live Casino",
      virtual: "Virtual Casino",
      slot: "Slot Game",
      fantasy: "Fantasy Game",
      fishing: "Fishing Games"
    };
    return {
      title: titleMap[dynamicType] || "Our Casino",
      type: dynamicType,
      public: true
    };
  }

  return null;
}

function extractRowsFromEncryptedEnvelope(envelope) {
  if (!envelope || typeof envelope.data !== "string") {
    return [];
  }
  try {
    const decoded = decryptPayload(envelope.data);
    if (decoded && decoded.data && Array.isArray(decoded.data.t1)) {
      return decoded.data.t1;
    }
  } catch {
    // ignore decryption errors
  }
  return [];
}

async function loadProviderRowsForType(type = "lc") {
  const normalizedType = String(type || "lc").trim().toLowerCase() || "lc";
  const envelope = await fetchApiGamesEnvelope("/api/front/casino/tablelist", {
    type: normalizedType
  });
  return extractRowsFromEncryptedEnvelope(envelope);
}

async function resolveProviderLobbyRows(type = "live") {
  const normalizedType = normalizeProviderLobbyType(type || "live");
  const cacheKey = normalizedType;
  const cached = providerLobbyRowsCache.get(cacheKey);
  if (cached && Date.now() - cached.at <= PROVIDER_LOBBY_CACHE_TTL_MS) {
    return cached.rows;
  }

  let rows = [];
  if (normalizedType === "all") {
    const [lcRows, vcRows, slotRows, xgameRows] = await Promise.all([
      loadProviderRowsForType("lc"),
      loadProviderRowsForType("vc"),
      loadProviderRowsForType("slot"),
      loadProviderRowsForType("xgame")
    ]);
    rows = [...lcRows, ...vcRows, ...slotRows, ...xgameRows];
  } else if (PROVIDER_LOBBY_CATEGORY_TYPES.has(normalizedType) && normalizedType !== "all") {
    const allRows = await resolveProviderLobbyRows("all");
    rows = allRows.filter((row) => rowMatchesProviderSection(row, normalizedType));
  } else {
    const allRows = await resolveProviderLobbyRows("all");
    rows = allRows.filter((row) => rowMatchesProviderSection(row, normalizedType));
    if (!rows.length) {
      rows = await loadProviderRowsForType("lc");
    }
  }

  const deduped = dedupeProviderRowsByGid(rows);
  if (PROVIDER_GAME_HEALTH_SYNC_PROBE_LIMIT > 0) {
    await primeProviderGameHealth(deduped, {
      limit: PROVIDER_GAME_HEALTH_SYNC_PROBE_LIMIT
    });
  }

  const sortedRows = sortRowsByProviderHealth(deduped);
  const finalRows = sortedRows;
  providerLobbyRowsCache.set(cacheKey, {
    at: Date.now(),
    rows: finalRows
  });
  if (PROVIDER_GAME_HEALTH_ASYNC_PROBE_LIMIT > PROVIDER_GAME_HEALTH_SYNC_PROBE_LIMIT) {
    void primeProviderGameHealth(finalRows, {
      limit: PROVIDER_GAME_HEALTH_ASYNC_PROBE_LIMIT
    }).catch(() => {});
  }
  return finalRows;
}

function escapeHtml(value = "") {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function toLobbyImageSource(value = "") {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }
  const proxyMarker = "/api/front/image-proxy?u=";
  const markerIndex = raw.toLowerCase().indexOf(proxyMarker);
  if (markerIndex > 0) {
    return raw.slice(markerIndex);
  }
  if (raw.startsWith("/api/front/image-proxy?")) {
    return raw;
  }
  if (/^https?:\/\//i.test(raw)) {
    return `/api/front/image-proxy?u=${encodeURIComponent(raw)}`;
  }
  return raw;
}

function isDefaultLobbyImageSource(value = "") {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  return (
    normalized.includes("/casino-icons/lc/default.") ||
    normalized.includes("/casino-icons/vc/default.") ||
    normalized.includes("/casino-icons/default.") ||
    normalized.endsWith("/default.jpg") ||
    normalized.endsWith("/default.jpeg") ||
    normalized.endsWith("/default.png")
  );
}

function resolveLobbyImageSource(row = {}) {
  const providerImage = toLobbyImageSource(row.img || row.imgUrl2 || "");
  if (providerImage && !isDefaultLobbyImageSource(providerImage) && providerImage.startsWith("/")) {
    return providerImage;
  }

  const img = toLobbyImageSource(row.imgpath || "");
  if (!img) {
    return "/casino/casino-icons/lc/default.jpg";
  }
  if (/^https?:\/\//i.test(img) || img.startsWith("/")) {
    return img;
  }
  const type = String(row.type || row.ctype || "").trim().toLowerCase();
  const folder = type === "vc" ? "vc" : "lc";
  return `/casino/casino-icons/${folder}/${img}`;
}

function resolveHomeApiImageSource(row = {}) {
  const candidates = [row.img, row.imgUrl2, row.imgpath];
  for (const candidate of candidates) {
    const source = toLobbyImageSource(candidate || "");
    if (source && !isDefaultLobbyImageSource(source)) {
      return source;
    }
  }
  return "";
}

function mapProviderRowsToHomeGames(rows = [], fallbackType = "lc") {
  if (!Array.isArray(rows) || !rows.length) {
    return [];
  }
  return rows
    .map((row) => {
      const gid = getProviderRowGid(row);
      const providerGameUid = String(row && (row.provider_game_uid || row.game_uid || row.gameID) ? row.provider_game_uid || row.game_uid || row.gameID : "")
        .trim();
      const launchGid = providerGameUid || gid;
      if (!launchGid) {
        return null;
      }
      const type = isFishingLikeRow(row) ? "fishing" : resolveProviderRowType(row, fallbackType);
      const name = String(row.gname || row.gameNameEn || row.ename || "Game").trim() || "Game";
      const image = resolveHomeApiImageSource(row);
      if (!image) {
        return null;
      }
      return {
        gid: providerGameUid || gid,
        name,
        type,
        vendorCode: String(row.vendorCode || "").trim(),
        category: String(row.category || "").trim(),
        image,
        launchPath: `/casino/superover2?gid=${encodeURIComponent(launchGid)}`
      };
    })
    .filter(Boolean);
}

function applyLegacyHomeImageOrder(games = []) {
  if (!Array.isArray(games) || !games.length) {
    return [];
  }
  return games.slice();
}

async function buildHomeApiGamesPayloadFresh() {
  const [lcRowsRaw, vcRowsRaw, slotRowsRaw, xgameRowsRaw] = await Promise.all([
    loadProviderRowsForType("lc"),
    loadProviderRowsForType("vc"),
    loadProviderRowsForType("slot"),
    loadProviderRowsForType("xgame")
  ]);

  const lcRows = dedupeProviderRowsByGid(lcRowsRaw);
  const vcRows = dedupeProviderRowsByGid(vcRowsRaw);
  const slotRows = dedupeProviderRowsByGid(slotRowsRaw);
  const xgameRows = dedupeProviderRowsByGid(xgameRowsRaw);

  const combinedRows = dedupeProviderRowsByGid([...lcRows, ...vcRows, ...slotRows, ...xgameRows]);
  let mac88Rows = combinedRows;
  if (!mac88Rows.length) {
    mac88Rows = combinedRows.slice(0, 100);
  }
  let mac88RowsWithImages = mac88Rows.filter((row) => Boolean(resolveHomeApiImageSource(row)));
  if (!mac88RowsWithImages.length) {
    mac88RowsWithImages = mac88Rows;
  }

  const selectedHomeRows = mac88RowsWithImages.slice(0, HOME_PRIMARY_GAME_TARGET);
  const orderedHomeGames = mapProviderRowsToHomeGames(selectedHomeRows, "lc");

  const bucketedRows = {
    lc: [],
    vc: [],
    slot: [],
    xgame: [],
    fishing: []
  };
  for (const row of selectedHomeRows) {
    const type = resolveProviderRowType(row, "lc");
    if (bucketedRows[type]) {
      bucketedRows[type].push(row);
    } else {
      bucketedRows.lc.push(row);
    }
    if (isFishingLikeRow(row)) {
      bucketedRows.fishing.push(row);
    }
  }

  const lcGamesWithOrderedImages = mapProviderRowsToHomeGames(bucketedRows.lc, "lc");
  const vcGamesWithOrderedImages = mapProviderRowsToHomeGames(bucketedRows.vc, "vc");
  const slotGamesWithOrderedImages = mapProviderRowsToHomeGames(bucketedRows.slot, "slot");
  const xgameGamesWithOrderedImages = mapProviderRowsToHomeGames(bucketedRows.xgame, "xgame");
  const fishingGamesWithOrderedImages = mapProviderRowsToHomeGames(bucketedRows.fishing, "vc");

  return {
    totals: {
      all: orderedHomeGames.length,
      lc: lcGamesWithOrderedImages.length,
      vc: vcGamesWithOrderedImages.length,
      slot: slotGamesWithOrderedImages.length,
      xgame: xgameGamesWithOrderedImages.length,
      fishing: fishingGamesWithOrderedImages.length
    },
    groups: {
      lc: lcGamesWithOrderedImages,
      vc: vcGamesWithOrderedImages,
      slot: slotGamesWithOrderedImages,
      xgame: xgameGamesWithOrderedImages,
      fishing: fishingGamesWithOrderedImages
    },
    all: orderedHomeGames
  };
}

async function buildHomeApiGamesPayload(options = {}) {
  const forceRefresh = Boolean(options && options.forceRefresh);
  const now = Date.now();
  const cachedValue = homeApiGamesPayloadCache.value;
  const cacheAge = now - Number(homeApiGamesPayloadCache.at || 0);
  if (!forceRefresh && cachedValue && cacheAge <= HOME_API_GAMES_CACHE_TTL_MS) {
    return cachedValue;
  }

  if (homeApiGamesPayloadCache.pending) {
    if (cachedValue && !forceRefresh) {
      return cachedValue;
    }
    return homeApiGamesPayloadCache.pending;
  }

  const refreshTask = (async () => {
    try {
      const payload = await buildHomeApiGamesPayloadFresh();
      if (payload && typeof payload === "object") {
        homeApiGamesPayloadCache.value = payload;
        homeApiGamesPayloadCache.at = Date.now();
      }
      return homeApiGamesPayloadCache.value;
    } catch {
      return homeApiGamesPayloadCache.value || {
        totals: { all: 0, lc: 0, vc: 0, slot: 0, xgame: 0, fishing: 0 },
        groups: { lc: [], vc: [], slot: [], xgame: [], fishing: [] },
        all: []
      };
    } finally {
      if (homeApiGamesPayloadCache.pending === refreshTask) {
        homeApiGamesPayloadCache.pending = null;
      }
    }
  })();

  homeApiGamesPayloadCache.pending = refreshTask;
  if (cachedValue && !forceRefresh) {
    void refreshTask.catch(() => {});
    return cachedValue;
  }
  return refreshTask;
}

function normalizeProviderLobbyPageNumber(value = 1) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 1) {
    return 1;
  }
  return Math.floor(numeric);
}

function normalizeProviderLobbyPageSize(value = PROVIDER_LOBBY_PAGE_SIZE_DEFAULT) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 1) {
    return PROVIDER_LOBBY_PAGE_SIZE_DEFAULT;
  }
  return Math.min(PROVIDER_LOBBY_PAGE_SIZE_MAX, Math.max(12, Math.floor(numeric)));
}

function resolveProviderLobbyCardTypeLabel(row = {}) {
  const bucket = resolveProviderCategoryBucket(row);
  const labels = {
    live: "LIVE CASINO",
    virtual: "VIRTUAL CASINO",
    slot: "SLOT GAME",
    fantasy: "FANTASY GAME",
    fishing: "FISHING GAME"
  };
  return labels[bucket] || "GAME";
}

function mapProviderRowToLobbyCard(row = {}) {
  const rawName = String(row.gname || row.gameNameEn || row.ename || "Game");
  const fallbackGid = String(row.gmid || row.mid || row.game_uid || row.id || "").trim();
  const providerGameUid = String(row.provider_game_uid || row.game_uid || row.gameID || "").trim();
  const launchGid = providerGameUid || fallbackGid;
  if (!launchGid) {
    return null;
  }
  const healthStatus = String(row.__health || PROVIDER_GAME_HEALTH_STATUS.unknown).trim().toLowerCase();
  return {
    name: rawName,
    typeLabel: resolveProviderLobbyCardTypeLabel(row),
    launchPath: `/casino/superover2?gid=${encodeURIComponent(launchGid)}`,
    image: resolveLobbyImageSource(row),
    health: healthStatus
  };
}

function buildProviderLobbyCardHtml(game = {}) {
  const rawName = String(game.name || "Game");
  const name = escapeHtml(rawName);
  const typeLabel = escapeHtml(String(game.typeLabel || "GAME"));
  const healthStatus = String(game.health || PROVIDER_GAME_HEALTH_STATUS.unknown).trim().toLowerCase();
  const isUnavailable = healthStatus === PROVIDER_GAME_HEALTH_STATUS.bad;
  const unavailableBadge = isUnavailable ? '<span class="status bad">Unavailable</span>' : "";
  const launchPath = escapeAttr(String(game.launchPath || "#"));
  const image = escapeAttr(String(game.image || "/casino/casino-icons/lc/default.jpg"));
  return `
<a class="card${isUnavailable ? " is-unavailable" : ""}" href="${launchPath}" data-name="${escapeAttr(
    rawName.toLowerCase()
  )}" data-type="${escapeAttr(typeLabel.toLowerCase())}" data-health="${escapeAttr(healthStatus)}">
  <img src="${image}" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='/casino/casino-icons/lc/default.jpg';" />
  <div class="meta">
    <h3>${name}</h3>
    <div class="tags">
      <span>${typeLabel}</span>
      ${unavailableBadge}
    </div>
    <span class="play-btn">Play</span>
  </div>
</a>`;
}

function buildProviderLobbyPagePayload(rows = [], options = {}) {
  const list = Array.isArray(rows) ? rows : [];
  const total = list.length;
  const page = normalizeProviderLobbyPageNumber(options.page);
  const pageSize = normalizeProviderLobbyPageSize(options.pageSize);
  const start = (page - 1) * pageSize;
  const pageRows = list.slice(start, start + pageSize);
  const cardsHtml = pageRows
    .map((row) => mapProviderRowToLobbyCard(row))
    .filter(Boolean)
    .map((game) => buildProviderLobbyCardHtml(game))
    .join("\n");
  const loaded = Math.min(start + pageRows.length, total);
  return {
    page,
    pageSize,
    total,
    loaded,
    hasMore: loaded < total,
    cardsHtml
  };
}

function buildProviderLobbyHtml(config, rows = []) {
  const safeTitle = escapeHtml(config.title || "Casino");
  const sectionType = normalizeProviderLobbyType(config.type || "live");
  const healthSummary = summarizeProviderHealth(rows);
  const firstPage = buildProviderLobbyPagePayload(rows, {
    page: 1,
    pageSize: PROVIDER_LOBBY_PAGE_SIZE_DEFAULT
  });
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      font-family: Arial, sans-serif;background: #0088cc;color: #F5E6D3;
    }
    .wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px 14px 40px;
    }
    .top {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 0.3px;
    }
    .count {color: #0d6efd;
      font-size: 14px;
    }
    .tools {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    input[type="search"] {
      width: min(520px, 100%);border: 1px solid #0088cc;
      border-radius: 8px;background: #0088cc;color: #F5E6D3;
      padding: 10px 12px;outline: none;
    }
    .links {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .links a {
      text-decoration: none;color: #F5E6D3;border: 1px solid #0088cc;
      padding: 8px 10px;
      border-radius: 8px;background: #0088cc;
      font-size: 13px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      gap: 12px;
    }
    .card {
      text-decoration: none;color: inherit;background: #0088cc;border: 1px solid #0088cc;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      min-height: 210px;
    }
    .card img {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;background: #0088cc;
    }
    .meta {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .meta h3 {
      margin: 0;
      font-size: 13px;
      line-height: 1.25;
      min-height: 34px;
    }
    .meta .tags span {
      align-self: flex-start;
      font-size: 11px;color: #0d6efd;border: 1px solid #0088cc;
      border-radius: 999px;
      padding: 3px 8px;
    }
    .meta .tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      align-items: center;
    }
    .meta .status.bad {color: #ffc9c9;border-color: #a94a4a;background: rgba(169, 74, 74, 0.18);
    }
    .meta .play-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 78px;
      padding: 6px 12px;
      border-radius: 7px;border: 1px solid #0088cc;background: #0088cc;color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .load-more {
      margin: 16px auto 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;border: 1px solid #0088cc;
      border-radius: 8px;
      padding: 9px 16px;background: #0088cc;color: #F5E6D3;
      font-weight: 700;
      cursor: pointer;
      min-width: 150px;
    }
    .load-wrap {
      text-align: center;
    }
    .card.is-unavailable {
      opacity: 0.8;
    }
    .hidden {
      display: none !important;
    }
    .warn {
      margin-top: 12px;
      font-size: 12px;color: #0d6efd;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <h1>${safeTitle}</h1>
      <div class="count">Total: ${firstPage.total} | Working: ${healthSummary.ok} | Pending Check: ${healthSummary.unknown} | Unavailable: ${healthSummary.bad}</div>
    </div>
    <div class="tools">
      <input id="search" type="search" placeholder="Search game name..." />
      <div class="links">
        <a href="/live-casino-list">Live Casino</a>
        <a href="/casino-list/vc/vc">Virtual Casino</a>
        <a href="/slot-list">Slot Game</a>
        <a href="/open-fantasy-list">Fantasy Game</a>
      </div>
    </div>
    <div class="grid" id="grid">${firstPage.cardsHtml}</div>
    <div class="load-wrap">
      <button id="load-more" type="button" class="load-more${firstPage.hasMore ? "" : " hidden"}">Load More</button>
    </div>
    <div class="warn" id="status">${firstPage.hasMore ? `Loaded ${firstPage.loaded} of ${firstPage.total} games.` : `All ${firstPage.total} games loaded.`}</div>
  </div>
  <script>
    (function () {
      var input = document.getElementById("search");
      var grid = document.getElementById("grid");
      var loadMoreBtn = document.getElementById("load-more");
      var statusEl = document.getElementById("status");
      if (!input || !grid) {
        return;
      }
      var sectionType = ${JSON.stringify(sectionType)};
      var page = ${firstPage.page};
      var pageSize = ${firstPage.pageSize};
      var total = ${firstPage.total};
      var hasMore = ${firstPage.hasMore ? "true" : "false"};
      var loading = false;
      var lobbyEndpointBase =
        "/api/provider/lobby-games?type=" +
        encodeURIComponent(sectionType) +
        "&pageSize=" +
        encodeURIComponent(String(pageSize));

      function safeMemberToken(value) {
        return String(value || "")
          .trim()
          .replace(/[^a-zA-Z0-9_-]/g, "")
          .slice(0, 32);
      }
      function safeParse(value) {
        if (!value || typeof value !== "string") {
          return null;
        }
        try {
          return JSON.parse(value);
        } catch (_err) {
          return null;
        }
      }
      function pickMember(obj) {
        if (!obj || typeof obj !== "object") {
          return "";
        }
        var keys = ["member_account", "username", "uname", "user_name", "login", "userId", "userid"];
        for (var idx = 0; idx < keys.length; idx += 1) {
          var key = keys[idx];
          if (!Object.prototype.hasOwnProperty.call(obj, key)) {
            continue;
          }
          var member = safeMemberToken(obj[key]);
          if (member) {
            return member;
          }
        }
        return "";
      }
      function resolveMemberFromStorage() {
        try {
          var rootRaw = localStorage.getItem("persist:root");
          var root = safeParse(rootRaw);
          if (!root || typeof root !== "object") {
            return "";
          }
          var direct = pickMember(root);
          if (direct) {
            return direct;
          }
          var nestedKeys = ["user", "auth", "data"];
          for (var idx = 0; idx < nestedKeys.length; idx += 1) {
            var nestedValue = root[nestedKeys[idx]];
            if (!nestedValue) {
              continue;
            }
            var nested = typeof nestedValue === "string" ? safeParse(nestedValue) : nestedValue;
            var nestedMember = pickMember(nested);
            if (nestedMember) {
              return nestedMember;
            }
            if (nested && nested.data && typeof nested.data === "object") {
              var nestedDataMember = pickMember(nested.data);
              if (nestedDataMember) {
                return nestedDataMember;
              }
            }
          }
        } catch (_storageErr) {
          return "";
        }
        return "";
      }
      var memberAccount = resolveMemberFromStorage();

      function applyMemberToCards(scope) {
        if (!memberAccount) {
          return;
        }
        var cards = (scope || document).querySelectorAll(".card[href]");
        cards.forEach(function (card) {
          var href = String(card.getAttribute("href") || "").trim();
          if (!href) {
            return;
          }
          try {
            var launchUrl = new URL(href, window.location.origin);
            if (!launchUrl.searchParams.get("member")) {
              launchUrl.searchParams.set("member", memberAccount);
              card.setAttribute("href", launchUrl.pathname + launchUrl.search + launchUrl.hash);
            }
          } catch (_hrefErr) {
            // keep original href
          }
        });
      }

      function applyFilter() {
        var needle = String(input.value || "").trim().toLowerCase();
        var cards = grid.querySelectorAll(".card");
        cards.forEach(function (card) {
          var name = String(card.getAttribute("data-name") || "");
          if (!needle || name.indexOf(needle) !== -1) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      }

      function updateStatus() {
        var loaded = Math.min(page * pageSize, total);
        if (!statusEl) {
          return;
        }
        if (hasMore) {
          statusEl.textContent = "Loaded " + String(loaded) + " of " + String(total) + " games.";
        } else {
          statusEl.textContent = "All " + String(total) + " games loaded.";
        }
      }

      async function loadNextPage() {
        if (!hasMore || loading) {
          return;
        }
        loading = true;
        if (loadMoreBtn) {
          loadMoreBtn.textContent = "Loading...";
          loadMoreBtn.disabled = true;
        }
        var nextPage = page + 1;
        try {
          var response = await fetch(
            lobbyEndpointBase + "&page=" + encodeURIComponent(String(nextPage)),
            {
              method: "GET",
              headers: {
                accept: "application/json"
              }
            }
          );
          var payload = await response.json().catch(function () {
            return null;
          });
          if (!payload || Number(payload.code) !== 0 || !payload.data) {
            throw new Error("invalid_lobby_payload");
          }
          var data = payload.data;
          var cardsHtml = String(data.cardsHtml || "");
          if (cardsHtml) {
            grid.insertAdjacentHTML("beforeend", cardsHtml);
            applyMemberToCards(grid);
            applyFilter();
          }
          page = Number(data.page || nextPage);
          total = Number(data.total || total);
          hasMore = Boolean(data.hasMore);
          if (loadMoreBtn) {
            if (hasMore) {
              loadMoreBtn.classList.remove("hidden");
            } else {
              loadMoreBtn.classList.add("hidden");
            }
          }
          updateStatus();
        } catch (_loadErr) {
          if (statusEl) {
            statusEl.textContent = "Unable to load more games right now. Please try again.";
          }
        } finally {
          loading = false;
          if (loadMoreBtn) {
            loadMoreBtn.textContent = "Load More";
            loadMoreBtn.disabled = false;
          }
        }
      }

      input.addEventListener("input", applyFilter);
      if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", loadNextPage);
      }
      if ("IntersectionObserver" in window && loadMoreBtn) {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                loadNextPage();
              }
            });
          },
          { rootMargin: "220px 0px 220px 0px" }
        );
        observer.observe(loadMoreBtn);
      }
      applyMemberToCards(document);
      applyFilter();
      updateStatus();
    })();
  </script>
</body>
</html>`;
}

async function sendProviderLobbyPage(res, config) {
  const rows = await resolveProviderLobbyRows(config.type);
  const html = buildProviderLobbyHtml(config, rows);
  sendText(res, 200, html, "text/html; charset=utf-8");
}

async function handleProviderLobbyGamesApi(res, urlObj) {
  const type = normalizeProviderLobbyType(urlObj.searchParams.get("type") || "live");
  const page = normalizeProviderLobbyPageNumber(urlObj.searchParams.get("page") || 1);
  const pageSize = normalizeProviderLobbyPageSize(
    urlObj.searchParams.get("pageSize") || PROVIDER_LOBBY_PAGE_SIZE_DEFAULT
  );
  const rows = await resolveProviderLobbyRows(type);
  const paged = buildProviderLobbyPagePayload(rows, { page, pageSize });
  sendJson(res, 200, {
    code: 0,
    msg: "success",
    data: {
      type,
      page: paged.page,
      pageSize: paged.pageSize,
      total: paged.total,
      loaded: paged.loaded,
      hasMore: paged.hasMore,
      cardsHtml: paged.cardsHtml
    }
  });
}

function extractClientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")
    .map((value) => value.trim())
    .find(Boolean);
  const candidate = forwarded || req.socket.remoteAddress || "127.0.0.1";
  return candidate.replace(/^::ffff:/i, "").trim() || "127.0.0.1";
}

function isPrivateOrLocalIp(ip = "") {
  const value = String(ip || "").trim();
  if (!value) {
    return true;
  }
  if (value === "::1" || value === "localhost" || value === "127.0.0.1") {
    return true;
  }
  if (/^127\./.test(value)) {
    return true;
  }
  if (/^10\./.test(value)) {
    return true;
  }
  if (/^192\.168\./.test(value)) {
    return true;
  }
  const match172 = value.match(/^172\.(\d{1,3})\./);
  if (match172) {
    const block = Number(match172[1]);
    if (block >= 16 && block <= 31) {
      return true;
    }
  }
  return false;
}

async function fetchPublicIpFallback() {
  if (cachedPublicIp && Date.now() - cachedPublicIpAt < PUBLIC_IP_TTL_MS) {
    return cachedPublicIp;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      method: "GET",
      headers: { accept: "application/json" },
      signal: controller.signal
    });
    if (!response.ok) {
      return cachedPublicIp || "";
    }
    const payload = await response.json().catch(() => null);
    const ip = String(payload && payload.ip ? payload.ip : "").trim();
    if (!ip) {
      return cachedPublicIp || "";
    }
    cachedPublicIp = ip;
    cachedPublicIpAt = Date.now();
    return ip;
  } catch {
    return cachedPublicIp || "";
  } finally {
    clearTimeout(timeout);
  }
}

async function handleIpify(req, res, urlObj) {
  const callbackRaw = urlObj.searchParams.get("callback") || "callback";
  const callback = callbackRaw.replace(/[^\w$.]/g, "") || "callback";
  const clientIp = extractClientIp(req);
  const remoteIp = isPrivateOrLocalIp(clientIp)
    ? (await fetchPublicIpFallback()) || clientIp || "127.0.0.1"
    : clientIp;
  const body = `${callback}(${JSON.stringify({ ip: remoteIp })});`;
  sendText(res, 200, body, "application/javascript; charset=utf-8");
}

function isApiGamesCallbackPath(pathname = "") {
  const normalizedPath = String(pathname || "").replace(/\/+$/, "") || "/";
  return API_GAMES_CALLBACK_ALIASES.has(normalizedPath.toLowerCase());
}

function timingSafeEqualText(a = "", b = "") {
  const left = Buffer.from(String(a || "").trim().toLowerCase());
  const right = Buffer.from(String(b || "").trim().toLowerCase());
  if (!left.length || left.length !== right.length) {
    return false;
  }
  try {
    return crypto.timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", (error) => reject(error));
  });
}

async function handleApiGamesCallback(req, res, db) {
  if (req.method === "GET") {
    sendJson(res, 200, {
      code: 0,
      msg: "Callback endpoint is active",
      path: NORMALIZED_CALLBACK_PATH
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { code: -1, msg: "Method not allowed" });
    return;
  }

  const rawBuffer = await readRawBody(req);
  const rawBody = rawBuffer.toString("utf8");
  let payload = null;
  try {
    payload = JSON.parse(rawBody || "{}");
  } catch {
    sendJson(res, 400, { code: -1, msg: "Invalid JSON payload" });
    return;
  }

  if (API_GAMES_CALLBACK_REQUIRE_SIGNATURE) {
    const signatureHeader = String(req.headers["x-signature"] || "").trim();
    if (!signatureHeader) {
      sendJson(res, 401, { code: -1, msg: "Missing X-Signature header" });
      return;
    }
    const calculated = crypto.createHmac("sha256", String(API_GAMES_SECRET || ""))
      .update(rawBody)
      .digest("hex");
    if (!timingSafeEqualText(calculated, signatureHeader)) {
      sendJson(res, 401, { code: -1, msg: "Invalid Signature" });
      return;
    }
  }

  const result = db.applyProviderCallback(payload);
  if (!result || !result.success) {
    sendJson(res, 200, { code: -1, msg: (result && result.message) || "Callback failed" });
    return;
  }

  sendJson(res, 200, { code: 0, msg: "Success" });
}

function sendAdminLoginPage(req, res) {
  const loginPage =
    resolveStaticPath("/admin/index.html") ||
    resolveStaticPath("/admin/logout.html") ||
    resolveStaticPath("/admin/login.html");
  if (!loginPage) {
    sendText(res, 404, "Admin login page not found");
    return;
  }
  sendFile(req, res, loginPage);
}

function sendPlayerUnavailablePage(res) {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Live Stream</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;background: #000;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }
    .hint {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;color: #111;
      user-select: none;
    }
  </style>
</head>
<body>
  <div class="hint">.</div>
</body>
</html>`;
  sendText(res, 200, html, "text/html; charset=utf-8");
}

function escapeErrorHtml(value = "") {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveProviderLaunchFailureMessage() {
  const latest = getLastApiGamesError();
  if (!latest || typeof latest !== "object") {
    return "";
  }
  return String(latest.msg || "").trim();
}

function sendProviderLaunchErrorPage(res, options = {}) {
  const gid = String(options.gid || "").trim();
  const callbackPath = String(options.callbackPath || NORMALIZED_CALLBACK_PATH).trim();
  const providerMessage = String(options.providerMessage || "").trim();
  const safeGid = escapeErrorHtml(gid || "-");
  const safeCallbackPath = escapeErrorHtml(callbackPath || "/callback.php");
  const safeProviderMessage = escapeErrorHtml(
    providerMessage || "Provider launch URL not available from API."
  );
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Game Launch Error</title>
  <style>
    body { margin:0; font-family:Arial,sans-serif;background: #0088cc;color: #F5E6D3; }
    .wrap { max-width:820px; margin:0 auto; padding:28px 14px; }
    .card {border: 1px solid #0088cc;background: #0088cc; border-radius:10px; padding:18px; }
    h1 { margin:0 0 10px; font-size:22px; }
    p { margin:8px 0; line-height:1.45; }
    .meta { margin-top:14px; border-top:1px solid #0088cc; padding-top:12px; font-size:14px; }
    .code { font-family:Consolas,monospace;color: #0d6efd; word-break:break-all; }
    .actions { margin-top:14px; display:flex; gap:10px; flex-wrap:wrap; }
    a {color: #fff; text-decoration:none;border: 1px solid #0088cc;background: #0088cc; padding:8px 12px; border-radius:6px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>Game launch blocked</h1>
      <p>${safeProviderMessage}</p>
      <p>If provider says <span class="code">IP not whitelisted</span>, whitelist this server public IP first.</p>
      <div class="meta">
        <p><strong>Requested Game UID:</strong> <span class="code">${safeGid}</span></p>
        <p><strong>Callback URL path to share:</strong> <span class="code">${safeCallbackPath}</span></p>
      </div>
      <div class="actions">
        <a href="/home">Back To Home</a>
      </div>
    </div>
  </div>
</body>
</html>`;
  sendText(res, 502, html, "text/html; charset=utf-8");
}

function sendMediaVideoPlayer(res, title = "Live Video") {
  const safeTitle = String(title || "Live Video")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  
  const sampleStream = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  const poster = "https://versionobj.ecoassetsservice.com/v96/static/videoplayer/nplayer/js/videobg.jpg";
  const playerJs = "https://versionobj.ecoassetsservice.com/v96/static/videoplayer/nplayer/js/newplayer.min.js";

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #000;
      overflow: hidden;
      color: #fff;
    }
    #aZnolpONZo {
      visibility: visible;
      overflow: hidden;
      position: relative;
      background-color: black;
      width: 100%;
      height: 100%;
    }
    .mute-btn-group {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1001;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    button[id^="muteBtn"], button[id^="unmuteBtn"] {
      background: rgba(0,0,0,0.5);
      border: 1px solid #fff;
      color: #fff;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 12px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #middleview-aZnolpONZo {
      width: 46px;
      height: 46px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      cursor: pointer;
      background: rgba(0,0,0,0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #middleview-aZnolpONZo::after {
      content: '▶';
      font-size: 24px;
    }
  </style>
</head>
<body>
  <script type="text/javascript" src="${playerJs}"></script>
  <div id="aZnolpONZo">
    <div class="mute-btn-group">
      <button id="muteBtn" style="display: flex;">Mute</button>
      <button id="unmuteBtn" style="display: none;">Unmute</button>
    </div>
    
    <video 
      id="h5live-aZnolpONZo" 
      playsinline 
      autoplay 
      muted 
      poster="${poster}"
      style="background-color: black; display: block; z-index: 1; width: 100%; height: 100%; position: absolute; left: 50%; top: 50%; margin-right: -50%; transform: translate(-50%, -50%) scaleX(1) scaleY(1) rotate(0deg);"
      disableremoteplayback=""
    >
    </video>

    <div id="middleview-aZnolpONZo"></div>
  </div>

  <script>
    (function() {
      var video = document.getElementById('h5live-aZnolpONZo');
      var source = "${sampleStream}";
      var playBtn = document.getElementById('middleview-aZnolpONZo');
      var muteBtn = document.getElementById('muteBtn');
      var unmuteBtn = document.getElementById('unmuteBtn');

      function initPlayer() {
        if (Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(source);
          hls.attachMedia(video);
          hls.on(Hls.Events.MEDIA_ATTACHED, function() {
            video.muted = true;
            video.play().catch(function(e) { console.log("Autoplay blocked", e); });
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source;
        }
      }

      playBtn.onclick = function() {
        video.play();
        playBtn.style.display = 'none';
      };

      muteBtn.onclick = function() {
        video.muted = true;
        muteBtn.style.display = 'none';
        unmuteBtn.style.display = 'flex';
      };

      unmuteBtn.onclick = function() {
        video.muted = false;
        unmuteBtn.style.display = 'none';
        muteBtn.style.display = 'flex';
      };

      initPlayer();
      
      // Hide play button if video starts playing
      video.onplay = function() {
        playBtn.style.display = 'none';
      };
    })();
  </script>
</body>
</html>`;
  sendText(res, 200, html, "text/html; charset=utf-8");
}

function sendExternalIframePage(res, src, title = "Live Game") {
  const safeSrc = String(src || "").trim();
  if (!safeSrc) {
    sendPlayerUnavailablePage(res);
    return;
  }
  const safeTitle = String(title || "Live Game")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;background: #000;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }
    .frame {
      width: 100%;
      height: 100%;border: 0;background: #000;
      display: block;
    }
  </style>
</head>
<body>
  <iframe
    class="frame"
    src="${safeSrc}"
    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</body>
</html>`;
  sendText(res, 200, html, "text/html; charset=utf-8");
}

function isGameRoute(pathname = "") {
  return /^\/(?:casino|all-sports|game-details)\//i.test(pathname);
}

function isMediaRoute(pathname = "") {
  return /^\/(?:new)?mediaplayer\//i.test(pathname);
}

function isGameLikeRoute(pathname = "") {
  return isGameRoute(pathname) || isMediaRoute(pathname);
}

const MEDIA_GAME_ID_MAP = new Map([
  ["521102458", "teen20"],
  ["521102459", "dt20"],
  ["521102460", "baccarat"],
  ["521102461", "roulette11"],
  ["521102462", "worli3"],
  ["899983842", "vteen20"],
  ["700001", "trb-turbomines"],
  ["700002", "trb-aero"],
  ["800001", "aviator"],
  ["800002", "mines"]
]);

function normalizeGameSlug(value = "", fallback = "worli3") {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) {
    return fallback;
  }
  if (raw === "tv" || /^worli3_/i.test(raw)) {
    return "worli3";
  }
  const sanitized = raw.replace(/[^a-z0-9_-]/g, "");
  return sanitized || fallback;
}

function inferMediaGameSlug(pathname = "") {
  const newMediaMatch = String(pathname || "").match(/^\/newmediaplayer\/([^/]+)/i);
  if (newMediaMatch && newMediaMatch[1]) {
    return normalizeGameSlug(newMediaMatch[1], "worli3");
  }

  const virtualMediaMatch = String(pathname || "").match(/^\/mediaplayer\/virtual\/([^/]+)/i);
  if (virtualMediaMatch && virtualMediaMatch[1]) {
    const rawId = String(virtualMediaMatch[1]).trim();
    if (MEDIA_GAME_ID_MAP.has(rawId)) {
      return normalizeGameSlug(MEDIA_GAME_ID_MAP.get(rawId), "worli3");
    }
    return "worli3";
  }

  return "";
}

function isBrokenGameSnapshot(filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile() || stat.size <= 0) {
      return true;
    }
    const bytesToRead = Math.min(16384, stat.size);
    const fd = fs.openSync(filePath, "r");
    const buffer = Buffer.alloc(bytesToRead);
    let read = 0;
    try {
      read = fs.readSync(fd, buffer, 0, bytesToRead, 0);
    } finally {
      fs.closeSync(fd);
    }
    const head = buffer.toString("utf8", 0, read);
    if (!head.trim()) {
      return true;
    }
    return (
      /^\s*No Content:/i.test(head) ||
      /No\s*Content:\s*(?:https?:\/\/[^/\s]+)?\/(?:new)?mediaplayer\//i.test(head) ||
      /No\s*Content:\s*(?:https?:\/\/[^/\s]+)?\/casino\//i.test(head) ||
      /Virtual Media/i.test(head) ||
      /opps!\s*page\s*not\s*found/i.test(head) ||
      /oops!\s*page\s*not\s*found/i.test(head) ||
      /the\s*page\s*you.?re\s*looking\s*for\s*doesn.?t\s*exist/i.test(head) ||
      /<title>\s*Error\s*<\/title>/i.test(head)
    );
  } catch {
    return true;
  }
}

const ADMIN_ALIAS_LOGIN_PATHS = new Set([
  "/mainadmin",
  "/mainadmin/index",
  "/superadmin",
  "/superadmin/index",
  "/agentm",
  "/agentm/index",
  "/agent",
  "/agent/index"
]);

const HOSTING_API_PATH_RE = /^\/api\/(?:domain|domains|deploy|dns|mirror-domains)(?:\/|$)/i;

function createAppServer() {
  const snapshots = new SnapshotStore();
  const db = new LocalDatabase();

  return http.createServer(async (req, res) => {
    try {
      if (req.method === "OPTIONS") {
        res.writeHead(204, SECURITY_HEADERS);
        res.end();
        return;
      }

      let urlObj;
      try {
        urlObj = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
      } catch {
        sendText(res, 400, "Bad Request");
        return;
      }

      const pathname = decodeURIComponent(urlObj.pathname || "/").replace(/\/+$/, "") || "/";

      if (
        pathname === "/api.ipify.org" ||
        pathname === "/api.ipify.org/" ||
        pathname === "/api.ipify.org/index.html"
      ) {
        await handleIpify(req, res, urlObj);
        return;
      }

      if (pathname === "/api/front/image-proxy") {
        await handleImageProxy(req, res, urlObj);
        return;
      }

      if (pathname === "/api/provider/home-games" && req.method === "GET") {
        const payload = await buildHomeApiGamesPayload();
        sendJson(res, 200, {
          code: 0,
          msg: "success",
          data: payload
        });
        return;
      }

      if (pathname === "/api/provider/lobby-games" && req.method === "GET") {
        await handleProviderLobbyGamesApi(res, urlObj);
        return;
      }

      if (req.method === "GET") {
        const directProviderGid = resolveDirectProviderCasinoGid(pathname, urlObj);
        if (directProviderGid) {
          const member = resolveRequestMemberAccount(req, urlObj, db);
          if (isDemoMemberAccount(db, member)) {
            sendProviderLaunchErrorPage(res, {
              gid: directProviderGid,
              callbackPath: NORMALIZED_CALLBACK_PATH,
              providerMessage: "Games are locked for demo users. Please login with real ID."
            });
            return;
          }
          const creditAmount = resolveMemberCreditAmount(db, member, urlObj);
          const launchResolved = await resolveWorkingProviderLaunch(directProviderGid, member, creditAmount);
          if (launchResolved.url) {
            sendText(res, 302, "", "text/plain; charset=utf-8", { Location: launchResolved.url });
            return;
          }
          sendProviderLaunchErrorPage(res, {
            gid: directProviderGid,
            callbackPath: NORMALIZED_CALLBACK_PATH,
            providerMessage: resolveProviderLaunchFailureMessage()
          });
          return;
        }
      }

      if (req.method === "GET") {
        const lobbyConfig = getProviderLobbyConfig(pathname);
        if (lobbyConfig && (ENABLE_PROVIDER_LOBBY_PAGES || lobbyConfig.public === true)) {
          await sendProviderLobbyPage(res, lobbyConfig);
          return;
        }
      }

      if (req.method === "GET" && isProviderLaunchPageRequest(pathname)) {
        const gid = String(urlObj.searchParams.get("gid") || "").trim();
        const member = resolveRequestMemberAccount(req, urlObj, db);
        if (!gid) {
          sendText(res, 302, "", "text/plain; charset=utf-8", { Location: "/home" });
          return;
        }
        if (isDemoMemberAccount(db, member)) {
          sendProviderLaunchErrorPage(res, {
            gid,
            callbackPath: NORMALIZED_CALLBACK_PATH,
            providerMessage: "Games are locked for demo users. Please login with real ID."
          });
          return;
        }
        const creditAmount = resolveMemberCreditAmount(db, member, urlObj);
        const launchResolved = await resolveWorkingProviderLaunch(gid, member, creditAmount);
        const directLaunchUrl = launchResolved.url || (await resolveProviderLaunchUrlByGid(gid, member, creditAmount));
        if (!directLaunchUrl) {
          sendProviderLaunchErrorPage(res, {
            gid,
            callbackPath: NORMALIZED_CALLBACK_PATH,
            providerMessage: resolveProviderLaunchFailureMessage()
          });
          return;
        }
        sendText(res, 302, "", "text/plain; charset=utf-8", { Location: directLaunchUrl });
        return;
      }

      if (req.method === "GET" && isProviderCasinoRouteRequest(pathname, urlObj)) {
        const gid = String(urlObj.searchParams.get("gid") || "").trim();
        const member = resolveRequestMemberAccount(req, urlObj, db);
        if (isDemoMemberAccount(db, member)) {
          sendProviderLaunchErrorPage(res, {
            gid,
            callbackPath: NORMALIZED_CALLBACK_PATH,
            providerMessage: "Games are locked for demo users. Please login with real ID."
          });
          return;
        }
        const creditAmount = resolveMemberCreditAmount(db, member, urlObj);
        const launchResolved = await resolveWorkingProviderLaunch(gid, member, creditAmount);
        if (launchResolved.url) {
          sendText(res, 302, "", "text/plain; charset=utf-8", { Location: launchResolved.url });
          return;
        }
        sendProviderLaunchErrorPage(res, {
          gid,
          callbackPath: NORMALIZED_CALLBACK_PATH,
          providerMessage: resolveProviderLaunchFailureMessage()
        });
        return;
      }

      if (isApiGamesCallbackPath(pathname)) {
        await handleApiGamesCallback(req, res, db);
        return;
      }

      if (HOSTING_API_PATH_RE.test(pathname)) {
        if (!isAdminAuthenticated(req, db)) {
          sendJson(res, 401, {
            success: false,
            message: "Authentication required. Log in to admin panel first."
          });
          return;
        }
        const aliasAdminUrl = new URL(urlObj.toString());
        aliasAdminUrl.pathname = `/admin.99-exch.red${pathname}`;
        const handledHostingAlias = await handleAdminRequest(req, res, aliasAdminUrl, { db, snapshots });
        if (handledHostingAlias) {
          return;
        }
      }

      if (pathname.startsWith("/api/front/")) {
        await handleApiFrontRequest(req, res, urlObj, { db, snapshots });
        return;
      }

      // Keep normal SPA/game route flow by default.
      // External-iframe hard override can still be enabled via env when needed.
      if (FORCE_EXTERNAL_IFRAME_ROUTES) {
        if (req.method === "GET" && isMediaRoute(pathname)) {
          const mediaGame = inferMediaGameSlug(pathname) || "worli3";
          const mediaLaunch = resolveExternalIframeLaunch({
            gameId: mediaGame,
            rawId: mediaGame
          });
          if (mediaLaunch && mediaLaunch.url) {
            sendExternalIframePage(res, mediaLaunch.url, `${mediaGame.toUpperCase()} LIVE`);
            return;
          }
          sendExternalIframePage(res, "https://11xplay.global/casino-detail/99995/150001", "LIVE");
          return;
        }

        if (req.method === "GET") {
          const gameRouteMatch = pathname.match(/^\/casino\/([a-z0-9_-]+)$/i);
          if (gameRouteMatch) {
            const gameSlug = String(gameRouteMatch[1] || "").toLowerCase();
            const launch = resolveExternalIframeLaunch({
              gameId: gameSlug,
              rawId: gameSlug
            });
            if (launch && launch.url) {
              sendExternalIframePage(res, launch.url, gameSlug.toUpperCase());
              return;
            }
          }
        }
      }

      if (req.method === "GET" && ADMIN_ALIAS_LOGIN_PATHS.has(pathname.toLowerCase())) {
        sendText(res, 302, "", "text/plain; charset=utf-8", { Location: "/admin" });
        return;
      }
      if (
        req.method === "GET" &&
        /^(\/mainadmin|\/superadmin|\/agentm|\/agent)\//i.test(pathname)
      ) {
        const normalized = pathname
          .replace(/^\/mainadmin/i, "/admin")
          .replace(/^\/superadmin/i, "/admin")
          .replace(/^\/agentm/i, "/admin")
          .replace(/^\/agent(\/|$)/i, "/admin$1");
        sendText(res, 302, "", "text/plain; charset=utf-8", { Location: normalized || "/admin" });
        return;
      }

      if (
        req.method === "GET" &&
        (pathname === "/admin" ||
          pathname === "/admin/login" ||
          pathname === "/admin.99-exch.red" ||
          pathname === "/admin.99-exch.red/login")
      ) {
        if (isAdminAuthenticated(req, db)) {
          sendText(res, 302, "", "text/plain; charset=utf-8", { Location: "/admin/dashboard" });
        } else {
          sendAdminLoginPage(req, res);
        }
        return;
      }

      const isAdminPath =
        pathname.startsWith("/admin.99-exch.red") || pathname.startsWith("/admin/");
      if (isAdminPath) {
        if (!isAdminAuthenticated(req, db) && !isAdminPublicPath(pathname, req.method)) {
          sendText(res, 302, "", "text/plain; charset=utf-8", { Location: "/admin" });
          return;
        }

        const rewrittenPathname = pathname.startsWith("/admin/")
          ? `/admin.99-exch.red${pathname.slice("/admin".length)}`
          : pathname;
        const adminUrlObj = new URL(urlObj.toString());
        adminUrlObj.pathname = rewrittenPathname;

        const handled = await handleAdminRequest(req, res, adminUrlObj, { db, snapshots });
        if (handled) {
          return;
        }
      }

      const forcedFile = resolveForcedFile(pathname);
      if (forcedFile) {
        sendFile(req, res, forcedFile.filePath, forcedFile.mimeType);
        return;
      }

      // Serve SPA/game routes instantly from local mirror first. Upstream-first
      // is only required for live media payload URLs.
      const prefersUpstreamAsset = isMediaRoute(pathname);
      if (prefersUpstreamAsset) {
        const proxiedFirst = await fetchUpstreamAsset(req, res, urlObj);
        if (proxiedFirst) {
          return;
        }
      }

      const staticPath = resolveStaticPath(pathname);
      if (staticPath) {
        if (isGameLikeRoute(pathname) && isBrokenGameSnapshot(staticPath)) {
          // Ignore stale/placeholder local snapshots for game/media URLs.
        } else {
          sendFile(req, res, staticPath);
          return;
        }
      }

      if (isGameRoute(pathname)) {
        let indexFile = path.join(SITE_DIR, "index.html");
        if (!fs.existsSync(indexFile)) {
          indexFile = path.join(ROOT_DIR, "index.html");
        }
        sendFile(req, res, indexFile);
        return;
      }

      if (!prefersUpstreamAsset) {
        const proxiedAsset = await fetchUpstreamAsset(req, res, urlObj);
        if (proxiedAsset) {
          return;
        }
      } else {
        const proxiedRetry = await fetchUpstreamAsset(req, res, urlObj);
        if (proxiedRetry) {
          return;
        }
      }

      if (isMediaRoute(pathname)) {
        sendMediaVideoPlayer(res);
        return;
      }

      if (staticPath) {
        sendFile(req, res, staticPath);
        return;
      }

      const requestedRoot = pathname.replace(/^\/+/, "").split("/")[0];
      const shouldServeSpa =
        !pathname.startsWith("/api/") &&
        !path.extname(pathname) &&
        !MIRROR_HOST_DIRS.has(requestedRoot);
      if (shouldServeSpa) {
        let indexFile = path.join(SITE_DIR, "index.html");
        if (!fs.existsSync(indexFile)) {
          indexFile = path.join(ROOT_DIR, "index.html");
        }
        sendFile(req, res, indexFile);
        return;
      }

      sendText(res, 404, `Not found: ${pathname}`);
    } catch (error) {
      sendText(res, 500, `Server error: ${error.message}`);
    }
  });
}

function startServer() {
  const server = createAppServer();
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
  server.requestTimeout = 120000;
  server.listen(PORT, HOST, () => {
    console.log(`Local mirror server running at http://${HOST}:${PORT}`);
    void primeApiGamesCatalog().catch(() => {});
    void buildHomeApiGamesPayload().catch(() => {});
    if (ENABLE_PROVIDER_LOBBY_PAGES) {
      void Promise.all([
        resolveProviderLobbyRows("all"),
        resolveProviderLobbyRows("lc"),
        resolveProviderLobbyRows("vc"),
        resolveProviderLobbyRows("slot"),
        resolveProviderLobbyRows("xgame")
      ]).catch(() => {});
    }
  });
  return server;
}

module.exports = {
  createAppServer,
  startServer
};
