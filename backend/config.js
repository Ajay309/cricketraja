const fs = require("fs");
const path = require("path");


const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const UPSTREAM_LIVE_FEED = process.env.UPSTREAM_LIVE_FEED !== "0";
const DEFAULT_UPSTREAM_BASE_URL = "https://diamondexch99.now";
const UPSTREAM_BASE_URL = process.env.UPSTREAM_BASE_URL || DEFAULT_UPSTREAM_BASE_URL;
const UPSTREAM_BASE_URLS = (() => {
  const raw = String(process.env.UPSTREAM_BASE_URLS || "").trim();
  const parsed = (
    raw
      ? raw
      : `https://diamondexch99.now,https://www.diamondexch99.now,${UPSTREAM_BASE_URL}`
  )
    .split(",")
    .map((value) => value.trim().replace(/\/+$/, ""))
    .filter(Boolean);
  return [...new Set(parsed)];
})();

const ROOT_DIR = path.resolve(__dirname, "..");
const SITE_HOST = "allpanelexch9.co";
const SITE_SOURCE_DIR = "site";
const SITE_DIR = (() => {
  const preferred = path.join(ROOT_DIR, SITE_SOURCE_DIR);
  if (fs.existsSync(preferred) && fs.statSync(preferred).isDirectory()) {
    return preferred;
  }
  return ROOT_DIR;
})();

console.log(`[Config] ROOT_DIR: ${ROOT_DIR}`);
console.log(`[Config] SITE_DIR: ${SITE_DIR}`);

const API_FRONT_DIR = path.join(SITE_DIR, "api", "front");
const API_SECRET = "cae7b808-8b1e-4f47-87a5-1a4b6a08030e";
const API_GAMES_ENABLED = process.env.API_GAMES_ENABLED !== "0";
const API_GAMES_BASE_URL = process.env.API_GAMES_BASE_URL || UPSTREAM_BASE_URL;
const API_GAMES_PROXY_URL =
  process.env.API_GAMES_PROXY_URL ||
  process.env.API_GAMES_BASE_URL ||
  "https://sqwzecuuatenlhlzqver.supabase.co/functions/v1/user-api-proxy";
const API_GAMES_KEY =
  process.env.API_GAMES_KEY || "rdx_6d19426d155043b6fb814e4491543bf5f052baf3325c5873";
const API_GAMES_SECRET =
  process.env.API_GAMES_SECRET ||
  "rdxs_45357d3025d045c0c1765b379493df0740b313f63bd42e06334a230e12cc1f34";
const API_GAMES_SECRET_KEY = process.env.API_GAMES_SECRET_KEY || API_SECRET;
const API_GAMES_AGENT_ID = process.env.API_GAMES_AGENT_ID || "";
const API_GAMES_TOKEN = process.env.API_GAMES_TOKEN || "";
const API_GAMES_PAYLOAD_MODE = String(process.env.API_GAMES_PAYLOAD_MODE || "encrypted").toLowerCase();
const API_GAMES_AUTH_HEADER = process.env.API_GAMES_AUTH_HEADER || "authorization";
const API_GAMES_TIMEOUT_MS = Number(process.env.API_GAMES_TIMEOUT_MS || 8000);
const API_GAMES_CURRENCY = process.env.API_GAMES_CURRENCY || "INR";
const API_GAMES_LANGUAGE = process.env.API_GAMES_LANGUAGE || "en";
const API_GAMES_DEFAULT_CREDIT = Number(process.env.API_GAMES_DEFAULT_CREDIT || 100);
const API_GAMES_LIST_FILE = process.env.API_GAMES_LIST_FILE || "";
const API_GAMES_CALLBACK_PATH =
  String(process.env.API_GAMES_CALLBACK_PATH || "/callback.php").trim() ||
  "/callback.php";
const API_GAMES_CALLBACK_REQUIRE_SIGNATURE =
  String(process.env.API_GAMES_CALLBACK_REQUIRE_SIGNATURE || "1").trim() !== "0";
const API_GAMES_IMAGE_PROXY_ENABLED = process.env.API_GAMES_IMAGE_PROXY_ENABLED !== "0";
const API_GAMES_IMAGE_ALLOWLIST = String(process.env.API_GAMES_IMAGE_ALLOWLIST || "")
  .split(",")
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean);
const LOCAL_DB_FILE = path.join(ROOT_DIR, "backend", "data", "local-db.json");
const MATKA_LIVE_ENABLED = process.env.MATKA_LIVE_ENABLED !== "0";
const MATKA_UPSTREAM_BASE_URL = process.env.MATKA_UPSTREAM_BASE_URL || "https://diamondexch99.now";
const MATKA_BROWSER_PATH = process.env.MATKA_BROWSER_PATH || "";

const MIRROR_HOST_TO_DIR = new Map([
  [SITE_HOST, SITE_SOURCE_DIR],
  ["casino", "casino"],
  ["admin", "admin.99-exch.red"],
  ["admin.99-exch.red", "admin.99-exch.red"],
  ["api.ipify.org", "ip"],
  ["cdn.jsdelivr.net", "jsd"],
  ["cdnjs.cloudflare.com", "fa"],
  ["code.jquery.com", "jq"],
  ["dataobj.ecoassetsservice.com", "casino"],
  ["fonts.googleapis.com", "gcss"],
  ["fonts.gstatic.com", "gfont"],
  ["sitethemedata.com", "theme"],
  ["versionobj.ecoassetsservice.com", "front"],
  ["api2b.pro", "api2b.pro"],
  ["api2bexch.khelo365.app", "api2bexch.khelo365.app"],
  ["img.m167cw.com", "img.m167cw.com"],
  ["staging-acegames.s3.amazonaws.com", "staging-acegames.s3.amazonaws.com"],
  ["wver.sprintstaticdata.com", "badge"],
  ["www.google.com", "recap"],
  ["www.gstatic.com", "grun"],
  ["_DataURI", "datauri"]
]);

const MIRROR_HOST_DIRS = new Set(MIRROR_HOST_TO_DIR.keys());

const API_ALIAS_STEMS = new Map([
  ["/api/front/highlighthome", "/api/front/highlighthomePrivate"],
  ["/api/front/gamedata", "/api/front/gamedataPrivate"],
  ["/api/front/gamedetail", "/api/front/gamedetailPrivate"],
  ["/api/front/game_data_open", "/api/front/gamedataPrivate"],
  ["/api/front/game_detail_open", "/api/front/gamedetailPrivate"],
  ["/api/front/get_highlight_open_data", "/api/front/highlighthomePrivate"],
  ["/api/front/cat_list_open", "/api/front/casino/catlist"],
  ["/api/front/provider_list_open", "/api/front/casino/providerlist"],
  ["/api/front/slot_list_open", "/api/front/casino/slotlist"],
  ["/api/front/other_open", "/api/front/casino/other"],
  ["/api/front/get_casino_list", "/api/front/casino/alllist"],
  ["/api/front/get_casino_tab_list", "/api/front/casino/tablist"],
  ["/api/front/get_casino_table_list", "/api/front/casino/tablelist"],
  ["/api/front/get_tree_open_data", "/api/front/treedata"],
  ["/api/front/gettv", "/api/front/cricketvdata2"],
  ["/api/front/vcasino/data2", "/api/front/casino/data2"],
  ["/api/front/vcasino/lastresultsnew", "/api/front/casino/lastresultsnew"],
  ["/api/front/tpcasinoresult", "/api/front/casinoresults"],
  ["/api/front/login", "/api/front/demo-login"],
  ["/api/front/deposite-with-image", "/api/front/demo-login"],
  ["/api/front/depositautolink", "/api/front/demo-login"],
  ["/api/front/deposit-statement", "/api/front/accountstatement"],
  ["/api/front/withdraw-statement", "/api/front/accountstatement"]
]);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8"
};

const FORCED_MIME_BY_REQUEST_PATH = new Map([
  ["/cdn.jsdelivr.net/npm/sweetalert2@11", "application/javascript; charset=utf-8"],
  ["/cdn.jsdelivr.net/npm/sweetalert2@11.html", "application/javascript; charset=utf-8"],
  ["/fonts.googleapis.com/css2", "text/css; charset=utf-8"]
]);

const FORCED_FILE_BY_REQUEST_PATH = new Map([
  [
    "/cdn.jsdelivr.net/npm/sweetalert2@11",
    path.join(ROOT_DIR, "jsd", "npm", "sweetalert2@11.html")
  ],
  [
    "/cdn.jsdelivr.net/npm/sweetalert2@11.html",
    path.join(ROOT_DIR, "jsd", "npm", "sweetalert2@11.html")
  ],
  ["/fonts.googleapis.com/css2", path.join(ROOT_DIR, "gcss", "css2.css")]
]);

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Requested-With, Authorization",
  "Content-Security-Policy":
    "default-src 'self' data: blob: 'unsafe-inline' 'unsafe-eval'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https: http:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https://allpanelexch.com https://allpanelexch9.co https://diamondexch99.now https://www.diamondexch99.now https://sportsscore24.com wss://sportsscore24.com https://11xplay.global https://*.11xplay.global https://sqwzecuuatenlhlzqver.supabase.co https://*.supabase.co https://firebaseinstallations.googleapis.com https://fcmregistrations.googleapis.com; " +
    "frame-src 'self' data: blob: https://allpanelexch.com https://allpanelexch9.co https://diamondexch99.now https://www.diamondexch99.now https://11xplay.global https://*.11xplay.global https://sqwzecuuatenlhlzqver.supabase.co https://*.supabase.co; " +
    "worker-src 'self' blob:; " +
    "media-src 'self' data: blob:;"
};

const DEFAULT_NEWS_MESSAGE =
  "We are happy to announce that we are bringing you a new world of gambling.";

module.exports = {
  PORT,
  HOST,
  UPSTREAM_LIVE_FEED,
  UPSTREAM_BASE_URL,
  UPSTREAM_BASE_URLS,
  ROOT_DIR,
  SITE_HOST,
  SITE_DIR,
  API_FRONT_DIR,
  API_SECRET,
  API_GAMES_ENABLED,
  API_GAMES_BASE_URL,
  API_GAMES_PROXY_URL,
  API_GAMES_KEY,
  API_GAMES_SECRET,
  API_GAMES_SECRET_KEY,
  API_GAMES_AGENT_ID,
  API_GAMES_TOKEN,
  API_GAMES_PAYLOAD_MODE,
  API_GAMES_AUTH_HEADER,
  API_GAMES_TIMEOUT_MS,
  API_GAMES_CURRENCY,
  API_GAMES_LANGUAGE,
  API_GAMES_DEFAULT_CREDIT,
  API_GAMES_LIST_FILE,
  API_GAMES_CALLBACK_PATH,
  API_GAMES_CALLBACK_REQUIRE_SIGNATURE,
  API_GAMES_IMAGE_PROXY_ENABLED,
  API_GAMES_IMAGE_ALLOWLIST,
  MATKA_LIVE_ENABLED,
  MATKA_UPSTREAM_BASE_URL,
  MATKA_BROWSER_PATH,
  LOCAL_DB_FILE,
  MIRROR_HOST_TO_DIR,
  MIRROR_HOST_DIRS,
  API_ALIAS_STEMS,
  MIME_TYPES,
  FORCED_MIME_BY_REQUEST_PATH,
  FORCED_FILE_BY_REQUEST_PATH,
  SECURITY_HEADERS,
  DEFAULT_NEWS_MESSAGE
};
