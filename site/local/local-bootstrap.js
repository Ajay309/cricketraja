(function () {
  var localWalletSyncCallback = null;
  var localWalletSyncPending = false;

  function triggerLocalWalletSync() {
    if (localWalletSyncCallback) {
      localWalletSyncCallback();
      return;
    }
    localWalletSyncPending = true;
  }

  var mirroredHosts = new Set([
    "allpanelexch9.co",
    "api.ipify.org",
    "cdn.jsdelivr.net",
    "cdnjs.cloudflare.com",
    "code.jquery.com",
    "dataobj.ecoassetsservice.com",
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "sitethemedata.com",
    "versionobj.ecoassetsservice.com",
    "wver.sprintstaticdata.com",
    "www.google.com",
    "www.gstatic.com"
  ]);
  var KNOWN_CASINO_ROUTE_IDS = new Set([
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
    "matka-market",
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
  var CASINO_FALLBACK_ROUTE_ID = "superover2";
  var NORMALIZED_KNOWN_CASINO_ROUTE_IDS = new Set();

  if (typeof Element !== "undefined" && !Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  if (typeof Element !== "undefined" && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;
      do {
        if (el.matches && el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
  if (typeof Number.isFinite !== "function") {
    Number.isFinite = function (value) {
      return typeof value === "number" && isFinite(value);
    };
  }

  function normalizeLegacyToken(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  function safeDetachNode(node, parentHint) {
    if (!node) {
      return;
    }
    try {
      var parent = parentHint || node.parentNode;
      if (!parent || typeof parent.removeChild !== "function") {
        return;
      }
      if (node.parentNode !== parent) {
        return;
      }
      parent.removeChild(node);
    } catch (_error) {
    }
  }

  KNOWN_CASINO_ROUTE_IDS.forEach(function (id) {
    var normalized = normalizeLegacyToken(id);
    if (normalized) {
      NORMALIZED_KNOWN_CASINO_ROUTE_IDS.add(normalized);
    }
  });

  function getCasinoRouteParts(pathname) {
    var cleanPath = String(pathname || "").trim();
    if (!cleanPath || cleanPath.indexOf("/casino/") !== 0) {
      return null;
    }
    var segments = cleanPath.split("/").filter(Boolean);
    if (segments.length < 2 || String(segments[0]).toLowerCase() !== "casino") {
      return null;
    }
    var routeId = String(segments[1] || "").trim();
    if (!routeId) {
      return null;
    }
    return {
      routeId: routeId,
      normalizedRouteId: routeId.toLowerCase()
    };
  }

  function rewriteUnknownCasinoRoute(urlObj) {
    if (!urlObj || !urlObj.pathname) {
      return false;
    }
    var routeInfo = getCasinoRouteParts(urlObj.pathname);
    if (!routeInfo) {
      return false;
    }
    if (KNOWN_CASINO_ROUTE_IDS.has(routeInfo.normalizedRouteId)) {
      return false;
    }
    urlObj.pathname = "/casino/" + CASINO_FALLBACK_ROUTE_ID;
    if (!urlObj.searchParams.get("gid")) {
      urlObj.searchParams.set("gid", routeInfo.routeId);
    }
    return true;
  }

  function appendCasinoRouteIdToLaunchApi(urlObj) {
    if (!urlObj || !urlObj.pathname) {
      return false;
    }
    var endpointPath = String(urlObj.pathname || "").toLowerCase();
    if (
      endpointPath !== "/api/front/casino/launchother" &&
      endpointPath !== "/api/front/casino/launch"
    ) {
      return false;
    }
    if (urlObj.searchParams.get("gid")) {
      return false;
    }

    var pageUrl;
    try {
      pageUrl = new URL(window.location.href);
    } catch (_error) {
      return false;
    }
    var pageRoute = getCasinoRouteParts(pageUrl.pathname);
    if (!pageRoute) {
      return false;
    }

    var gid = String(pageUrl.searchParams.get("gid") || "").trim();
    if (!gid && !KNOWN_CASINO_ROUTE_IDS.has(pageRoute.normalizedRouteId)) {
      gid = pageRoute.routeId;
    }
    if (!gid) {
      return false;
    }
    urlObj.searchParams.set("gid", gid);
    return true;
  }

  function extractProviderLaunchGid(urlObj) {
    if (!urlObj || !urlObj.pathname) {
      return "";
    }
    if (String(urlObj.searchParams.get("local_fallback") || "").trim() === "1") {
      return "";
    }
    var routeInfo = getCasinoRouteParts(urlObj.pathname);
    if (!routeInfo) {
      return "";
    }
    if (routeInfo.normalizedRouteId !== CASINO_FALLBACK_ROUTE_ID) {
      return "";
    }
    var gid = String(urlObj.searchParams.get("gid") || "").trim();
    if (!gid) {
      return "";
    }
    var normalizedGid = normalizeLegacyToken(gid);
    if (!normalizedGid) {
      return "";
    }
    if (NORMALIZED_KNOWN_CASINO_ROUTE_IDS.has(normalizedGid)) {
      return "";
    }
    return gid;
  }

  function maybeNavigateToProviderLaunch(urlObj) {
    var gid = extractProviderLaunchGid(urlObj);
    if (!gid) {
      return false;
    }
    var launchPath = "/provider-game?gid=" + encodeURIComponent(gid);
    var memberAccount = resolveMemberAccountFromStorage();
    if (memberAccount) {
      launchPath += "&member=" + encodeURIComponent(memberAccount);
    }
    if ((window.location.pathname + window.location.search) === launchPath) {
      return false;
    }
    window.location.replace(launchPath);
    return true;
  }

  function safeMemberToken(value) {
    return String(value || "")
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .slice(0, 32);
  }

  function tryParseJson(value) {
    if (!value || typeof value !== "string") {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (_error) {
      return null;
    }
  }

  function pickMemberFromObject(obj) {
    if (!obj || typeof obj !== "object") {
      return "";
    }
    var keys = ["member_account", "username", "uname", "user_name", "login", "userId", "userid"];
    for (var index = 0; index < keys.length; index += 1) {
      var key = keys[index];
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }
      var candidate = safeMemberToken(obj[key]);
      if (candidate) {
        return candidate;
      }
    }
    return "";
  }

  function resolveMemberAccountFromStorage() {
    try {
      var persistRoot = localStorage.getItem("persist:root");
      var parsedRoot = tryParseJson(persistRoot);
      if (!parsedRoot) {
        return "";
      }
      var directMember = pickMemberFromObject(parsedRoot);
      if (directMember) {
        return directMember;
      }
      var nestedKeys = ["user", "auth", "data"];
      for (var index = 0; index < nestedKeys.length; index += 1) {
        var nestedValue = parsedRoot[nestedKeys[index]];
        if (!nestedValue) {
          continue;
        }
        var parsedNested = typeof nestedValue === "string" ? tryParseJson(nestedValue) : nestedValue;
        var nestedMember = pickMemberFromObject(parsedNested);
        if (nestedMember) {
          return nestedMember;
        }
        if (parsedNested && parsedNested.data && typeof parsedNested.data === "object") {
          var nestedDataMember = pickMemberFromObject(parsedNested.data);
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

  var FORCE_SERVER_NAVIGATION_PATHS = new Set([
    "/casino-list",
    "/casino-list/lc/lc",
    "/casino-list/vc/vc",
    "/live-casino-list",
    "/live-casino-list/slot/slot",
    "/slot-list",
    "/open-casino-list",
    "/open-casino-list/lc/lc",
    "/open-casino-list/vc/vc",
    "/open-casino-list/slot/slot",
    "/open-casino-list/xgame/xgame",
    "/open-live-casino-list",
    "/open-live-casino-list/lc/lc",
    "/open-live-casino-list/vc/vc",
    "/open-live-casino-list/slot/slot",
    "/open-live-casino-list/xgame/xgame",
    "/open-slot-list",
    "/open-fantasy-list",
    "/casino",
    "/slots",
    "/fantasy",
    "/virtual",
    "/fishing"
  ]);
  var ENABLE_SERVER_LOBBY_REDIRECTS = false;
  var ENABLE_HOME_LIVE_REDIRECT = false;
  var HOME_LIVE_REDIRECT_SOURCE_PATH = "/home";
  var HOME_LIVE_REDIRECT_TARGET_PATH = "/casino-list/lc/lc";
  var HOME_LANDING_LOCK_MS = 12000;
  var homeLandingLockUntil = Date.now() + HOME_LANDING_LOCK_MS;
  var LIVE_CASINO_LANDING_PATHS = new Set([
    "/casino-list/lc/lc",
    "/live-casino-list",
    "/live-casino-list/slot/slot"
  ]);
  var ENABLE_HOME_API_GAMES_PANEL = true;
  var HOME_API_GAMES_ENDPOINT = "/api/provider/home-games";
  var HOME_API_GAMES_PANEL_ID = "local-home-api-games-panel";
  var HOME_API_GAMES_STYLE_ID = "local-home-api-games-style";
  var HOME_API_GAMES_STORAGE_KEY = "local_home_api_games_cache_v3";
  var HOME_API_GAMES_STORAGE_TTL_MS = 5 * 60 * 1000;
  var HOME_API_GAMES_MAX = 400;
  var homeApiGamesCache = null;
  var homeApiGamesFetchPromise = null;
  var homeApiGamesRenderTimer = 0;
  var homeApiGamesLastPayload = null;

  function normalizePathname(pathname) {
    var normalized = String(pathname || "")
      .trim()
      .toLowerCase()
      .replace(/\/+$/, "");
    return normalized || "/";
  }

  function isForceServerLobbyPath(pathname) {
    var normalized = normalizePathname(pathname);
    if (FORCE_SERVER_NAVIGATION_PATHS.has(normalized)) {
      return true;
    }
    return (
      /^\/(?:open-)?(?:live-casino-list|casino-list)\/[a-z0-9_-]+\/[a-z0-9_-]+$/i.test(normalized) ||
      /^\/open-(?:slot|fantasy)-list$/i.test(normalized)
    );
  }

  function maybeNavigateToServerLobby(urlObj) {
    if (!ENABLE_SERVER_LOBBY_REDIRECTS) {
      return false;
    }
    if (!urlObj || !urlObj.pathname) {
      return false;
    }
    var normalizedPathname = normalizePathname(urlObj.pathname);
    if (!isForceServerLobbyPath(normalizedPathname)) {
      return false;
    }
    var targetPath = normalizedPathname + (urlObj.search || "") + (urlObj.hash || "");
    if ((window.location.pathname + window.location.search + window.location.hash) === targetPath) {
      return false;
    }
    window.location.assign(targetPath);
    return true;
  }

  function maybeRedirectHomeToLiveCasino(urlObj) {
    if (!ENABLE_HOME_LIVE_REDIRECT) {
      return false;
    }
    if (!urlObj || !urlObj.pathname) {
      return false;
    }
    var normalizedPathname = normalizePathname(urlObj.pathname);
    if (normalizedPathname !== HOME_LIVE_REDIRECT_SOURCE_PATH) {
      return false;
    }
    var targetPath = HOME_LIVE_REDIRECT_TARGET_PATH + (urlObj.search || "") + (urlObj.hash || "");
    if ((window.location.pathname + window.location.search + window.location.hash) === targetPath) {
      return false;
    }
    window.location.assign(targetPath);
    return true;
  }

  function maybeBlockAutoLiveCasinoLanding(urlObj) {
    if (!urlObj || !urlObj.pathname) {
      return false;
    }
    if (Date.now() > homeLandingLockUntil) {
      return false;
    }
    var current = normalizePathname(window.location.pathname);
    var next = normalizePathname(urlObj.pathname);
    if (current !== "/" && current !== "/home") {
      return false;
    }
    if (!LIVE_CASINO_LANDING_PATHS.has(next)) {
      return false;
    }
    window.location.replace("/home");
    return true;
  }

  function escapeHtmlText(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function isLoginLikePage() {
    var normalized = normalizePathname(window.location.pathname);
    if (normalized !== "/" && normalized !== "/index" && normalized !== "/index.html") {
      return false;
    }
    if (hasActiveSessionState()) {
      return false;
    }
    if (!document || typeof document.querySelector !== "function") {
      return true;
    }
    if (document.querySelector("input[type='password']")) {
      return true;
    }
    var loginButtons = document.querySelectorAll("button, a");
    for (var i = 0; i < loginButtons.length; i += 1) {
      var text = String(loginButtons[i].textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      if (!text) {
        continue;
      }
      if (text.indexOf("login") !== -1 && text.indexOf("logout") === -1) {
        return true;
      }
      if (text.indexOf("demo") !== -1 && text.indexOf("login") !== -1) {
        return true;
      }
      if (text.indexOf("download apk") !== -1) {
        return true;
      }
    }
    return false;
  }

  function isHomeRoutePath() {
    var normalized = normalizePathname(window.location.pathname);
    if (normalized === "/home") {
      return true;
    }
    if (normalized === "/") {
      return !isLoginLikePage();
    }
    return false;
  }

  var WHITE_SCREEN_RECOVERY_MARKER_KEY = "local_white_screen_recovery_path";

  function hasLegacyLobbyHashState() {
    var hashText = String(window.location.hash || "")
      .replace(/^#/, "")
      .trim()
      .toLowerCase();
    return hashText.indexOf("lobby=") === 0 || hashText.indexOf("lobby-") === 0 || hashText === "lobby";
  }

  function hasActiveSessionState() {
    try {
      var root = tryParseJson(localStorage.getItem("persist:root") || "");
      if (!root || typeof root !== "object") {
        return false;
      }
      var user = typeof root.user === "string" ? tryParseJson(root.user) : root.user;
      var userData = user && typeof user.data === "string" ? tryParseJson(user.data) : user && user.data;
      var directToken = sanitizeAuthToken(root.token || "");
      var userToken = sanitizeAuthToken((user && user.token) || (userData && userData.token) || "");
      var userLoginFlag = "";
      if (user && typeof user === "object") {
        userLoginFlag = user.logedIn || user.loggedIn || "";
      }
      var loginFlag = String(root.logedIn || root.loggedIn || userLoginFlag || "").toLowerCase();
      return Boolean(directToken || userToken || loginFlag === "true");
    } catch (_sessionErr) {
      return false;
    }
  }

  function isWhiteScreenRecoveryPath(pathname) {
    var normalized = normalizePathname(pathname);
    if ((normalized === "/home" || normalized === "/") && hasLegacyLobbyHashState()) {
      return true;
    }
    return (
      normalized === "/provider-game" ||
      /^\/game-details\/.+/i.test(normalized) ||
      /^\/casino\/.+/i.test(normalized) ||
      /^\/sportsbook\/.+/i.test(normalized)
    );
  }

  function shouldRecoverBlankScreen() {
    if (!hasActiveSessionState()) {
      return false;
    }
    if (!isWhiteScreenRecoveryPath(window.location.pathname)) {
      return false;
    }
    if (!document.body) {
      return false;
    }
    var bodyText = String(document.body.innerText || "").replace(/\s+/g, " ").trim();
    if (bodyText.length > 40) {
      return false;
    }
    var strongUiMarkers = document.querySelector(
      ".header-top, .top-header, .right_col, .market_area, .game-wrap, .container-fluid .row"
    );
    if (strongUiMarkers) {
      return false;
    }
    return true;
  }

  function recoverBlankScreenToHome() {
    if (!shouldRecoverBlankScreen()) {
      try {
        sessionStorage.removeItem(WHITE_SCREEN_RECOVERY_MARKER_KEY);
      } catch (_markerErr) { }
      return false;
    }
    var currentPath = String(window.location.pathname + window.location.search + window.location.hash).trim();
    var lastRecoveredPath = "";
    try {
      lastRecoveredPath = String(sessionStorage.getItem(WHITE_SCREEN_RECOVERY_MARKER_KEY) || "").trim();
    } catch (_readErr) { }
    if (lastRecoveredPath === currentPath) {
      return false;
    }
    try {
      sessionStorage.setItem(WHITE_SCREEN_RECOVERY_MARKER_KEY, currentPath);
    } catch (_writeErr) { }
    var targetPath = "/home";
    if (!hasActiveSessionState()) {
      targetPath = "/";
    }
    if (isHomeRoutePath() && hasLegacyLobbyHashState()) {
      targetPath = String(window.location.pathname + window.location.search).trim() || "/home";
    }
    window.location.replace(targetPath);
    return true;
  }

  function readHomeApiGamesCacheFromStorage() {
    try {
      var raw =
        sessionStorage.getItem(HOME_API_GAMES_STORAGE_KEY) ||
        localStorage.getItem(HOME_API_GAMES_STORAGE_KEY) ||
        "";
      if (!raw) {
        return null;
      }
      var parsed = tryParseJson(raw);
      if (!parsed || typeof parsed !== "object") {
        return null;
      }
      var cacheAt = Number(parsed.at || parsed.updatedAt || 0);
      if (cacheAt > 0 && Date.now() - cacheAt > HOME_API_GAMES_STORAGE_TTL_MS) {
        return null;
      }
      var payload = parsed.data;
      if (!payload || typeof payload !== "object") {
        return null;
      }
      return payload;
    } catch (_cacheReadErr) {
      return null;
    }
  }

  function writeHomeApiGamesCacheToStorage(payload) {
    if (!payload || typeof payload !== "object") {
      return;
    }
    var serialized = JSON.stringify({
      at: Date.now(),
      data: payload
    });
    try {
      sessionStorage.setItem(HOME_API_GAMES_STORAGE_KEY, serialized);
    } catch (_sessionErr) { }
    try {
      localStorage.setItem(HOME_API_GAMES_STORAGE_KEY, serialized);
    } catch (_localErr) { }
  }

  function preloadHomeApiGamesCache() {
    if (homeApiGamesCache) {
      return homeApiGamesCache;
    }
    var stored = readHomeApiGamesCacheFromStorage();
    if (stored) {
      homeApiGamesCache = stored;
      return homeApiGamesCache;
    }
    return null;
  }

  function removeHomeApiGamesPanel() {
    var node = document.getElementById(HOME_API_GAMES_PANEL_ID);
    if (node && node.parentNode) {
      safeDetachNode(node);
    }
    if (document && document.body) {
      document.body.classList.remove("local-mac88-home-only");
    }
  }

  function ensureHomeApiGamesStyles() {
    if (document.getElementById(HOME_API_GAMES_STYLE_ID)) {
      return;
    }
    var style = document.createElement("style");
    style.id = HOME_API_GAMES_STYLE_ID;
    style.textContent =
      "body.local-mac88-home-only .home-page .casino-list," +
      "body.local-mac88-home-only .home-page .casino-list-item," +
      "body.local-mac88-home-only .home-page .casino-tab," +
      "body.local-mac88-home-only .home-page .casino-tab-list{display:none !important;}" +
      "#" + HOME_API_GAMES_PANEL_ID + "{margin:12px 0;padding:0;background:transparent;border:none;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .head{display:none !important;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .tabs{display:none !important;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .grid{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:6px;padding:4px;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .card{display:block;text-decoration:none;position:relative;background:#000;aspect-ratio:1/1;overflow:hidden;border:none;border-radius:4px;box-shadow:0 2px 5px rgba(0,0,0,0.2);transition:transform 0.2s ease, box-shadow 0.2s ease;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .card:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(0,0,0,0.3);z-index:10;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .card img{display:block;width:100%;height:100%;object-fit:cover;transition:opacity 0.2s ease;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .card:hover img{opacity:0.9;}" +
      "#" + HOME_API_GAMES_PANEL_ID + " .card .nm{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent, rgba(0,0,0,0.8) 20%, #0088cc);color:#fff;padding:6px 2px 2px 2px;font-size:8.5px;text-align:center;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;z-index:2;line-height:1.2;font-family:'Inter', sans-serif;letter-spacing:0.3px;}" +
      "/* Global Theme Overrides to Match Allpanelexch */" +
      ".header-top, .top-header, .header, .user-details, .user-balance{background-color:#0088cc !important;color:#fff !important;}" +
      ".sidebar .sidebar-header, .sidebar-info-header{background-color:#0088cc !important;color:#fff !important;}" +
      ".news-bar, .marquee-box{background:#f8f9fa !important;border-bottom:1px solid #ddd;}" +
      ".news-bar marquee, .marquee-box marquee{color:#0088cc !important;font-weight:600;}" +
      ".btn-primary, .btn-login, .btn-signup{background-color:#0088cc !important;border-color:#0d6efd !important;}" +
      "/* Reports & Tables Styling */" +
      ".report-table th, .table th, .matched-bets th, .bet-history th, thead th{background-color:#0088cc !important;color:#fff !important;font-weight:600 !important;text-transform:uppercase !important;font-size:11px !important;border:1px solid #0077b3 !important;}" +
      ".report-table td, .table td, .matched-bets td, .bet-history td{font-family:'Inter', sans-serif !important;font-size:11px !important;}" +
      ".report-title, .page-title{color:#0088cc !important;font-weight:700 !important;text-transform:uppercase !important;}" +
      "@media (max-width: 1400px){ #" + HOME_API_GAMES_PANEL_ID + " .grid{grid-template-columns:repeat(8,1fr);}}" +
      "@media (max-width: 1100px){ #" + HOME_API_GAMES_PANEL_ID + " .grid{grid-template-columns:repeat(6,1fr);}}" +
      "@media (max-width: 768px){ #" + HOME_API_GAMES_PANEL_ID + " .grid{grid-template-columns:repeat(4,1fr);gap:4px;padding:4px;}}" +
      "@media (max-width: 480px){ #" + HOME_API_GAMES_PANEL_ID + " .grid{grid-template-columns:repeat(3,1fr);}}";

    // Inject font if not present
    if (!document.getElementById("local-google-fonts")) {
      var link = document.createElement("link");
      link.id = "local-google-fonts";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }

    document.head.appendChild(style);
  }

  function findHomeApiGamesAnchor() {
    var root = document.getElementById("root");
    if (!root) {
      return null;
    }
    function isFooterLikeNode(node) {
      if (!node || typeof node.closest !== "function") {
        return false;
      }
      if (node.closest("footer, .footer, .footer-bottom, .footer-top, .footer-wrap, .footer-section")) {
        return true;
      }
      var text = String(node.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      if (!text) {
        return false;
      }
      if (text.indexOf("24x7") !== -1 && text.indexOf("support") !== -1) {
        return true;
      }
      if (text.indexOf("terms") !== -1 && text.indexOf("condition") !== -1) {
        return true;
      }
      if (text.indexOf("copyright") !== -1) {
        return true;
      }
      return false;
    }
    function findMainContentContainer() {
      var selectors = [
        ".home-page .center-main-container",
        ".home-page .center-container",
        ".home-page .market_area",
        ".home-page .right_col",
        ".home-page .game-wrap",
        ".home-page .container-fluid",
        ".home-page .content",
        ".center-main-container",
        ".center-container",
        ".market_area",
        ".right_col",
        ".game-wrap"
      ];
      for (var s = 0; s < selectors.length; s += 1) {
        var node = root.querySelector(selectors[s]);
        if (node && !isFooterLikeNode(node)) {
          return node;
        }
      }
      return null;
    }
    var tables = root.querySelectorAll("table");
    for (var i = 0; i < tables.length; i += 1) {
      var text = String(tables[i].textContent || "")
        .replace(/\s+/g, " ")
        .toLowerCase();
      if (text.indexOf("game") !== -1 && text.indexOf("1") !== -1 && text.indexOf("x") !== -1 && text.indexOf("2") !== -1) {
        var tableAnchor = tables[i].closest("div") || tables[i];
        if (!isFooterLikeNode(tableAnchor)) {
          return tableAnchor;
        }
      }
    }
    var mainContainer = findMainContentContainer();
    if (mainContainer) {
      return mainContainer;
    }
    var fallbacks = root.querySelectorAll("div");
    for (var j = 0; j < fallbacks.length; j += 1) {
      var node = fallbacks[j];
      var nodeText = String(node.textContent || "").toLowerCase();
      if (nodeText.indexOf("super over2") !== -1 || nodeText.indexOf("england v india") !== -1) {
        if (!isFooterLikeNode(node)) {
          return node;
        }
      }
    }
    return root;
  }

  function fetchHomeApiGamesData(forceRefresh) {
    preloadHomeApiGamesCache();
    if (homeApiGamesCache && !forceRefresh) {
      return Promise.resolve(homeApiGamesCache);
    }
    if (homeApiGamesFetchPromise && !forceRefresh) {
      return homeApiGamesFetchPromise;
    }
    homeApiGamesFetchPromise = window
      .fetch(HOME_API_GAMES_ENDPOINT, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      })
      .then(function (response) {
        return response.json().catch(function () {
          return {};
        });
      })
      .then(function (payload) {
        if (!payload || Number(payload.code) !== 0 || !payload.data) {
          return homeApiGamesCache || null;
        }
        var nextData = payload.data;
        var nextAll = nextData && Array.isArray(nextData.all) ? nextData.all : [];
        if (!nextAll.length && homeApiGamesCache) {
          return homeApiGamesCache;
        }
        homeApiGamesCache = nextData;
        writeHomeApiGamesCacheToStorage(homeApiGamesCache);
        return homeApiGamesCache;
      })
      .catch(function () {
        return homeApiGamesCache || preloadHomeApiGamesCache() || null;
      })
      .finally(function () {
        homeApiGamesFetchPromise = null;
      });
    return homeApiGamesFetchPromise;
  }

  function appendMemberToLaunchPath(rawLaunchPath, memberAccount) {
    var launchPath = String(rawLaunchPath || "").trim();
    if (!launchPath || !memberAccount) {
      return launchPath;
    }
    try {
      var launchUrl = new URL(launchPath, window.location.origin);
      if (!launchUrl.searchParams.get("member")) {
        launchUrl.searchParams.set("member", memberAccount);
      }
      return (launchUrl.pathname || "/") + (launchUrl.search || "") + (launchUrl.hash || "");
    } catch (_launchParseErr) {
      return launchPath;
    }
  }

  function renderHomeApiGamesCards(data) {
    var all = data && Array.isArray(data.all) ? data.all : [];
    var filtered = [];
    for (var i = 0; i < all.length; i += 1) {
      var candidate = all[i] || {};
      if (candidate && candidate.image) {
        filtered.push(candidate);
      }
    }
    if (HOME_API_GAMES_MAX && filtered.length > HOME_API_GAMES_MAX) {
      filtered = filtered.slice(0, HOME_API_GAMES_MAX);
    }
    if (!filtered.length) {
      return '<div class="meta">API games unavailable right now.</div>';
    }
    var cards = [];
    var memberAccount = resolveMemberAccountFromStorage();
    for (var j = 0; j < filtered.length; j += 1) {
      var game = filtered[j] || {};
      var name = escapeHtmlText(game.name || "Game");
      var launchPath = appendMemberToLaunchPath(game.launchPath || "#", memberAccount);
      launchPath = escapeHtmlText(launchPath || "#");
      var image = escapeHtmlText(String(game.image || ""));
      var type = escapeHtmlText(String(game.type || "").toUpperCase());
      var category = escapeHtmlText(String(game.category || "").trim());
      cards.push(
        '<a class="card" href="' +
        launchPath +
        '" data-type="' +
        escapeHtmlText(String(game.type || "").toLowerCase()) +
        '" data-category="' +
        category.toLowerCase() +
        '">' +
        '<img loading="lazy" src="' +
        image +
        '" alt="' +
        name +
        '" />' +
        '<span class="nm">' +
        name +
        "</span>" +
        "</a>"
      );
    }
    return '<div class="grid" data-grid="1">' + cards.join("") + "</div>";
  }

  function bindHomeApiGamesTabs(panel) {
    if (!panel) {
      return;
    }
    var tabs = panel.querySelectorAll("[data-gtype]");
    var cards = panel.querySelectorAll(".card[data-type]");
    if (!tabs.length || !cards.length) {
      return;
    }
    function setType(type) {
      for (var i = 0; i < tabs.length; i += 1) {
        var active = String(tabs[i].getAttribute("data-gtype") || "") === type;
        if (active) {
          tabs[i].classList.add("active");
        } else {
          tabs[i].classList.remove("active");
        }
      }
      for (var j = 0; j < cards.length; j += 1) {
        var cardType = String(cards[j].getAttribute("data-type") || "");
        var show = type === "all" || cardType === type;
        cards[j].style.display = show ? "" : "none";
      }
    }
    for (var k = 0; k < tabs.length; k += 1) {
      tabs[k].addEventListener("click", function () {
        setType(String(this.getAttribute("data-gtype") || "all"));
      });
    }
    setType("all");
  }

  function isFooterLikeNodeGlobal(node) {
    if (!node || typeof node.closest !== "function") {
      return false;
    }
    if (node.closest("footer, .footer, .footer-bottom, .footer-top, .footer-wrap, .footer-section")) {
      return true;
    }
    var text = String(node.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    if (!text) {
      return false;
    }
    if (text.indexOf("24x7") !== -1 && text.indexOf("support") !== -1) {
      return true;
    }
    if (text.indexOf("terms") !== -1 && text.indexOf("condition") !== -1) {
      return true;
    }
    if (text.indexOf("copyright") !== -1) {
      return true;
    }
    return false;
  }

  function findFooterNode(root) {
    if (!root || !root.querySelector) {
      return null;
    }
    var footer =
      root.querySelector("footer") ||
      root.querySelector(".footer") ||
      root.querySelector(".footer-bottom") ||
      root.querySelector(".footer-top") ||
      root.querySelector(".footer-wrap") ||
      root.querySelector(".footer-section");
    if (footer) {
      return footer;
    }
    var nodes = root.querySelectorAll("div");
    for (var i = 0; i < nodes.length; i += 1) {
      if (isFooterLikeNodeGlobal(nodes[i])) {
        return nodes[i];
      }
    }
    return null;
  }

  function isHomeApiGamesContainerAnchor(node) {
    if (!node || !node.classList) {
      return false;
    }
    return (
      node.classList.contains("center-main-container") ||
      node.classList.contains("center-container") ||
      node.classList.contains("market_area") ||
      node.classList.contains("right_col") ||
      node.classList.contains("game-wrap")
    );
  }

  function renderHomeApiGamesPanel(payload) {
    if (!isHomeRoutePath()) {
      removeHomeApiGamesPanel();
      return;
    }
    if (!payload) {
      return;
    }
    homeApiGamesLastPayload = payload;
    ensureHomeApiGamesStyles();
    var root = document.getElementById("root");
    if (!root) {
      return;
    }
    var anchor = findHomeApiGamesAnchor();

    var totals = payload.totals || {};
    var tabsHtml =
      '<button type="button" data-gtype="all" class="active">All</button>' +
      '<button type="button" data-gtype="lc">Casino ' +
      String(Number(totals.lc || 0)) +
      "</button>" +
      '<button type="button" data-gtype="vc">Virtual ' +
      String(Number(totals.vc || 0)) +
      "</button>" +
      '<button type="button" data-gtype="slot">Slot ' +
      String(Number(totals.slot || 0)) +
      "</button>" +
      '<button type="button" data-gtype="xgame">Crash ' +
      String(Number(totals.xgame || 0)) +
      "</button>";
    if (Number(totals.fishing || 0) > 0) {
      tabsHtml +=
        '<button type="button" data-gtype="fishing">Fishing ' +
        String(Number(totals.fishing || 0)) +
        "</button>";
    }
    var panel = document.getElementById(HOME_API_GAMES_PANEL_ID);
    var panelHtml =
      //'<div class="tabs">' +
      //  tabsHtml +
      //  "</div>" +
      renderHomeApiGamesCards(payload);
    if (!panel) {
      panel = document.createElement("section");
      panel.id = HOME_API_GAMES_PANEL_ID;
      panel.innerHTML = panelHtml;
    } else {
      panel.innerHTML = panelHtml;
    }
    var insertParent = null;
    var insertBefore = null;
    if (anchor && anchor !== root && !isFooterLikeNodeGlobal(anchor)) {
      if (isHomeApiGamesContainerAnchor(anchor)) {
        insertParent = anchor;
        insertBefore = null;
      } else if (anchor.parentNode) {
        insertParent = anchor.parentNode;
        insertBefore = anchor.nextSibling;
      }
    }
    if (!insertParent) {
      var footerNode = findFooterNode(root) || findFooterNode(document.body);
      if (footerNode && footerNode.parentNode) {
        insertParent = footerNode.parentNode;
        insertBefore = footerNode;
      } else {
        insertParent = root;
        insertBefore = null;
      }
    }
    if (insertParent) {
      if (insertBefore && insertBefore === panel) {
        insertBefore = panel.nextSibling;
      }
      if (panel.parentNode !== insertParent || (insertBefore && panel.nextSibling !== insertBefore)) {
        insertParent.insertBefore(panel, insertBefore || null);
      }
    }
    if (document && document.body) {
      document.body.classList.add("local-mac88-home-only");
    }
    bindHomeApiGamesTabs(panel);
  }

  function ensureHomeApiGamesPanelVisible() {
    if (!ENABLE_HOME_API_GAMES_PANEL) {
      removeHomeApiGamesPanel();
      return;
    }
    if (!isHomeRoutePath()) {
      removeHomeApiGamesPanel();
      return;
    }
    if (document.getElementById(HOME_API_GAMES_PANEL_ID)) {
      if (document && document.body) {
        document.body.classList.add("local-mac88-home-only");
      }
      return;
    }
    if (homeApiGamesLastPayload) {
      renderHomeApiGamesPanel(homeApiGamesLastPayload);
      return;
    }
    if (document && document.body) {
      document.body.classList.remove("local-mac88-home-only");
    }
    scheduleHomeApiGamesPanel(120);
  }

  function scheduleHomeApiGamesPanel(delayMs, forceRefresh) {
    if (!ENABLE_HOME_API_GAMES_PANEL) {
      removeHomeApiGamesPanel();
      return;
    }
    clearTimeout(homeApiGamesRenderTimer);
    homeApiGamesRenderTimer = setTimeout(function () {
      if (!isHomeRoutePath()) {
        removeHomeApiGamesPanel();
        return;
      }
      fetchHomeApiGamesData(Boolean(forceRefresh)).then(function (payload) {
        renderHomeApiGamesPanel(payload);
      });
    }, Math.max(0, Number(delayMs || 0)));
  }

  var homeApiGamesObserver = null;
  var homeApiGamesObserverTimer = 0;

  function ensureHomeApiGamesObserver() {
    if (homeApiGamesObserver || !window.MutationObserver) {
      return;
    }
    var root = document.body || document.getElementById("root");
    if (!root) {
      clearTimeout(homeApiGamesObserverTimer);
      homeApiGamesObserverTimer = setTimeout(function () {
        ensureHomeApiGamesObserver();
      }, 120);
      return;
    }
    homeApiGamesObserver = new MutationObserver(function () {
      if (!isHomeRoutePath()) {
        return;
      }
      clearTimeout(homeApiGamesObserverTimer);
      homeApiGamesObserverTimer = setTimeout(function () {
        ensureHomeApiGamesPanelVisible();
      }, 80);
    });
    homeApiGamesObserver.observe(root, {
      childList: true,
      subtree: true
    });
  }

  function rewriteUrl(input) {
    if (!input || typeof input !== "string") {
      return input;
    }
    try {
      var url = new URL(input, window.location.origin);
      var localPath = "";
      var isSameOriginHost =
        url.hostname === window.location.hostname || url.origin === window.location.origin;

      if (mirroredHosts.has(url.hostname)) {
        if (url.hostname === "allpanelexch9.co") {
          localPath = (url.pathname || "/") + (url.search || "") + (url.hash || "");
        } else {
          localPath =
            "/" +
            url.hostname +
            (url.pathname || "/") +
            (url.search || "") +
            (url.hash || "");
        }
      } else if (isSameOriginHost) {
        localPath = (url.pathname || "/") + (url.search || "") + (url.hash || "");
      } else {
        return input;
      }

      var normalized = new URL(localPath, window.location.origin);
      rewriteUnknownCasinoRoute(normalized);
      appendCasinoRouteIdToLaunchApi(normalized);
      return (normalized.pathname || "/") + (normalized.search || "") + (normalized.hash || "");
    } catch (error) {
      return input;
    }
  }

  window.__LOCAL_MIRROR_REWRITE_URL__ = rewriteUrl;

  var ATTRS_TO_REWRITE = ["src", "href", "action", "poster", "style"];
  var primarySourceHost = "allpanelexch9.co";
  var isLocalHost =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";
  // Mirror mode must run on localhost and custom deployed domains (for cPanel/live mirrors).
  var isMirrorMode = isLocalHost || window.location.hostname !== primarySourceHost;
  // Full DOM rewrite observers can freeze the UI during heavy SPA rerenders.
  var ENABLE_DOM_REWRITE_WATCHERS = false;
  var BRAND_LOGO_PATH = "https://sitethemedata.com/sitethemes/diamondexch99.com/front/logo.png";

  if (window.history) {
    if (typeof window.history.pushState === "function") {
      var nativePushState = window.history.pushState;
      window.history.pushState = function (state, title, url) {
        var nextUrl = typeof url === "string" ? rewriteUrl(url) : url;
        if (typeof nextUrl === "string") {
          try {
            var pushUrl = new URL(nextUrl, window.location.origin);
            if (maybeRedirectHomeToLiveCasino(pushUrl)) {
              return;
            }
            if (maybeBlockAutoLiveCasinoLanding(pushUrl)) {
              return;
            }
            if (maybeNavigateToServerLobby(pushUrl)) {
              return;
            }
            if (maybeNavigateToProviderLaunch(pushUrl)) {
              return;
            }
          } catch (_pushErr) { }
        }
        var pushResult = nativePushState.call(this, state, title, nextUrl);
        scheduleHomeApiGamesPanel(120);
        return pushResult;
      };
    }
    if (typeof window.history.replaceState === "function") {
      var nativeReplaceState = window.history.replaceState;
      window.history.replaceState = function (state, title, url) {
        var nextUrl = typeof url === "string" ? rewriteUrl(url) : url;
        if (typeof nextUrl === "string") {
          try {
            var replaceUrl = new URL(nextUrl, window.location.origin);
            if (maybeRedirectHomeToLiveCasino(replaceUrl)) {
              return;
            }
            if (maybeBlockAutoLiveCasinoLanding(replaceUrl)) {
              return;
            }
            if (maybeNavigateToServerLobby(replaceUrl)) {
              return;
            }
            if (maybeNavigateToProviderLaunch(replaceUrl)) {
              return;
            }
          } catch (_replaceErr) { }
        }
        var replaceResult = nativeReplaceState.call(this, state, title, nextUrl);
        scheduleHomeApiGamesPanel(120);
        return replaceResult;
      };
    }
  }

  try {
    var bootUrl = new URL(window.location.href);
    if (rewriteUnknownCasinoRoute(bootUrl)) {
      window.history.replaceState(
        window.history.state || null,
        document.title || "",
        (bootUrl.pathname || "/") + (bootUrl.search || "") + (bootUrl.hash || "")
      );
      bootUrl = new URL(window.location.href);
    }
    if (maybeRedirectHomeToLiveCasino(bootUrl)) {
      return;
    }
    if (maybeBlockAutoLiveCasinoLanding(bootUrl)) {
      return;
    }
    if (maybeNavigateToServerLobby(bootUrl)) {
      return;
    }
    if (maybeNavigateToProviderLaunch(bootUrl)) {
      return;
    }
  } catch (_bootErr) { }
  preloadHomeApiGamesCache();
  scheduleHomeApiGamesPanel(700);
  ensureHomeApiGamesObserver();
  if (document && document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      ensureHomeApiGamesObserver();
      ensureHomeApiGamesPanelVisible();
    }, { once: true });
  }
  setTimeout(function () {
    fetchHomeApiGamesData(false);
  }, 60);
  setTimeout(recoverBlankScreenToHome, 1200);
  setTimeout(recoverBlankScreenToHome, 3200);
  window.addEventListener("popstate", function () {
    scheduleHomeApiGamesPanel(120);
    setTimeout(recoverBlankScreenToHome, 80);
    setTimeout(recoverBlankScreenToHome, 900);
  });
  window.setInterval(function () {
    if (document.hidden) {
      return;
    }
    if (isHomeRoutePath()) {
      ensureHomeApiGamesPanelVisible();
      scheduleHomeApiGamesPanel(1200);
    } else {
      removeHomeApiGamesPanel();
      recoverBlankScreenToHome();
    }
  }, 10000);

  function applyBrandGlobals() {
    window.LOGO_PATH = BRAND_LOGO_PATH;
    window.LOGO_PATH_LOGIN = BRAND_LOGO_PATH;
    try {
      LOGO_PATH = BRAND_LOGO_PATH;
    } catch (_ignore) { }
    try {
      LOGO_PATH_LOGIN = BRAND_LOGO_PATH;
    } catch (_ignore) { }
  }

  function shouldReplaceLogoSrc(srcValue) {
    if (!srcValue || typeof srcValue !== "string") {
      return false;
    }
    var source = srcValue.toLowerCase();
    if (source.indexOf("logo") === -1) {
      return false;
    }
    return (
      source.indexOf("diamondexch") !== -1 ||
      source.indexOf("diamondexch") !== -1 ||
      source.indexOf("allpanel") !== -1 ||
      source.indexOf("allpanelex") !== -1 ||
      source.indexOf("all-logo.svg") !== -1 ||
      source.indexOf("diamondexch-logo") !== -1 ||
      source.indexOf("diamondexch-logo") !== -1 ||
      source.indexOf("member-logo") !== -1
    );
  }

  function enforceBranding(rootNode) {
    applyBrandGlobals();
    if (typeof document.title === "string" && /diamondexch/gi.test(document.title)) {
      document.title = document.title.replace(/diamondexch/gi, "CRICKETRAJA");
    }
    var scope = rootNode && rootNode.querySelectorAll ? rootNode : document;
    if (!scope || !scope.querySelectorAll) {
      return;
    }
    var logoCandidates = scope.querySelectorAll(
      "img[src*='logo'], .logo img, .header-logo img, img[alt*='logo' i]"
    );
    logoCandidates.forEach(function (img) {
      var current = img.getAttribute("src") || "";
      if (shouldReplaceLogoSrc(current)) {
        img.setAttribute("src", BRAND_LOGO_PATH);
      }
      if (!img.getAttribute("loading")) {
        img.setAttribute("loading", "eager");
      }
      img.setAttribute("decoding", "sync");
    });
    var styleLogoNodes = scope.querySelectorAll("[style*='logo']");
    styleLogoNodes.forEach(function (node) {
      var inlineStyle = String(node.getAttribute("style") || "");
      if (!inlineStyle) {
        return;
      }
      var patchedStyle = inlineStyle
        .replace(
          /https?:\/\/sitethemedata\.com\/sitethemes\/[^'")\s]+\/front\/logo\.png/gi,
          BRAND_LOGO_PATH
        )
        .replace(
          /\/sitethemedata\.com\/sitethemes\/[^'")\s]+\/front\/logo\.png/gi,
          BRAND_LOGO_PATH
        );
      if (patchedStyle !== inlineStyle) {
        node.setAttribute("style", patchedStyle);
      }
    });
    var textNodes = scope.querySelectorAll(
      "a, span, div, p, strong, b, h1, h2, h3, h4, h5, button, title"
    );
    textNodes.forEach(function (node) {
      if (!node || node.children.length > 0) {
        return;
      }
      var value = String(node.textContent || "");
      if (!value || !/diamondexch/gi.test(value)) {
        return;
      }
      node.textContent = value.replace(/diamondexch/gi, "CRICKETRAJA");
    });
  }

  function rewriteCssUrls(input) {
    if (typeof input !== "string" || input.indexOf("url(") === -1) {
      return input;
    }
    return input.replace(
      /url\((['"]?)(https?:\/\/[^'")]+)\1\)/gi,
      function (_match, quote, rawUrl) {
        var rewritten = rewriteUrl(rawUrl);
        return "url(" + (quote || "") + rewritten + (quote || "") + ")";
      }
    );
  }

  function rewriteElementAttribute(element, attr) {
    if (!element || typeof element.getAttribute !== "function") {
      return;
    }
    if (isMirrorMode && element.hasAttribute("integrity")) {
      element.removeAttribute("integrity");
    }
    if (isMirrorMode && element.hasAttribute("crossorigin")) {
      element.removeAttribute("crossorigin");
    }
    var value = element.getAttribute(attr);
    if (!value) {
      return;
    }
    var rewritten = value;
    if (attr === "style") {
      rewritten = rewriteCssUrls(value);
    } else {
      rewritten = rewriteUrl(value);
    }
    if (rewritten !== value) {
      element.setAttribute(attr, rewritten);
    }
  }

  function rewriteElementAndChildren(element) {
    if (!element || element.nodeType !== 1) {
      return;
    }
    ATTRS_TO_REWRITE.forEach(function (attr) {
      rewriteElementAttribute(element, attr);
    });
    if (typeof element.querySelectorAll !== "function") {
      return;
    }
    var descendants = element.querySelectorAll("[src],[href],[action],[poster]");
    descendants.forEach(function (node) {
      ATTRS_TO_REWRITE.forEach(function (attr) {
        rewriteElementAttribute(node, attr);
      });
    });
  }

  function patchDomInsertionForRewrite() {
    if (!window.Node || !window.Node.prototype) {
      return;
    }

    function wrap(methodName) {
      var nativeMethod = window.Node.prototype[methodName];
      if (typeof nativeMethod !== "function") {
        return;
      }
      window.Node.prototype[methodName] = function () {
        var node = arguments[0];
        rewriteElementAndChildren(node);
        return nativeMethod.apply(this, arguments);
      };
    }

    wrap("appendChild");
    wrap("insertBefore");
    wrap("replaceChild");
  }

  if (ENABLE_DOM_REWRITE_WATCHERS) {
    patchDomInsertionForRewrite();

    // Normalize dynamically injected absolute URLs (captcha, widgets, etc.) to local mirror paths.
    if (window.MutationObserver && document.documentElement) {
      rewriteElementAndChildren(document.documentElement);
      enforceBranding(document.documentElement);
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === "attributes") {
            rewriteElementAttribute(mutation.target, mutation.attributeName);
            enforceBranding(mutation.target);
            return;
          }
          mutation.addedNodes.forEach(function (node) {
            rewriteElementAndChildren(node);
            enforceBranding(node);
          });
        });
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ATTRS_TO_REWRITE
      });
    }
  }

  applyBrandGlobals();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      enforceBranding(document.documentElement);
    });
  } else {
    enforceBranding(document.documentElement);
  }
  if (ENABLE_DOM_REWRITE_WATCHERS) {
    window.setInterval(function () {
      if (document.hidden) {
        return;
      }
      enforceBranding(document.documentElement);
    }, 15000);
  }

  // Prevent stale local service-worker/cache state from serving an old broken snapshot.
  if (isMirrorMode && navigator && navigator.serviceWorker) {
    navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        registrations.forEach(function (registration) {
          registration.unregister();
        });
      })
      .catch(function () { });
  }
  if (isMirrorMode && window.caches && typeof caches.keys === "function") {
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            return caches.delete(key);
          })
        );
      })
      .catch(function () { });
  }

  if (typeof window.fetch === "function") {
    var nativeFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      if (typeof input === "string") {
        return nativeFetch(rewriteUrl(input), init);
      }
      if (input && typeof input.url === "string") {
        var rewritten = rewriteUrl(input.url);
        if (rewritten !== input.url) {
          input = new Request(rewritten, input);
        }
      }
      return nativeFetch(input, init);
    };
  }

  if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
    var nativeOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function (method, url) {
      var args = Array.prototype.slice.call(arguments);
      args[1] = rewriteUrl(url);
      return nativeOpen.apply(this, args);
    };
  }

  if (navigator && typeof navigator.sendBeacon === "function") {
    var nativeBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (url, data) {
      return nativeBeacon(rewriteUrl(url), data);
    };
  }

  if (typeof window.EventSource === "function") {
    var NativeEventSource = window.EventSource;
    window.EventSource = function (url, config) {
      return new NativeEventSource(rewriteUrl(url), config);
    };
  }

  function installLocalUrlPropertyRewrites() {
    if (!isMirrorMode || !window) {
      return;
    }

    function patchProperty(proto, propertyName) {
      if (!proto) {
        return;
      }
      var descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);
      if (!descriptor || typeof descriptor.set !== "function") {
        return;
      }
      var nativeGet = descriptor.get;
      var nativeSet = descriptor.set;
      try {
        Object.defineProperty(proto, propertyName, {
          configurable: descriptor.configurable !== false,
          enumerable: descriptor.enumerable,
          get: function () {
            if (typeof nativeGet === "function") {
              return nativeGet.call(this);
            }
            return undefined;
          },
          set: function (value) {
            var next = typeof value === "string" ? rewriteUrl(value) : value;
            return nativeSet.call(this, next);
          }
        });
      } catch (error) { }
    }

    patchProperty(window.HTMLImageElement && window.HTMLImageElement.prototype, "src");
    patchProperty(window.HTMLScriptElement && window.HTMLScriptElement.prototype, "src");
    patchProperty(window.HTMLIFrameElement && window.HTMLIFrameElement.prototype, "src");
    patchProperty(window.HTMLSourceElement && window.HTMLSourceElement.prototype, "src");
    patchProperty(window.HTMLLinkElement && window.HTMLLinkElement.prototype, "href");
    patchProperty(window.HTMLAnchorElement && window.HTMLAnchorElement.prototype, "href");

    if (window.Element && window.Element.prototype && window.Element.prototype.setAttribute) {
      var nativeSetAttribute = window.Element.prototype.setAttribute;
      window.Element.prototype.setAttribute = function (name, value) {
        var nextName = typeof name === "string" ? name.toLowerCase() : name;
        var nextValue = value;
        if (typeof value === "string" && ATTRS_TO_REWRITE.indexOf(nextName) !== -1) {
          nextValue = nextName === "style" ? rewriteCssUrls(value) : rewriteUrl(value);
        }
        return nativeSetAttribute.call(this, name, nextValue);
      };
    }

    if (
      window.CSSStyleDeclaration &&
      window.CSSStyleDeclaration.prototype &&
      typeof window.CSSStyleDeclaration.prototype.setProperty === "function"
    ) {
      var nativeSetProperty = window.CSSStyleDeclaration.prototype.setProperty;
      window.CSSStyleDeclaration.prototype.setProperty = function (name, value, priority) {
        var nextValue = value;
        if (
          typeof value === "string" &&
          name &&
          (String(name).indexOf("background") !== -1 || String(name).indexOf("content") !== -1)
        ) {
          nextValue = rewriteCssUrls(value);
        }
        return nativeSetProperty.call(this, name, nextValue, priority);
      };

      function patchStyleUrlProperty(propertyName) {
        var descriptor = Object.getOwnPropertyDescriptor(
          window.CSSStyleDeclaration.prototype,
          propertyName
        );
        if (!descriptor || typeof descriptor.set !== "function") {
          return;
        }
        try {
          Object.defineProperty(window.CSSStyleDeclaration.prototype, propertyName, {
            configurable: descriptor.configurable !== false,
            enumerable: descriptor.enumerable,
            get: function () {
              if (typeof descriptor.get === "function") {
                return descriptor.get.call(this);
              }
              return "";
            },
            set: function (value) {
              var nextValue = typeof value === "string" ? rewriteCssUrls(value) : value;
              return descriptor.set.call(this, nextValue);
            }
          });
        } catch (error) { }
      }

      patchStyleUrlProperty("background");
      patchStyleUrlProperty("backgroundImage");
      patchStyleUrlProperty("content");
    }
  }

  installLocalUrlPropertyRewrites();

  function installLocalRecaptchaBypass() {
    if (!isMirrorMode || !window || !document) {
      return;
    }

    var token = "";
    var widgetIdCounter = 0;
    var widgetCallbacks = {};

    function setToken(nextToken) {
      token = nextToken || "";
      var nodes = document.querySelectorAll(
        "#g-recaptcha-response, textarea[name='g-recaptcha-response']"
      );
      nodes.forEach(function (node) {
        if (typeof node.value !== "undefined") {
          node.value = token;
        }
      });
    }

    function invokeCallback(callback, callbackToken) {
      if (!callback) {
        return;
      }
      try {
        if (typeof callback === "function") {
          callback(callbackToken);
          return;
        }
        if (typeof callback === "string" && typeof window[callback] === "function") {
          window[callback](callbackToken);
        }
      } catch (error) { }
    }

    function patchApi(apiObj) {
      if (!apiObj || apiObj.__localBypassPatched) {
        return apiObj;
      }

      var nativeRender =
        typeof apiObj.render === "function" ? apiObj.render.bind(apiObj) : null;

      apiObj.ready = function (cb) {
        if (typeof cb === "function") {
          try {
            cb();
          } catch (error) { }
        }
      };

      apiObj.render = function (container, parameters) {
        var widgetId;
        if (nativeRender) {
          try {
            widgetId = nativeRender(container, parameters);
          } catch (error) {
            widgetId = undefined;
          }
        }
        if (typeof widgetId === "undefined" || widgetId === null) {
          widgetId = ++widgetIdCounter;
        }
        if (parameters && parameters.callback) {
          widgetCallbacks[String(widgetId)] = parameters.callback;
        }
        return widgetId;
      };

      apiObj.execute = function (widgetId) {
        var widgetKey =
          typeof widgetId === "undefined" || widgetId === null
            ? null
            : String(widgetId);
        var generated = "local-recaptcha-" + Date.now();
        setToken(generated);
        if (widgetKey && widgetCallbacks[widgetKey]) {
          invokeCallback(widgetCallbacks[widgetKey], generated);
        } else {
          var firstKey = Object.keys(widgetCallbacks)[0];
          if (firstKey && widgetCallbacks[firstKey]) {
            invokeCallback(widgetCallbacks[firstKey], generated);
          }
        }
        return Promise.resolve(generated);
      };

      apiObj.getResponse = function () {
        if (!token) {
          setToken("local-recaptcha-" + Date.now());
        }
        return token;
      };

      apiObj.reset = function () {
        setToken("");
      };

      apiObj.__localBypassPatched = true;
      return apiObj;
    }

    function patchGrecaptchaObject(obj) {
      if (!obj || obj.__localBypassObjectPatched) {
        return obj;
      }
      patchApi(obj);
      if (obj.enterprise) {
        patchApi(obj.enterprise);
      }
      obj.__localBypassObjectPatched = true;
      return obj;
    }

    var recaptchaRef = patchGrecaptchaObject(window.grecaptcha);

    try {
      Object.defineProperty(window, "grecaptcha", {
        configurable: true,
        enumerable: true,
        get: function () {
          return recaptchaRef;
        },
        set: function (value) {
          recaptchaRef = patchGrecaptchaObject(value);
        }
      });
    } catch (error) { }
  }

  installLocalRecaptchaBypass();

  function installLocalDemoLogin() {
    if (!isMirrorMode || !window || !document) {
      return;
    }
    var loginInFlight = false;
    var DEMO_LOGIN_USERNAMES = Array.from({ length: 20 }, function (_item, index) {
      return "demo" + String(index + 1).padStart(2, "0");
    });

    function normalizeText(value) {
      return String(value || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
    }

    function normalizeBalanceDisplay(value) {
      var num = Number(value);
      if (!Number.isFinite(num)) {
        return 0;
      }
      return num;
    }

    function normalizeExposureDisplay(value) {
      var num = Number(value);
      if (!Number.isFinite(num)) {
        return 0;
      }
      return num;
    }

    function pageLooksLikeLogin() {
      return Boolean(
        document.querySelector("input[type='password']") &&
        (document.querySelector("input[name='username']") ||
          document.querySelector("input[name='uname']") ||
          document.querySelector("input[type='text']"))
      );
    }

    function isLoginRoute() {
      var pathname = window.location.pathname || "/";
      if (
        pathname === "/" ||
        pathname === "/index.html" ||
        pathname === "/index" ||
        /\/index\.html?$/i.test(pathname)
      ) {
        return true;
      }
      return pageLooksLikeLogin();
    }

    function isDemoLoginButton(node) {
      if (!node || node.nodeType !== 1 || node.tagName !== "BUTTON") {
        return false;
      }
      var text = normalizeText(node.textContent);
      return text.indexOf("login with demo id") !== -1;
    }

    function isCredentialLoginButton(node) {
      if (!node || node.nodeType !== 1 || node.tagName !== "BUTTON") {
        return false;
      }
      var text = normalizeText(node.textContent);
      return /^login\b/.test(text) && text.indexOf("demo") === -1;
    }

    function safeParseJSON(value, fallbackValue) {
      if (value && typeof value === "object") {
        return value;
      }
      if (typeof value !== "string") {
        return fallbackValue;
      }
      try {
        return JSON.parse(value);
      } catch (error) {
        return fallbackValue;
      }
    }

    function parsePersistNode(value, fallbackValue) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
      if (typeof value !== "string") {
        return fallbackValue;
      }
      return safeParseJSON(value, fallbackValue);
    }

    function showLoginPopup(type, title, text) {
      if (window.Swal && typeof window.Swal.fire === "function") {
        var options = {
          icon: type || "info",
          title: title || "",
          text: text || ""
        };
        if (type === "success") {
          options.timer = 1100;
          options.showConfirmButton = false;
        }
        return window.Swal.fire(options);
      }
      window.alert(text ? title + "\n" + text : title);
      return Promise.resolve();
    }

    function pickDemoLoginUsername() {
      var key = "local_demo_login_cursor";
      var cursor = Number(localStorage.getItem(key) || 0);
      if (!Number.isFinite(cursor) || cursor < 0) {
        cursor = 0;
      }
      var username = DEMO_LOGIN_USERNAMES[cursor % DEMO_LOGIN_USERNAMES.length] || DEMO_LOGIN_USERNAMES[0];
      localStorage.setItem(key, String((cursor + 1) % DEMO_LOGIN_USERNAMES.length));
      return username;
    }

    function isUsableInput(node) {
      if (!node || node.nodeType !== 1 || node.tagName !== "INPUT") {
        return false;
      }
      if (node.disabled || node.type === "hidden") {
        return false;
      }
      return node.getClientRects().length > 0 || node.offsetWidth > 0 || node.offsetHeight > 0;
    }

    function pickInputFromRoot(root, preferredSelectors, fallbackFilter) {
      if (!root || typeof root.querySelectorAll !== "function") {
        return null;
      }
      for (var i = 0; i < preferredSelectors.length; i++) {
        var selector = preferredSelectors[i];
        var nodes = root.querySelectorAll(selector);
        for (var j = 0; j < nodes.length; j++) {
          if (isUsableInput(nodes[j])) {
            return nodes[j];
          }
        }
      }
      if (typeof fallbackFilter === "function") {
        var allInputs = root.querySelectorAll("input");
        for (var k = 0; k < allInputs.length; k++) {
          if (isUsableInput(allInputs[k]) && fallbackFilter(allInputs[k])) {
            return allInputs[k];
          }
        }
      }
      return null;
    }

    function resolveLoginFields(contextNode) {
      var roots = [];
      if (contextNode && contextNode.nodeType === 1) {
        roots.push(contextNode);
        if (typeof contextNode.closest === "function") {
          roots.push(contextNode.closest("form"));
          roots.push(contextNode.closest(".card"));
          roots.push(contextNode.closest(".modal-content"));
        }
      }
      roots.push(document);

      var usernameSelectors = [
        "input[name='username']",
        "input[name='uname']",
        "input[name='user_name']",
        "input[autocomplete='username']",
        "input[type='text']",
        "input[type='email']",
        "input[type='tel']"
      ];
      var passwordSelectors = [
        "input[name='password']",
        "input[name='pass']",
        "input[autocomplete='current-password']",
        "input[type='password']"
      ];

      var usernameInput = null;
      var passwordInput = null;
      for (var i = 0; i < roots.length; i++) {
        var root = roots[i];
        if (!usernameInput) {
          usernameInput = pickInputFromRoot(root, usernameSelectors, function (input) {
            return normalizeText(input.placeholder).indexOf("user") !== -1;
          });
        }
        if (!passwordInput) {
          passwordInput = pickInputFromRoot(root, passwordSelectors, function (input) {
            return normalizeText(input.placeholder).indexOf("pass") !== -1;
          });
        }
        if (usernameInput && passwordInput) {
          break;
        }
      }

      return {
        username: usernameInput,
        password: passwordInput
      };
    }

    function decodeApiEnvelope(payload) {
      if (!payload || typeof payload !== "object") {
        return null;
      }
      if (typeof payload.data !== "string") {
        return payload;
      }
      if (typeof window._0x895125d === "function" && window.CryptoJS) {
        try {
          var decrypted = window._0x895125d(payload.data, window.CryptoJS);
          if (decrypted && typeof decrypted === "object") {
            try { console.log("[LocalMirror] Decrypted API Response:", decrypted); } catch (e) { }
            return decrypted;
          }
        } catch (error) { }
      }
      try {
        var parsed = JSON.parse(payload.data);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (error) { }
      return payload;
    }

    function finishLoginNavigation() {
      if (window.location.pathname !== "/home") {
        window.location.href = "/home";
        return;
      }
      window.location.reload();
    }

    function applyUserSession(loginData, userData, fallbackUsername) {
      var persistKey = "persist:root";
      var root = safeParseJSON(localStorage.getItem(persistKey) || "{}", {});
      var existingData = parsePersistNode(root.data || "{}", {});
      var existingAuth = parsePersistNode(root.auth || "{}", {});
      var existingUserState = parsePersistNode(root.user || "{}", {});
      var existingUserData = parsePersistNode(existingUserState.data || "{}", {});
      function pickName() {
        var candidates = [
          userData && userData.username,
          userData && userData.user_name,
          userData && userData.uname,
          loginData && loginData.username,
          loginData && loginData.user_name,
          loginData && loginData.uname,
          fallbackUsername,
          existingUserData && existingUserData.user_name,
          existingUserData && existingUserData.uname,
          existingUserData && existingUserData.username,
          existingData.username,
          existingData.user_name
        ];
        for (var i = 0; i < candidates.length; i += 1) {
          var value = String(candidates[i] || "").trim();
          if (!value) {
            continue;
          }
          if (/^username$/i.test(value)) {
            continue;
          }
          return value;
        }
        return "";
      }
      var name = pickName();
      var balance = Number(
        userData && typeof userData.bal !== "undefined"
          ? userData.bal
          : loginData && typeof loginData.bal !== "undefined"
            ? loginData.bal
            : typeof existingUserData.bal !== "undefined"
              ? existingUserData.bal
              : existingData.bal || 0
      );
      function normalizeExposureDisplay(value) {
        var parsed = Number(value);
        if (!Number.isFinite(parsed)) {
          var cleaned = String(value == null ? "" : value)
            .replace(/,/g, "")
            .trim();
          parsed = Number(cleaned);
        }
        if (!Number.isFinite(parsed)) {
          return 0;
        }
        parsed = Number(parsed.toFixed(2));
        return Math.abs(parsed) < 0.005 ? 0 : parsed;
      }
      var exposure = normalizeExposureDisplay(
        userData && typeof userData.exp !== "undefined"
          ? userData.exp
          : userData && typeof userData.exposure !== "undefined"
            ? userData.exposure
            : loginData && typeof loginData.exp !== "undefined"
              ? loginData.exp
              : loginData && typeof loginData.exposure !== "undefined"
                ? loginData.exposure
                : typeof existingUserData.exp !== "undefined"
                  ? existingUserData.exp
                  : typeof existingData.exp !== "undefined"
                    ? existingData.exp
                    : 0
      );
      var code = String(
        userData && typeof userData.bcode !== "undefined"
          ? userData.bcode
          : loginData && typeof loginData.bcode !== "undefined"
            ? loginData.bcode
            : existingUserData.bcode || existingData.bcode || ""
      );
      var userType =
        (userData && (userData.ptype || userData.user_type)) ||
        (loginData && loginData.ptype) ||
        existingUserData.ptype ||
        existingUserData.user_type ||
        existingData.user_type ||
        1;
      var exposureLimit =
        (userData && (userData.exposure_limit || userData.credit_limit)) ||
        (loginData && (loginData.exposure_limit || loginData.credit_limit)) ||
        existingUserData.exposure_limit ||
        existingData.exposure_limit ||
        "0";
      var token = String(
        (loginData && loginData.token) ||
        existingUserState.token ||
        existingUserData.token ||
        existingData.token ||
        existingAuth.token ||
        ""
      ).trim();
      var safeBalance = Number.isFinite(balance) ? Number(balance.toFixed(2)) : 0;
      var safeExposure = Number.isFinite(exposure) ? Number(exposure.toFixed(2)) : 0;
      var availableBalance = Number((safeBalance + safeExposure).toFixed(2));
      var isDemoAccount = Boolean(
        (userData && userData.isDemoUser) ||
        (loginData && loginData.isDemoUser) ||
        String(userType || "").toLowerCase() === "demo" ||
        /^demo\d{2}$/i.test(String(name || "").trim())
      );
      var nextUserData = Object.assign({}, existingUserData || {}, {
        user_name: name,
        username: name,
        uname: name,
        token: token,
        auth: token,
        access_token: token,
        user_type: userType,
        ptype: userType,
        bal: safeBalance,
        exp: safeExposure,
        exposure: safeExposure,
        available_balance: availableBalance,
        availableBalance: availableBalance,
        bcode: code,
        exposure_limit: exposureLimit,
        isDemoUser: isDemoAccount
      });

      root.logedIn = "true";
      root.rulesLogin = "true";
      root.popUpLogin = "false";
      root.token = JSON.stringify(token);
      root.data = JSON.stringify(nextUserData);
      root.auth = JSON.stringify(
        Object.assign({}, existingAuth || {}, {
          user_name: name,
          username: name,
          uname: name,
          token: token,
          auth: token,
          access_token: token,
          ptype: userType,
          bal: safeBalance,
          exp: safeExposure,
          exposure: safeExposure,
          available_balance: availableBalance,
          availableBalance: availableBalance,
          bcode: code,
          login: true,
          isDemoUser: isDemoAccount
        })
      );
      root.user = JSON.stringify(
        Object.assign({}, existingUserState || {}, {
          token: token,
          logedIn: true,
          rulesLogin: true,
          popUpLogin: false,
          data: nextUserData
        })
      );
      if (!root._persist) {
        root._persist = JSON.stringify({ version: -1, rehydrated: true });
      }

      localStorage.setItem(persistKey, JSON.stringify(root));
      localStorage.setItem("demo_user_enabled", isDemoAccount ? "1" : "0");
      sessionStorage.setItem("demo_login", isDemoAccount ? "1" : "0");
    }

    async function fetchUserData(loginData, username) {
      if (!loginData || !loginData.token) {
        return null;
      }
      try {
        var response = await window.fetch("/api/front/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + loginData.token
          },
          body: JSON.stringify({ uname: username || loginData.uname || "" })
        });
        var payload = await response.json();
        var decoded = decodeApiEnvelope(payload);
        if (
          decoded &&
          Number(decoded.status) === 200 &&
          decoded.data &&
          typeof decoded.data === "object"
        ) {
          return decoded.data;
        }
      } catch (error) { }
      return null;
    }

    function applyDemoSession(demoName, demoToken) {
      var persistKey = "persist:root";
      var root = parsePersistNode(localStorage.getItem(persistKey) || "{}", {});
      var existingUserState = parsePersistNode(root.user || "{}", {});
      var safeDemoName = String(demoName || "demo")
        .trim()
        .toLowerCase();
      var safeDemoToken = String(demoToken || ("demo-local-token-" + safeDemoName)).trim();
      var demoData = {
        user_name: safeDemoName,
        username: safeDemoName,
        uname: safeDemoName,
        token: safeDemoToken,
        auth: safeDemoToken,
        access_token: safeDemoToken,
        user_type: "demo",
        ptype: "demo",
        bal: 1500,
        exp: 0,
        exposure: 0,
        available_balance: 1500,
        availableBalance: 1500,
        bcode: "93166249236",
        exposure_limit: "0",
        isDemoUser: true
      };

      root.logedIn = "true";
      root.rulesLogin = "true";
      root.popUpLogin = "false";
      root.token = JSON.stringify(safeDemoToken);
      root.data = JSON.stringify(demoData);
      root.auth = JSON.stringify({
        user_name: safeDemoName,
        username: safeDemoName,
        uname: safeDemoName,
        token: safeDemoToken,
        auth: safeDemoToken,
        access_token: safeDemoToken,
        ptype: "demo",
        bal: 1500,
        exp: 0,
        exposure: 0,
        available_balance: 1500,
        availableBalance: 1500,
        bcode: "93166249236",
        login: true,
        isDemoUser: true
      });
      root.user = JSON.stringify(
        Object.assign({}, existingUserState || {}, {
          token: safeDemoToken,
          logedIn: true,
          rulesLogin: true,
          popUpLogin: false,
          data: demoData
        })
      );
      if (!root._persist) {
        root._persist = JSON.stringify({ version: -1, rehydrated: true });
      }

      localStorage.setItem(persistKey, JSON.stringify(root));
      localStorage.setItem("demo_user_enabled", "1");
      sessionStorage.setItem("demo_login", "1");
    }

    async function runDemoLogin() {
      if (loginInFlight || !isLoginRoute()) {
        return;
      }
      loginInFlight = true;
      var demoUsername = pickDemoLoginUsername();
      try {
        var decoded = null;
        try {
          var response = await window.fetch("/api/front/demo-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: demoUsername,
              uname: demoUsername
            })
          });
          var payload = await response.json();
          decoded = decodeApiEnvelope(payload);
        } catch (_error) { }

        var loginData = decoded && decoded.data && typeof decoded.data === "object" ? decoded.data : {};
        var success = Boolean(
          decoded &&
          Number(decoded.status) === 200 &&
          loginData &&
          loginData.login &&
          typeof loginData.token === "string" &&
          loginData.token.length > 0
        );
        if (success) {
          var userData = await fetchUserData(loginData, demoUsername);
          applyUserSession(loginData, userData, demoUsername);
          localStorage.setItem("demo_user_enabled", "1");
          sessionStorage.setItem("demo_login", "1");
          void fetchHomeApiGamesData(true).catch(function () { });
          finishLoginNavigation();
          return;
        }

        applyDemoSession(demoUsername);

        // Trigger wallet sync to show balance immediately
        if (typeof syncWallet === "function") {
          syncWallet();
        }

        void fetchHomeApiGamesData(true).catch(function () { });
        finishLoginNavigation();
      } finally {
        loginInFlight = false;
      }
    }

    async function runCredentialLogin(triggerNode) {
      if (loginInFlight || !isLoginRoute()) {
        return;
      }
      var fields = resolveLoginFields(triggerNode);
      var username = fields.username ? String(fields.username.value || "").trim() : "";
      var password = fields.password ? String(fields.password.value || "").trim() : "";

      if (!username || !password) {
        await showLoginPopup(
          "error",
          "Incorrect ID or Password",
          "Please enter a valid ID and password."
        );
        return;
      }

      loginInFlight = true;
      try {
        var requestBody = JSON.stringify({
          username: username,
          password: password
        });
        var decoded = null;
        var loginData = {};
        var userData = null;

        // Prefer plain local endpoint to avoid encryption parsing mismatch in localhost.
        try {
          var localResponse = await window.fetch("/api/front/local-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: requestBody
          });
          var localPayload = await localResponse.json();
          if (localPayload && typeof localPayload === "object") {
            decoded = localPayload;
          }
        } catch (error) { }

        // Fallback to encrypted endpoint if local endpoint isn't available.
        if (!decoded || typeof decoded.status === "undefined") {
          var response = await window.fetch("/api/front/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: requestBody
          });
          var payload = await response.json();
          decoded = decodeApiEnvelope(payload);
        }

        var loginData = decoded && decoded.data && typeof decoded.data === "object" ? decoded.data : {};
        if (loginData && loginData.profile && typeof loginData.profile === "object") {
          userData = loginData.profile;
        }
        var success = Boolean(
          decoded &&
          Number(decoded.status) === 200 &&
          loginData &&
          loginData.login &&
          typeof loginData.token === "string" &&
          loginData.token.length > 0
        );

        if (!success) {
          await showLoginPopup(
            "error",
            "Incorrect ID or Password",
            "Incorrect ID or password."
          );
          return;
        }

        if (!userData) {
          userData = await fetchUserData(loginData, username);
        }
        applyUserSession(loginData, userData, username);
        void fetchHomeApiGamesData(true).catch(function () { });
        finishLoginNavigation();
      } catch (error) {
        await showLoginPopup("error", "Login failed", "Unable to login. Please try again.");
      } finally {
        loginInFlight = false;
      }
    }

    function stopEvent(event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }
    }

    window.__LOCAL_DEMO_LOGIN__ = runDemoLogin;
    window.__LOCAL_LOGIN_WITH_CREDENTIALS__ = runCredentialLogin;

    document.addEventListener(
      "click",
      function (event) {
        var button = event.target && event.target.closest ? event.target.closest("button") : null;
        if (isDemoLoginButton(button)) {
          stopEvent(event);
          runDemoLogin();
          return;
        }
        if (!isCredentialLoginButton(button) || !isLoginRoute()) {
          return;
        }
        stopEvent(event);
        runCredentialLogin(button);
      },
      true
    );

    document.addEventListener(
      "submit",
      function (event) {
        if (!isLoginRoute()) {
          return;
        }
        var target = event.target;
        if (!target || target.nodeType !== 1 || target.tagName !== "FORM") {
          return;
        }
        var fields = resolveLoginFields(target);
        if (!fields.password || !fields.username) {
          return;
        }
        stopEvent(event);
        runCredentialLogin(target);
      },
      true
    );
  }

  function installLocalPaymentUi() {
    if (!isMirrorMode || !window || !document) {
      return;
    }

    var TOP_TRIGGER_ATTR = "data-local-payment-top";
    var TOP_WRAP_ID = "local-payment-top-actions";
    var STYLE_ID = "local-payment-style";
    var MODAL_ID = "local-payment-modal";
    var ACTIVE_CLASS = "is-active";
    var BODY_LOCK_CLASS = "local-payment-lock";
    var ENABLE_LOCAL_PAYMENT_UI = true;
    var SHOW_TOP_PAYMENT_BUTTONS = true;
    var MIN_DEPOSIT_AMOUNT = 100;
    var settingsCache = null;
    var settingsRequest = null;
    var withdrawDetailsCache = [];
    var withdrawDetailsRequest = null;

    function cleanupDisabledPaymentUi() {
      var staleModal = document.getElementById(MODAL_ID);
      if (staleModal && staleModal.parentNode) {
        safeDetachNode(staleModal);
      }

      var staleStyle = document.getElementById(STYLE_ID);
      if (staleStyle && staleStyle.parentNode) {
        safeDetachNode(staleStyle);
      }

      var staleActions = document.querySelectorAll("#" + TOP_WRAP_ID + ", .local-pay-actions");
      for (var i = 0; i < staleActions.length; i += 1) {
        var actionNode = staleActions[i];
        if (actionNode && actionNode.parentNode) {
          safeDetachNode(actionNode);
        }
      }

      var nativeActions = document.querySelectorAll(".depowith");
      for (var j = 0; j < nativeActions.length; j += 1) {
        var nativeActionNode = nativeActions[j];
        if (!nativeActionNode || !nativeActionNode.style) {
          continue;
        }
        nativeActionNode.style.removeProperty("display");
        nativeActionNode.style.removeProperty("visibility");
        nativeActionNode.style.removeProperty("opacity");
        nativeActionNode.style.removeProperty("pointer-events");
      }

      if (document.body) {
        document.body.classList.remove(BODY_LOCK_CLASS);
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("overflow-y");
        document.body.style.removeProperty("position");
        document.body.style.overflow = "auto";
        document.body.style.overflowY = "auto";
      }

      if (document.documentElement) {
        document.documentElement.style.removeProperty("overflow");
        document.documentElement.style.removeProperty("overflow-y");
        document.documentElement.style.removeProperty("position");
        document.documentElement.style.overflow = "auto";
        document.documentElement.style.overflowY = "auto";
      }

      if (typeof window.ontouchmove === "function") {
        window.ontouchmove = null;
      }
    }

    if (!ENABLE_LOCAL_PAYMENT_UI) {
      cleanupDisabledPaymentUi();
      return;
    }

    function safeParseJSON(value, fallbackValue) {
      if (value && typeof value === "object") {
        return value;
      }
      if (typeof value !== "string") {
        return fallbackValue;
      }
      try {
        return JSON.parse(value);
      } catch (error) {
        return fallbackValue;
      }
    }

    function parsePersistNode(value, fallbackValue) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
      if (typeof value !== "string") {
        return fallbackValue;
      }
      return safeParseJSON(value, fallbackValue);
    }

    function getDefaultSettings() {
      return {
        deposit: {
          amount: 100,
          upiId: "demo@upi",
          upiHolderName: "",
          qrImage: "/local/payment-qr.svg",
          note: "Pay exact amount, then submit 12-digit UTR for balance update."
        },
        withdraw: {
          minAmount: 500,
          maxAmount: 100000,
          processingTime: "5-30 minutes",
          note: "Withdrawals are processed to your saved bank/UPI details."
        }
      };
    }

    function toObject(value) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return {};
      }
      return value;
    }

    function toNumberOr(value, fallbackValue) {
      var num = Number(value);
      if (!Number.isFinite(num) || num <= 0) {
        return fallbackValue;
      }
      return num;
    }

    function normalizeSettings(rawValue) {
      var defaults = getDefaultSettings();
      var raw = toObject(rawValue);
      var depositRaw = toObject(raw.deposit);
      var withdrawRaw = toObject(raw.withdraw);
      return {
        deposit: {
          amount: Math.max(
            MIN_DEPOSIT_AMOUNT,
            toNumberOr(depositRaw.amount, defaults.deposit.amount)
          ),
          upiId: String(depositRaw.upiId || defaults.deposit.upiId).trim() || defaults.deposit.upiId,
          upiHolderName:
            String(depositRaw.upiHolderName || defaults.deposit.upiHolderName).trim() ||
            defaults.deposit.upiHolderName,
          qrImage:
            String(depositRaw.qrImage || defaults.deposit.qrImage).trim() || defaults.deposit.qrImage,
          note: String(depositRaw.note || defaults.deposit.note).trim() || defaults.deposit.note
        },
        withdraw: {
          minAmount: toNumberOr(withdrawRaw.minAmount, defaults.withdraw.minAmount),
          maxAmount: toNumberOr(withdrawRaw.maxAmount, defaults.withdraw.maxAmount),
          processingTime:
            String(withdrawRaw.processingTime || defaults.withdraw.processingTime).trim() ||
            defaults.withdraw.processingTime,
          note: String(withdrawRaw.note || defaults.withdraw.note).trim() || defaults.withdraw.note
        }
      };
    }

    function readLocalSettingsFallback() {
      try {
        var raw = localStorage.getItem("local_payment_settings");
        if (!raw) {
          return null;
        }
        return normalizeSettings(JSON.parse(raw));
      } catch (error) {
        return null;
      }
    }

    function loadSettings(forceRefresh) {
      if (!forceRefresh && settingsCache) {
        return Promise.resolve(settingsCache);
      }
      if (!forceRefresh && settingsRequest) {
        return settingsRequest;
      }

      settingsRequest = window
        .fetch("/api/front/local-payment-settings", {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        })
        .then(function (response) {
          if (!response || !response.ok) {
            throw new Error("settings-fetch-failed");
          }
          return response.json();
        })
        .then(function (payload) {
          var data = payload && payload.data ? payload.data : {};
          settingsCache = normalizeSettings(data);
          return settingsCache;
        })
        .catch(function () {
          var localSettings = readLocalSettingsFallback();
          settingsCache = localSettings || getDefaultSettings();
          return settingsCache;
        })
        .finally(function () {
          settingsRequest = null;
        });

      return settingsRequest;
    }

    function ensureStyles() {
      if (document.getElementById(STYLE_ID)) {
        return;
      }

      var style = document.createElement("style");
      style.id = STYLE_ID;
      style.type = "text/css";
      style.textContent = [
        ".local-payment-lock{overflow:hidden;}",
        ".local-pay-actions{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:0;z-index:25;}",
        ".local-pay-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:8px 16px;border: 0;border-radius:6px;color: #fff;font-size:14px;font-weight:600;line-height:1;text-transform:capitalize;cursor:pointer;}",
        ".local-pay-btn i{font-size:16px;line-height:1;}",
        ".local-pay-btn.deposit{background: #28a745;margin-right:10px;}",
        ".local-pay-btn.withdraw{background: #dc3545;}",
        ".local-pay-btn:hover{filter:brightness(1.05);}",
        ".local-pay-btn:active{transform:translateY(1px);}",
        "@media (max-width:1399px){.local-pay-actions{top:40px;gap:0;}.local-pay-btn{padding:6px 12px;font-size:13px;border-radius:6px;}.local-pay-btn.deposit{margin-right:10px;}}",
        "@media (max-width:1199px){.header-top{height:auto !important;min-height:82px;}.header-top .news{order:3;}.header-top .local-pay-actions{position:relative;left:auto;top:auto;transform:none;order:2;flex:0 0 100%;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px;z-index:2;}.header-top .local-pay-actions .local-pay-btn{width:100%;padding:8px 12px;font-size:13px;border-radius:6px;margin-right:0;}}",
        "@media (max-width:575px){.header-top .local-pay-actions{gap:5px;}.header-top .local-pay-actions .local-pay-btn{padding:6px 10px;font-size:12px;}}",
        ".local-payment-overlay{position:fixed;inset:0;background: rgba(107, 62, 30, 0.72);display:none;align-items:center;justify-content:center;z-index:20000;padding:20px;}",
        ".local-payment-overlay.is-open{display:flex;}",
        ".local-payment-card{width:min(980px,100%);max-height:92vh;overflow:auto;background: #0088cc;border: 1px solid #0088cc;border-radius:14px;box-shadow: 0 24px 50px rgba(0,0,0,.5);color: #ffffff;}",
        ".local-payment-head{display:flex;align-items:center;justify-content:space-between;background: linear-gradient(90deg,#0088cc,#0088cc);color: #fff;padding:12px 16px;border-bottom:1px solid #0088cc;}",
        ".local-payment-head h3{margin:0;font-size:20px;font-weight:700;}",
        ".local-payment-close{border: 0;background: transparent;color: #fff;font-size:30px;line-height:1;cursor:pointer;padding:0 6px;}",
        ".local-payment-tabs{display:flex;background: #0088cc;padding:8px;gap:8px;border-bottom:1px solid #0088cc;}",
        ".local-payment-tab{flex:1;border: 1px solid #0088cc;background: #0088cc;color: #ffffff;padding:10px 12px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;}",
        ".local-payment-tab." + ACTIVE_CLASS + "{background: linear-gradient(90deg,#0d6efd,#22c7a0);color: #fff;border-color: transparent;}",
        ".local-payment-body{padding:14px;}",
        ".local-payment-panel[hidden]{display:none !important;}",
        ".local-payment-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}",
        ".local-payment-box{border: 1px solid #0088cc;border-radius:12px;background: #0088cc;padding:14px;color: #ffffff;}",
        ".local-payment-box h4{margin:0 0 10px;font-size:18px;color: #ffffff;}",
        ".local-payment-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}",
        ".local-payment-label{font-size:12px;font-weight:700;color: #0d6efd;letter-spacing:.4px;text-transform:uppercase;}",
        ".local-payment-value{font-size:18px;font-weight:700;color: #ffffff;word-break:break-all;}",
        ".local-payment-copy{border: 0;background: linear-gradient(90deg,#0d6efd,#1fc59d);color: #fff;padding:10px 14px;border-radius:12px;font-weight:700;cursor:pointer;text-align:center;text-decoration:none;}",
        ".local-payment-copy:hover{filter:brightness(1.05);}",
        ".local-payment-copy.alt{background: #0088cc;border: 1px solid #0088cc;color: #ffffff;}",
        ".local-payment-qr{width:220px;max-width:100%;height:auto;border-radius:8px;background: #fff;padding:8px;}",
        ".local-payment-note{margin-top:10px;font-size:14px;line-height:1.5;color: #0d6efd;}",
        ".local-payment-info{font-size:16px;line-height:1.6;color: #ffffff;}",
        ".local-payment-list{margin:10px 0 0;padding-left:16px;font-size:15px;color: #ffffff;}",
        ".local-payment-list li{margin:6px 0;}",
        ".local-pay-hero{display:flex;justify-content:space-between;align-items:center;gap:12px;background: linear-gradient(90deg,#0088cc,#0088cc);border: 1px solid #0088cc;border-radius:12px;padding:14px;margin-bottom:14px;}",
        ".local-pay-hero-left{display:flex;align-items:center;gap:12px;}",
        ".local-pay-hero-icon{width:44px;height:44px;border-radius:14px;background: linear-gradient(145deg,#0d6efd,#1dd0a2);display:flex;align-items:center;justify-content:center;color: #fff;font-size:20px;}",
        ".local-pay-hero-title{font-size:20px;font-weight:800;margin:0 0 2px;color: #ffffff;}",
        ".local-pay-hero-sub{font-size:13px;color: #0d6efd;margin:0;}",
        ".local-pay-hero-right{text-align:right;}",
        ".local-pay-hero-right span{display:block;font-size:12px;color: #0d6efd;text-transform:uppercase;letter-spacing:.4px;}",
        ".local-pay-hero-right strong{font-size:26px;color: #fff;white-space:nowrap;}",
        ".local-pay-amount-box{border: 1px solid #0088cc;border-radius:12px;background: #0088cc;padding:12px;margin-bottom:14px;}",
        ".local-pay-amount-row{display:grid;grid-template-columns:1fr 190px;gap:10px;}",
        ".local-pay-amount-input{width:100%;height:46px;padding:0 14px;border-radius:10px;border: 1px solid #0088cc;background: #0088cc;color: #ffffff;font-size:17px;}",
        ".local-pay-start{width:100%;margin:0;height:46px;}",
        ".local-pay-step-shell[hidden]{display:none !important;}",
        ".local-pay-qr-wrap{background: #0088cc;border: 1px solid #0088cc;border-radius:12px;padding:10px;display:flex;justify-content:center;margin-bottom:12px;}",
        ".local-pay-action-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;}",
        ".local-pay-upi-box{border: 1px solid #0088cc;border-radius:12px;padding:10px;background: #0088cc;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;}",
        ".local-pay-input{width:100%;height:46px;padding:0 14px;border-radius:12px;border: 1px solid #0088cc;background: #0088cc;color: #ffffff;font-size:17px;}",
        ".local-pay-submit{width:100%;margin-top:12px;border: 0;background: linear-gradient(90deg,#0d6efd,#1fc59d);color: #fff;height:46px;border-radius:12px;font-weight:700;font-size:17px;cursor:pointer;}",
        ".local-pay-submit:disabled{opacity:.75;cursor:not-allowed;}",
        ".local-pay-alert{margin-top:12px;padding:10px 12px;background: #241532;border: 1px solid #5e386f;border-radius:12px;color: #ffd1df;font-size:14px;line-height:1.45;}",
        ".local-pay-order{margin-top:10px;color: #0d6efd;font-size:14px;}",
        ".local-pay-order strong{color: #ffffff;}",
        ".local-pay-feedback{margin-top:10px;min-height:20px;font-size:13px;}",
        ".local-pay-feedback.success{color: #57dda8;}",
        ".local-pay-feedback.error{color: #ff8f9b;}",
        ".local-withdraw-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}",
        ".local-withdraw-field{display:flex;flex-direction:column;gap:6px;}",
        ".local-withdraw-field.full{grid-column:1 / -1;}",
        ".local-withdraw-card-preview{margin-top:8px;padding:10px;border: 1px solid #0088cc;border-radius:10px;background: #0088cc;color: #ffffff;font-size:13px;line-height:1.5;}",
        ".local-withdraw-inline{display:flex;gap:10px;align-items:center;flex-wrap:wrap;}",
        ".local-withdraw-inline .local-pay-input{flex:1 1 160px;}",
        ".local-withdraw-meta{margin-top:8px;font-size:12px;color: #0d6efd;}",
        "@media (max-width:768px){.local-withdraw-grid{grid-template-columns:1fr;}}",
        "@media (max-width:930px){.local-payment-grid{grid-template-columns:1fr;}.local-pay-hero{flex-direction:column;align-items:flex-start;}.local-pay-hero-right{text-align:left;}.local-pay-amount-row{grid-template-columns:1fr;}}",
        "@media (max-width:768px){.local-payment-head h3{font-size:19px;}.local-payment-tab{font-size:15px;}.local-pay-hero-title{font-size:18px;}.local-pay-hero-right strong{font-size:22px;}.local-pay-action-row{grid-template-columns:1fr;}.local-pay-input{height:44px;}.local-pay-submit{height:42px;}.local-pay-amount-input{height:42px;}}"
      ].join("");
      document.head.appendChild(style);
    }

    function ensureModal() {
      var existing = document.getElementById(MODAL_ID);
      if (existing) {
        return existing;
      }

      var modal = document.createElement("div");
      modal.id = MODAL_ID;
      modal.className = "local-payment-overlay";
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML =
        '<div class="local-payment-card" role="dialog" aria-modal="true" aria-label="Deposit and withdrawal">' +
        '<div class="local-payment-head"><h3>Deposit & Withdrawal</h3><button type="button" class="local-payment-close" data-local-payment-close="1" aria-label="Close">&times;</button></div>' +
        '<div class="local-payment-tabs">' +
        '<button type="button" class="local-payment-tab is-active" data-local-payment-tab="deposit">Deposit</button>' +
        '<button type="button" class="local-payment-tab" data-local-payment-tab="withdrawal">Withdrawal</button>' +
        "</div>" +
        '<div class="local-payment-body">' +
        '<section class="local-payment-panel" data-local-payment-panel="deposit">' +
        '<div class="local-pay-hero">' +
        '<div class="local-pay-hero-left"><span class="local-pay-hero-icon"><i class="fas fa-shield-alt"></i></span><div><p class="local-pay-hero-title">UPI Secure Checkout</p><p class="local-pay-hero-sub">Scan QR -> Pay -> Submit UTR</p></div></div>' +
        '<div class="local-pay-hero-right"><span>Transfer Amount</span><strong id="local-payment-transfer-amount">Rs 100.00</strong></div>' +
        "</div>" +
        '<div class="local-pay-amount-box">' +
        "<h4>Step 1: Enter deposit amount</h4>" +
        '<div class="local-pay-amount-row">' +
        '<input id="local-payment-amount-input" class="local-pay-amount-input" type="text" inputmode="decimal" autocomplete="off" placeholder="Enter amount" />' +
        '<button id="local-payment-start-btn" type="button" class="local-pay-submit local-pay-start" data-local-payment-start="1">Pay</button>' +
        "</div>" +
        '<p class="local-payment-note">Amount daalne ke baad Pay par click karein. Uske baad QR aur UPI details open hongi.</p>' +
        "</div>" +
        '<div id="local-payment-step-shell" class="local-payment-grid local-pay-step-shell" hidden>' +
        '<div class="local-payment-box">' +
        "<h4>Step 2: Pay using QR / UPI</h4>" +
        '<div class="local-pay-qr-wrap"><img id="local-payment-qr" class="local-payment-qr" src="/local/payment-qr.svg" alt="Deposit QR code" loading="lazy"/></div>' +
        '<div class="local-pay-action-row">' +
        '<button type="button" class="local-payment-copy" data-local-payment-copy="amount">Copy Amount</button>' +
        '<a id="local-payment-qr-download" class="local-payment-copy alt" href="/local/payment-qr.svg" target="_blank" download>Download QR</a>' +
        "</div>" +
        '<div class="local-pay-upi-box"><div><div class="local-payment-label">UPI ID</div><div id="local-payment-upi" class="local-payment-value">demo@upi</div></div><button type="button" class="local-payment-copy alt" data-local-payment-copy="upi">Copy UPI</button></div>' +
        '<div class="local-pay-upi-box" style="margin-top:8px;"><div><div class="local-payment-label">UPI Holder Name</div><div id="local-payment-upi-holder" class="local-payment-value">-</div></div></div>' +
        '<p id="local-payment-deposit-note" class="local-payment-note">Pay exact amount, then submit 12-digit UTR for balance update.</p>' +
        "</div>" +
        '<div class="local-payment-box">' +
        "<h4>Step 3: Submit UTR (12 digits)</h4>" +
        '<input id="local-payment-utr-input" class="local-pay-input" type="text" maxlength="12" inputmode="numeric" autocomplete="off" placeholder="Enter 12-digit UTR" />' +
        '<button id="local-payment-submit" type="button" class="local-pay-submit" data-local-payment-submit="1">Submit UTR</button>' +
        '<div class="local-pay-alert">Payment successful hone ke baad apna exact 12-digit UTR submit karna zaroori hai.</div>' +
        '<div class="local-pay-order">Order Serial: <strong id="local-payment-order-id">--</strong></div>' +
        '<div id="local-payment-utr-feedback" class="local-pay-feedback"></div>' +
        "</div>" +
        "</div>" +
        "</section>" +
        '<section class="local-payment-panel" data-local-payment-panel="withdrawal" hidden>' +
        '<div class="local-payment-grid">' +
        '<div class="local-payment-box">' +
        "<h4>Add Bank Card</h4>" +
        '<div class="local-withdraw-grid">' +
        '<div class="local-withdraw-field"><label class="local-payment-label" for="local-withdraw-bank-name">Bank Name</label><input id="local-withdraw-bank-name" class="local-pay-input" type="text" autocomplete="off" list="local-withdraw-bank-list" placeholder="Select or type bank name"></div>' +
        '<div class="local-withdraw-field"><label class="local-payment-label" for="local-withdraw-holder">Account Holder Name</label><input id="local-withdraw-holder" class="local-pay-input" type="text" autocomplete="off" placeholder="Enter account holder name"></div>' +
        '<div class="local-withdraw-field"><label class="local-payment-label" for="local-withdraw-account">Account Number</label><input id="local-withdraw-account" class="local-pay-input" type="text" autocomplete="off" inputmode="numeric" placeholder="Enter account number"></div>' +
        '<div class="local-withdraw-field"><label class="local-payment-label" for="local-withdraw-ifsc">IFSC Code</label><input id="local-withdraw-ifsc" class="local-pay-input" type="text" autocomplete="off" placeholder="Enter IFSC code"></div>' +
        '<div class="local-withdraw-field full"><label class="local-payment-label" for="local-withdraw-phone">Phone Number</label><input id="local-withdraw-phone" class="local-pay-input" type="text" autocomplete="off" inputmode="numeric" placeholder="Enter mobile number"></div>' +
        "</div>" +
        '<datalist id="local-withdraw-bank-list">' +
        '<option value="State Bank of India"></option><option value="HDFC Bank"></option><option value="ICICI Bank"></option><option value="Axis Bank"></option><option value="Punjab National Bank"></option><option value="Bank of Baroda"></option><option value="Union Bank of India"></option><option value="Canara Bank"></option><option value="Kotak Mahindra Bank"></option><option value="IDFC FIRST Bank"></option><option value="IndusInd Bank"></option><option value="Yes Bank"></option>' +
        "</datalist>" +
        '<button id="local-withdraw-save-detail" type="button" class="local-pay-submit" data-local-withdraw-save="1">Save Bank Card</button>' +
        '<div id="local-withdraw-save-feedback" class="local-pay-feedback"></div>' +
        "</div>" +
        '<div class="local-payment-box">' +
        "<h4>Withdrawal</h4>" +
        '<div class="local-payment-info">Add bank card once, then request withdrawal directly from wallet balance.</div>' +
        '<ul class="local-payment-list">' +
        '<li><strong>Min amount:</strong> <span id="local-payment-withdraw-min">500</span></li>' +
        '<li><strong>Max amount:</strong> <span id="local-payment-withdraw-max">100000</span></li>' +
        '<li><strong>Processing time:</strong> <span id="local-payment-withdraw-time">5-30 minutes</span></li>' +
        "</ul>" +
        '<p id="local-payment-withdraw-note" class="local-payment-note">Withdrawals are processed to your saved bank details.</p>' +
        '<div class="local-withdraw-inline">' +
        '<select id="local-withdraw-saved-list" class="local-pay-input"><option value="">Select saved bank card</option></select>' +
        '<button type="button" class="local-payment-copy alt" data-local-withdraw-refresh="1">Refresh</button>' +
        "</div>" +
        '<div id="local-withdraw-card-preview" class="local-withdraw-card-preview">No bank card saved.</div>' +
        '<label class="local-payment-label" for="local-withdraw-amount-input" style="margin-top:10px;">Withdraw Amount</label>' +
        '<input id="local-withdraw-amount-input" class="local-pay-input" type="text" inputmode="decimal" autocomplete="off" placeholder="Enter withdraw amount" />' +
        '<button id="local-withdraw-submit" type="button" class="local-pay-submit" data-local-withdraw-submit="1">Request Withdrawal</button>' +
        '<div id="local-withdraw-feedback" class="local-pay-feedback"></div>' +
        '<div class="local-withdraw-meta">Request status owner admin panel me "All Withdraw Requests" me aayega.</div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</section>" +
        "</div>" +
        "</div>";

      document.body.appendChild(modal);

      var utrInputNode = modal.querySelector("#local-payment-utr-input");
      if (utrInputNode) {
        utrInputNode.addEventListener("input", function () {
          this.value = String(this.value || "").replace(/\D/g, "").slice(0, 12);
        });
      }

      var amountInputNode = modal.querySelector("#local-payment-amount-input");
      if (amountInputNode) {
        amountInputNode.addEventListener("input", function () {
          var cleaned = String(this.value || "")
            .replace(/[^\d.]/g, "")
            .replace(/^(\d*\.?\d{0,2}).*$/, "$1");
          this.value = cleaned;
        });
      }

      var withdrawAmountInputNode = modal.querySelector("#local-withdraw-amount-input");
      if (withdrawAmountInputNode) {
        withdrawAmountInputNode.addEventListener("input", function () {
          var cleaned = String(this.value || "")
            .replace(/[^\d.]/g, "")
            .replace(/^(\d*\.?\d{0,2}).*$/, "$1");
          this.value = cleaned;
        });
      }

      var accountInputNode = modal.querySelector("#local-withdraw-account");
      if (accountInputNode) {
        accountInputNode.addEventListener("input", function () {
          this.value = String(this.value || "").replace(/\D/g, "").slice(0, 24);
        });
      }

      var phoneInputNode = modal.querySelector("#local-withdraw-phone");
      if (phoneInputNode) {
        phoneInputNode.addEventListener("input", function () {
          this.value = String(this.value || "").replace(/\D/g, "").slice(0, 15);
        });
      }

      var ifscInputNode = modal.querySelector("#local-withdraw-ifsc");
      if (ifscInputNode) {
        ifscInputNode.addEventListener("input", function () {
          this.value = String(this.value || "")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(0, 16);
        });
      }

      modal.addEventListener("click", function (event) {
        var target = event.target;
        var closeButton = target && target.closest ? target.closest("[data-local-payment-close]") : null;
        if (closeButton || target === modal) {
          closeModal();
          return;
        }

        var copyButton = target && target.closest ? target.closest("[data-local-payment-copy]") : null;
        if (copyButton) {
          var copyType = copyButton.getAttribute("data-local-payment-copy") || "";
          if (copyType === "amount") {
            copyAmount();
          } else {
            copyUpiId();
          }
          return;
        }

        var submitButton = target && target.closest ? target.closest("[data-local-payment-submit]") : null;
        if (submitButton) {
          submitUtr();
          return;
        }

        var startButton = target && target.closest ? target.closest("[data-local-payment-start]") : null;
        if (startButton) {
          startPayment();
          return;
        }

        var withdrawSaveButton = target && target.closest ? target.closest("[data-local-withdraw-save]") : null;
        if (withdrawSaveButton) {
          saveWithdrawDetail();
          return;
        }

        var withdrawSubmitButton = target && target.closest ? target.closest("[data-local-withdraw-submit]") : null;
        if (withdrawSubmitButton) {
          submitWithdrawRequest();
          return;
        }

        var withdrawRefreshButton = target && target.closest ? target.closest("[data-local-withdraw-refresh]") : null;
        if (withdrawRefreshButton) {
          loadWithdrawDetails(true);
          return;
        }

        var tabButton = target && target.closest ? target.closest("[data-local-payment-tab]") : null;
        if (tabButton) {
          var tabName = tabButton.getAttribute("data-local-payment-tab") || "deposit";
          setTab(tabName);
          if (tabName === "deposit") {
            resetDepositUi();
          }
        }
      });

      var withdrawSavedListNode = modal.querySelector("#local-withdraw-saved-list");
      if (withdrawSavedListNode) {
        withdrawSavedListNode.addEventListener("change", function () {
          renderWithdrawDetailPreview(this.value);
        });
      }

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
          closeModal();
        }
      });

      return modal;
    }

    function setTab(tabName) {
      var modal = ensureModal();
      var tab = tabName === "withdrawal" ? "withdrawal" : "deposit";

      var tabs = modal.querySelectorAll("[data-local-payment-tab]");
      tabs.forEach(function (node) {
        var nodeTab = node.getAttribute("data-local-payment-tab");
        node.classList.toggle(ACTIVE_CLASS, nodeTab === tab);
      });

      var panels = modal.querySelectorAll("[data-local-payment-panel]");
      panels.forEach(function (node) {
        var nodeTab = node.getAttribute("data-local-payment-panel");
        if (nodeTab === tab) {
          node.removeAttribute("hidden");
        } else {
          node.setAttribute("hidden", "hidden");
        }
      });

      if (tab === "withdrawal") {
        loadWithdrawDetails(false);
      }
    }

    function updateModalValues(settings) {
      var modal = ensureModal();
      var value = normalizeSettings(settings);
      modal.setAttribute("data-local-payment-amount", "0");
      modal.setAttribute("data-local-payment-default-amount", String(value.deposit.amount));

      var amountNode = modal.querySelector("#local-payment-transfer-amount");
      if (amountNode) {
        amountNode.textContent = "Rs 0.00";
      }

      var amountInputNode = modal.querySelector("#local-payment-amount-input");
      if (amountInputNode) {
        amountInputNode.value = String(Number(value.deposit.amount).toFixed(2));
      }

      var upiNode = modal.querySelector("#local-payment-upi");
      if (upiNode) {
        upiNode.textContent = value.deposit.upiId;
      }

      var upiHolderNode = modal.querySelector("#local-payment-upi-holder");
      if (upiHolderNode) {
        upiHolderNode.textContent = value.deposit.upiHolderName || "-";
      }

      var qrNode = modal.querySelector("#local-payment-qr");
      if (qrNode) {
        qrNode.setAttribute("src", value.deposit.qrImage);
      }

      var qrDownloadNode = modal.querySelector("#local-payment-qr-download");
      if (qrDownloadNode) {
        qrDownloadNode.setAttribute("href", value.deposit.qrImage);
      }

      var depositNoteNode = modal.querySelector("#local-payment-deposit-note");
      if (depositNoteNode) {
        depositNoteNode.textContent = value.deposit.note;
      }

      var minNode = modal.querySelector("#local-payment-withdraw-min");
      if (minNode) {
        minNode.textContent = String(value.withdraw.minAmount);
      }

      var maxNode = modal.querySelector("#local-payment-withdraw-max");
      if (maxNode) {
        maxNode.textContent = String(value.withdraw.maxAmount);
      }

      var timeNode = modal.querySelector("#local-payment-withdraw-time");
      if (timeNode) {
        timeNode.textContent = value.withdraw.processingTime;
      }

      var withdrawNoteNode = modal.querySelector("#local-payment-withdraw-note");
      if (withdrawNoteNode) {
        withdrawNoteNode.textContent = value.withdraw.note;
      }
    }

    function setFeedback(type, message) {
      var modal = ensureModal();
      var node = modal.querySelector("#local-payment-utr-feedback");
      if (!node) {
        return;
      }
      node.className = "local-pay-feedback" + (type ? " " + type : "");
      node.textContent = message || "";
    }

    function setWithdrawFeedback(type, message) {
      var modal = ensureModal();
      var node = modal.querySelector("#local-withdraw-feedback");
      if (!node) {
        return;
      }
      node.className = "local-pay-feedback" + (type ? " " + type : "");
      node.textContent = message || "";
    }

    function setWithdrawSaveFeedback(type, message) {
      var modal = ensureModal();
      var node = modal.querySelector("#local-withdraw-save-feedback");
      if (!node) {
        return;
      }
      node.className = "local-pay-feedback" + (type ? " " + type : "");
      node.textContent = message || "";
    }

    function parsePersistRoot() {
      return safeParseJSON(localStorage.getItem("persist:root") || "{}", {});
    }

    function getUserIdentity() {
      var root = parsePersistRoot();
      var data = parsePersistNode(root.data || "{}", {});
      var auth = parsePersistNode(root.auth || "{}", {});
      var userState = parsePersistNode(root.user || "{}", {});
      var userData = parsePersistNode(userState.data || "{}", {});
      function parseToken(raw) {
        if (typeof raw !== "string") return "";
        var text = String(raw || "").trim();
        if (!text) return "";
        try {
          var parsed = JSON.parse(text);
          if (typeof parsed === "string") return String(parsed || "").trim();
        } catch (error) { }
        if ((text[0] === "{" || text[0] === "[") && text[text.length - 1] !== "}") {
          return "";
        }
        return text.replace(/^"+|"+$/g, "").trim();
      }
      function pickValue(candidates, skipUsernameLiteral) {
        for (var i = 0; i < candidates.length; i += 1) {
          var value = String(candidates[i] || "").trim();
          if (!value) {
            continue;
          }
          if (skipUsernameLiteral && /^username$/i.test(value)) {
            continue;
          }
          return value;
        }
        return "";
      }
      var selectedUsername = pickValue(
        [
          userData.user_name,
          userData.uname,
          userData.username,
          userState.username,
          data.user_name,
          data.uname,
          data.username,
          auth.user_name,
          auth.uname,
          auth.username
        ],
        true
      );
      if (!selectedUsername) {
        selectedUsername = readUsernameFromHeader();
      }
      var selectedUsernameLower = String(selectedUsername || "").trim().toLowerCase();
      function pickTokenFor(node) {
        if (!node || typeof node !== "object") return "";
        var token = pickValue([node.token, node.auth, node.access_token], false);
        if (!token) return "";
        if (!selectedUsernameLower) return token;
        var nodeName = pickValue([node.user_name, node.uname, node.username], true).toLowerCase();
        if (!nodeName || nodeName === selectedUsernameLower) return token;
        return "";
      }
      var rootToken = parseToken(root.token);
      return {
        username: selectedUsername,
        token: pickValue(
          [
            pickTokenFor(userData),
            pickTokenFor(data),
            pickTokenFor(auth),
            userState.token,
            rootToken,
            userState.token,
            userData.token,
            userData.auth,
            userData.access_token,
            data.token,
            data.auth,
            data.access_token,
            auth.token,
            auth.auth,
            auth.access_token
          ],
          false
        )
      };
    }

    function getAuthHeaders(baseHeaders) {
      var headers = Object.assign({}, baseHeaders || {});
      var identity = getUserIdentity();
      if (identity.token) {
        headers.Authorization = "Bearer " + identity.token;
      }
      return headers;
    }

    function parseResponseJson(response) {
      return response
        .json()
        .catch(function () {
          return {};
        });
    }

    function parseWithdrawDetail(detail) {
      var rows = detail && Array.isArray(detail.detail) ? detail.detail : [];
      var fields = {};
      rows.forEach(function (row) {
        var label = String((row && (row.label || row.key)) || "")
          .trim()
          .toLowerCase();
        var value = String((row && row.value) || "").trim();
        if (!label || !value) {
          return;
        }
        if (label.indexOf("bank") >= 0 && label.indexOf("name") >= 0) {
          fields.bankName = value;
          return;
        }
        if (label.indexOf("holder") >= 0 || label === "account name") {
          fields.accountHolderName = value;
          return;
        }
        if (label.indexOf("account number") >= 0 || label.indexOf("account no") >= 0) {
          fields.accountNumber = value;
          return;
        }
        if (label.indexOf("ifsc") >= 0) {
          fields.ifscCode = value;
          return;
        }
        if (label.indexOf("phone") >= 0 || label.indexOf("mobile") >= 0) {
          fields.phoneNumber = value;
          return;
        }
        if (label.indexOf("upi") >= 0) {
          fields.upiId = value;
        }
      });
      return fields;
    }

    function maskValue(value, visibleCount) {
      var raw = String(value || "").replace(/\s+/g, "");
      if (!raw) {
        return "";
      }
      var visible = Number(visibleCount || 4);
      if (raw.length <= visible) {
        return raw;
      }
      return Array(Math.max(0, raw.length - visible) + 1).join("*") + raw.slice(-visible);
    }

    function buildWithdrawOptionLabel(detail) {
      var fields = parseWithdrawDetail(detail);
      var bank = fields.bankName || "Bank";
      var acc = fields.accountNumber ? "A/C " + maskValue(fields.accountNumber, 4) : "";
      var phone = fields.phoneNumber ? "Phone " + maskValue(fields.phoneNumber, 2) : "";
      return [bank, acc, phone].filter(Boolean).join(" | ");
    }

    function renderWithdrawDetailPreview(detailId) {
      var modal = ensureModal();
      var preview = modal.querySelector("#local-withdraw-card-preview");
      if (!preview) {
        return;
      }
      if (!withdrawDetailsCache.length) {
        preview.textContent = "No bank card saved.";
        return;
      }
      var activeId = String(detailId || "");
      if (!activeId) {
        activeId = String(withdrawDetailsCache[0].wid || "");
      }
      var active = withdrawDetailsCache.find(function (row) {
        return String(row.wid) === activeId;
      }) || withdrawDetailsCache[0];
      if (!active) {
        preview.textContent = "No bank card saved.";
        return;
      }
      var fields = parseWithdrawDetail(active);
      var lines = [];
      if (fields.bankName) lines.push("Bank: " + fields.bankName);
      if (fields.accountHolderName) lines.push("Holder: " + fields.accountHolderName);
      if (fields.accountNumber) lines.push("A/C: " + maskValue(fields.accountNumber, 4));
      if (fields.ifscCode) lines.push("IFSC: " + fields.ifscCode);
      if (fields.phoneNumber) lines.push("Phone: " + fields.phoneNumber);
      if (fields.upiId) lines.push("UPI: " + fields.upiId);
      preview.innerHTML = lines.length ? lines.join("<br>") : "Bank details saved.";
    }

    function renderWithdrawDetails() {
      var modal = ensureModal();
      var select = modal.querySelector("#local-withdraw-saved-list");
      if (!select) {
        return;
      }
      select.innerHTML = '<option value="">Select saved bank card</option>';
      withdrawDetailsCache.forEach(function (detail) {
        var option = document.createElement("option");
        option.value = String(detail.wid || "");
        option.textContent = buildWithdrawOptionLabel(detail);
        select.appendChild(option);
      });
      if (withdrawDetailsCache.length) {
        select.value = String(withdrawDetailsCache[0].wid || "");
      }
      renderWithdrawDetailPreview(select.value);
    }

    function loadWithdrawDetails(forceRefresh) {
      if (!forceRefresh && withdrawDetailsRequest) {
        return withdrawDetailsRequest;
      }
      var identity = getUserIdentity();
      var payload = {};
      if (identity.username) {
        payload.uname = identity.username;
      }
      withdrawDetailsRequest = window
        .fetch("/api/front/local-withdraw-details", {
          method: "POST",
          headers: getAuthHeaders({
            "Content-Type": "application/json",
            Accept: "application/json"
          }),
          body: JSON.stringify(payload)
        })
        .then(parseResponseJson)
        .then(function (response) {
          var ok = response && Number(response.status) === 200 && response.success !== false;
          var list = ok && response.data && Array.isArray(response.data.t1) ? response.data.t1 : [];
          withdrawDetailsCache = list;
          renderWithdrawDetails();
          return list;
        })
        .catch(function () {
          withdrawDetailsCache = [];
          renderWithdrawDetails();
          return [];
        })
        .finally(function () {
          withdrawDetailsRequest = null;
        });
      return withdrawDetailsRequest;
    }

    function collectBankFormValues() {
      var modal = ensureModal();
      var bankName = modal.querySelector("#local-withdraw-bank-name");
      var holderName = modal.querySelector("#local-withdraw-holder");
      var accountNo = modal.querySelector("#local-withdraw-account");
      var ifsc = modal.querySelector("#local-withdraw-ifsc");
      var phone = modal.querySelector("#local-withdraw-phone");

      return {
        bankName: bankName ? String(bankName.value || "").trim() : "",
        accountHolderName: holderName ? String(holderName.value || "").trim() : "",
        accountNumber: accountNo ? String(accountNo.value || "").replace(/\D/g, "").trim() : "",
        ifscCode: ifsc
          ? String(ifsc.value || "")
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .trim()
          : "",
        phoneNumber: phone ? String(phone.value || "").replace(/\D/g, "").trim() : ""
      };
    }

    function clearBankFormValues() {
      var modal = ensureModal();
      ["#local-withdraw-bank-name", "#local-withdraw-holder", "#local-withdraw-account", "#local-withdraw-ifsc", "#local-withdraw-phone"].forEach(function (selector) {
        var node = modal.querySelector(selector);
        if (node) {
          node.value = "";
        }
      });
    }

    function saveWithdrawDetail() {
      var identity = getUserIdentity();
      if (!identity.username) {
        setWithdrawSaveFeedback("error", "Please login first.");
        return;
      }
      var values = collectBankFormValues();
      if (!values.bankName || !values.accountHolderName || !values.accountNumber || !values.ifscCode || !values.phoneNumber) {
        setWithdrawSaveFeedback(
          "error",
          "Bank Name, Holder Name, Account Number, IFSC and Phone Number are required."
        );
        return;
      }
      if (values.accountNumber.length < 6) {
        setWithdrawSaveFeedback("error", "Enter valid account number.");
        return;
      }
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(values.ifscCode)) {
        setWithdrawSaveFeedback("error", "Enter valid IFSC code.");
        return;
      }
      if (values.phoneNumber.length < 10) {
        setWithdrawSaveFeedback("error", "Enter valid phone number.");
        return;
      }

      setWithdrawSaveFeedback("", "");
      window
        .fetch("/api/front/local-withdraw-add-detail", {
          method: "POST",
          headers: getAuthHeaders({
            "Content-Type": "application/json",
            Accept: "application/json"
          }),
          body: JSON.stringify({
            uname: identity.username,
            wid: 1,
            bank_name: values.bankName,
            account_holder_name: values.accountHolderName,
            account_number: values.accountNumber,
            ifsc: values.ifscCode,
            phone_number: values.phoneNumber
          })
        })
        .then(parseResponseJson)
        .then(function (response) {
          var ok = response && Number(response.status) === 200 && response.success !== false;
          if (!ok) {
            setWithdrawSaveFeedback("error", (response && response.msg) || "Unable to save bank card.");
            return;
          }
          clearBankFormValues();
          setWithdrawSaveFeedback("success", "Bank card saved successfully.");
          loadWithdrawDetails(true);
        })
        .catch(function () {
          setWithdrawSaveFeedback("error", "Network issue while saving bank card.");
        });
    }

    function submitWithdrawRequest() {
      var modal = ensureModal();
      var identity = getUserIdentity();
      if (!identity.username) {
        setWithdrawFeedback("error", "Please login first.");
        return;
      }
      if (!withdrawDetailsCache.length) {
        setWithdrawFeedback("error", "Please add bank card first.");
        return;
      }
      var selectNode = modal.querySelector("#local-withdraw-saved-list");
      var selectedId = selectNode ? String(selectNode.value || "").trim() : "";
      if (!selectedId) {
        selectedId = String(withdrawDetailsCache[0].wid || "");
      }
      var amountNode = modal.querySelector("#local-withdraw-amount-input");
      var amount = Number(String((amountNode && amountNode.value) || "").replace(/[^\d.]/g, ""));
      if (!Number.isFinite(amount) || amount <= 0) {
        setWithdrawFeedback("error", "Enter valid withdraw amount.");
        return;
      }
      var minNode = modal.querySelector("#local-payment-withdraw-min");
      var maxNode = modal.querySelector("#local-payment-withdraw-max");
      var minAmount = Number(String((minNode && minNode.textContent) || "0").replace(/[^\d.]/g, ""));
      var maxAmount = Number(String((maxNode && maxNode.textContent) || "0").replace(/[^\d.]/g, ""));
      if (Number.isFinite(minAmount) && minAmount > 0 && amount < minAmount) {
        setWithdrawFeedback("error", "Minimum withdraw amount is " + minAmount + ".");
        return;
      }
      if (Number.isFinite(maxAmount) && maxAmount > 0 && amount > maxAmount) {
        setWithdrawFeedback("error", "Maximum withdraw amount is " + maxAmount + ".");
        return;
      }

      var submitNode = modal.querySelector("#local-withdraw-submit");
      if (submitNode) {
        submitNode.disabled = true;
        submitNode.textContent = "Submitting...";
      }
      setWithdrawFeedback("", "");
      var closeProcessingPopup = openProcessingPopup();

      window
        .fetch("/api/front/local-withdraw-request", {
          method: "POST",
          headers: getAuthHeaders({
            "Content-Type": "application/json",
            Accept: "application/json"
          }),
          body: JSON.stringify({
            uname: identity.username,
            amount: Number(amount.toFixed(2)),
            withdraw_detail_id: selectedId
          })
        })
        .then(parseResponseJson)
        .then(function (response) {
          var ok = response && Number(response.status) === 200 && response.success !== false;
          if (!ok) {
            setWithdrawFeedback("error", (response && response.msg) || "Withdraw request failed.");
            return;
          }
          setWithdrawFeedback(
            "success",
            "Withdraw request submitted. Owner admin approval ke baad process hoga."
          );
          if (amountNode) {
            amountNode.value = "";
          }
        })
        .catch(function () {
          setWithdrawFeedback("error", "Network issue while submitting withdraw request.");
        })
        .finally(function () {
          closeProcessingPopup();
          if (submitNode) {
            submitNode.disabled = false;
            submitNode.textContent = "Request Withdrawal";
          }
        });
    }

    function resetDepositUi() {
      var modal = ensureModal();
      modal.setAttribute("data-local-payment-amount", "0");
      modal.setAttribute("data-local-payment-started", "0");

      var defaultAmount = Number(modal.getAttribute("data-local-payment-default-amount") || "100");
      if (!Number.isFinite(defaultAmount) || defaultAmount <= 0) {
        defaultAmount = MIN_DEPOSIT_AMOUNT;
      }
      defaultAmount = Math.max(MIN_DEPOSIT_AMOUNT, defaultAmount);

      var amountNode = modal.querySelector("#local-payment-transfer-amount");
      if (amountNode) {
        amountNode.textContent = "Rs 0.00";
      }

      var amountInputNode = modal.querySelector("#local-payment-amount-input");
      if (amountInputNode) {
        amountInputNode.value = String(defaultAmount.toFixed(2));
      }

      var stepShellNode = modal.querySelector("#local-payment-step-shell");
      if (stepShellNode) {
        stepShellNode.setAttribute("hidden", "hidden");
      }

      var orderNode = modal.querySelector("#local-payment-order-id");
      if (orderNode) {
        orderNode.textContent =
          "P" + Date.now() + Math.floor(Math.random() * 9000 + 1000);
      }
      var inputNode = modal.querySelector("#local-payment-utr-input");
      if (inputNode) {
        inputNode.value = "";
      }
      var submitNode = modal.querySelector("#local-payment-submit");
      if (submitNode) {
        submitNode.disabled = false;
        submitNode.textContent = "Submit UTR";
      }
      setFeedback("", "");
    }

    function showCopyState(success, title, text) {
      if (window.Swal && typeof window.Swal.fire === "function") {
        window.Swal.fire({
          icon: success ? "success" : "error",
          title: title || (success ? "Copied" : "Copy failed"),
          text: text || "",
          timer: success ? 1000 : 1500,
          showConfirmButton: false
        });
        return;
      }
      if (!success) {
        window.alert(text || "Unable to copy.");
      }
    }

    function openProcessingPopup() {
      if (!(window.Swal && typeof window.Swal.fire === "function")) {
        return function () { };
      }
      window.Swal.fire({
        title: "Processing payment",
        text: "Please wait patiently. We are submitting your request.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: function () {
          if (window.Swal && typeof window.Swal.showLoading === "function") {
            window.Swal.showLoading();
          }
        }
      });
      var closed = false;
      return function () {
        if (closed) {
          return;
        }
        closed = true;
        if (window.Swal && typeof window.Swal.close === "function") {
          window.Swal.close();
        }
      };
    }

    function copyText(text, successTitle) {
      var value = String(text || "").trim();
      if (!value) {
        showCopyState(false, "Copy failed", "Value not available.");
        return;
      }
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard
          .writeText(value)
          .then(function () {
            showCopyState(true, successTitle || "Copied");
          })
          .catch(function () {
            showCopyState(false, "Copy failed", "Clipboard permission denied.");
          });
        return;
      }
      try {
        var temp = document.createElement("textarea");
        temp.value = value;
        temp.setAttribute("readonly", "readonly");
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        var copied = document.execCommand("copy");
        safeDetachNode(temp, document.body);
        showCopyState(Boolean(copied), successTitle || "Copied");
      } catch (error) {
        showCopyState(false, "Copy failed", "Please copy manually.");
      }
    }

    function copyUpiId() {
      var modal = ensureModal();
      var upiNode = modal.querySelector("#local-payment-upi");
      var upiValue = upiNode ? String(upiNode.textContent || "").trim() : "";
      copyText(upiValue, "UPI copied");
    }

    function copyAmount() {
      var modal = ensureModal();
      var amount = Number(modal.getAttribute("data-local-payment-amount") || "100");
      if (!Number.isFinite(amount) || amount <= 0) {
        amount = Number(modal.getAttribute("data-local-payment-default-amount") || "100");
      }
      if (!Number.isFinite(amount) || amount <= 0) {
        amount = 100;
      }
      copyText(String(amount), "Amount copied");
    }

    function startPayment() {
      var modal = ensureModal();
      var amountInputNode = modal.querySelector("#local-payment-amount-input");
      var amountDisplayNode = modal.querySelector("#local-payment-transfer-amount");
      var stepShellNode = modal.querySelector("#local-payment-step-shell");
      var inputNode = modal.querySelector("#local-payment-utr-input");
      if (!amountInputNode || !stepShellNode) {
        return;
      }

      var rawAmount = String(amountInputNode.value || "")
        .replace(/[^\d.]/g, "")
        .replace(/^(\d*\.?\d{0,2}).*$/, "$1");
      amountInputNode.value = rawAmount;
      var amount = Number(rawAmount);
      if (!Number.isFinite(amount) || amount <= 0) {
        setFeedback("error", "Enter valid deposit amount.");
        showCopyState(false, "Invalid amount", "Please enter a valid amount.");
        return;
      }
      if (amount < MIN_DEPOSIT_AMOUNT) {
        var minMsg = "Minimum deposit amount is Rs " + MIN_DEPOSIT_AMOUNT + ".";
        setFeedback("error", minMsg);
        showCopyState(false, "Minimum amount required", minMsg);
        return;
      }

      amount = Number(amount.toFixed(2));
      modal.setAttribute("data-local-payment-amount", String(amount));
      modal.setAttribute("data-local-payment-started", "1");
      if (amountDisplayNode) {
        amountDisplayNode.textContent = "Rs " + amount.toFixed(2);
      }
      stepShellNode.removeAttribute("hidden");
      if (inputNode) {
        inputNode.focus();
      }
      setFeedback("", "");
      showCopyState(
        true,
        "Payment window ready",
        "QR/UPI details open ho gayi hain. Payment ke baad UTR submit karein."
      );
    }

    function submitUtr() {
      var modal = ensureModal();
      var inputNode = modal.querySelector("#local-payment-utr-input");
      var submitNode = modal.querySelector("#local-payment-submit");
      var orderNode = modal.querySelector("#local-payment-order-id");
      var upiNode = modal.querySelector("#local-payment-upi");
      if (!inputNode || !submitNode) {
        return;
      }

      if (String(modal.getAttribute("data-local-payment-started") || "0") !== "1") {
        setFeedback("error", "Pehle amount daal kar Pay button press karein.");
        showCopyState(false, "Payment not started", "Pehle Pay par click karein.");
        return;
      }

      var utr = String(inputNode.value || "").replace(/\D/g, "").slice(0, 12);
      inputNode.value = utr;
      if (!/^\d{12}$/.test(utr)) {
        setFeedback("error", "Enter valid 12-digit UTR.");
        showCopyState(false, "Invalid UTR", "UTR 12 digits ka hona chahiye.");
        return;
      }

      var amount = Number(modal.getAttribute("data-local-payment-amount") || "100");
      if (!Number.isFinite(amount) || amount <= 0) {
        amount = MIN_DEPOSIT_AMOUNT;
      }
      if (amount < MIN_DEPOSIT_AMOUNT) {
        var minUtrMsg = "Minimum deposit amount is Rs " + MIN_DEPOSIT_AMOUNT + ".";
        setFeedback("error", minUtrMsg);
        showCopyState(false, "Minimum amount required", minUtrMsg);
        return;
      }
      var orderId = orderNode ? String(orderNode.textContent || "").trim() : "";
      var upiId = upiNode ? String(upiNode.textContent || "").trim() : "";
      var identity = getUserIdentity();
      var username = String(identity.username || "").trim();

      submitNode.disabled = true;
      submitNode.textContent = "Submitting...";
      setFeedback("", "");
      var closeProcessingPopup = openProcessingPopup();

      window
        .fetch("/api/front/local-payment-utr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            utr: utr,
            amount: amount,
            upiId: upiId,
            orderId: orderId,
            uname: username
          })
        })
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          });
        })
        .then(function (payload) {
          closeProcessingPopup();
          var ok = payload && Number(payload.status) === 200 && payload.success !== false;
          if (!ok) {
            var msg = payload && payload.msg ? payload.msg : "UTR submit failed.";
            setFeedback("error", msg);
            showCopyState(false, "Submit failed", msg);
            return;
          }
          setFeedback("success", "Request received. Status: Processing.");
          showCopyState(
            true,
            "Request submitted",
            "Payment request processing me hai. Admin approval ke baad balance update hoga."
          );
          resetDepositUi();
        })
        .catch(function () {
          closeProcessingPopup();
          setFeedback("error", "Network issue. Please try again.");
          showCopyState(false, "Submit failed", "Network error.");
        })
        .finally(function () {
          closeProcessingPopup();
          submitNode.disabled = false;
          submitNode.textContent = "Submit UTR";
        });
    }

    function openModal(defaultTab) {
      ensureStyles();
      var modal = ensureModal();
      var tab = defaultTab === "withdrawal" ? "withdrawal" : "deposit";
      setTab(tab);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add(BODY_LOCK_CLASS);

      loadSettings(true).then(function (settings) {
        updateModalValues(settings);
        if (tab === "deposit") {
          resetDepositUi();
        } else {
          loadWithdrawDetails(true);
        }
      });
    }

    function closeModal() {
      var modal = document.getElementById(MODAL_ID);
      if (!modal) {
        return;
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove(BODY_LOCK_CLASS);
    }

    function createTopButtons() {
      var wrap = document.createElement("div");
      wrap.id = TOP_WRAP_ID;
      wrap.className = "local-pay-actions";
      wrap.innerHTML =
        '<button type="button" class="local-pay-btn deposit" ' +
        TOP_TRIGGER_ATTR +
        '="deposit"><i class="fas fa-piggy-bank"></i> Deposit</button>' +
        '<button type="button" class="local-pay-btn withdraw" ' +
        TOP_TRIGGER_ATTR +
        '="withdrawal"><i class="fas fa-hand-holding-usd"></i> Withdrawal</button>';
      return wrap;
    }

    function injectTopButtons(rootNode) {
      var root = rootNode || document;
      if (!root || root.nodeType !== 1 && root !== document) {
        return;
      }

      var header =
        root === document
          ? document.querySelector(".header-top")
          : root.matches && root.matches(".header-top")
            ? root
            : root.querySelector
              ? root.querySelector(".header-top")
              : null;

      if (!header || !header.appendChild) {
        return;
      }

      var nativeActions = header.querySelector(".depowith");
      if (!SHOW_TOP_PAYMENT_BUTTONS) {
        if (nativeActions) {
          nativeActions.style.setProperty("display", "none", "important");
          nativeActions.style.setProperty("visibility", "hidden", "important");
          nativeActions.style.setProperty("opacity", "0", "important");
          nativeActions.style.setProperty("pointer-events", "none", "important");
        }
        var hiddenNode = header.querySelector("#" + TOP_WRAP_ID);
        if (hiddenNode && hiddenNode.parentNode) {
          safeDetachNode(hiddenNode);
        }
        return;
      }
      var nativeIsVisible = false;
      if (nativeActions) {
        nativeActions.style.setProperty("display", "flex", "important");
        nativeActions.style.setProperty("visibility", "visible", "important");
        nativeActions.style.setProperty("opacity", "1", "important");
        nativeActions.style.setProperty("pointer-events", "auto", "important");
        var nativeButtons = nativeActions.querySelectorAll("a, button, [role='button'], .btn");
        nativeButtons.forEach(function (node) {
          node.style.setProperty("display", "inline-flex", "important");
          node.style.setProperty("visibility", "visible", "important");
          node.style.setProperty("opacity", "1", "important");
          node.style.setProperty("pointer-events", "auto", "important");
        });
        var computed = window.getComputedStyle ? window.getComputedStyle(nativeActions) : null;
        nativeIsVisible =
          nativeButtons.length > 0 &&
          (!computed || computed.display !== "none") &&
          nativeActions.offsetWidth > 20 &&
          nativeActions.offsetHeight > 10;
      }

      if (nativeIsVisible) {
        var fallbackNode = header.querySelector("#" + TOP_WRAP_ID);
        if (fallbackNode && fallbackNode.parentNode) {
          safeDetachNode(fallbackNode);
        }
        return;
      }
      if (header.querySelector("#" + TOP_WRAP_ID)) {
        return;
      }
      var actionsNode = createTopButtons();
      var newsNode = header.querySelector(".news");
      if (newsNode && newsNode.parentNode === header) {
        header.insertBefore(actionsNode, newsNode);
      } else {
        header.appendChild(actionsNode);
      }
    }

    document.addEventListener(
      "click",
      function (event) {
        if (!SHOW_TOP_PAYMENT_BUTTONS) {
          return;
        }
        var trigger = event.target && event.target.closest
          ? event.target.closest("[" + TOP_TRIGGER_ATTR + "]")
          : null;
        if (!trigger) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === "function") {
          event.stopImmediatePropagation();
        }
        var tab = trigger.getAttribute(TOP_TRIGGER_ATTR) || "deposit";
        openModal(tab === "withdrawal" ? "withdrawal" : "deposit");
      },
      true
    );

    ensureStyles();
    var topButtonsInjectTimer = 0;
    function scheduleTopButtonsInject(target) {
      clearTimeout(topButtonsInjectTimer);
      topButtonsInjectTimer = setTimeout(function () {
        injectTopButtons(target || document);
      }, 120);
    }

    injectTopButtons(document);
    window.setInterval(function () {
      if (document.hidden) {
        return;
      }
      scheduleTopButtonsInject(document);
    }, 8000);
    if (window.MutationObserver && document.body) {
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i += 1) {
          var mutation = mutations[i];
          var target = mutation.target;
          if (
            target &&
            target.nodeType === 1 &&
            target.closest &&
            target.closest(".header-top, .depowith, .search-box-container")
          ) {
            scheduleTopButtonsInject(target);
            return;
          }
          var added = mutation.addedNodes || [];
          for (var j = 0; j < added.length; j += 1) {
            var node = added[j];
            if (
              node &&
              node.nodeType === 1 &&
              ((node.matches &&
                node.matches(".header-top, .depowith, .search-box-container, .user-details, .user-balance")) ||
                (node.closest && node.closest(".header-top, .depowith, .search-box-container")))
            ) {
              scheduleTopButtonsInject(node);
              return;
            }
          }
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  function installLocalWalletSync() {
    if (
      !window ||
      !document ||
      window.__LOCAL_WALLET_SYNC_INSTALLED__ ||
      /^\/admin(?:\/|$)/i.test(window.location.pathname || "")
    ) {
      return;
    }
    window.__LOCAL_WALLET_SYNC_INSTALLED__ = true;
    var RULES_HIDE_STYLE_ID = "local-rules-hide-style";
    var ENABLE_HEADER_RULES_SWEEP = false;

    function safeParseJSON(value, fallback) {
      if (value && typeof value === "object") {
        return value;
      }
      if (typeof value !== "string") {
        return fallback || {};
      }
      try {
        var parsed = JSON.parse(value);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (error) { }
      return fallback || {};
    }

    function parsePersistNode(value, fallback) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
      if (typeof value !== "string") {
        return fallback || {};
      }
      return safeParseJSON(value, fallback || {});
    }

    function decodeApiEnvelope(payload) {
      if (!payload || typeof payload !== "object") {
        return payload;
      }
      if (typeof payload.data !== "string") {
        return payload;
      }
      if (typeof window._0x895125d === "function" && window.CryptoJS) {
        try {
          var decrypted = window._0x895125d(payload.data, window.CryptoJS);
          if (decrypted && typeof decrypted === "object") {
            try { console.log("[LocalMirror] Decrypted API Response:", decrypted); } catch (e) { }
            return decrypted;
          }
        } catch (error) { }
      }
      try {
        var parsed = JSON.parse(payload.data);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (error) { }
      return payload;
    }

    function getIdentity() {
      var root = safeParseJSON(localStorage.getItem("persist:root") || "{}", {});
      var data = parsePersistNode(root.data || "{}", {});
      var auth = parsePersistNode(root.auth || "{}", {});
      var userState = parsePersistNode(root.user || "{}", {});
      var userData = parsePersistNode(userState.data || "{}", {});
      function parseToken(raw) {
        if (typeof raw !== "string") return "";
        var text = String(raw || "").trim();
        if (!text) return "";
        try {
          var parsed = JSON.parse(text);
          if (typeof parsed === "string") return String(parsed || "").trim();
        } catch (error) { }
        return text.replace(/^"+|"+$/g, "").trim();
      }
      function pickValue(candidates, skipUsernameLiteral) {
        for (var i = 0; i < candidates.length; i += 1) {
          var value = String(candidates[i] || "").trim();
          if (!value) {
            continue;
          }
          if (skipUsernameLiteral && /^username$/i.test(value)) {
            continue;
          }
          return value;
        }
        return "";
      }
      var selectedUsername = pickValue(
        [
          userData.user_name,
          userData.uname,
          userData.username,
          userState.username,
          data.user_name,
          data.uname,
          data.username,
          auth.user_name,
          auth.uname,
          auth.username
        ],
        true
      );
      if (!selectedUsername) {
        selectedUsername = readUsernameFromHeader();
      }
      var selectedUsernameLower = String(selectedUsername || "").trim().toLowerCase();
      function pickTokenFor(node) {
        if (!node || typeof node !== "object") return "";
        var token = pickValue([node.token, node.auth, node.access_token], false);
        if (!token) return "";
        if (!selectedUsernameLower) return token;
        var nodeName = pickValue([node.user_name, node.uname, node.username], true).toLowerCase();
        if (!nodeName || nodeName === selectedUsernameLower) return token;
        return "";
      }
      var rootToken = parseToken(root.token);
      return {
        username: selectedUsername,
        token: pickValue(
          [
            pickTokenFor(userData),
            pickTokenFor(data),
            pickTokenFor(auth),
            userState.token,
            rootToken,
            userState.token,
            userData.token,
            userData.auth,
            userData.access_token,
            data.token,
            data.auth,
            data.access_token,
            auth.token,
            auth.auth,
            auth.access_token
          ],
          false
        )
      };
    }

    function setPersistBalance(nextBalance, nextName, nextExposure, nextExpPl, nextAvailable) {
      var root = safeParseJSON(localStorage.getItem("persist:root") || "{}", {});
      var data = parsePersistNode(root.data || "{}", {});
      var auth = parsePersistNode(root.auth || "{}", {});
      var userState = parsePersistNode(root.user || "{}", {});
      var userData = parsePersistNode(userState.data || "{}", {});
      var identity = getIdentity();
      var prevBalance = Number(userData.bal || data.bal || auth.bal || 0);
      var name = String(
        nextName ||
        userData.user_name ||
        userData.uname ||
        userData.username ||
        data.user_name ||
        data.uname ||
        data.username ||
        auth.user_name ||
        auth.uname ||
        auth.username ||
        ""
      ).trim();
      var token = String(
        (identity && identity.token) ||
        userState.token ||
        userData.token ||
        userData.auth ||
        userData.access_token ||
        data.token ||
        data.auth ||
        data.access_token ||
        auth.token ||
        auth.auth ||
        auth.access_token ||
        ""
      ).trim();
      var normalizedBalance = Number(nextBalance);
      if (!Number.isFinite(normalizedBalance)) {
        normalizedBalance = 0;
      }
      var normalizedExposure = Number(nextExposure);
      if (!Number.isFinite(normalizedExposure)) {
        normalizedExposure = Number(
          userData.exp != null
            ? userData.exp
            : data.exp != null
              ? data.exp
              : auth.exp != null
                ? auth.exp
                : 0
        );
      }
      if (!Number.isFinite(normalizedExposure)) {
        normalizedExposure = 0;
      }
      if (normalizedExposure > 0) {
        normalizedExposure = -Math.abs(normalizedExposure);
      }
      normalizedExposure = Number(normalizedExposure.toFixed(2));
      var normalizedExpPl = Number(nextExpPl);
      if (!Number.isFinite(normalizedExpPl)) {
        normalizedExpPl = Number(
          userData.exp_pl != null
            ? userData.exp_pl
            : userData.exposure_pl != null
              ? userData.exposure_pl
              : data.exp_pl != null
                ? data.exp_pl
                : data.exposure_pl != null
                  ? data.exposure_pl
                  : auth.exp_pl != null
                    ? auth.exp_pl
                    : auth.exposure_pl != null
                      ? auth.exposure_pl
                      : 0
        );
      }
      if (!Number.isFinite(normalizedExpPl)) {
        normalizedExpPl = 0;
      }
      normalizedExpPl = Number(normalizedExpPl.toFixed(2));
      var normalizedAvailable = Number(nextAvailable);
      if (!Number.isFinite(normalizedAvailable)) {
        normalizedAvailable = Number((normalizedBalance + normalizedExposure).toFixed(2));
      } else {
        normalizedAvailable = Number(normalizedAvailable.toFixed(2));
      }

      data.bal = normalizedBalance;
      data.exp = normalizedExposure;
      data.exposure = normalizedExposure;
      data.exp_pl = normalizedExpPl;
      data.exposure_pl = normalizedExpPl;
      data.available_balance = normalizedAvailable;
      data.availableBalance = normalizedAvailable;
      auth.bal = normalizedBalance;
      auth.exp = normalizedExposure;
      auth.exposure = normalizedExposure;
      auth.exp_pl = normalizedExpPl;
      auth.exposure_pl = normalizedExpPl;
      auth.available_balance = normalizedAvailable;
      auth.availableBalance = normalizedAvailable;
      userData.bal = normalizedBalance;
      userData.exp = normalizedExposure;
      userData.exposure = normalizedExposure;
      userData.exp_pl = normalizedExpPl;
      userData.exposure_pl = normalizedExpPl;
      userData.available_balance = normalizedAvailable;
      userData.availableBalance = normalizedAvailable;
      if (name) {
        data.user_name = name;
        data.uname = name;
        data.username = name;
        auth.user_name = name;
        auth.uname = name;
        auth.username = name;
        userData.user_name = name;
        userData.uname = name;
        userData.username = name;
      }
      if (token) {
        data.token = token;
        data.auth = token;
        data.access_token = token;
        auth.token = token;
        auth.auth = token;
        auth.access_token = token;
        userData.token = token;
        userData.auth = token;
        userData.access_token = token;
      }

      root.data = JSON.stringify(data);
      root.auth = JSON.stringify(auth);
      root.user = JSON.stringify(
        Object.assign({}, userState || {}, {
          token: token || userState.token || "",
          logedIn: true,
          rulesLogin: true,
          popUpLogin: false,
          data: userData
        })
      );
      root.logedIn = "true";
      root.rulesLogin = "true";
      root.popUpLogin = "false";
      if (token) {
        root.token = JSON.stringify(token);
      }
      if (!root._persist) {
        root._persist = JSON.stringify({ version: -1, rehydrated: true });
      }
      localStorage.setItem("persist:root", JSON.stringify(root));
      return prevBalance;
    }

    function formatHeaderBalance(value) {
      var num = Number(value);
      if (!Number.isFinite(num)) {
        num = 0;
      }
      if (Math.abs(num - Math.round(num)) < 0.0001) {
        return Number(Math.round(num)).toLocaleString("en-IN");
      }
      return num.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function formatSignedHeaderValue(value) {
      var num = Number(value);
      if (!Number.isFinite(num)) {
        num = 0;
      }
      var formatted = formatHeaderBalance(Math.abs(num));
      if (num > 0) {
        return "+" + formatted;
      }
      if (num < 0) {
        return "-" + formatted;
      }
      return formatted;
    }

    function getTopHeaderRoot() {
      var directRoot =
        document.querySelector(".header-top") ||
        document.querySelector(".top-header") ||
        document.querySelector("header .header-top");
      if (directRoot) {
        return directRoot;
      }
      var nodes = document.querySelectorAll("div,header,section");
      for (var i = 0; i < nodes.length; i += 1) {
        var text = String(nodes[i].textContent || "");
        if (/Download Apk/i.test(text) && /Balance\s*:/i.test(text)) {
          return nodes[i];
        }
      }
      return null;
    }

    function ensureRulesAcceptedPersistState() {
      try {
        var persistKey = "persist:root";
        var root = safeParseJSON(localStorage.getItem(persistKey) || "{}", {});
        var changed = false;

        if (String(root.rulesLogin || "").toLowerCase() !== "true") {
          root.rulesLogin = "true";
          changed = true;
        }
        if (String(root.popUpLogin || "").toLowerCase() !== "false") {
          root.popUpLogin = "false";
          changed = true;
        }

        var userState = parsePersistNode(root.user || "{}", {});
        var userChanged = false;
        if (!userState || typeof userState !== "object") {
          userState = {};
          userChanged = true;
        }
        if (userState.rulesLogin !== true) {
          userState.rulesLogin = true;
          userChanged = true;
        }
        if (userState.popUpLogin !== false) {
          userState.popUpLogin = false;
          userChanged = true;
        }
        if (userChanged) {
          root.user = JSON.stringify(userState);
          changed = true;
        }

        if (changed) {
          if (!root._persist) {
            root._persist = JSON.stringify({ version: -1, rehydrated: true });
          }
          localStorage.setItem(persistKey, JSON.stringify(root));
        }
      } catch (error) { }
    }

    function ensureRulesHiddenStyles() {
      if (document.getElementById(RULES_HIDE_STYLE_ID)) {
        return;
      }
      var style = document.createElement("style");
      style.id = RULES_HIDE_STYLE_ID;
      style.type = "text/css";
      style.textContent = [
        ".header-top,.top-header,.header,.user-details,.user-balance{overflow:visible !important;}",
        ".user-details .dropdown-menu,.user-menu .dropdown-menu,.user-dropdown .dropdown-menu,.user-balance .dropdown-menu{z-index:2400 !important;}",
        ".header-rules,.btn-head_rules,.btn-rules,.rules-link{display:none !important;visibility:hidden !important;opacity:0 !important;pointer-events:none !important;}",
        "#rulesModal,.rules-modal,.rules-popup,.rules-pop,.rules-download,[id*='rules'][class*='modal'],[id*='Rules'][class*='modal']{display:none !important;visibility:hidden !important;opacity:0 !important;pointer-events:none !important;}",
        "html, body { overflow-y:auto !important; }",
        "body.local-payment-lock { overflow-y:auto !important; }"
      ].join("");
      document.head.appendChild(style);
    }

    function hideElementNode(node) {
      if (!node || node.nodeType !== 1) {
        return;
      }
      node.style.setProperty("display", "none", "important");
      node.style.setProperty("visibility", "hidden", "important");
      node.style.setProperty("opacity", "0", "important");
      node.style.setProperty("pointer-events", "none", "important");
      node.setAttribute("aria-hidden", "true");
    }

    function hideRulesHeaderEntry(root) {
      function shouldKeepNode(node) {
        if (!node || node.nodeType !== 1) {
          return false;
        }
        var text = String(node.textContent || "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (
          /(balance\s*:|exp\s*:|statement|signout|change password|current bet|activity logs|casino results|live casino bets|security auth verification|username|user\b)/i.test(
            text
          )
        ) {
          return true;
        }
        var className = String(node.className || "").toLowerCase();
        if (
          /user|balance|wallet|account|dropdown|depowith|header-top-menu/.test(className) ||
          (node.closest &&
            node.closest(
              ".user-details, .user-balance, .user-menu, .user-dropdown, .depowith, [class*='user-detail'], [class*='user-menu']"
            ))
        ) {
          return true;
        }
        return false;
      }

      if (!root || !root.querySelectorAll) {
        return;
      }
      var candidates = root.querySelectorAll("a,button,span,strong,b,li,div");
      for (var i = 0; i < candidates.length; i += 1) {
        var node = candidates[i];
        if (!node || (node.children && node.children.length)) {
          continue;
        }
        var text = String(node.textContent || "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        var isPaymentNode = text.indexOf("deposit") >= 0 || text.indexOf("withdraw") >= 0;
        if (!isPaymentNode) {
          continue;
        }
        var target = node.closest("a,button,[role='button']") || node;
        if (shouldKeepNode(target)) {
          continue;
        }
        hideElementNode(target);
      }
    }

    function hideRulesModalOverlays() {
      function isRulesModalLike(node) {
        if (!node || node.nodeType !== 1) {
          return false;
        }
        var titleNode = node.querySelector(".modal-title, .side-head, .side-header, h1, h2, h3, h4, h5, h6");
        var titleText = String(titleNode && titleNode.textContent ? titleNode.textContent : "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (titleText === "rules") {
          return true;
        }
        var text = String(node.textContent || "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (!text) {
          return false;
        }
        if (text.indexOf("i agree all rules") >= 0) {
          return true;
        }
        if (text.indexOf("rules") >= 0 && text.indexOf("accept") >= 0) {
          return true;
        }
        if (titleText.indexOf("rules") === 0 && text.indexOf("agree") >= 0) {
          return true;
        }
        return false;
      }

      var rulesModals = document.querySelectorAll(
        ".rules-modal.modal.show, .rules-modal.show, .modal.rules-modal, .modal, [role='dialog']"
      );
      for (var m = 0; m < rulesModals.length; m += 1) {
        var modal = rulesModals[m];
        if (!modal || modal.nodeType !== 1 || !isRulesModalLike(modal)) {
          continue;
        }
        var acceptButton = null;
        var modalButtons = modal.querySelectorAll("button, [role='button'], a.btn, .btn");
        for (var bi = 0; bi < modalButtons.length; bi += 1) {
          var candidate = modalButtons[bi];
          var buttonText = String(candidate && candidate.textContent ? candidate.textContent : "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
          if (!buttonText) {
            continue;
          }
          if (buttonText.indexOf("accept") >= 0 || buttonText.indexOf("agree") >= 0) {
            acceptButton = candidate;
            break;
          }
        }
        if (!acceptButton) {
          acceptButton = modal.querySelector(
            "button.btn-success, .modal-footer .btn-success, [role='button'].btn-success"
          );
        }
        if (acceptButton && typeof acceptButton.click === "function") {
          try {
            acceptButton.click();
          } catch (error) { }
        }
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        modal.style.setProperty("display", "none", "important");
        modal.style.setProperty("visibility", "hidden", "important");
        modal.style.setProperty("opacity", "0", "important");
        modal.style.setProperty("pointer-events", "none", "important");
        modal.setAttribute("data-local-rules-hidden", "1");
      }

      function hasVisibleNonRulesDialog() {
        var activeDialogs = document.querySelectorAll(
          ".modal.show, [role='dialog'].show, .swal2-container, .swal-overlay, .swal-overlay--show-modal"
        );
        for (var di = 0; di < activeDialogs.length; di += 1) {
          var dialog = activeDialogs[di];
          if (!dialog || dialog.nodeType !== 1) {
            continue;
          }
          if (isRulesModalLike(dialog)) {
            continue;
          }
          var style = null;
          if (window.getComputedStyle) {
            style = window.getComputedStyle(dialog);
          }
          if (
            style &&
            (style.display === "none" ||
              style.visibility === "hidden" ||
              style.opacity === "0" ||
              Number(style.zIndex || "0") < 0)
          ) {
            continue;
          }
          return true;
        }
        return false;
      }

      var keepBackdropForActiveDialog = hasVisibleNonRulesDialog();
      var backdropNodes = document.querySelectorAll(
        ".modal-backdrop, .swal2-container, .swal-overlay, .swal-overlay--show-modal"
      );
      for (var b = 0; b < backdropNodes.length; b += 1) {
        var backdrop = backdropNodes[b];
        if (!backdrop) {
          continue;
        }
        if (backdrop.classList && backdrop.classList.contains("modal-backdrop")) {
          if (!keepBackdropForActiveDialog) {
            backdrop.style.setProperty("display", "none", "important");
            backdrop.style.setProperty("visibility", "hidden", "important");
            backdrop.style.setProperty("opacity", "0", "important");
            backdrop.style.setProperty("pointer-events", "none", "important");
            backdrop.setAttribute("data-local-rules-hidden", "1");
          }
          continue;
        }
        if (isRulesModalLike(backdrop)) {
          backdrop.style.setProperty("display", "none", "important");
          backdrop.style.setProperty("visibility", "hidden", "important");
          backdrop.style.setProperty("opacity", "0", "important");
          backdrop.style.setProperty("pointer-events", "none", "important");
          backdrop.setAttribute("data-local-rules-hidden", "1");
        }
      }

      if (document.body && document.body.classList && document.body.classList.contains("local-payment-lock")) {
        document.body.classList.remove("local-payment-lock");
      }
      if (document.body && !keepBackdropForActiveDialog) {
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("overflow-y");
      }
    }

    function ensureRulesUiHidden() {
      ensureRulesAcceptedPersistState();
      ensureRulesHiddenStyles();
      hideRulesModalOverlays();
      if (ENABLE_HEADER_RULES_SWEEP) {
        var headerRoot = getTopHeaderRoot();
        if (headerRoot) {
          hideRulesHeaderEntry(headerRoot);
        }
      }
    }

    function patchHeaderWallet(balance, expValue, username, availableBalance) {
      var root = getTopHeaderRoot();
      if (!root) {
        ensureRulesUiHidden();
        return;
      }
      if (ENABLE_HEADER_RULES_SWEEP) {
        hideRulesHeaderEntry(root);
      }
      var balanceNumber = Number(balance);
      var expNumber = Number(expValue);
      var availableNumber = Number(availableBalance);
      if (!Number.isFinite(balanceNumber)) {
        balanceNumber = 0;
      }
      if (!Number.isFinite(expNumber)) {
        expNumber = 0;
      }
      if (!Number.isFinite(availableNumber)) {
        availableNumber = balanceNumber;
      }
      availableNumber = Number(availableNumber.toFixed(2));
      var formattedBalance = formatHeaderBalance(availableNumber);
      var formattedExposure = formatSignedHeaderValue(expNumber);
      var name = String(username || "").trim();
      function isNumericLike(text) {
        return /^[\s]*[+-]?[\d,]+(?:\.\d+)?$/.test(String(text || "").trim());
      }
      function applyExpTone(node, value) {
        if (!node || !node.classList || !node.style) {
          return;
        }
        node.classList.remove("local-exp-value-positive", "local-exp-value-negative");
        node.style.removeProperty("color");
        var num = Number(value);
        if (!Number.isFinite(num) || num === 0) {
          return;
        }
        if (num > 0) {
          node.classList.add("local-exp-value-positive");
        } else {
          node.classList.add("local-exp-value-negative");
        }
      }
      function leafChildren(parent) {
        if (!parent || !parent.children) {
          return [];
        }
        var out = [];
        for (var ci = 0; ci < parent.children.length; ci += 1) {
          var child = parent.children[ci];
          if (child && child.children && child.children.length) {
            continue;
          }
          out.push(child);
        }
        return out;
      }
      var textNodes = root.querySelectorAll("span,a,div,strong,b");
      for (var i = 0; i < textNodes.length; i += 1) {
        var node = textNodes[i];
        if (node && node.children && node.children.length) {
          continue;
        }
        var current = String(node.textContent || "").trim();
        if (!current) {
          continue;
        }
        if (/^Balance\s*:/i.test(current)) {
          var parent = node.parentElement;
          var siblings = leafChildren(parent);
          var numericSibling = null;
          for (var si = 0; si < siblings.length; si += 1) {
            var sib = siblings[si];
            if (sib === node) {
              continue;
            }
            if (isNumericLike(String(sib.textContent || "").trim())) {
              numericSibling = sib;
              break;
            }
          }
          if (numericSibling) {
            node.textContent = "Balance:";
            numericSibling.textContent = formattedBalance;
          } else {
            node.textContent = "Balance:" + formattedBalance;
          }
          continue;
        }
        if (/^(exp|exposure)\s*:/i.test(current)) {
          var expParent = node.parentElement;
          var expSiblings = leafChildren(expParent);
          var expNumericSibling = null;
          for (var ei = 0; ei < expSiblings.length; ei += 1) {
            var expSib = expSiblings[ei];
            if (expSib === node) {
              continue;
            }
            if (isNumericLike(String(expSib.textContent || "").trim())) {
              expNumericSibling = expSib;
              break;
            }
          }
          if (expNumericSibling) {
            node.textContent = "EXP:";
            expNumericSibling.textContent = formattedExposure;
            applyExpTone(expNumericSibling, expNumber);
          } else {
            node.textContent = "EXP:" + formattedExposure;
            applyExpTone(node, expNumber);
          }
          continue;
        }
        if (/^Available\s*:/i.test(current)) {
          continue;
        }
        if (name && /^Username$/i.test(current)) {
          node.textContent = name;
        }
      }

      var balanceBlocks = root.querySelectorAll(".user-balance");
      for (var b = 0; b < balanceBlocks.length; b += 1) {
        var block = balanceBlocks[b];
        if (!block || block.nodeType !== 1) {
          continue;
        }
        var directRows = [];
        for (var ri = 0; ri < block.children.length; ri += 1) {
          var row = block.children[ri];
          if (row && String(row.tagName || "").toLowerCase() === "div") {
            directRows.push(row);
          }
        }
        if (directRows[0]) {
          directRows[0].innerHTML = '<span>Balance: </span><b class="local-balance-val">' + formattedBalance + "</b>";
        }
        if (directRows[1]) {
          directRows[1].innerHTML = '<span>EXP: </span><b class="local-exp-val">' + formattedExposure + "</b>";
          var expNode = directRows[1].querySelector("b");
          applyExpTone(expNode, expNumber);
        }
      }
    }

    var syncing = false;
    async function fetchPlainWallet(identity) {
      try {
        if (!identity || !identity.token) {
          return null;
        }
        var headers = { "Content-Type": "application/json" };
        headers.Authorization = "Bearer " + identity.token;
        var response = await window.fetch("/api/front/local-userdata", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ uname: (identity && identity.username) || "" })
        });
        var payload = await response.json().catch(function () {
          return {};
        });
        if (!payload || Number(payload.status) !== 200 || !payload.data || typeof payload.data !== "object") {
          return null;
        }
        return payload.data;
      } catch (error) {
        return null;
      }
    }

    async function syncWallet() {
      if (syncing) {
        ensureRulesUiHidden();
        return;
      }
      var identity = getIdentity();
      if (!identity.token && !identity.username) {
        ensureRulesUiHidden();
        return;
      }
      syncing = true;
      try {
        ensureRulesUiHidden();
        var plainData = await fetchPlainWallet(identity);
        if (plainData && typeof plainData === "object") {
          var plainBalance = Number(plainData.bal);
          if (Number.isFinite(plainBalance)) {
            plainBalance = Number(plainBalance.toFixed(2));
            var plainExposure = Number(
              plainData.exp != null ? plainData.exp : plainData.exposure != null ? plainData.exposure : 0
            );
            if (!Number.isFinite(plainExposure)) {
              plainExposure = 0;
            }
            var plainExpPl = Number(
              plainData.exp_pl != null
                ? plainData.exp_pl
                : plainData.expPl != null
                  ? plainData.expPl
                  : plainData.exposure_pl != null
                    ? plainData.exposure_pl
                    : plainData.pl != null
                      ? plainData.pl
                      : plainData.profit_loss != null
                        ? plainData.profit_loss
                        : plainData.profitLoss != null
                          ? plainData.profitLoss
                          : 0
            );
            if (!Number.isFinite(plainExpPl)) {
              plainExpPl = 0;
            }
            var plainAvailable = Number(
              plainData.available_balance != null
                ? plainData.available_balance
                : plainData.availableBalance != null
                  ? plainData.availableBalance
                  : NaN
            );
            var plainName = String(
              plainData.user_name || plainData.uname || plainData.username || identity.username || ""
            ).trim();
            setPersistBalance(plainBalance, plainName, plainExposure, plainExpPl, plainAvailable);
            patchHeaderWallet(plainBalance, plainExposure, plainName, plainAvailable);
            return;
          }
        }

        var headers = {
          "Content-Type": "application/json"
        };
        if (identity.token) {
          headers.Authorization = "Bearer " + identity.token;
        }
        var response = await window.fetch("/api/front/userdata", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ uname: identity.username || "" })
        });
        var payload = await response.json().catch(function () {
          return {};
        });
        var decoded = decodeApiEnvelope(payload);
        if (!decoded || Number(decoded.status) !== 200 || !decoded.data || typeof decoded.data !== "object") {
          return;
        }

        var nextBalance = Number(decoded.data.bal);
        if (!Number.isFinite(nextBalance)) {
          return;
        }
        nextBalance = Number(nextBalance.toFixed(2));
        var nextExposure = Number(
          decoded.data.exp != null ? decoded.data.exp : decoded.data.exposure != null ? decoded.data.exposure : 0
        );
        if (!Number.isFinite(nextExposure)) {
          nextExposure = 0;
        }
        var nextExpPl = Number(
          decoded.data.exp_pl != null
            ? decoded.data.exp_pl
            : decoded.data.expPl != null
              ? decoded.data.expPl
              : decoded.data.exposure_pl != null
                ? decoded.data.exposure_pl
                : decoded.data.pl != null
                  ? decoded.data.pl
                  : decoded.data.profit_loss != null
                    ? decoded.data.profit_loss
                    : decoded.data.profitLoss != null
                      ? decoded.data.profitLoss
                      : 0
        );
        if (!Number.isFinite(nextExpPl)) {
          nextExpPl = 0;
        }
        var nextAvailable = Number(
          decoded.data.available_balance != null
            ? decoded.data.available_balance
            : decoded.data.availableBalance != null
              ? decoded.data.availableBalance
              : NaN
        );
        var nextName = String(
          decoded.data.user_name || decoded.data.uname || decoded.data.username || identity.username || ""
        ).trim();
        setPersistBalance(nextBalance, nextName, nextExposure, nextExpPl, nextAvailable);
        patchHeaderWallet(nextBalance, nextExposure, nextName, nextAvailable);
      } catch (error) {
      } finally {
        syncing = false;
      }
    }

    var openBetsSyncing = false;
    var lastOpenBetsSyncAt = 0;
    var OPEN_BETS_SYNC_INTERVAL_MS = 5000;
    var OPEN_BETS_SYNC_MIN_GAP_MS = 2500;

    function readPersistWalletSnapshot() {
      var root = safeParseJSON(localStorage.getItem("persist:root") || "{}", {});
      var data = parsePersistNode(root.data || "{}", {});
      var auth = parsePersistNode(root.auth || "{}", {});
      var userState = parsePersistNode(root.user || "{}", {});
      var userData = parsePersistNode(userState.data || "{}", {});
      var balance = Number(
        userData.bal != null
          ? userData.bal
          : data.bal != null
            ? data.bal
            : auth.bal != null
              ? auth.bal
              : 0
      );
      if (!Number.isFinite(balance)) {
        balance = 0;
      }
      var exposure = Number(
        userData.exp != null
          ? userData.exp
          : userData.exposure != null
            ? userData.exposure
            : data.exp != null
              ? data.exp
              : data.exposure != null
                ? data.exposure
                : auth.exp != null
                  ? auth.exp
                  : auth.exposure != null
                    ? auth.exposure
                    : 0
      );
      if (!Number.isFinite(exposure)) {
        exposure = 0;
      }
      var available = Number(
        userData.available_balance != null
          ? userData.available_balance
          : data.available_balance != null
            ? data.available_balance
            : auth.available_balance != null
              ? auth.available_balance
              : NaN
      );
      if (!Number.isFinite(available)) {
        available = Number((balance + exposure).toFixed(2));
      } else {
        available = Number(available.toFixed(2));
      }
      var name = String(
        userData.user_name ||
        userData.uname ||
        userData.username ||
        data.user_name ||
        data.uname ||
        data.username ||
        auth.user_name ||
        auth.uname ||
        auth.username ||
        ""
      ).trim();
      return {
        balance: Number(balance.toFixed(2)),
        exposure: Number(exposure.toFixed(2)),
        available: available,
        name: name
      };
    }

    function readOpenBetsList(payload) {
      if (!payload || typeof payload !== "object") {
        return [];
      }
      var data = payload.data != null ? payload.data : payload.rows;
      if (Array.isArray(data)) {
        return data;
      }
      if (data && typeof data === "object") {
        if (Array.isArray(data.rows)) {
          return data.rows;
        }
        if (Array.isArray(data.t2)) {
          return data.t2;
        }
      }
      if (Array.isArray(payload.t2)) {
        return payload.t2;
      }
      if (Array.isArray(payload.rows)) {
        return payload.rows;
      }
      return [];
    }

    function resolveBetOutcomeFlag(bet) {
      if (!bet || typeof bet !== "object") {
        return null;
      }
      if (typeof bet.is_winning === "boolean") {
        return bet.is_winning;
      }
      if (typeof bet.isWinning === "boolean") {
        return bet.isWinning;
      }
      var token = String(
        bet.winning ||
        bet.result ||
        bet.settlement_result ||
        bet.outcome ||
        bet.status ||
        ""
      )
        .trim()
        .toLowerCase();
      if (!token) {
        return null;
      }
      if (token.indexOf("win") >= 0) {
        return true;
      }
      if (token.indexOf("loss") >= 0 || token.indexOf("lose") >= 0 || token.indexOf("lost") >= 0) {
        return false;
      }
      return null;
    }

    function normalizeBetSide(value) {
      var token = String(value || "").trim().toLowerCase();
      if (token.indexOf("lay") >= 0) {
        return "lay";
      }
      return "back";
    }

    function computeFallbackProfitLoss(bet) {
      var stake = Number(
        bet.amount != null
          ? bet.amount
          : bet.stake != null
            ? bet.stake
            : bet.bet_amount != null
              ? bet.bet_amount
              : bet.risk != null
                ? bet.risk
                : bet.liability != null
                  ? bet.liability
                  : 0
      );
      if (!Number.isFinite(stake) || stake <= 0) {
        return 0;
      }
      var odds = Number(
        bet.urate != null
          ? bet.urate
          : bet.uRate != null
            ? bet.uRate
            : bet.odds != null
              ? bet.odds
              : bet.rate != null
                ? bet.rate
                : bet.price != null
                  ? bet.price
                  : 0
      );
      if (!Number.isFinite(odds) || odds <= 0) {
        odds = 0;
      }
      var outcome = resolveBetOutcomeFlag(bet);
      if (outcome === null) {
        return 0;
      }
      var side = normalizeBetSide(bet.btype || bet.betType || bet.type || "");
      if (outcome === true) {
        if (side === "lay") {
          return Number(stake.toFixed(2));
        }
        return Number((stake * Math.max(odds - 1, 0)).toFixed(2));
      }
      if (side === "lay") {
        var liability = Number(
          bet.liability != null
            ? bet.liability
            : bet.risk != null
              ? bet.risk
              : bet.max_loss != null
                ? bet.max_loss
                : bet.maxLoss != null
                  ? bet.maxLoss
                  : stake * Math.max(odds - 1, 0)
        );
        if (!Number.isFinite(liability)) {
          liability = stake * Math.max(odds - 1, 0);
        }
        return Number((-Math.max(liability, 0)).toFixed(2));
      }
      return Number((-stake).toFixed(2));
    }

    function computeOpenBetsTotal(rows) {
      var total = 0;
      if (!Array.isArray(rows)) {
        return total;
      }
      for (var i = 0; i < rows.length; i += 1) {
        var bet = rows[i] || {};
        var pl = Number(
          bet.profit_loss != null
            ? bet.profit_loss
            : bet.profitLoss != null
              ? bet.profitLoss
              : bet.pl != null
                ? bet.pl
                : bet.pnl != null
                  ? bet.pnl
                  : bet.pnL != null
                    ? bet.pnL
                    : NaN
        );
        if (!Number.isFinite(pl)) {
          pl = computeFallbackProfitLoss(bet);
        }
        if (!Number.isFinite(pl)) {
          pl = 0;
        }
        total = Number((total + pl).toFixed(2));
      }
      return total;
    }

    async function fetchOpenBets(identity) {
      try {
        if (!identity || (!identity.token && !identity.username)) {
          return null;
        }
        var headers = { "Content-Type": "application/json" };
        if (identity.token) {
          headers.Authorization = "Bearer " + identity.token;
        }
        var uname = identity.username || "";
        var body = JSON.stringify({ uname: uname, username: uname, user_name: uname });
        var response = await window.fetch("/api/front/local-currentbets", {
          method: "POST",
          headers: headers,
          body: body
        });
        var payload = await response.json().catch(function () {
          return {};
        });
        var status = Number(payload && payload.status);
        if (Number.isFinite(status) && status > 0) {
          return payload;
        }
        response = await window.fetch("/api/front/currentbets", {
          method: "POST",
          headers: headers,
          body: body
        });
        payload = await response.json().catch(function () {
          return {};
        });
        return decodeApiEnvelope(payload);
      } catch (error) {
        return null;
      }
    }

    async function syncOpenBetsExposure() {
      if (openBetsSyncing) {
        return;
      }
      if (document.hidden) {
        return;
      }
      var now = Date.now();
      if (now - lastOpenBetsSyncAt < OPEN_BETS_SYNC_MIN_GAP_MS) {
        return;
      }
      openBetsSyncing = true;
      lastOpenBetsSyncAt = now;
      try {
        var identity = getIdentity();
        if (!identity || (!identity.token && !identity.username)) {
          return;
        }
        var payload = await fetchOpenBets(identity);
        if (!payload || typeof payload !== "object") {
          return;
        }
        var status = Number(payload.status || 0);
        var message = String(payload.msg || "").toLowerCase();
        var rows = readOpenBetsList(payload);
        var expPl = Number(
          payload.exp_pl != null
            ? payload.exp_pl
            : payload.expPl != null
              ? payload.expPl
              : payload.exposure_pl != null
                ? payload.exposure_pl
                : payload.pl != null
                  ? payload.pl
                  : payload.profit_loss != null
                    ? payload.profit_loss
                    : payload.profitLoss != null
                      ? payload.profitLoss
                      : NaN
        );
        if (!Number.isFinite(expPl)) {
          expPl = computeOpenBetsTotal(rows);
        } else {
          expPl = Number(expPl.toFixed(2));
        }
        if (status === 200) {
          if (!Number.isFinite(expPl)) {
            expPl = 0;
          }
        } else if (
          status === 300 &&
          (message.indexOf("no record") >= 0 ||
            message.indexOf("no open") >= 0 ||
            message.indexOf("no bet") >= 0)
        ) {
          expPl = 0;
        } else if (status > 0) {
          return;
        } else {
          return;
        }
        var snapshot = readPersistWalletSnapshot();
        setPersistBalance(snapshot.balance, snapshot.name, snapshot.exposure, expPl, snapshot.available);
        patchHeaderWallet(snapshot.balance, snapshot.exposure, snapshot.name, snapshot.available);
      } catch (error) {
      } finally {
        openBetsSyncing = false;
      }
    }

    localWalletSyncCallback = syncWallet;
    if (localWalletSyncPending) {
      localWalletSyncPending = false;
      syncWallet();
    }

    ensureRulesUiHidden();
    window.setInterval(function () {
      if (document.hidden) {
        return;
      }
      ensureRulesUiHidden();
    }, 8000);
    syncWallet();
    syncOpenBetsExposure();
    window.setInterval(function () {
      if (document.hidden) {
        return;
      }
      syncWallet();
    }, 9000);
    window.setInterval(function () {
      if (document.hidden) {
        return;
      }
      syncOpenBetsExposure();
    }, OPEN_BETS_SYNC_INTERVAL_MS);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        ensureRulesUiHidden();
        syncWallet();
        syncOpenBetsExposure();
      }
    });
    window.setInterval(function () {
      if (document.hidden) {
        return;
      }
      ensureRulesUiHidden();
      var root = safeParseJSON(localStorage.getItem("persist:root") || "{}", {});
      var data = parsePersistNode(root.data || "{}", {});
      var auth = parsePersistNode(root.auth || "{}", {});
      var userState = parsePersistNode(root.user || "{}", {});
      var userData = parsePersistNode(userState.data || "{}", {});
      var balance = Number(
        userData.bal != null
          ? userData.bal
          : data.bal != null
            ? data.bal
            : auth.bal != null
              ? auth.bal
              : 0
      );
      var expValue = Number(
        userData.exp != null
          ? userData.exp
          : userData.exposure != null
            ? userData.exposure
            : data.exp != null
              ? data.exp
              : data.exposure != null
                ? data.exposure
                : auth.exp != null
                  ? auth.exp
                  : auth.exposure != null
                    ? auth.exposure
                    : 0
      );
      if (!Number.isFinite(expValue)) {
        expValue = 0;
      }
      var availableValue = Number(
        userData.available_balance != null
          ? userData.available_balance
          : data.available_balance != null
            ? data.available_balance
            : auth.available_balance != null
              ? auth.available_balance
              : NaN
      );
      var name = String(
        userData.user_name ||
        userData.uname ||
        userData.username ||
        data.user_name ||
        data.uname ||
        data.username ||
        auth.user_name ||
        auth.uname ||
        auth.username ||
        ""
      ).trim();
      patchHeaderWallet(balance, expValue, name, availableValue);
    }, 12000);
  }

  function installLocalApiAuthBridge() {
    if (!window || window.__LOCAL_API_AUTH_BRIDGE_INSTALLED__) {
      return;
    }
    window.__LOCAL_API_AUTH_BRIDGE_INSTALLED__ = true;

    var AUTH_REQUIRED_ENDPOINTS = [
      "/api/front/placebet",
      "/api/front/placebetbadla",
      "/api/front/placebetcasino",
      "/api/front/placebetroulette11dtl",
      "/api/front/placebetroulette11rep",
      "/api/front/placebetroulettedtl",
      "/api/front/placebetworlidtl",
      "/api/front/repeatplacebet",
      "/api/front/deleteplacebet",
      "/api/front/currentbets",
      "/api/front/tpcurrentbets",
      "/api/front/userbook",
      "/api/front/casino/book",
      "/api/front/vcasino/book",
      "/api/front/fancybookdata",
      "/api/front/fancybookpopup",
      "/api/front/marketanalysis",
      "/api/front/accountstatement",
      "/api/front/accstatepopup",
      "/api/front/deposit-statement",
      "/api/front/withdraw-statement",
      "/api/front/activity",
      "/api/front/casinoresults",
      "/api/front/tpcasinoresult",
      "/api/front/userbuttonlist",
      "/api/front/buttonlist",
      "/api/front/buttonlistcs",
      "/api/front/buttonupdate",
      "/api/front/buttonupdatecs",
      "/api/front/getauth",
      "/api/front/authon",
      "/api/front/authontele",
      "/api/front/authoff",
      "/api/front/sendotp",
      "/api/front/verifyotp",
      "/api/front/verifycode",
      "/api/front/checksms",
      "/api/front/userchecktele",
      "/api/front/passwordupdate",
      "/api/front/logout",
      "/api/front/userdata",
      "/api/front/local-userdata",
      "/api/front/userdata-plain",
      "/api/front/gamedetailPrivate",
      "/api/front/game_detail_open",
      "/api/front/gamedetail",
      "/api/front/gamedataPrivate",
      "/api/front/tp_game_detail",
      "/api/front/casino/data2",
      "/api/front/vcasino/data2"
    ];

    function safeParseJSON(value, fallback) {
      if (value && typeof value === "object") {
        return value;
      }
      if (typeof value !== "string") {
        return fallback || {};
      }
      try {
        var parsed = JSON.parse(value);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (error) { }
      return fallback || {};
    }

    function parsePersistNode(value, fallback) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
      if (typeof value !== "string") {
        return fallback || {};
      }
      return safeParseJSON(value, fallback || {});
    }

    function parseTokenValue(raw) {
      if (typeof raw !== "string") {
        return "";
      }
      var text = String(raw || "").trim();
      if (!text || /^null|undefined$/i.test(text)) {
        return "";
      }
      try {
        var parsed = JSON.parse(text);
        if (typeof parsed === "string") {
          return String(parsed || "").trim();
        }
      } catch (error) { }
      return text.replace(/^"+|"+$/g, "").trim();
    }

    function pickValue(candidates, skipUsernameLiteral) {
      for (var i = 0; i < candidates.length; i += 1) {
        var value = String(candidates[i] || "").trim();
        if (!value) {
          continue;
        }
        if (skipUsernameLiteral && /^username$/i.test(value)) {
          continue;
        }
        return value;
      }
      return "";
    }

    function getIdentity() {
      var root = safeParseJSON(localStorage.getItem("persist:root") || "{}", {});
      var data = parsePersistNode(root.data || "{}", {});
      var auth = parsePersistNode(root.auth || "{}", {});
      var userState = parsePersistNode(root.user || "{}", {});
      var userData = parsePersistNode(userState.data || "{}", {});

      var selectedUsername = pickValue(
        [
          userData.user_name,
          userData.uname,
          userData.username,
          userState.username,
          data.user_name,
          data.uname,
          data.username,
          auth.user_name,
          auth.uname,
          auth.username
        ],
        true
      );

      if (!selectedUsername) {
        selectedUsername = readUsernameFromHeader();
      }
      var rootToken = parseTokenValue(root.token);
      var token = pickValue(
        [
          parseTokenValue(userData.token),
          parseTokenValue(userData.auth),
          parseTokenValue(userData.access_token),
          parseTokenValue(data.token),
          parseTokenValue(data.auth),
          parseTokenValue(data.access_token),
          parseTokenValue(auth.token),
          parseTokenValue(auth.auth),
          parseTokenValue(auth.access_token),
          parseTokenValue(userState.token),
          rootToken
        ],
        false
      );

      return {
        username: selectedUsername,
        token: token
      };
    }

    function normalizeApiStem(inputUrl) {
      if (!inputUrl) {
        return "";
      }
      try {
        var url = new URL(String(inputUrl), window.location.origin);
        var pathname = String(url.pathname || "").trim().toLowerCase();
        if (!pathname) {
          return "";
        }
        return pathname.endsWith("/") && pathname.length > 1
          ? pathname.slice(0, -1)
          : pathname;
      } catch (error) {
        return "";
      }
    }

    function shouldPatchEndpoint(stem) {
      if (!stem) {
        return false;
      }
      if (stem.indexOf("/api/front/placebet") === 0) {
        return true;
      }
      for (var i = 0; i < AUTH_REQUIRED_ENDPOINTS.length; i += 1) {
        if (stem === AUTH_REQUIRED_ENDPOINTS[i]) {
          return true;
        }
      }
      return false;
    }

    function injectIdentityIntoObject(payload, identity) {
      var out = payload && typeof payload === "object" ? payload : {};
      if (identity.username) {
        out.uname = identity.username;
        out.username = identity.username;
        out.user_name = identity.username;
      }
      if (identity.token) {
        out.token = identity.token;
        out.auth = identity.token;
        out.access_token = identity.token;
      }

      // Inject Match ID from URL if on game-details page
      var parts = window.location.pathname.split("/");
      if (parts.length >= 4 && parts[1] === "game-details") {
        var eventId = parts[3];
        if (eventId && /^\d+$/.test(eventId) && eventId.length < 12) {
          if (!out.match_id) out.match_id = eventId;
          if (!out.event_id) out.event_id = eventId;
          if (!out.matchId) out.matchId = eventId;
          if (!out.game_id) out.game_id = eventId;
          if (!out.gmid) out.gmid = eventId;
          if (!out.mid) out.mid = eventId;
          if (!out.oldgmid) out.oldgmid = eventId;
        }
      }
      return out;
    }

    function injectIdentityIntoBody(body, contentType, identity) {
      if (body == null) {
        return body;
      }

      if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) {
        var params = new URLSearchParams(body.toString());
        if (identity.username) {
          params.set("uname", identity.username);
          params.set("username", identity.username);
        }
        if (identity.token) {
          params.set("token", identity.token);
          params.set("auth", identity.token);
          params.set("access_token", identity.token);
        }
        return params.toString();
      }

      if (typeof FormData !== "undefined" && body instanceof FormData) {
        if (identity.username) {
          body.set("uname", identity.username);
          body.set("username", identity.username);
        }
        if (identity.token) {
          body.set("token", identity.token);
          body.set("auth", identity.token);
          body.set("access_token", identity.token);
        }
        return body;
      }

      if (typeof body === "string") {
        var text = String(body || "");
        var normalizedType = String(contentType || "").toLowerCase();
        if (
          normalizedType.indexOf("application/x-www-form-urlencoded") >= 0 ||
          (text.indexOf("=") !== -1 && text.indexOf("{") !== 0)
        ) {
          var formParams = new URLSearchParams(text);
          if (identity.username) {
            formParams.set("uname", identity.username);
            formParams.set("username", identity.username);
          }
          if (identity.token) {
            formParams.set("token", identity.token);
            formParams.set("auth", identity.token);
            formParams.set("access_token", identity.token);
          }
          return formParams.toString();
        }

        if (text.trim().charAt(0) === "{") {
          try {
            var parsed = JSON.parse(text);
            return JSON.stringify(injectIdentityIntoObject(parsed, identity));
          } catch (error) {
            return text;
          }
        }
        return text;
      }

      if (typeof body === "object") {
        return JSON.stringify(injectIdentityIntoObject(body, identity));
      }

      return body;
    }

    function buildHeaders(inputHeaders, identity) {
      var headers = new Headers(inputHeaders || {});
      if (identity.token && !headers.get("Authorization")) {
        headers.set("Authorization", "Bearer " + identity.token);
      }
      if (identity.token && !headers.get("x-access-token")) {
        headers.set("x-access-token", identity.token);
      }
      if (identity.token && !headers.get("x-auth-token")) {
        headers.set("x-auth-token", identity.token);
      }
      if (identity.username && !headers.get("x-user-name")) {
        headers.set("x-user-name", identity.username);
      }
      return headers;
    }

    if (typeof window.fetch === "function") {
      var nativeFetch = window.fetch.bind(window);
      window.fetch = function (input, init) {
        var rawUrl =
          typeof input === "string"
            ? input
            : input && typeof input.url === "string"
              ? input.url
              : "";
        var stem = normalizeApiStem(rawUrl);
        if (!shouldPatchEndpoint(stem)) {
          return nativeFetch(input, init);
        }

        var identity = getIdentity();
        if (!identity.token && !identity.username) {
          return nativeFetch(input, init);
        }

        var nextInit = Object.assign({}, init || {});
        var method = String(nextInit.method || (input && input.method) || "GET").toUpperCase();
        var headers = buildHeaders(nextInit.headers || (input && input.headers) || {}, identity);
        var contentType = headers.get("Content-Type") || headers.get("content-type") || "";
        var body =
          Object.prototype.hasOwnProperty.call(nextInit, "body") && nextInit.body !== undefined
            ? nextInit.body
            : null;

        if (method !== "GET" && method !== "HEAD") {
          if (body == null) {
            if (!contentType) {
              headers.set("Content-Type", "application/json");
            }
            var normalizedType = String(headers.get("Content-Type") || "").toLowerCase();
            if (normalizedType.indexOf("application/x-www-form-urlencoded") >= 0) {
              body = injectIdentityIntoBody("", normalizedType, identity);
            } else {
              body = JSON.stringify(injectIdentityIntoObject({}, identity));
            }
          } else {
            body = injectIdentityIntoBody(body, contentType, identity);
          }
          nextInit.body = body;
        }

        nextInit.headers = headers;
        nextInit.method = method;
        var request = nativeFetch(input, nextInit);
        var shouldForceWalletRefresh =
          stem.indexOf("/api/front/placebet") === 0 ||
          stem === "/api/front/repeatplacebet" ||
          stem === "/api/front/deleteplacebet";
        if (!shouldForceWalletRefresh) {
          return request;
        }
        return request
          .then(function (response) {
            window.setTimeout(triggerLocalWalletSync, 120);
            return response;
          })
          .catch(function (error) {
            window.setTimeout(triggerLocalWalletSync, 120);
            throw error;
          });
      };
    }

    if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
      var nativeOpen = window.XMLHttpRequest.prototype.open;
      var nativeSetHeader = window.XMLHttpRequest.prototype.setRequestHeader;
      var nativeSend = window.XMLHttpRequest.prototype.send;

      window.XMLHttpRequest.prototype.open = function (method, url) {
        this.__localAuthMethod = String(method || "GET").toUpperCase();
        this.__localAuthUrl = url;
        this.__localAuthStem = normalizeApiStem(url);
        this.__localAuthPatch = shouldPatchEndpoint(this.__localAuthStem);
        this.__localAuthHeaders = {};
        return nativeOpen.apply(this, arguments);
      };

      window.XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        var key = String(name || "").toLowerCase();
        this.__localAuthHeaders = this.__localAuthHeaders || {};
        this.__localAuthHeaders[key] = String(value || "");
        return nativeSetHeader.apply(this, arguments);
      };

      window.XMLHttpRequest.prototype.send = function (body) {
        if (!this.__localAuthPatch) {
          return nativeSend.call(this, body);
        }

        var identity = getIdentity();
        if (!identity.token && !identity.username) {
          return nativeSend.call(this, body);
        }

        var headers = this.__localAuthHeaders || {};
        if (identity.token && !headers.authorization) {
          try {
            this.setRequestHeader("Authorization", "Bearer " + identity.token);
            headers.authorization = "Bearer " + identity.token;
          } catch (error) { }
        }
        if (identity.token && !headers["x-access-token"]) {
          try {
            this.setRequestHeader("x-access-token", identity.token);
            headers["x-access-token"] = identity.token;
          } catch (error) { }
        }
        if (identity.token && !headers["x-auth-token"]) {
          try {
            this.setRequestHeader("x-auth-token", identity.token);
            headers["x-auth-token"] = identity.token;
          } catch (error) { }
        }
        if (identity.username && !headers["x-user-name"]) {
          try {
            this.setRequestHeader("x-user-name", identity.username);
            headers["x-user-name"] = identity.username;
          } catch (error) { }
        }

        var method = String(this.__localAuthMethod || "GET").toUpperCase();
        var stem = String(this.__localAuthStem || "");
        var shouldForceWalletRefresh =
          stem.indexOf("/api/front/placebet") === 0 ||
          stem === "/api/front/repeatplacebet" ||
          stem === "/api/front/deleteplacebet";
        if (shouldForceWalletRefresh) {
          try {
            var xhrRef = this;
            xhrRef.addEventListener(
              "loadend",
              function () {
                window.setTimeout(triggerLocalWalletSync, 120);
              },
              { once: true }
            );
          } catch (error) { }
        }
        if (method !== "GET" && method !== "HEAD") {
          var contentType = headers["content-type"] || "";
          if (body == null || body === "") {
            if (String(contentType).toLowerCase().indexOf("application/x-www-form-urlencoded") >= 0) {
              body = injectIdentityIntoBody("", contentType, identity);
            } else {
              if (!contentType) {
                try {
                  this.setRequestHeader("Content-Type", "application/json");
                  headers["content-type"] = "application/json";
                } catch (error) { }
              }
              body = JSON.stringify(injectIdentityIntoObject({}, identity));
            }
          } else {
            body = injectIdentityIntoBody(body, contentType, identity);
          }
        }

        return nativeSend.call(this, body);
      };
    }
  }

  function extractBackgroundUrls(value) {
    var urls = [];
    var raw = String(value || "");
    if (!raw) {
      return urls;
    }
    var matcher = /url\((['"]?)(.*?)\1\)/gi;
    var match;
    while ((match = matcher.exec(raw))) {
      var candidate = String(match[2] || "").trim();
      if (!candidate) {
        continue;
      }
      urls.push(candidate);
    }
    return urls;
  }

  function normalizeHomeCardImageUrl(rawUrl) {
    var value = String(rawUrl || "").trim();
    if (!value) {
      return "";
    }
    if (/^data:/i.test(value)) {
      return value;
    }

    try {
      var parsed = new URL(value, window.location.origin);
      var host = String(parsed.hostname || "").toLowerCase();
      if (
        host === "dataobj.ecoassetsservice.com" ||
        host === "sitethemedata.com" ||
        host === "api2b.pro" ||
        host === "img.m167cw.com" ||
        host === "staging-acegames.s3.amazonaws.com"
      ) {
        value = "/" + host + parsed.pathname + parsed.search;
      } else if (parsed.origin === window.location.origin) {
        value = parsed.pathname + parsed.search;
      } else {
        value = parsed.href;
      }
    } catch (_error) {
    }

    if (!/^https?:\/\//i.test(value) && value.charAt(0) !== "/") {
      value = "/" + value;
    }

    var proxyMarker = "/api/front/image-proxy?u=";
    var proxyMarkerIndex = String(value).toLowerCase().indexOf(proxyMarker);
    if (proxyMarkerIndex > 0) {
      value = value.slice(proxyMarkerIndex);
    }

    value = value
      .replace(/([^:])\/{2,}/g, "$1/")
      .replace(
        /^\/dataobj\.ecoassetsservice\.com\/casino-icons\/default\.(jpg|jpeg|png)$/i,
        "/dataobj.ecoassetsservice.com/casino-icons/default.jpg"
      )
      .replace(/\/casino-icons\/lc\/\//gi, "/casino-icons/lc/");
    return value;
  }

  function isDefaultHomeCardImage(url) {
    var normalized = normalizeHomeCardImageUrl(url).toLowerCase();
    if (!normalized) {
      return true;
    }
    return (
      normalized.indexOf("/casino-icons/default.") >= 0 ||
      normalized.indexOf("/default.jpg") >= 0 ||
      normalized.indexOf("/default.jpeg") >= 0 ||
      normalized.indexOf("/default.png") >= 0
    );
  }

  function pickHomeCardPrimaryImage(banner) {
    if (!banner) {
      return "";
    }
    var candidates = [];
    if (typeof banner.getAttribute === "function") {
      candidates.push(String(banner.getAttribute("data-home-source-bg") || ""));
    }
    candidates.push(String((banner.style && banner.style.backgroundImage) || ""));
    if (typeof window.getComputedStyle === "function") {
      try {
        candidates.push(String(window.getComputedStyle(banner).backgroundImage || ""));
      } catch (_error) {
      }
    }

    for (var i = 0; i < candidates.length; i += 1) {
      var urls = extractBackgroundUrls(candidates[i]);
      for (var j = 0; j < urls.length; j += 1) {
        var normalized = normalizeHomeCardImageUrl(urls[j]);
        if (!normalized || isDefaultHomeCardImage(normalized)) {
          continue;
        }
        return normalized;
      }
    }
    return "";
  }

  function applyLocalHomeCardImages() {
    if (!isHomeRoutePath()) {
      return;
    }
    var banners = document.querySelectorAll(".casino-list-item-banner");
    if (!banners || !banners.length) {
      return;
    }
    for (var i = 0; i < banners.length; i += 1) {
      var banner = banners[i];
      if (!banner) {
        continue;
      }
      if (typeof banner.getAttribute === "function" && typeof banner.setAttribute === "function") {
        var sourceBg = banner.getAttribute("data-home-source-bg") || "";
        if (!sourceBg) {
          sourceBg = String((banner.style && banner.style.backgroundImage) || "");
          if (!sourceBg && typeof window.getComputedStyle === "function") {
            try {
              sourceBg = String(window.getComputedStyle(banner).backgroundImage || "");
            } catch (_error) {
            }
          }
          if (sourceBg) {
            banner.setAttribute("data-home-source-bg", sourceBg);
          }
        }
      }

      var primaryImage = pickHomeCardPrimaryImage(banner);
      if (!primaryImage) {
        continue;
      }
      var nextBackground =
        'url("' + primaryImage + '"), url("/dataobj.ecoassetsservice.com/casino-icons/default.jpg")';
      if (banner.style && banner.style.backgroundImage !== nextBackground) {
        banner.style.backgroundImage = nextBackground;
        banner.style.backgroundSize = "cover";
        banner.style.backgroundPosition = "center";
        banner.style.backgroundRepeat = "no-repeat";
      }

      var imgNode = banner.querySelector && banner.querySelector("img");
      if (imgNode) {
        var rawCurrent = String(imgNode.getAttribute("src") || imgNode.currentSrc || "").trim();
        var normalizedCurrent = normalizeHomeCardImageUrl(rawCurrent);
        var shouldRestoreSrc =
          !normalizedCurrent ||
          /^about:blank$/i.test(rawCurrent) ||
          isDefaultHomeCardImage(normalizedCurrent);
        if (shouldRestoreSrc) {
          imgNode.setAttribute("src", primaryImage);
        }
      }
    }
  }

  var lastPnlSyncAt = 0;
  function updateMarketPnlMarker(node, value) {
    if (!node) return;
    if (value === null) {
      node.removeAttribute("data-local-pnl");
      node.removeAttribute("data-local-pnl-tone");
      return;
    }

    node.setAttribute("data-local-pnl", value);
    node.setAttribute("data-local-pnl-tone", Number(value) > 0 ? "positive" : (Number(value) < 0 ? "negative" : "neutral"));
  }

  function syncGameDetailMarketPnlWithHelpers(fetchOpenBetsForExp, normalizeOpenBetsRows, normalizeText) {
    var now = Date.now();
    if (now - lastPnlSyncAt < 3000) return; // Throttle to fix "BHUT SARA ERROR"
    lastPnlSyncAt = now;
    var path = window.location.pathname;
    if (path.indexOf("/game-details/") === -1) return;
    var parts = path.split("/");
    var currentEventId = String(parts[parts.length - 1] || "").trim();
    if (!currentEventId) return;

    var REGISTRY_MAP_IDS = {
      "7370117194840": "650166618"
    };
    if (currentEventId && REGISTRY_MAP_IDS[currentEventId]) {
      currentEventId = REGISTRY_MAP_IDS[currentEventId];
    }

    fetchOpenBetsForExp().then(function (decoded) {
      if (!decoded || !decoded.data) return;
      var bets = normalizeOpenBetsRows(decoded.data);
      var matchBets = bets.filter(function (b) { return b.eventId === currentEventId; });

      // Ultra-Aggressive Fallback: Match by any team name keyword found on page
      if (matchBets.length === 0 || bets.length > matchBets.length) {
        var pageText = normalizeText(document.body.innerText || "").toLowerCase();
        var breadNode = document.querySelector(".breadcrumb, .breadcrumb-item.active, h1, .match-name, .match-title");
        var breadcrumb = normalizeText(breadNode ? breadNode.textContent : "").toLowerCase();

        var addedIds = new Set(matchBets.map(function (b) { return b.bid; }));

        bets.forEach(function (b) {
          if (addedIds.has(b.bid)) return;
          var bEvent = normalizeText(b.eventName || b.matchName || "").toLowerCase();
          var bNation = normalizeText(b.selection || b.nation || "").toLowerCase();

          if (!bEvent || bEvent === "match" || bEvent === "sports") {
            if (bNation && bNation.length > 3 && (breadcrumb.indexOf(bNation) >= 0 || pageText.indexOf(bNation) >= 0)) {
              matchBets.push(b);
              addedIds.add(b.bid);
              return;
            }
          } else {
            var keywords = bEvent.split(/ v | vs | vs. |@| - /);
            for (var j = 0; j < keywords.length; j++) {
              var kw = keywords[j].trim();
              if (kw.length > 3 && (breadcrumb.indexOf(kw) >= 0 || pageText.indexOf(kw) >= 0)) {
                matchBets.push(b);
                addedIds.add(b.bid);
                return;
              }
            }
          }
        });
      }

      // Group bets by market ID
      var marketBetsMap = {};
      matchBets.forEach(function (b) {
        if (!marketBetsMap[b.mid]) marketBetsMap[b.mid] = [];
        marketBetsMap[b.mid].push(b);
      });

      var allRows = document.querySelectorAll("tr");
      for (var i = 0; i < allRows.length; i++) {
        var tr = allRows[i];
        var firstCell = tr.querySelector("td:first-child");
        if (!firstCell) continue;

        var runnerNameNode = firstCell.querySelector("span, div, b, strong") || firstCell;
        var rNameRaw = normalizeText(runnerNameNode.textContent || "").toLowerCase();
        if (!rNameRaw || rNameRaw === "matched bet" || rNameRaw === "team" || rNameRaw.length > 50) continue;

        var runnerSid = tr.getAttribute("data-sid") || tr.getAttribute("data-id") || "";
        if (!runnerSid) {
          var oddsNode = tr.querySelector(".market-odd-box, [data-sid], [data-selectionid]");
          if (oddsNode) runnerSid = oddsNode.getAttribute("data-sid") || oddsNode.getAttribute("data-selectionid") || oddsNode.getAttribute("data-id") || "";
        }

        var marketId = "";
        var container = tr.closest(".game-market, .market-container, .Match_Odds, .Bookmaker, .Normal_Fancy, .market-row, .market-listing, .market-box");
        if (container) {
          marketId = container.getAttribute("data-mid") || container.getAttribute("data-marketid") || "";
          if (!marketId) {
            var header = container.querySelector(".market-title, h4, .market-name, .market-title span");
            if (header) marketId = normalizeText(header.textContent || "").toLowerCase();
          }
        }

        var runnerPl = 0;
        var hasRelevantBet = false;
        var relevantMarkets = new Set();

        matchBets.forEach(function (bet) {
          var betSelection = normalizeText(bet.selection || "").toLowerCase();
          var isThisRunner = (
            (bet.sid && runnerSid && String(bet.sid) === String(runnerSid)) ||
            (betSelection && (betSelection === rNameRaw || rNameRaw.indexOf(betSelection) >= 0 || betSelection.indexOf(rNameRaw) >= 0))
          );

          // Match by name or label if market IDs aren't clear
          var betMarketLabel = normalizeText(bet.marketLabel || "").toLowerCase();
          var betGType = String(bet.gtype || "").toLowerCase();

          var isProbablySameMarket = (
            !marketId ||
            marketId === bet.mid ||
            bet.mid.startsWith(marketId) ||
            (betMarketLabel && (marketId.indexOf(betMarketLabel) >= 0 || betMarketLabel.indexOf(marketId) >= 0)) ||
            (betGType === "match" && (marketId.indexOf("match") >= 0 || marketId.indexOf("odds") >= 0)) ||
            (betGType === "bookmaker" && (marketId.indexOf("bookmaker") >= 0 || marketId.indexOf("bm") >= 0)) ||
            (bet.marketSelection && marketId && marketId.indexOf(bet.marketSelection.toLowerCase()) >= 0)
          );

          if (isProbablySameMarket) {
            if (isThisRunner) {
              hasRelevantBet = true;
              if (bet.betSide === "back") runnerPl += (bet.betAmount * (bet.odds - 1));
              else runnerPl -= (bet.betAmount * (bet.odds - 1));
              relevantMarkets.add(bet.mid);
            } else if (bet.eventType !== "Fancy") {
              // Binary choice effect
              if (bet.betSide === "back") runnerPl -= bet.betAmount;
              else runnerPl += bet.betAmount;
              relevantMarkets.add(bet.mid);
            }
          }
        });

        if (relevantMarkets.size > 0 || runnerPl !== 0) {
          updateMarketPnlMarker(firstCell, String(Number(runnerPl.toFixed(2))));
        } else {
          updateMarketPnlMarker(firstCell, null);
        }

        if (container && relevantMarkets.size > 0) {
          var cashoutBtn = container.querySelector(".btn-success, [class*='cashout'], .cashout");
          if (cashoutBtn) {
            cashoutBtn.removeAttribute("disabled");
            cashoutBtn.classList.remove("disabled");
          }
        }
      }

      // 2. Handle div-based layouts like .market-nation-detail
      var allDetails = document.querySelectorAll(".market-nation-detail");
      for (var k = 0; k < allDetails.length; k++) {
        var detail = allDetails[k];
        var nameNode = detail.querySelector(".market-nation-name");
        if (!nameNode) continue;

        var rNameRaw = normalizeText(nameNode.textContent || "").toLowerCase();
        if (!rNameRaw || rNameRaw === "team" || rNameRaw.length > 50) continue;

        var runnerSid = detail.getAttribute("data-sid") || detail.getAttribute("data-id") || "";
        if (!runnerSid) {
          var parentRow = detail.closest(".market-row, tr");
          if (parentRow) {
            var oddsNode = parentRow.querySelector(".market-odd-box, [data-sid], [data-selectionid]");
            if (oddsNode) runnerSid = oddsNode.getAttribute("data-sid") || oddsNode.getAttribute("data-selectionid") || oddsNode.getAttribute("data-id") || "";
          }
        }

        var marketId = "";
        var container = detail.closest(".game-market, .market-container, .Match_Odds, .Bookmaker, .Normal_Fancy, .market-row, .market-listing, .market-box, .market-list");
        if (container && container.getAttribute("data-local-odds-unavailable") === "1") {
          updateMarketPnlMarker(nameNode, null);
          continue;
        }
        if (container) {
          marketId = container.getAttribute("data-mid") || container.getAttribute("data-marketid") || "";
          if (!marketId) {
            var header = container.querySelector(".market-title, h4, .market-name, .market-title span");
            if (header) marketId = normalizeText(header.textContent || "").toLowerCase();
          }
        }

        var runnerPl = 0;
        var relevantMarkets = new Set();

        matchBets.forEach(function (bet) {
          var betSelection = normalizeText(bet.selection || "").toLowerCase();
          var isThisRunner = (
            (bet.sid && runnerSid && String(bet.sid) === String(runnerSid)) ||
            (betSelection && (betSelection === rNameRaw || rNameRaw.indexOf(betSelection) >= 0 || betSelection.indexOf(rNameRaw) >= 0))
          );

          var betMarketLabel = normalizeText(bet.marketLabel || "").toLowerCase();
          var betGType = String(bet.gtype || "").toLowerCase();

          var isProbablySameMarket = (
            !marketId ||
            marketId === bet.mid ||
            bet.mid.startsWith(marketId) ||
            (betMarketLabel && (marketId.indexOf(betMarketLabel) >= 0 || betMarketLabel.indexOf(marketId) >= 0)) ||
            (betGType === "match" && (marketId.indexOf("match") >= 0 || marketId.indexOf("odds") >= 0)) ||
            (betGType === "bookmaker" && (marketId.indexOf("bookmaker") >= 0 || marketId.indexOf("bm") >= 0)) ||
            (bet.marketSelection && marketId && marketId.indexOf(bet.marketSelection.toLowerCase()) >= 0)
          );

          if (isProbablySameMarket) {
            if (isThisRunner) {
              if (bet.betSide === "back") runnerPl += (bet.betAmount * (bet.odds - 1));
              else runnerPl -= (bet.betAmount * (bet.odds - 1));
              relevantMarkets.add(bet.mid);
            } else if (bet.eventType !== "Fancy") {
              if (bet.betSide === "back") runnerPl -= bet.betAmount;
              else runnerPl += bet.betAmount;
              relevantMarkets.add(bet.mid);
            }
          }
        });

        if (relevantMarkets.size > 0 || runnerPl !== 0) {
          updateMarketPnlMarker(nameNode, Number(runnerPl.toFixed(2)).toFixed(2));
        } else {
          updateMarketPnlMarker(nameNode, null);
        }

        if (container && relevantMarkets.size > 0) {
          var cashoutBtn = container.querySelector(".btn-success, [class*='cashout'], .cashout");

          if (cashoutBtn) {
            cashoutBtn.removeAttribute("disabled");
            cashoutBtn.disabled = false;
            cashoutBtn.classList.remove("disabled");
          }
        }
      }
    }).catch(function (err) { console.log("PNL Sync Err:", err); });
  }

  function installLocalHomeCardImageFix() {
    if (window.__LOCAL_HOME_CARD_IMAGE_FIX_INSTALLED__) {
      return;
    }
    window.__LOCAL_HOME_CARD_IMAGE_FIX_INSTALLED__ = true;
    var timer = 0;

    var run = function () {
      if (!isHomeRoutePath()) {
        return;
      }
      try {
        applyLocalHomeCardImages();
      } catch (_error) {
      }
    };
    var scheduleRun = function () {
      clearTimeout(timer);
      timer = setTimeout(run, 120);
    };

    run();
    window.setInterval(function () {
      if (document.hidden || !isHomeRoutePath()) {
        return;
      }
      run();
    }, 7000);
    window.addEventListener("focus", run);
    window.addEventListener("resize", scheduleRun);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        run();
      }
    });
    if (window.MutationObserver && document.body) {
      var observer = new MutationObserver(function (mutations) {
        if (!isHomeRoutePath()) {
          return;
        }
        for (var i = 0; i < mutations.length; i += 1) {
          var mutation = mutations[i];
          var target = mutation.target;
          if (
            target &&
            target.nodeType === 1 &&
            target.closest &&
            target.closest(".casino-list, .casino-list-item, .home-page, .center-main-container")
          ) {
            scheduleRun();
            return;
          }
          var added = mutation.addedNodes || [];
          for (var j = 0; j < added.length; j += 1) {
            var node = added[j];
            if (
              node &&
              node.nodeType === 1 &&
              ((node.matches &&
                node.matches(".casino-list, .casino-list-item, .home-page, .center-main-container")) ||
                (node.closest &&
                  node.closest(".casino-list, .casino-list-item, .home-page, .center-main-container")))
            ) {
              scheduleRun();
              return;
            }
          }
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class", "src"]
      });
    }
  }

  function installMobileUiSafetyFixes() {
    scheduleNonCriticalInstall(installLoginWelcomePopup, 400);
    if (!window || !document || window.__LOCAL_MOBILE_UI_SAFETY_INSTALLED__) {
      return;
    }
    window.__LOCAL_MOBILE_UI_SAFETY_INSTALLED__ = true;

    var STYLE_ID = "local-mobile-ui-safety-style";
    var STATUS_ID = "local-casino-api-status";
    var dedupeTimer = 0;
    var pendingCasinoRequests = 0;
    var lastCasinoErrorAt = 0;
    var CASINO_REQUEST_RECENT_TTL_MS = 1600;
    var EXP_MODAL_ID = "local-exp-market-modal";
    var expMarketRequestId = 0;
    var LEGACY_MARKET_SYNC_MIN_INTERVAL_MS = 2500;
    var LEGACY_MARKET_POLL_MS = 4000;
    var legacyMarketRequestId = 0;
    var legacyMarketLastSyncAt = 0;
    var LOCAL_GAME_IMAGES_MANIFEST_PATH = "/local/game-images/manifest.json";
    // Serve card thumbnails from local source images manifest (no provider hotlinking for mapped slots).
    var ENABLE_LOCAL_MANIFEST_IMAGE_OVERRIDE = false;
    var localGameImagesManifest = null;
    var localGameImagesFetchPromise = null;
    var HOME_INLINE_LOBBY_ACTIVE_MODE = "";
    var HOME_INLINE_LOBBY_REQUEST_ID = 0;
    var DEFAULT_HOME_INLINE_LOBBY_MODE = "our";
    var LOBBY_MODE_STORAGE_KEY = "local_inline_lobby_mode";
    var INLINE_LOBBY_LIST_ID = "local-inline-lobby-list";
    var HOME_INLINE_MAX_GAMES_BY_MODE = {
      our: 87
    };

    var HOME_INLINE_LOBBY_MODE_BY_PATH = {
      "/casino-list": "our",
      "/open-casino-list": "our",
      "/casino-list/lc/lc": "live",
      "/open-casino-list/lc/lc": "live",
      "/live-casino-list": "live",
      "/open-live-casino-list": "live",
      "/live-casino-list/slot/slot": "live",
      "/open-live-casino-list/slot/slot": "live",
      "/slot-list": "slots",
      "/open-slot-list": "slots",
      "/slots": "slots",
      "/fantasy-list": "fantasy",
      "/open-fantasy-list": "fantasy",
      "/fantasy": "fantasy",
      "/crash": "fantasy"
    };

    function ensureStyle() {
      if (document.getElementById(STYLE_ID)) {
        return;
      }
      var style = document.createElement("style");
      style.id = STYLE_ID;
      style.type = "text/css";
      style.textContent = [
        "@media only screen and (max-width:1199px){",
        ".header-top,.header,.top-header,.user-details,.user-balance{overflow:visible !important;}",
        ".user-balance .dropdown,.user-balance .user-name,.user-balance .username,.user-details .dropdown-toggle,.user-menu .dropdown-toggle,.user-dropdown .dropdown-toggle{display:inline-flex !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important;}",
        ".user-details .dropdown-menu,.user-menu .dropdown-menu,.user-dropdown .dropdown-menu,.user-balance .dropdown-menu{position:absolute !important;right:0 !important;left:auto !important;z-index:2600 !important;}",
        "}",
        "@media only screen and (max-width:767px){",
        ".header-top.local-mobile-header-layout{display:flex !important;flex-wrap:wrap !important;align-items:center !important;align-content:flex-start !important;gap:0 !important;height:auto !important;min-height:68px !important;padding:4px 6px !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-left{order:1;flex:0 1 calc(100% - 146px);max-width:calc(100% - 146px);min-width:0;display:flex !important;align-items:center;overflow:hidden;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-left img{max-height:30px !important;max-width:118px !important;width:auto;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right{order:2;margin-left:auto;flex:0 0 146px;display:flex !important;justify-content:flex-end;max-width:146px;min-width:130px;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right .header-rules{display:none !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right .user-balance{display:flex !important;flex-direction:column !important;align-items:flex-end !important;justify-content:center !important;row-gap:5px;white-space:nowrap;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right.user-balance{display:flex !important;flex-direction:column !important;align-items:flex-end !important;justify-content:center !important;row-gap:5px;white-space:nowrap;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right .user-balance>div{width:auto !important;margin:0 !important;padding:0 !important;text-align:right !important;font-size:12px !important;line-height:1.1 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right.user-balance>div{width:auto !important;margin:0 !important;padding:0 !important;text-align:right !important;font-size:12px !important;line-height:1.1 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right .user-balance .dropdown{display:inline-flex !important;justify-content:flex-end;align-items:center;margin-left:0 !important;width:100%;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right.user-balance .dropdown{display:inline-flex !important;justify-content:flex-end;align-items:center;margin-left:0 !important;width:100%;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right .user-balance .dropdown-toggle{font-size:13px !important;line-height:1.1;padding:0 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-right.user-balance .dropdown-toggle{font-size:13px !important;line-height:1.1;padding:0 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-row2{order:3;flex:0 0 100%;display:flex !important;align-items:center !important;min-width:0;margin-top:4px !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-row2>.local-mobile-header-search{flex:0 0 auto;width:auto !important;margin:0 6px 0 0 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-row2>.local-mobile-header-search .search-box{height:24px !important;margin:0 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-row2>.local-mobile-header-search .search-box i{font-size:24px !important;margin:0 !important;line-height:1;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-row2>.local-mobile-header-news{flex:1 1 0;min-width:0;width:auto !important;margin:0 !important;padding:4px 8px !important;display:flex !important;align-items:center !important;background: #ffffff45;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-row2>.local-mobile-header-news marquee,.header-top.local-mobile-header-layout>.local-mobile-header-row2>.local-mobile-header-news span{font-size:12px !important;white-space:nowrap;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-search{order:3;flex:0 0 auto;width:auto !important;margin:4px 6px 0 0 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-search .search-box{height:24px !important;margin:0 !important;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-search .search-box i{font-size:24px !important;margin:0 !important;line-height:1;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-news{order:3;flex:1 1 calc(100% - 40px);min-width:0;width:auto !important;margin-top:4px !important;padding:4px 8px !important;display:flex !important;align-items:center !important;background: #ffffff45;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-news marquee,.header-top.local-mobile-header-layout>.local-mobile-header-news span{font-size:12px !important;white-space:nowrap;}",
        ".header-top.local-mobile-header-layout>.local-mobile-header-actions{order:4;flex:0 0 100%;margin-top:4px !important;}",
        "@media only screen and (max-width:360px){.header-top.local-mobile-header-layout>.local-mobile-header-left{flex-basis:calc(100% - 138px);max-width:calc(100% - 138px);}.header-top.local-mobile-header-layout>.local-mobile-header-right{flex-basis:138px;max-width:138px;min-width:138px;}.header-top.local-mobile-header-layout>.local-mobile-header-left img{max-width:104px !important;}.header-top.local-mobile-header-layout>.local-mobile-header-right .user-balance>div{font-size:11px !important;}.header-top.local-mobile-header-layout>.local-mobile-header-right .user-balance .dropdown-toggle{font-size:12px !important;}}",
        "}",
        "#" + STATUS_ID + "{display:none;margin:6px 4px;padding:6px 8px;background: #ffffff3d;color: var(--text-primary);font-size:12px;font-weight:700;}",
        ".menu-tabs a[href*='lottery' i],.nav-tabs a[href*='lottery' i],.header-bottom a[href*='lottery' i],a[href*='/lottery' i],a[href*='lottery-list' i]{display:none !important;visibility:hidden !important;opacity:0 !important;pointer-events:none !important;}",
        ".local-exp-trigger,[data-local-exp-trigger='1']{cursor:pointer !important;}",
        "#" + EXP_MODAL_ID + "{position:fixed;inset:0;display:none;align-items:flex-start;justify-content:center;padding:46px 10px 12px;z-index:32000;background: rgba(107, 62, 30, 0.62);}",
        "#" + EXP_MODAL_ID + ".is-open{display:flex;}",
        "#" + EXP_MODAL_ID + " .local-exp-card{width:min(980px,100%);background: #fff;border: 1px solid #0d6efd;box-shadow: 0 18px 40px rgba(0,0,0,.4);}",
        "#" + EXP_MODAL_ID + " .local-exp-head{display:flex;align-items:center;justify-content:space-between;background: #0d6efd;color: #fff;padding:10px 12px;font-size:18px;font-weight:700;}",
        "#" + EXP_MODAL_ID + " .local-exp-close{background: transparent;border: 0;color: #fff;font-size:40px;line-height:1;cursor:pointer;padding:0 4px;}",
        "#" + EXP_MODAL_ID + " .local-exp-body{max-height:68vh;overflow:auto;background: #fff;}",
        "#" + EXP_MODAL_ID + " .local-exp-status{padding:10px 12px;color: #0088cc;font-size:14px;font-weight:600;}",
        "#" + EXP_MODAL_ID + " .local-exp-tabs{display:flex;background:#0d6efd;border-bottom:1px solid #0d6efd;}",
        "#" + EXP_MODAL_ID + " .local-exp-tab{flex:1;padding:12px 10px;text-align:center;font-weight:700;color:#fff;cursor:pointer;border-right:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);transition:background 0.2s;}",
        "#" + EXP_MODAL_ID + " .local-exp-tab.active{background:#fff;color:#0d6efd;}",
        "#" + EXP_MODAL_ID + " .local-exp-tab:last-child{border-right:0;}",
        ".local-exp-match-name{font-weight:700;font-size:14px;margin-bottom:2px;color:#222;}",
        ".local-exp-selection{font-size:12px;color:#666;}",
        ".local-exp-back{background:#a7d8fd;color:#000;padding:2px 6px;border-radius:3px;font-weight:700;font-size:11px;text-transform:uppercase;margin-right:4px;display:inline-block;}",
        ".local-exp-lay{background:#f9c9d4;color:#000;padding:2px 6px;border-radius:3px;font-weight:700;font-size:11px;text-transform:uppercase;margin-right:4px;display:inline-block;}",
        "#" + EXP_MODAL_ID + " .local-exp-table{width:100%;border-collapse:collapse;display:table;}",
        "#" + EXP_MODAL_ID + " .local-exp-table th{background:#ffffff;color:#0088cc;text-align:left;padding:10px;font-size:13px;border-bottom:2px solid #0d6efd;}",
        "#" + EXP_MODAL_ID + " .local-exp-table td{padding:12px 10px;border-bottom:1px solid #eee;vertical-align:top;}",
        "#" + EXP_MODAL_ID + " .local-exp-table tbody tr:hover{background:#f0f0f0;cursor:pointer;}",
        "#" + EXP_MODAL_ID + " .local-exp-pl-positive{color:#1e7e34;font-weight:700;}",
        "#" + EXP_MODAL_ID + " .local-exp-pl-negative{color:#dc3545;font-weight:700;}",
        "#" + EXP_MODAL_ID + " .local-exp-empty{padding:40px 20px;text-align:center;color:#999;font-size:15px;}",
        "[data-local-pnl]::after{content:attr(data-local-pnl);display:block;font-size:11px;font-weight:700;margin-top:2px;}",
        "[data-local-pnl-tone='positive']::after{color:#1e7e34 !important;}",
        "[data-local-pnl-tone='negative']::after{color:#dc3545 !important;}",
        ".local-exp-match-link{color:#007bff !important;text-decoration:underline !important;font-weight:700;}",
        ".local-exp-match-link:hover{text-decoration:none !important;color:#0056b3 !important;}",
        ".market-body[data-title]{position:relative;}",
        ".market-body[data-title]:before{content:attr(data-title); position:absolute; top:-22px; right:10px; color:#fff; font-size:10px; padding:2px 8px; border-radius:3px; font-weight:700; text-transform:uppercase; z-index:5; background:#6c757d;}",
        ".market-body[data-title*='OPEN']:before,.market-body[data-title*='SUCCESS']:before,.market-body[data-title*='ACTIVE']:before{background:#28a745; box-shadow: 0 0 5px rgba(40,167,69,0.5);}",
        ".market-body[data-title*='SUSPENDED']:before{background:#dc3545; animation: blinker 1s linear infinite;}",
        ".market-body[data-title*='CLOSED']:before{background:#343a40;}",
        ".market-row[data-title]{position:relative;}",
        ".market-row[data-title]:before{content:attr(data-title); position:absolute; top:2px; right:2px; background:#28a745; color:#fff; font-size:9px; padding:1px 4px; border-radius:2px; font-weight:700; text-transform:uppercase; z-index:5; display:none;}",
        ".market-row:hover:before{display:block;}",
        ".market-title{display:flex; align-items:center; justify-content:space-between; padding:8px 10px; background:linear-gradient(180deg, #0d6efd 0%, #0088cc 100%); color:#fff; font-weight:700; border-radius:4px 4px 0 0;}",
        "@keyframes blinker { 50% { opacity: 0.5; } }",
        ".table tr.lay td{background-color: #f9c9d4 !important;}",
        ".table tr.back td{background-color: #a7d8fd !important;}",
        ".btn-success.pulse{animation: pulse-success 2s infinite;}",
        "@keyframes pulse-success { 0% { box-shadow: 0 0 0 0 rgba(40,167,69, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(40,167,69, 0); } 100% { box-shadow: 0 0 0 0 rgba(40,167,69, 0); } }"
      ].join("");
      document.head.appendChild(style);
    }
    function maybeDecodeMojibakeUtf8(text) {
      if (!text || !window || !window.TextDecoder || typeof Uint8Array === "undefined") {
        return text;
      }
      try {
        var bytes = new Uint8Array(text.length);
        for (var i = 0; i < text.length; i += 1) {
          bytes[i] = text.charCodeAt(i) & 255;
        }
        var decoded = new window.TextDecoder("utf-8", { fatal: false }).decode(bytes);
        return decoded || text;
      } catch (_decodeErr) {
        return text;
      }
    }

    function cleanupMojibakeText(value) {
      var text = String(value || "");
      if (!text) {
        return "";
      }
      var maybeDecoded = /[\u00c2\u00c3\u00e2]/.test(text) ? maybeDecodeMojibakeUtf8(text) : text;
      return String(maybeDecoded || text)
        .replace(/\u00a0/g, " ")
        .replace(/\u00c2(?=[\s:/\-]|$)/g, "")
        .replace(/\ufffd/g, "");
    }

    function normalizeText(value) {
      return cleanupMojibakeText(value).replace(/\s+/g, " ").trim();
    }

    function repairVisibleMojibakeText(rootNode) {
      if (!document || !document.body) {
        return;
      }
      var root = rootNode && rootNode.nodeType === 1 ? rootNode : document.body;
      var quickText = String(root.textContent || "");
      if (!quickText || !/[\u00c2\u00c3\u00e2]/.test(quickText)) {
        return;
      }
      if (!document.createTreeWalker || typeof NodeFilter === "undefined") {
        return;
      }
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var touched = 0;
      var MAX_TOUCHED = 2200;
      while (walker.nextNode()) {
        var node = walker.currentNode;
        var raw = String((node && node.nodeValue) || "");
        if (!raw || !/[\u00c2\u00c3\u00e2]/.test(raw)) {
          continue;
        }
        var cleaned = cleanupMojibakeText(raw);
        if (cleaned !== raw) {
          node.nodeValue = cleaned;
          touched += 1;
          if (touched >= MAX_TOUCHED) {
            break;
          }
        }
      }
    }

    function normalizeCompactText(value) {
      return normalizeText(value)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
    }

    function readUsernameFromHeader() {
      if (typeof document === "undefined") {
        return "";
      }
      var selectors = [
        ".user-name",
        ".username",
        ".user-details .dropdown-toggle",
        ".user-menu .dropdown-toggle",
        ".user-dropdown .dropdown-toggle",
        ".user-balance .dropdown-toggle",
        ".user-details .dropdown"
      ];
      var nodes = document.querySelectorAll(selectors.join(","));
      if (!nodes || !nodes.length) {
        return "";
      }
      var last = "";
      function isLikelyUsernameToken(token) {
        if (!token) {
          return false;
        }
        var cleaned = String(token || "").replace(/[^a-z0-9._-]/gi, "");
        if (!cleaned) {
          return false;
        }
        var lower = cleaned.toLowerCase();
        if (
          lower === "balance" ||
          lower === "exp" ||
          lower === "exposure" ||
          lower === "signout" ||
          lower === "sign" ||
          lower === "out" ||
          lower === "logout" ||
          lower === "account" ||
          lower === "statement" ||
          lower === "current" ||
          lower === "bet" ||
          lower === "bets" ||
          lower === "activity" ||
          lower === "logs" ||
          lower === "casino" ||
          lower === "results" ||
          lower === "live" ||
          lower === "user"
        ) {
          return false;
        }
        if (/^[+-]?\d+(?:[.,]\d+)?$/.test(cleaned) || /^[+-]?\d+(?:,\d{3})+(?:\.\d+)?$/.test(cleaned)) {
          return false;
        }
        return cleaned.length >= 2;
      }
      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        var text = normalizeText(node && node.textContent ? node.textContent : "");
        if (!text) {
          continue;
        }
        var parts = text.replace(/[|/\\()]/g, " ").split(/\s+/);
        for (var j = 0; j < parts.length; j += 1) {
          var part = parts[j];
          if (isLikelyUsernameToken(part)) {
            last = String(part || "").replace(/[^a-z0-9._-]/gi, "");
          }
        }
      }
      return last;
    }

    function hideLotteryNode(node) {
      if (!node || node.nodeType !== 1) {
        return;
      }
      node.setAttribute("data-local-lottery-hidden", "1");
      node.style.setProperty("display", "none", "important");
      node.style.setProperty("visibility", "hidden", "important");
      node.style.setProperty("opacity", "0", "important");
      node.style.setProperty("pointer-events", "none", "important");
    }

    function stripLotteryMenuEntries() {
      var anchors = document.querySelectorAll(
        ".menu-tabs a,.nav-tabs a,.header-bottom a,.home-page a,.center-main-container a,a[href*='lottery' i]"
      );
      for (var i = 0; i < anchors.length; i += 1) {
        var anchor = anchors[i];
        if (!anchor || !anchor.getAttribute) {
          continue;
        }
        var href = String(anchor.getAttribute("href") || "").toLowerCase();
        var labelToken = normalizeCompactText(anchor.textContent || "");
        var isLotteryLink =
          labelToken === "lottery" ||
          href.indexOf("lottery") >= 0 ||
          href.indexOf("/lottery") >= 0 ||
          href.indexOf("lottery-list") >= 0;
        if (!isLotteryLink) {
          continue;
        }
        var target = anchor.closest("li") || anchor;
        hideLotteryNode(target);
      }

      var tabNodes = document.querySelectorAll(
        ".menu-tabs li,.nav-tabs li,.header-bottom li,.menu-tabs button,.nav-tabs button,.header-bottom button,[role='tab']"
      );
      for (var j = 0; j < tabNodes.length; j += 1) {
        var node = tabNodes[j];
        if (!node || node.getAttribute("data-local-lottery-hidden") === "1") {
          continue;
        }
        var token = normalizeCompactText(node.textContent || "");
        if (token !== "lottery") {
          continue;
        }
        hideLotteryNode(node);
      }
    }

    function getPersistIdentity() {
      var root = {};
      try {
        root = JSON.parse(localStorage.getItem("persist:root") || "{}");
      } catch (_error) {
        root = {};
      }
      function parseNode(value) {
        if (value && typeof value === "object") {
          return value;
        }
        if (typeof value !== "string") {
          return {};
        }
        try {
          var parsed = JSON.parse(value);
          return parsed && typeof parsed === "object" ? parsed : {};
        } catch (_error) {
          return {};
        }
      }
      function parseToken(value) {
        if (typeof value !== "string") {
          return "";
        }
        var token = String(value || "").trim();
        if (!token) {
          return "";
        }
        try {
          var parsed = JSON.parse(token);
          if (typeof parsed === "string") {
            token = parsed;
          }
        } catch (_error) { }
        return String(token || "").replace(/^"+|"+$/g, "").trim();
      }
      function pick(items) {
        for (var i = 0; i < items.length; i += 1) {
          var value = normalizeText(items[i]);
          if (value && !/^username$/i.test(value)) {
            return value;
          }
        }
        return "";
      }

      var data = parseNode(root.data || "{}");
      var auth = parseNode(root.auth || "{}");
      var userState = parseNode(root.user || "{}");
      var userData = parseNode(userState.data || "{}");
      var fallbackUsername = readUsernameFromHeader();
      if (!fallbackUsername) {
        fallbackUsername = "";
      }
      return {
        token: pick([
          parseToken(userData.token),
          parseToken(userData.auth),
          parseToken(data.token),
          parseToken(data.auth),
          parseToken(auth.token),
          parseToken(auth.auth),
          parseToken(root.token)
        ]),
        username: pick([
          userData.user_name,
          userData.uname,
          userData.username,
          userState.username,
          data.user_name,
          data.uname,
          data.username,
          auth.user_name,
          auth.uname,
          auth.username,
          fallbackUsername
        ])
      };
    }

    function showWelcomeBannerModal() {
      var modalId = "local-welcome-modal";
      if (document.getElementById(modalId)) return;

      var backdrop = document.createElement("div");
      backdrop.id = modalId;
      backdrop.className = "modal fade show";
      backdrop.style.display = "block";
      backdrop.style.position = "fixed";
      backdrop.style.top = "0";
      backdrop.style.left = "0";
      backdrop.style.width = "100%";
      backdrop.style.height = "100%";
      backdrop.style.zIndex = "3000";
      backdrop.style.backgroundColor = "rgba(0,0,0,0.7)";
      backdrop.style.overflowX = "hidden";
      backdrop.style.overflowY = "auto";
      backdrop.setAttribute("role", "dialog");
      backdrop.setAttribute("aria-modal", "true");

      backdrop.innerHTML =
        '<div class="modal-dialog modal-lg modal-dialog-centered">' +
        '<div class="modal-content" style="border-radius: 12px; overflow: hidden; border: none;">' +
        '<div class="modal-header" style="background: #fff; border-bottom: 1px solid #eee;">' +
        '<div class="modal-title h4" style="font-weight: 600; color: #333; font-size: 1.1rem; flex: 1;">\u26A0\uFE0F Beware Of Phishing Websites Before Login. Enable Security Auth To Secure Your ID.</div>' +
        '<button type="button" class="btn-close" aria-label="Close" id="close-welcome-modal" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #999;">&times;</button>' +
        '</div>' +
        '<div class="p-0 modal-body">' +
        '<img src="https://sitethemedata.com/common/wel-banner/wel-1773208231958.png" class="img-fluid" style="width:100%; display: block;">' +
        '</div>' +
        '</div>' +
        '</div>';

      document.body.appendChild(backdrop);
      document.body.classList.add("modal-open");

      var closeBtn = backdrop.querySelector("#close-welcome-modal");
      var closeModal = function () {
        if (backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop);
        }
        document.body.classList.remove("modal-open");
      };

      if (closeBtn) closeBtn.onclick = closeModal;
      backdrop.onclick = function (e) {
        if (e.target === backdrop) closeModal();
      };
    }

    function installLoginWelcomePopup() {
      var identity = getPersistIdentity();
      if (!identity.username) return; // Not logged in

      var sessionKey = "local_welcome_shown_" + identity.username;
      if (sessionStorage.getItem(sessionKey)) return; // Already shown this session

      // Show it after a short delay
      setTimeout(showWelcomeBannerModal, 1500);
      sessionStorage.setItem(sessionKey, "1");
    }

    function decodeApiEnvelopeForExp(payload) {
      if (!payload || typeof payload !== "object") {
        return payload;
      }
      if (typeof payload.data !== "string") {
        return payload;
      }
      if (typeof window._0x895125d === "function" && window.CryptoJS) {
        try {
          var decrypted = window._0x895125d(payload.data, window.CryptoJS);
          if (decrypted && typeof decrypted === "object") {
            try { console.log("[LocalMirror] Decrypted API Response:", decrypted); } catch (e) { }
            return decrypted;
          }
        } catch (_error) { }
      }
      try {
        var parsed = JSON.parse(payload.data);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (_error) { }
      return payload;
    }

    function deriveBetEventType(bet) {
      if (!bet) return "Sports";

      var sportId = String(bet.sportId || bet.sportsId || bet.SportsId || bet.EventTypeID || bet.eventTypeId || bet.eid || "").trim();
      var token = normalizeText(
        (bet.eventType || bet.sport || bet.gtype || bet.gameType || bet.category || bet.type || "")
      ).toLowerCase();

      // Priority 1: Map by ID if it exists and matches known categories
      if (sportId) {
        if (sportId === "4") return "Cricket";
        if (sportId === "1" || sportId === "20") return "Football";
        if (sportId === "2") return "Tennis";
        if (sportId === "7") return "Horse Racing";
        if (sportId === "4339") return "Greyhound Racing";
        if (sportId === "3503") return "Basketball";
        if (sportId === "7524") return "Ice Hockey";
        if (sportId === "7522") return "Basketball";
        if (sportId === "998917") return "Volleyball";
        if (sportId === "4561") return "Table Tennis";
        if (sportId === "2378961") return "Politics";
        if (sportId === "100") return "Casino";
        if (sportId === "200") return "Lottery";
      }

      // Priority 2: Text matching
      if (!token || /^\d+$/.test(token) || token === "match" || token === "sports" || token === "bet") {
        var eventNameStr = normalizeText(bet.eventName || bet.ename || bet.event || bet.matchName || bet.match || "").toLowerCase();

        // Quick heuristics for the current active matches shown in UI
        if (eventNameStr.indexOf("punjab") >= 0 || eventNameStr.indexOf("tigers") >= 0 ||
          eventNameStr.indexOf("ind") >= 0 || eventNameStr.indexOf("lions") >= 0 ||
          eventNameStr.indexOf("cape") >= 0 || eventNameStr.indexOf("limpopo") >= 0 ||
          eventNameStr.indexOf("gladiators") >= 0) {
          return "Cricket";
        }
        if (eventNameStr.indexOf("fc") >= 0 || eventNameStr.indexOf("united") >= 0 ||
          eventNameStr.indexOf("real") >= 0 || eventNameStr.indexOf("city") >= 0 ||
          eventNameStr.indexOf("bodo") >= 0 || eventNameStr.indexOf("lisbon") >= 0 ||
          eventNameStr.indexOf("sporting") >= 0) {
          return "Football";
        }

        // If we have an ID but it didn't match above, and token is numeric or empty
        if (sportId && /^\d+$/.test(sportId)) return "Sports (" + sportId + ")";
        if (token === "match" || token === "sports" || token === "bet") return "Sports";
        return "Sports";
      }

      if (token.indexOf("cricket") >= 0) return "Cricket";
      if (token.indexOf("football") >= 0 || token.indexOf("soccer") >= 0) {
        if (token.indexOf("esoccer") >= 0 || token.indexOf("e-soccer") >= 0) return "Esoccer";
        return "Football";
      }
      if (token.indexOf("tennis") >= 0) {
        if (token.indexOf("table") >= 0) return "Table Tennis";
        return "Tennis";
      }
      if (token.indexOf("horse") >= 0) return "Horse Racing";
      if (token.indexOf("greyhound") >= 0) return "Greyhound Racing";
      if (token.indexOf("basket") >= 0) return "Basketball";
      if (token.indexOf("volley") >= 0) return "Volleyball";
      if (token.indexOf("kabaddi") >= 0) return "Kabaddi";
      if (token.indexOf("badminton") >= 0) return "Badminton";
      if (token.indexOf("darts") >= 0) return "Darts";
      if (token.indexOf("snooker") >= 0) return "Snooker";
      if (token.indexOf("boxing") >= 0) return "Boxing";
      if (token.indexOf("martial") >= 0 || token.indexOf("mma") >= 0) return "Mixed Martial Arts";
      if (token.indexOf("american") >= 0) return "American Football";
      if (token.indexOf("e games") >= 0 || token.indexOf("egames") >= 0) return "E Games";
      if (token.indexOf("ice hockey") >= 0) return "Ice Hockey";
      if (token.indexOf("futsal") >= 0) return "Futsal";
      if (token.indexOf("politics") >= 0) return "Politics";
      if (token.indexOf("motor") >= 0) return "Motor Sports";
      if (token.indexOf("wrestl") >= 0) return "Wrestling";

      if (token.indexOf("casino") >= 0 || token.indexOf("teen") >= 0 || token.indexOf("roulette") >= 0) {
        return "Casino";
      }

      return token.charAt(0).toUpperCase() + token.slice(1);
    }

    function normalizeBetSide(value) {
      var token = normalizeText(value || "").toLowerCase();
      if (!token) {
        return "";
      }
      if (token.indexOf("lay") >= 0) {
        return "LAY";
      }
      if (token.indexOf("back") >= 0) {
        return "BACK";
      }
      return token.toUpperCase();
    }

    function normalizeOpenBetsRows(raw) {
      var list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw && raw.rows)
          ? raw.rows
          : Array.isArray(raw && raw.t2)
            ? raw.t2
            : [];
      var rows = [];
      for (var i = 0; i < list.length; i += 1) {
        var bet = list[i] || {};

        var REGISTRY_MAP_IDS = {
          "7370117194840": "650166618"
        };
        // Apply mapping to existing bet data if present
        if (bet.mid && REGISTRY_MAP_IDS[bet.mid]) bet.mid = REGISTRY_MAP_IDS[bet.mid];
        if (bet.match_id && REGISTRY_MAP_IDS[bet.match_id]) bet.match_id = REGISTRY_MAP_IDS[bet.match_id];
        if (bet.game_round && REGISTRY_MAP_IDS[bet.game_round]) bet.game_round = REGISTRY_MAP_IDS[bet.game_round];

        var eventType = deriveBetEventType(bet);
        var eventName = normalizeText(bet.eventName || bet.ename || bet.event || "");
        var matchName = normalizeText(
          bet.matchName ||
          bet.match ||
          bet.marketName ||
          bet.eventName ||
          bet.ename ||
          bet.event ||
          ""
        );
        if (!matchName) {
          var matchFallback = String(
            bet.mid || bet.marketId || bet.gmid || bet.game_uid || bet.gameid || ""
          ).trim();
          matchName = matchFallback ? "Match " + matchFallback : "Unknown Match";
        }
        if (!eventName) {
          eventName = matchName;
        }
        var marketLabel = normalizeText(
          bet.marketName || bet.mname || bet.market || bet.matchType || bet.marketType || bet.mName || ""
        );
        var selection = normalizeText(
          bet.nation || bet.nat || bet.selection || bet.selectionName || bet.selection_name ||
          bet.sname || bet.sName || bet.runner || bet.runnerName || bet.runner_name ||
          bet.team || bet.teamName || bet.team_name || bet.player || bet.vname || bet.name ||
          bet.n || bet.s || bet.label || bet.sdata || ""
        );

        var displaySelection = selection;
        if (!displaySelection || displaySelection.toLowerCase() === "match_odds" || displaySelection.toLowerCase() === "match odds") {
          displaySelection = "";
        }

        var marketSelection = displaySelection || marketLabel || "Selection";
        if (marketLabel && displaySelection && marketLabel.toLowerCase() !== displaySelection.toLowerCase()) {
          // If we have both and they differ, prioritize selection for sidebar but keep both for modal
          marketSelection = displaySelection;
        } else if (!displaySelection && marketLabel && marketLabel.indexOf(" - ") > 0) {
          // Fallback for combined strings in marketLabel
          var parts = marketLabel.split(" - ");
          selection = parts[1];
          marketSelection = selection;
        }
        var betType = normalizeBetSide(bet.btype || bet.betType || bet.type || "");
        var odds = Number(
          bet.urate != null
            ? bet.urate
            : bet.uRate != null
              ? bet.uRate
              : bet.odds != null
                ? bet.odds
                : bet.rate != null
                  ? bet.rate
                  : bet.price != null
                    ? bet.price
                    : bet.bhav != null
                      ? bet.bhav
                      : 0
        );
        if (!Number.isFinite(odds)) {
          odds = 0;
        }
        var stake = Number(
          bet.amount != null
            ? bet.amount
            : bet.stake != null
              ? bet.stake
              : bet.risk != null
                ? bet.risk
                : 0
        );
        if (!Number.isFinite(stake)) {
          stake = 0;
        }
        var price = Number(
          bet.price != null
            ? bet.price
            : bet.priceValue != null
              ? bet.priceValue
              : odds
        );
        if (!Number.isFinite(price)) {
          price = odds;
        }
        var profitLoss = Number(
          bet.profit_loss != null
            ? bet.profit_loss
            : bet.profitLoss != null
              ? bet.profitLoss
              : bet.pl != null
                ? bet.pl
                : bet.pnl != null
                  ? bet.pnl
                  : 0
        );
        if (!Number.isFinite(profitLoss)) {
          profitLoss = 0;
        }
        var isWinning =
          typeof bet.is_winning === "boolean"
            ? bet.is_winning
            : typeof bet.isWinning === "boolean"
              ? bet.isWinning
              : profitLoss > 0
                ? true
                : profitLoss < 0
                  ? false
                  : null;
        if (betType) {
          marketSelection = marketSelection + " (" + betType + ")";
        }
        var midStr = String(bet.mid || "").trim();
        var extractedFromMid = "";
        if (midStr) {
          var hyphenIdx = midStr.indexOf("-");
          extractedFromMid = hyphenIdx > 0 ? midStr.substring(0, hyphenIdx) : midStr;
        }

        var eventId = "";
        // Priority 1: standard match ID from mid (e.g. 650166618)
        if (extractedFromMid && /^\d+$/.test(extractedFromMid) && extractedFromMid.length >= 6 && extractedFromMid.length < 12) {
          eventId = extractedFromMid;
        }

        // Priority 2: match_id if it looks like a standard ID
        if (!eventId) {
          var mId = String(bet.match_id || bet.matchId || "").trim();
          if (mId && mId.length >= 6 && mId.length < 12) {
            eventId = mId;
          }
        }

        // Priority 3: other common fields
        if (!eventId) {
          eventId = String(
            bet.gameid ||
            bet.game_uid ||
            bet.match_id ||
            bet.game_round ||
            bet.gmid ||
            ""
          ).trim();
        }

        // Final Fallback: If we still don't have a 9-digit ID, we can use the mid as a last resort,
        // but the backend should have filled match_id by now if the user placed the bet with our patch.
        if (!eventId && extractedFromMid) {
          if (extractedFromMid.length < 12) {
            eventId = extractedFromMid;
          }
        }

        // Emergency Rewrite: If we are on a game-details page and the event name matches, use the URL ID.
        var curPath = window.location.pathname.split("/");
        if (!eventId || eventId.length >= 12) {
          if (curPath.length >= 4 && curPath[1] === "game-details") {
            var urlId = curPath[3];
            var breadNode = document.querySelector(".breadcrumb, h1, .match-title");
            var breadText = normalizeText(breadNode ? breadNode.textContent : "").toLowerCase();
            var bEvent = normalizeText(bet.eventName || "").toLowerCase();

            if (urlId && urlId.length < 12 && (breadText.indexOf(bEvent) >= 0 || bEvent.indexOf(breadText) >= 0)) {
              eventId = urlId;
            }
          }
        }

        var sportId = String(bet.sportId || bet.sportsId || bet.SportsId || bet.EventTypeID || bet.eventTypeId || bet.eid || "").trim();
        if (!sportId || sportId === "0") {
          var etLow = String(eventType || "").toLowerCase();
          if (etLow === "cricket") sportId = "4";
          else if (etLow === "football" || etLow === "soccer") sportId = "1";
          else if (etLow === "tennis") sportId = "2";
          else if (etLow === "horse racing") sportId = "7";
          else if (etLow.indexOf("table") >= 0 && etLow.indexOf("tennis") >= 0) sportId = "4"; // Usually same category in some panels
          else if (etLow === "greyhound racing") sportId = "4339";
          else sportId = "4"; // Default to cricket for this panel
        }
        var matchUrl = eventId ? "/game-details/" + encodeURIComponent(sportId) + "/" + encodeURIComponent(eventId) : "";

        rows.push({
          eventType: eventType,
          eventName: eventName,
          matchName: matchName,
          matchUrl: matchUrl,
          marketSelection: marketSelection,
          trade: betType,
          betAmount: Number(stake.toFixed(2)),
          odds: odds,
          price: Number(price.toFixed(2)),
          profitLoss: Number(profitLoss.toFixed(2)),
          isWinning: isWinning,
          // Extended fields for Real-time PNL injection
          sid: String(bet.sid || bet.selectionId || "").trim(),
          selection: selection,
          betSide: String(betType || "").toLowerCase(),
          mid: String(bet.mid || "").trim(),
          eventId: eventId,
          marketLabel: marketLabel,
          oddsValue: odds || price,
          stake: stake,
          side: betType,
          gtype: bet.gtype || bet.gType || "",
          btype: bet.btype || bet.betType || ""
        });
      }
      return rows;
    }

    function formatOddsValue(value) {
      var odds = Number(value);
      if (!Number.isFinite(odds) || odds <= 0) {
        return "-";
      }
      return odds.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function formatStakeValue(value) {
      var amount = Number(value);
      if (!Number.isFinite(amount)) {
        amount = 0;
      }
      return amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    function formatSignedStakeValue(value) {
      var amount = Number(value);
      if (!Number.isFinite(amount)) {
        amount = 0;
      }
      var formatted = formatStakeValue(Math.abs(amount));
      if (amount > 0) {
        return "+" + formatted;
      }
      if (amount < 0) {
        return "-" + formatted;
      }
      return formatted;
    }

    function summarizeOpenBets(rows) {
      var summary = {
        totalBets: 0,
        totalMatches: 0,
        totalStake: 0,
        totalProfitLoss: 0,
        cricketBets: 0,
        cricketMatches: 0
      };
      if (!Array.isArray(rows) || !rows.length) {
        return summary;
      }
      summary.totalBets = rows.length;
      var matchKeys = new Set();
      var cricketMatchKeys = new Set();
      for (var i = 0; i < rows.length; i += 1) {
        var row = rows[i] || {};
        var matchKey = normalizeCompactText(row.matchName || "");
        if (matchKey) {
          matchKeys.add(matchKey);
        }
        var stake = Number(row.betAmount || 0);
        if (Number.isFinite(stake)) {
          summary.totalStake = Number((summary.totalStake + stake).toFixed(2));
        }
        var pl = Number(row.profitLoss || 0);
        if (Number.isFinite(pl)) {
          summary.totalProfitLoss = Number((summary.totalProfitLoss + pl).toFixed(2));
        }
        if (row.eventType === "Cricket") {
          summary.cricketBets += 1;
          if (matchKey) {
            cricketMatchKeys.add(matchKey);
          }
        }
      }
      summary.totalMatches = matchKeys.size || 0;
      summary.cricketMatches = cricketMatchKeys.size || 0;
      return summary;
    }

    function ensureExpMarketModal() {
      var modal = document.getElementById(EXP_MODAL_ID);
      if (modal) {
        return modal;
      }
      modal = document.createElement("div");
      modal.id = EXP_MODAL_ID;
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML =
        '<div class="local-exp-card" role="dialog" aria-modal="true" aria-label="My Market">' +
        '<div class="local-exp-head"><span>My Market</span><button type="button" class="local-exp-close" data-local-exp-close="1">&times;</button></div>' +
        '<div class="local-exp-tabs">' +
        '<div class="local-exp-tab active" data-local-exp-tab="matched">Matched Bet</div>' +
        '<div class="local-exp-tab" data-local-exp-tab="unmatched">Unmatched Bet</div>' +
        '<div class="local-exp-tab" data-local-exp-tab="fancy">Fancy Bet</div>' +
        "</div>" +
        '<div class="local-exp-body">' +
        '<div class="local-exp-status" data-local-exp-status="1">Loading bets...</div>' +
        '<table aria-label="Open bets" class="local-exp-table">' +
        '<thead><tr class="local-exp-table-head"><th>Event Type</th><th>Event Name</th><th>Selection</th><th>Trade</th></tr></thead>' +
        '<tbody data-local-exp-rows="1"></tbody>' +
        "</table>" +
        '<div class="local-exp-empty" data-local-exp-empty="1" style="display:none;">No open bets found.</div>' +
        "</div>" +
        "</div>";

      modal.addEventListener("click", function (event) {
        var target = event && event.target;
        if (!target) return;

        var tab = target.closest("[data-local-exp-tab]");
        if (tab) {
          var tabs = modal.querySelectorAll("[data-local-exp-tab]");
          for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");
          tab.classList.add("active");
          // Re-render existing cached rows under the new tab filter
          var cachedRows = modal.__localExpRows || [];
          renderExpMarketRows(cachedRows);
          return;
        }

        if (target === modal || (target.closest && target.closest("[data-local-exp-close='1']"))) {
          closeExpMarketModal();
        }
      });
      document.body.appendChild(modal);
      return modal;
    }

    function setExpMarketStatus(text) {
      var modal = ensureExpMarketModal();
      var statusNode = modal.querySelector("[data-local-exp-status='1']");
      if (!statusNode) return;
      statusNode.textContent = normalizeText(text || "");
    }

    function renderExpMarketRows(rows) {
      var modal = ensureExpMarketModal();
      var activeTab = "matched";
      var activeTabEl = modal.querySelector(".local-exp-tab.active");
      if (activeTabEl) {
        activeTab = activeTabEl.getAttribute("data-local-exp-tab");
      }

      var filtered = [];
      for (var i = 0; i < (rows || []).length; i++) {
        var r = rows[i] || {};
        var marketSel = String(r.marketSelection || "").toLowerCase();
        var evType = String(r.eventType || "").toLowerCase();
        var isFancy = evType === "fancy" || marketSel.indexOf("fancy") >= 0;

        if (activeTab === "fancy") {
          if (isFancy) filtered.push(r);
        } else if (activeTab === "unmatched") {
          // Placeholder for future logic
        } else {
          // matched tab
          if (!isFancy) filtered.push(r);
        }
      }

      var tbody = modal.querySelector("[data-local-exp-rows='1']");
      var emptyNode = modal.querySelector("[data-local-exp-empty='1']");
      var tableNode = modal.querySelector(".local-exp-table");

      if (!tbody) return;
      tbody.innerHTML = "";

      if (!filtered.length) {
        if (emptyNode) emptyNode.style.display = "block";
        if (tableNode) tableNode.style.display = "none";
        return;
      }

      if (emptyNode) emptyNode.style.display = "none";
      if (tableNode) tableNode.style.display = "table";

      for (var j = 0; j < filtered.length; j += 1) {
        var row = filtered[j] || {};
        var tr = document.createElement("tr");
        var eventName = escapeHtmlText(row.eventName || row.matchName || "Match");
        var eventLink = row.matchUrl ? '<a href="' + row.matchUrl + '" class="local-exp-match-link" style="color: #007bff !important; text-decoration: underline !important;">' + eventName + '</a>' : eventName;

        var side = String(row.side || row.trade || "").toUpperCase();
        var sideClass = side === "BACK" ? "local-exp-back" : (side === "LAY" ? "local-exp-lay" : "");
        var sideLabel = side ? '<span class="' + sideClass + '">' + side + '</span>' : '';

        var tradeDetails = sideLabel + ' @ ' + escapeHtmlText(formatOddsValue(row.oddsValue || 0)) + ' - <b>' + escapeHtmlText(formatStakeValue(row.stake || 0)) + '</b>';
        var selectionName = escapeHtmlText(row.selection || row.marketLabel || "Selection");

        tr.innerHTML =
          "<td>" + escapeHtmlText(row.eventType || "Sports") + "</td>" +
          "<td>" + eventLink + "</td>" +
          "<td>" + selectionName + "</td>" +
          "<td>" + tradeDetails + "</td>";

        if (row.matchUrl) {
          tr.style.cursor = "pointer";
          tr.onclick = (function (url) {
            return function (e) {
              if (e.target.tagName === 'A') return; // Let the link handle its own click
              closeExpMarketModal();
              window.location.assign(url);
            };
          })(row.matchUrl);
        }

        tbody.appendChild(tr);
      }
    }

    function isElementVisible(node) {
      if (!node || node.nodeType !== 1) {
        return false;
      }
      if (typeof node.getClientRects !== "function") {
        return false;
      }
      return node.getClientRects().length > 0;
    }

    function findLegacyMyMarketTables() {
      if (!document || !document.querySelectorAll) {
        return [];
      }
      var matching = [];
      var tables = document.querySelectorAll("table");
      for (var i = 0; i < tables.length; i += 1) {
        var table = tables[i];
        var headRow = table.querySelector("thead tr, tr:first-child");
        if (!headRow) continue;

        var headers = headRow.querySelectorAll("th, td");
        var labels = [];
        for (var h = 0; h < headers.length; h += 1) {
          labels.push(normalizeText(headers[h].textContent || "").toLowerCase());
        }
        var combined = labels.join("|");
        var hasStake = combined.indexOf("stake") >= 0 || combined.indexOf("amt") >= 0;
        var hasOdds = combined.indexOf("odds") >= 0 || combined.indexOf("rate") >= 0 || combined.indexOf("price") >= 0;
        var hasMatched = combined.indexOf("matched bet") >= 0;
        var hasMatchName = combined.indexOf("match name") >= 0 || combined.indexOf("event") >= 0;

        if ((hasMatched && hasStake) || (hasOdds && hasStake && hasMatchName) || (labels.length >= 3 && hasStake && hasOdds)) {
          matching.push(table);
        }
      }
      return matching;
    }


    function findLegacyMyMarketContainer(table) {
      var node = table;
      var depth = 0;
      while (node && node !== document.body && depth < 8) {
        var text = normalizeText(node.textContent || "").toLowerCase();
        if (text.indexOf("my market") >= 0 || text.indexOf("my bet") >= 0) {
          return node;
        }
        node = node.parentElement;
        depth += 1;
      }
      return table || null;
    }

    function toggleLegacyNoOpenBets(container, show) {
      if (!container || !container.querySelectorAll) {
        return;
      }
      var nodes = container.querySelectorAll("*");
      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        if (!node || (node.children && node.children.length)) {
          continue;
        }
        var text = normalizeText(node.textContent || "");
        if (!text) {
          continue;
        }
        if (text.toLowerCase() === "no open bets found.") {
          node.style.display = show ? "" : "none";
        }
      }
    }

    function renderLegacyMyMarketRows(allRows) {
      var tables = findLegacyMyMarketTables();
      if (!tables || !tables.length) {
        return false;
      }

      var path = window.location.pathname;
      var currentEventId = "";
      if (path.indexOf("/game-details/") >= 0) {
        var pathParts = path.split("/");
        currentEventId = pathParts[pathParts.length - 1];
      }

      var currentMatchRows = allRows;
      if (currentEventId) {
        currentMatchRows = allRows.filter(function (r) { return String(r.eventId) === String(currentEventId); });
      }

      function updateMatchedBetCountersLocal(rowsToUse) {
        var count = Array.isArray(rowsToUse) ? rowsToUse.length : 0;
        var elms = document.querySelectorAll("span, b, strong, div, .accordion-button, .sidebar-title");
        for (var i = 0; i < elms.length; i++) {
          var el = elms[i];
          var txt = el.textContent || "";
          if (txt.indexOf("MATCHED BET (") >= 0) {
            // Apply match-specific count everywhere on match pages
            var finalCount = currentEventId ? (Array.isArray(currentMatchRows) ? currentMatchRows.length : 0) : count;
            el.textContent = txt.replace(/MATCHED BET \(\d+\)/i, "MATCHED BET (" + finalCount + ")");
          }
        }
      }
      updateMatchedBetCountersLocal(allRows);

      for (var t = 0; t < tables.length; t++) {
        var table = tables[t];
        var container = findLegacyMyMarketContainer(table);
        var tbody = table.querySelector("tbody");
        if (!tbody) {
          tbody = document.createElement("tbody");
          table.appendChild(tbody);
        }

        // Filter rows if we are on a specific match page, apply everywhere (center + sidebar)
        var rows = allRows;
        if (currentEventId) {
          rows = allRows.filter(function (r) { return String(r.eventId) === String(currentEventId); });
        }

        tbody.innerHTML = "";
        var headerRow = table.querySelector("tr");
        var headers = headerRow ? headerRow.querySelectorAll("th, td") : [];
        var labels = [];
        var stakeIdx = -1, oddsIdx = -1, matchIdx = -1;
        for (var h = 0; h < headers.length; h++) {
          var txt = normalizeText(headers[h].textContent || "").toLowerCase();
          labels.push(txt);
          if (txt.indexOf("stake") >= 0 || txt.indexOf("amt") >= 0) stakeIdx = h;
          else if (txt.indexOf("odds") >= 0 || txt.indexOf("rate") >= 0 || txt.indexOf("price") >= 0) oddsIdx = h;
          else if (txt.indexOf("bet") >= 0 || txt.indexOf("match") >= 0 || txt.indexOf("market") >= 0) matchIdx = h;
        }
        var colCount = headers.length || 3;

        if (!rows.length) {
          toggleLegacyNoOpenBets(container, true);
          var emptyRow = document.createElement("tr");
          emptyRow.innerHTML = '<td colspan="' + colCount + '" style="text-align:center; padding:20px; color:#999;">No matched bets found.</td>';
          tbody.appendChild(emptyRow);
          continue;
        }
        toggleLegacyNoOpenBets(container, false);

        if (matchIdx === -1) matchIdx = 0;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var tr = document.createElement("tr");
          var tradeLabel = String(row.trade || row.side || "").toUpperCase();
          tr.className = tradeLabel.toLowerCase();
          var sideColor = tradeLabel === "BACK" ? "#a7d8fd" : (tradeLabel === "LAY" ? "#f9c9d4" : "transparent");
          var displayName = row.marketSelection || row.selection || row.matchName || "Match";

          if (colCount <= 3) {
            var matchHtml = '<div style="font-weight:700; color:#333;">' + escapeHtmlText(displayName) + '</div>';

            for (var c = 0; c < colCount; c++) {
              var td = document.createElement("td");
              if (c === matchIdx) td.innerHTML = matchHtml;
              else if (c === oddsIdx) td.textContent = formatOddsValue(row.odds || 0);
              else if (c === stakeIdx) td.textContent = formatStakeValue(row.betAmount || 0);
              tr.appendChild(td);
            }
          } else {
            tr.innerHTML = '<td>' + escapeHtmlText(row.eventType || "Sports") + '</td>' +
              '<td><b>' + escapeHtmlText(row.eventName || "") + '</b></td>' +
              '<td>' + escapeHtmlText(displayName) + '</td>' +
              '<td><span style="background:' + sideColor + '; padding:2px 6px; border-radius:3px; font-weight:700;">' + tradeLabel + '</span></td>' +
              '<td>' + formatStakeValue(row.betAmount || 0) + '</td>';
          }
          fragment.appendChild(tr);
        }
        tbody.appendChild(fragment);
      }
      return true;
    }

    function syncLegacyMyMarketRows(force) {
      var tables = findLegacyMyMarketTables();
      if (!tables || !tables.length) {
        return;
      }
      var anyVisible = Boolean(force);
      if (!anyVisible) {
        for (var i = 0; i < tables.length; i++) {
          if (isElementVisible(tables[i])) {
            anyVisible = true;
            break;
          }
        }
      }
      if (!anyVisible) {
        return;
      }
      var now = Date.now();
      if (!force && now - legacyMarketLastSyncAt < LEGACY_MARKET_SYNC_MIN_INTERVAL_MS) {
        return;
      }
      legacyMarketLastSyncAt = now;
      legacyMarketRequestId += 1;
      var requestId = legacyMarketRequestId;
      fetchOpenBetsForExp()
        .then(function (decoded) {
          if (requestId !== legacyMarketRequestId) {
            return;
          }
          if (!decoded || typeof decoded !== "object") {
            return;
          }
          var status = Number(decoded.status || 0);
          var message = String(decoded.msg || "").toLowerCase();
          if (status === 200) {
            renderLegacyMyMarketRows(normalizeOpenBetsRows(decoded.data));
            return;
          }
          if (
            status === 300 &&
            (message.indexOf("no record") >= 0 ||
              message.indexOf("no open") >= 0 ||
              message.indexOf("no bet") >= 0)
          ) {
            renderLegacyMyMarketRows([]);
          }
        })
        .catch(function () { });
    }

    function closeExpMarketModal() {
      var modal = document.getElementById(EXP_MODAL_ID);
      if (!modal) {
        return;
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("local-exp-market-open");
    }

    function fetchOpenBetsForExp() {
      var identity = getPersistIdentity();
      var headers = {
        "Content-Type": "application/json",
        Accept: "application/json"
      };
      if (identity.token) {
        headers.Authorization = "Bearer " + identity.token;
      }
      var uname = identity.username || "";
      var body = JSON.stringify({ uname: uname, username: uname, user_name: uname });
      function parseJson(response) {
        return response.json().catch(function () {
          return {};
        });
      }
      function request(endpoint, decode) {
        return window
          .fetch(endpoint, {
            method: "POST",
            headers: headers,
            body: body
          })
          .then(parseJson)
          .then(function (payload) {
            return decode ? decodeApiEnvelopeForExp(payload) : payload;
          });
      }
      return request("/api/front/local-currentbets", false).then(function (payload) {
        var status = Number(payload && payload.status);
        if (Number.isFinite(status) && status > 0) {
          return payload;
        }
        return request("/api/front/currentbets", true);
      });
    }

    function openExpMarketModal() {
      var modal = ensureExpMarketModal();
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("local-exp-market-open");
      setExpMarketStatus("Loading bets...");
      renderExpMarketRows([]);

      expMarketRequestId += 1;
      var requestId = expMarketRequestId;
      fetchOpenBetsForExp()
        .then(function (decoded) {
          if (requestId !== expMarketRequestId) {
            return;
          }
          if (!decoded || typeof decoded !== "object") {
            setExpMarketStatus("Unable to load bet history.");
            renderExpMarketRows([]);
            return;
          }
          var status = Number(decoded.status || 0);
          var rows = normalizeOpenBetsRows(decoded.data);
          if (status !== 200 || !rows.length) {
            setExpMarketStatus(String(decoded.msg || "No open bets found."));
            renderExpMarketRows([]);
            return;
          }
          var summary = summarizeOpenBets(rows);
          var statusParts = [
            "Open bets: " + summary.totalBets,
            "Matches: " + summary.totalMatches,
            "Total price: " + formatStakeValue(summary.totalStake)
          ];
          statusParts.push("Total P/L: " + formatSignedStakeValue(summary.totalProfitLoss));
          if (summary.cricketBets) {
            statusParts.push("Cricket: " + summary.cricketBets + " bets / " + summary.cricketMatches + " matches");
          }
          setExpMarketStatus(statusParts.join(" | "));
          var modal2 = ensureExpMarketModal();
          if (modal2) { modal2.__localExpRows = rows; }
          renderExpMarketRows(rows);
        })
        .catch(function () {
          if (requestId !== expMarketRequestId) {
            return;
          }
          setExpMarketStatus("Unable to load bet history.");
          renderExpMarketRows([]);
        });
    }

    function annotateExpTriggers() {
      var rows = document.querySelectorAll(".user-balance > div, .user-balance div, .user-details .user-balance div");
      for (var i = 0; i < rows.length; i += 1) {
        var row = rows[i];
        if (!row) {
          continue;
        }
        var text = normalizeText(row.textContent || "").toLowerCase();
        if (!text || text.indexOf("exp") !== 0) {
          continue;
        }
        row.setAttribute("data-local-exp-trigger", "1");
        row.classList.add("local-exp-trigger");
        if (row.style) {
          row.style.setProperty("cursor", "pointer", "important");
        }
      }
    }

    function tryHandleExpClick(event) {
      if (!event || !event.target || typeof event.target.closest !== "function") {
        return false;
      }
      var trigger = event.target.closest("[data-local-exp-trigger='1'], .local-exp-trigger");
      if (!trigger) {
        return false;
      }
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }
      openExpMarketModal();
      return true;
    }

    function ensureUserUiVisible() {
      var nodes = document.querySelectorAll(
        ".user-balance .dropdown, .user-balance .user-name, .user-balance .username, .user-details .dropdown-toggle, .user-menu .dropdown-toggle, .user-dropdown .dropdown-toggle"
      );
      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        if (!node || !node.style) {
          continue;
        }
        node.style.removeProperty("display");
        node.style.removeProperty("visibility");
        node.style.removeProperty("opacity");
        node.style.removeProperty("pointer-events");
        node.removeAttribute("aria-hidden");
      }
    }

    function removeInjectedFallbackUserMenus() {
      var markers = document.querySelectorAll("[data-local-user-link]");
      for (var i = 0; i < markers.length; i += 1) {
        var item = markers[i];
        if (!item || typeof item.closest !== "function") {
          continue;
        }
        var menu = item.closest(".dropdown-menu");
        if (!menu || !menu.parentNode) {
          continue;
        }
        var remaining = menu.querySelectorAll("[data-local-user-link]").length;
        var totalItems = menu.querySelectorAll("a,button,[role='menuitem']").length;
        if (remaining > 0 && remaining === totalItems) {
          menu.style.setProperty("display", "none", "important");
          menu.style.setProperty("visibility", "hidden", "important");
          menu.style.setProperty("opacity", "0", "important");
          menu.style.setProperty("pointer-events", "none", "important");
          menu.setAttribute("data-local-hidden-fallback-menu", "1");
        } else {
          item.removeAttribute("data-local-user-link");
        }
      }
    }

    function removeMobileHeaderClasses(header) {
      if (!header || !header.classList) {
        return;
      }
      var row2 = findDirectChildByClass(header, "local-mobile-header-row2");
      if (row2 && row2.parentNode === header && !row2.firstChild) {
        safeDetachNode(row2, header);
      }
      header.classList.remove("local-mobile-header-layout");
      var tagged = header.querySelectorAll(
        ".local-mobile-header-left,.local-mobile-header-right,.local-mobile-header-row2,.local-mobile-header-search,.local-mobile-header-news,.local-mobile-header-actions"
      );
      for (var i = 0; i < tagged.length; i += 1) {
        tagged[i].classList.remove(
          "local-mobile-header-left",
          "local-mobile-header-right",
          "local-mobile-header-row2",
          "local-mobile-header-search",
          "local-mobile-header-news",
          "local-mobile-header-actions"
        );
      }
    }

    function moveChildAfter(parent, node, anchor) {
      if (!parent || !node || node === anchor) {
        return;
      }
      if (node.parentNode !== parent) {
        parent.appendChild(node);
      }
      if (!anchor) {
        if (parent.firstChild !== node) {
          parent.insertBefore(node, parent.firstChild);
        }
        return;
      }
      if (anchor.nextSibling !== node) {
        parent.insertBefore(node, anchor.nextSibling);
      }
    }

    function findDirectChildByClass(parent, className) {
      if (!parent || !className || !parent.children) {
        return null;
      }
      for (var i = 0; i < parent.children.length; i += 1) {
        var child = parent.children[i];
        if (child && child.classList && child.classList.contains(className)) {
          return child;
        }
      }
      return null;
    }

    function enforceMobileHeaderLayout() {
      var header = document.querySelector(".header-top");
      if (!header) {
        return;
      }
      if (window.innerWidth > 767) {
        removeMobileHeaderClasses(header);
        return;
      }

      var logo = findDirectChildByClass(header, "logo-header") || header.querySelector(".logo-header");
      var userDetails = findDirectChildByClass(header, "user-details") || header.querySelector(".user-details");
      if (!userDetails) {
        userDetails = findDirectChildByClass(header, "user-balance") || header.querySelector(".user-balance");
      }
      var searchWrap = findDirectChildByClass(header, "search-box-container");
      var searchBox = searchWrap ? null : header.querySelector(".search-box");
      if (!searchWrap && searchBox) {
        if (
          searchBox.parentNode &&
          searchBox.parentNode.nodeType === 1 &&
          String(searchBox.parentNode.className || "").indexOf("search-box-container") >= 0
        ) {
          searchWrap = searchBox.parentNode;
        } else if (searchBox.parentNode === header) {
          searchWrap = searchBox;
        }
      }
      var news = findDirectChildByClass(header, "news") || header.querySelector(".news");
      var depowith = findDirectChildByClass(header, "depowith") || header.querySelector(".depowith");

      header.classList.add("local-mobile-header-layout");

      if (logo) {
        logo.classList.add("local-mobile-header-left");
      }
      if (userDetails) {
        userDetails.classList.add("local-mobile-header-right");
      }
      if (searchWrap) {
        searchWrap.classList.add("local-mobile-header-search");
      }
      if (news) {
        news.classList.add("local-mobile-header-news");
      }
      if (depowith) {
        depowith.classList.add("local-mobile-header-actions");
      }
    }

    function setDropdownOpen(dropdown, menu, open) {
      if (!dropdown || !menu) {
        return;
      }
      if (open) {
        dropdown.classList.add("show");
        menu.classList.add("show");
        menu.style.setProperty("display", "block", "important");
      } else {
        dropdown.classList.remove("show");
        menu.classList.remove("show");
        menu.style.removeProperty("display");
      }
    }

    function closeAllUserDropdowns(exceptDropdown) {
      var dropdowns = document.querySelectorAll(
        ".user-details .dropdown, .user-menu, .user-dropdown, .user-balance .dropdown"
      );
      for (var i = 0; i < dropdowns.length; i += 1) {
        var dropdown = dropdowns[i];
        if (!dropdown || dropdown === exceptDropdown) {
          continue;
        }
        var menu = dropdown.querySelector(".dropdown-menu");
        if (!menu) {
          continue;
        }
        setDropdownOpen(dropdown, menu, false);
      }
    }

    function toggleDropdownFromTarget(target) {
      if (!target || typeof target.closest !== "function") {
        return false;
      }
      var toggle = target.closest(
        ".user-details .dropdown-toggle, .user-menu .dropdown-toggle, .user-dropdown .dropdown-toggle, .user-balance .dropdown-toggle"
      );
      if (!toggle) {
        return false;
      }
      var dropdown = toggle.closest(".dropdown, .user-menu, .user-dropdown");
      if (!dropdown) {
        return false;
      }
      var menu = dropdown.querySelector(".dropdown-menu");
      if (!menu) {
        return false;
      }
      var isOpen =
        dropdown.classList.contains("show") ||
        menu.classList.contains("show") ||
        String(menu.style.display || "").toLowerCase() === "block";
      closeAllUserDropdowns(dropdown);
      setDropdownOpen(dropdown, menu, !isOpen);
      return true;
    }

    function buildCardSignature(card) {
      if (!card || !card.querySelector) {
        return "";
      }
      var anchor = card.querySelector("a[href]") || card;
      var href = anchor && anchor.getAttribute ? String(anchor.getAttribute("href") || "").trim() : "";
      var labelNode = card.querySelector(".casino-list-name,.nm,.casino-name");
      var label = labelNode ? String(labelNode.textContent || "").replace(/\s+/g, " ").trim().toLowerCase() : "";
      var banner = card.querySelector(".casino-list-item-banner");
      var image = "";
      if (banner) {
        image = String((banner.style && banner.style.backgroundImage) || "").trim().toLowerCase();
      }
      var stableKey = [href.toLowerCase(), label].filter(Boolean).join("|");
      if (stableKey) {
        return stableKey;
      }
      return image || "";
    }

    function dedupeCasinoCards() {
      var lists = document.querySelectorAll(".casino-list");
      for (var i = 0; i < lists.length; i += 1) {
        var list = lists[i];
        var cards = Array.prototype.slice.call(list.querySelectorAll(":scope > .casino-list-item"));
        if (!cards.length) {
          continue;
        }
        var seen = new Set();
        for (var j = 0; j < cards.length; j += 1) {
          var card = cards[j];
          var signature = buildCardSignature(card);
          if (!signature) {
            continue;
          }
          if (seen.has(signature)) {
            if (card && card.style) {
              card.style.setProperty("display", "none", "important");
              card.style.setProperty("visibility", "hidden", "important");
              card.style.setProperty("opacity", "0", "important");
              card.style.setProperty("pointer-events", "none", "important");
              card.setAttribute("data-local-duplicate-card", "1");
            }
            continue;
          }
          seen.add(signature);
        }
      }
    }

    function collapseRepeatedHomeSections() {
      if (!isHomeRoutePath()) {
        return;
      }
      var lists = document.querySelectorAll(".home-page .casino-list, .center-main-container .casino-list");
      var seenFingerprints = new Set();
      for (var i = 0; i < lists.length; i += 1) {
        var list = lists[i];
        if (!list || list.getAttribute("data-local-repeat-locked") === "1") {
          continue;
        }
        var cards = list.querySelectorAll(":scope > .casino-list-item");
        if (!cards || cards.length < 6) {
          continue;
        }
        var keys = [];
        for (var k = 0; k < cards.length; k += 1) {
          var signature = buildCardSignature(cards[k]);
          if (signature) {
            keys.push(signature);
          }
          if (keys.length >= 18) {
            break;
          }
        }
        if (keys.length < 6) {
          continue;
        }
        var fingerprint = keys.join("||");
        if (seenFingerprints.has(fingerprint)) {
          list.style.setProperty("display", "none", "important");
          list.setAttribute("data-local-repeat-locked", "1");
          continue;
        }
        seenFingerprints.add(fingerprint);
      }
    }

    function getCasinoStatusNode() {
      var node = document.getElementById(STATUS_ID);
      if (node) {
        return node;
      }
      var target =
        document.querySelector(".home-page .center-container") ||
        document.querySelector(".home-page .center-main-container") ||
        document.getElementById("root");
      if (!target || !target.appendChild) {
        return null;
      }
      node = document.createElement("div");
      node.id = STATUS_ID;
      target.insertBefore(node, target.firstChild || null);
      return node;
    }

    function updateCasinoStatus(mode) {
      if (!isHomeRoutePath()) {
        return;
      }
      var node = getCasinoStatusNode();
      if (!node) {
        return;
      }
      var hasCards = document.querySelectorAll(".home-page .casino-list-item").length > 0;
      if (mode === "loading" && !hasCards) {
        node.textContent = "Loading games...";
        node.style.display = "block";
        return;
      }
      if (mode === "error" && !hasCards) {
        node.textContent = "Unable to load games right now. Pull to refresh.";
        node.style.display = "block";
        return;
      }
      node.style.display = "none";
    }

    function normalizeManifestImageArray(value) {
      if (!Array.isArray(value)) {
        return [];
      }
      var out = [];
      for (var i = 0; i < value.length; i += 1) {
        var normalized = normalizeHomeCardImageUrl(value[i]);
        if (normalized) {
          out.push(normalized);
        }
      }
      return out;
    }

    function normalizeLocalGameImagesManifest(payload) {
      if (!payload || typeof payload !== "object") {
        return null;
      }
      var categories = payload.categories && typeof payload.categories === "object" ? payload.categories : null;
      if (!categories) {
        return null;
      }
      return {
        our: normalizeManifestImageArray(categories.our),
        live: normalizeManifestImageArray(categories.live),
        slots: normalizeManifestImageArray(categories.slots)
      };
    }

    function fetchLocalGameImagesManifest(forceRefresh) {
      if (localGameImagesManifest && !forceRefresh) {
        return Promise.resolve(localGameImagesManifest);
      }
      if (localGameImagesFetchPromise && !forceRefresh) {
        return localGameImagesFetchPromise;
      }
      var requestUrl = LOCAL_GAME_IMAGES_MANIFEST_PATH;
      if (forceRefresh) {
        requestUrl += (requestUrl.indexOf("?") >= 0 ? "&" : "?") + "t=" + Date.now();
      }
      localGameImagesFetchPromise = window
        .fetch(requestUrl, { method: "GET", headers: { Accept: "application/json" } })
        .then(function (response) {
          if (!response || !response.ok) {
            return null;
          }
          return response.json().catch(function () {
            return null;
          });
        })
        .then(function (payload) {
          var normalized = normalizeLocalGameImagesManifest(payload);
          if (normalized) {
            localGameImagesManifest = normalized;
            return localGameImagesManifest;
          }
          return localGameImagesManifest;
        })
        .catch(function () {
          return localGameImagesManifest;
        })
        .finally(function () {
          localGameImagesFetchPromise = null;
        });
      return localGameImagesFetchPromise;
    }

    function normalizeLobbyMode(mode) {
      var normalized = String(mode || "").trim().toLowerCase();
      if (normalized === "our" || normalized === "live" || normalized === "slots" || normalized === "fantasy") {
        return normalized;
      }
      return "";
    }

    function persistLobbyMode(mode) {
      var normalized = normalizeLobbyMode(mode);
      if (!normalized) {
        return;
      }
      try {
        sessionStorage.setItem(LOBBY_MODE_STORAGE_KEY, normalized);
      } catch (_sessionErr) { }
      try {
        localStorage.setItem(LOBBY_MODE_STORAGE_KEY, normalized);
      } catch (_localErr) { }
    }

    function readPersistedLobbyMode() {
      var candidates = [];
      try {
        candidates.push(sessionStorage.getItem(LOBBY_MODE_STORAGE_KEY) || "");
      } catch (_sessionErr) { }
      try {
        candidates.push(localStorage.getItem(LOBBY_MODE_STORAGE_KEY) || "");
      } catch (_localErr) { }
      for (var i = 0; i < candidates.length; i += 1) {
        var mode = normalizeLobbyMode(candidates[i]);
        if (mode) {
          return mode;
        }
      }
      return "";
    }

    function resolveLobbyModeFromLabel(label) {
      var normalized = String(label || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (!normalized) {
        return "";
      }
      if (normalized === "our casino" || normalized === "our") {
        return "our";
      }
      if (normalized === "live casino" || normalized === "live") {
        return "live";
      }
      if (normalized === "slots" || normalized === "slot") {
        return "slots";
      }
      if (normalized === "fantasy" || normalized === "fantasy game") {
        return "fantasy";
      }
      return "";
    }

    function resolveLobbyModeFromToken(value) {
      var normalized = String(value || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!normalized) {
        return "";
      }
      if (normalized === "our" || normalized === "ourcasino") {
        return "our";
      }
      if (normalized === "live" || normalized === "livecasino") {
        return "live";
      }
      if (normalized === "slots" || normalized === "slot") {
        return "slots";
      }
      if (normalized === "fantasy" || normalized === "fantasygame") {
        return "fantasy";
      }
      return "";
    }

    function resolveLobbyModeFromElementData(node) {
      if (!node || !node.getAttribute) {
        return "";
      }
      var attrs = ["data-tab", "data-type", "data-gtype", "data-target", "data-section", "data-mode"];
      for (var i = 0; i < attrs.length; i += 1) {
        var mode = resolveLobbyModeFromToken(node.getAttribute(attrs[i]));
        if (mode) {
          return mode;
        }
      }
      return "";
    }

    function resolveLobbyModeFromAnchor(anchor) {
      if (!anchor || !anchor.getAttribute) {
        return "";
      }
      var dataMode = resolveLobbyModeFromElementData(anchor);
      if (dataMode) {
        return dataMode;
      }
      var href = String(anchor.getAttribute("href") || "").trim();
      if (href && href.charAt(0) !== "#") {
        try {
          var parsed = new URL(href, window.location.origin);
          var pathMode = normalizeLobbyMode(HOME_INLINE_LOBBY_MODE_BY_PATH[normalizePathname(parsed.pathname)]);
          if (pathMode) {
            return pathMode;
          }
        } catch (_urlError) { }
      }
      return resolveLobbyModeFromLabel(anchor.textContent || "");
    }

    function resolveLobbyModeFromNode(node) {
      if (!node || typeof node.closest !== "function") {
        return "";
      }
      var candidates = [];
      var anchor = node.closest("a");
      if (anchor) {
        candidates.push(anchor);
      }
      var tabLike = node.closest(
        "[data-tab],[data-type],[data-gtype],[data-target],[data-section],[data-mode],li,button,[role='tab']"
      );
      if (tabLike) {
        candidates.push(tabLike);
      }

      for (var i = 0; i < candidates.length; i += 1) {
        var candidate = candidates[i];
        if (!candidate) {
          continue;
        }
        var modeFromData = resolveLobbyModeFromElementData(candidate);
        if (modeFromData) {
          return modeFromData;
        }
        if (candidate.tagName && String(candidate.tagName).toLowerCase() === "a") {
          var modeFromAnchor = resolveLobbyModeFromAnchor(candidate);
          if (modeFromAnchor) {
            return modeFromAnchor;
          }
        }
        var modeFromLabel = resolveLobbyModeFromLabel(candidate.textContent || "");
        if (modeFromLabel) {
          return modeFromLabel;
        }
      }
      return "";
    }

    function parseLobbyModeFromLocation() {
      try {
        if (window.history && window.history.state && typeof window.history.state === "object") {
          var stateMode = normalizeLobbyMode(window.history.state.localLobbyMode || "");
          if (stateMode) {
            return stateMode;
          }
        }
      } catch (_stateReadErr) { }
      var persistedMode = readPersistedLobbyMode();
      if (persistedMode) {
        return persistedMode;
      }
      return "";
    }

    function writeLobbyModeToHistory(mode, replace) {
      var normalizedMode = normalizeLobbyMode(mode);
      if (!normalizedMode || !isHomeRoutePath() || !window.history) {
        return;
      }
      if (typeof window.history.pushState !== "function" || typeof window.history.replaceState !== "function") {
        return;
      }
      var nextUrl;
      try {
        var parsed = new URL(window.location.href);
        var hashText = String(parsed.hash || "").replace(/^#/, "").trim().toLowerCase();
        if (hashText.indexOf("lobby=") === 0 || hashText.indexOf("lobby-") === 0 || hashText === "lobby") {
          parsed.hash = "";
        }
        nextUrl = (parsed.pathname || "/") + (parsed.search || "") + (parsed.hash || "");
      } catch (_historyUrlErr) {
        nextUrl = window.location.pathname + window.location.search;
      }
      var currentUrl = window.location.pathname + window.location.search + window.location.hash;
      var nextState = {};
      if (window.history.state && typeof window.history.state === "object") {
        for (var key in window.history.state) {
          if (Object.prototype.hasOwnProperty.call(window.history.state, key)) {
            nextState[key] = window.history.state[key];
          }
        }
      }
      var currentStateMode = normalizeLobbyMode(nextState.localLobbyMode || "");
      if (!replace && currentStateMode === normalizedMode && nextUrl === currentUrl) {
        persistLobbyMode(normalizedMode);
        return;
      }
      nextState.localLobbyMode = normalizedMode;
      persistLobbyMode(normalizedMode);
      if (replace) {
        window.history.replaceState(nextState, document.title || "", nextUrl);
      } else {
        window.history.pushState(nextState, document.title || "", nextUrl);
      }
    }

    function clearLegacyLobbyHashFromUrl() {
      if (!window.history || typeof window.history.replaceState !== "function") {
        return false;
      }
      try {
        var parsed = new URL(window.location.href);
        var hashText = String(parsed.hash || "").replace(/^#/, "").trim().toLowerCase();
        if (hashText.indexOf("lobby=") !== 0 && hashText.indexOf("lobby-") !== 0 && hashText !== "lobby") {
          return false;
        }
        parsed.hash = "";
        var cleanUrl = (parsed.pathname || "/") + (parsed.search || "");
        window.history.replaceState(window.history.state || null, document.title || "", cleanUrl);
        return true;
      } catch (_hashErr) {
        return false;
      }
    }

    function maybeRedirectLegacyLobbyPathToHome() {
      if (isHomeRoutePath()) {
        return false;
      }
      var legacyMode = normalizeLobbyMode(HOME_INLINE_LOBBY_MODE_BY_PATH[normalizePathname(window.location.pathname)]);
      if (!legacyMode) {
        return false;
      }
      persistLobbyMode(legacyMode);
      window.location.replace("/home");
      return true;
    }

    function getHomeLobbyTabNodes() {
      var allNodes = Array.prototype.slice.call(
        document.querySelectorAll(
          ".menu-tabs a,.menu-tabs li,.nav-tabs a,.nav-tabs li,.header-bottom a,.header-bottom li,.home-page a,.home-page button,.home-page li,.center-main-container a,.center-main-container button,.center-main-container li,[role='tab']"
        )
      );
      var out = [];
      var seen = new Set();
      for (var i = 0; i < allNodes.length; i += 1) {
        var node = allNodes[i];
        if (!node || node.nodeType !== 1) {
          continue;
        }
        var mode = resolveLobbyModeFromNode(node);
        if (!mode) {
          continue;
        }
        if (seen.has(node)) {
          continue;
        }
        seen.add(node);
        out.push(node);
      }
      return out;
    }

    function updateHomeLobbyTabActive(mode) {
      var normalizedMode = normalizeLobbyMode(mode);
      if (!normalizedMode) {
        return;
      }
      var nodes = getHomeLobbyTabNodes();
      if (!nodes.length) {
        return;
      }
      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        var nodeMode = resolveLobbyModeFromNode(node);
        var active = nodeMode === normalizedMode;
        node.classList.toggle("active", active);
        var li = node.closest("li");
        if (li) {
          li.classList.toggle("active", active);
        }
      }
    }

    function getInlineLobbyHostListNode() {
      return (
        document.querySelector(".home-page .casino-list:not([data-local-inline-list='1'])") ||
        document.querySelector(".center-main-container .casino-list:not([data-local-inline-list='1'])") ||
        document.querySelector(".casino-list:not([data-local-inline-list='1'])")
      );
    }

    function getInlineLobbyListNode() {
      var injected = document.getElementById(INLINE_LOBBY_LIST_ID);
      if (injected && document.body && document.body.contains(injected)) {
        return injected;
      }

      var host = getInlineLobbyHostListNode();
      if (!host || !host.parentNode) {
        return null;
      }

      host.style.setProperty("display", "none", "important");
      host.style.setProperty("visibility", "hidden", "important");
      host.style.setProperty("opacity", "0", "important");
      host.style.setProperty("pointer-events", "none", "important");
      host.setAttribute("data-local-inline-host", "1");

      var nextList = document.createElement("div");
      nextList.id = INLINE_LOBBY_LIST_ID;
      nextList.className = host.className || "casino-list";
      nextList.setAttribute("data-local-inline-list", "1");
      host.parentNode.insertBefore(nextList, host.nextSibling);
      return nextList;
    }

    function collectInlineLobbyGames(payload, mode) {
      var normalizedMode = normalizeLobbyMode(mode);
      if (!payload || typeof payload !== "object" || !normalizedMode) {
        return [];
      }
      var source = [];
      if (normalizedMode === "our") {
        source = Array.isArray(payload.all) ? payload.all : [];
      } else if (normalizedMode === "live") {
        source = payload.groups && Array.isArray(payload.groups.lc) ? payload.groups.lc : [];
      } else if (normalizedMode === "slots") {
        source = payload.groups && Array.isArray(payload.groups.slot) ? payload.groups.slot : [];
      } else if (normalizedMode === "fantasy") {
        source = payload.groups && Array.isArray(payload.groups.xgame) ? payload.groups.xgame : [];
      }

      var deduped = [];
      var seen = new Set();
      for (var i = 0; i < source.length; i += 1) {
        var game = source[i] || {};
        var launchPath = String(game.launchPath || "").trim();
        var name = String(game.name || "").replace(/\s+/g, " ").trim();
        var signature = (launchPath.toLowerCase() + "|" + name.toLowerCase()).trim();
        if (!signature || seen.has(signature)) {
          continue;
        }
        seen.add(signature);
        deduped.push(game);
      }
      var ordered = orderInlineLobbyGames(normalizedMode, deduped);
      var maxGames = Number(HOME_INLINE_MAX_GAMES_BY_MODE[normalizedMode] || 0);
      if (maxGames > 0 && ordered.length > maxGames) {
        return ordered.slice(0, maxGames);
      }
      return ordered;
    }

    function applyLocalManifestImagesToGames(mode, games, manifest) {
      if (!ENABLE_LOCAL_MANIFEST_IMAGE_OVERRIDE) {
        return games;
      }
      if (!Array.isArray(games) || !games.length || !manifest || typeof manifest !== "object") {
        return games;
      }
      var normalizedMode = normalizeLobbyMode(mode);
      var category = "";
      if (normalizedMode === "our") {
        category = "our";
      } else if (normalizedMode === "live") {
        category = "live";
      } else if (normalizedMode === "slots") {
        category = "slots";
      }
      if (!category) {
        return games;
      }
      var overrideImages = Array.isArray(manifest[category]) ? manifest[category] : [];
      if (!overrideImages.length) {
        return games;
      }
      var mapped = [];
      for (var i = 0; i < games.length; i += 1) {
        var item = games[i] || {};
        var overrideImage = i < overrideImages.length ? overrideImages[i] : "";
        if (!overrideImage) {
          mapped.push(item);
          continue;
        }
        var next = {};
        for (var key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            next[key] = item[key];
          }
        }
        next.image = overrideImage;
        mapped.push(next);
      }
      return mapped;
    }

    function collectHomeCardImageCandidates(game, includeFallbacks) {
      var rawCandidates = [];
      if (game && typeof game === "object") {
        rawCandidates.push(game.image);
        rawCandidates.push(game.img);
        rawCandidates.push(game.imgUrl2);
        rawCandidates.push(game.imgpath);
        rawCandidates.push(game.icon);
      }
      if (includeFallbacks !== false) {
        rawCandidates.push("/dataobj.ecoassetsservice.com/casino-icons/default.jpg");
        rawCandidates.push("/versionobj.ecoassetsservice.com/v93/static/front/img/casino/default.jpeg");
        rawCandidates.push("/casino/casino-icons/lc/default.jpg");
      }

      var out = [];
      var seen = new Set();
      for (var i = 0; i < rawCandidates.length; i += 1) {
        var normalized = normalizeHomeCardImageUrl(rawCandidates[i]);
        if (!normalized) {
          continue;
        }
        var signature = String(normalized).trim().toLowerCase();
        if (!signature || seen.has(signature)) {
          continue;
        }
        seen.add(signature);
        out.push(normalized);
      }
      return out;
    }

    function isLiveLikeGame(game) {
      var type = String((game && (game.type || game.ctype)) || "")
        .toLowerCase()
        .trim();
      var category = String((game && game.category) || "")
        .toLowerCase()
        .trim();
      var name = String((game && game.name) || "")
        .toLowerCase()
        .trim();
      if (type === "lc") {
        return true;
      }
      if (category.indexOf("live") >= 0 || category.indexOf("roulette") >= 0 || category.indexOf("lobby") >= 0) {
        return true;
      }
      return (
        name.indexOf("teenpatti") >= 0 ||
        name.indexOf("baccarat") >= 0 ||
        name.indexOf("roulette") >= 0 ||
        name.indexOf("dragon tiger") >= 0 ||
        name.indexOf("sic bo") >= 0 ||
        name.indexOf("andar bahar") >= 0
      );
    }

    function hasProviderImage(game) {
      var candidates = collectHomeCardImageCandidates(game, false);
      if (!candidates.length) {
        return false;
      }
      for (var i = 0; i < candidates.length; i += 1) {
        var candidate = normalizeHomeCardImageUrl(candidates[i]);
        if (!candidate || isDefaultHomeCardImage(candidate)) {
          continue;
        }
        return true;
      }
      return false;
    }

    function scoreInlineLobbyGame(mode, game, index) {
      var normalizedMode = normalizeLobbyMode(mode);
      var vendor = String((game && game.vendorCode) || "")
        .toUpperCase()
        .trim();
      var hasImage = hasProviderImage(game);
      var isLiveLike = isLiveLikeGame(game);
      var isMac88 = vendor === "MAC88";
      var isMac88Live = isMac88 && isLiveLike;
      var launchPath = String((game && game.launchPath) || "").trim();
      var hasLaunch = Boolean(launchPath);

      var score = 0;
      if (normalizedMode === "our") {
        if (isMac88Live) {
          score += 5000;
        }
        if (isLiveLike) {
          score += 900;
        }
      } else if (normalizedMode === "live") {
        if (isMac88Live) {
          score += 4500;
        } else if (isMac88) {
          score += 2600;
        }
        if (isLiveLike) {
          score += 900;
        }
      } else if (normalizedMode === "slots" || normalizedMode === "fantasy") {
        if (isMac88) {
          score += 250;
        }
      }

      if (hasImage) {
        score += 2000;
      } else {
        score -= 12000;
      }
      if (hasLaunch) {
        score += 220;
      }
      return {
        score: score,
        order: index
      };
    }

    function orderInlineLobbyGames(mode, games) {
      if (!Array.isArray(games) || !games.length) {
        return [];
      }
      var decorated = [];
      for (var i = 0; i < games.length; i += 1) {
        decorated.push({
          game: games[i],
          meta: scoreInlineLobbyGame(mode, games[i], i)
        });
      }
      decorated.sort(function (a, b) {
        if (b.meta.score !== a.meta.score) {
          return b.meta.score - a.meta.score;
        }
        return a.meta.order - b.meta.order;
      });

      var ordered = [];
      for (var j = 0; j < decorated.length; j += 1) {
        ordered.push(decorated[j].game);
      }
      return ordered;
    }

    function bindBannerImageFallback(imgNode, candidates) {
      if (!imgNode || !Array.isArray(candidates) || !candidates.length) {
        return;
      }
      var index = 0;
      function applyAt(nextIndex) {
        if (nextIndex < 0 || nextIndex >= candidates.length) {
          return;
        }
        index = nextIndex;
        imgNode.setAttribute("src", String(candidates[index]));
      }
      imgNode.addEventListener("error", function () {
        if (index + 1 >= candidates.length) {
          return;
        }
        applyAt(index + 1);
      });
      applyAt(0);
    }

    function buildInlineLobbyCard(game, memberAccount) {
      var launchPath = appendMemberToLaunchPath(game && game.launchPath ? game.launchPath : "#", memberAccount);
      var localCardFallback = "/local/game-images/home87/image_172x172_1.gif";
      var imageCandidates = collectHomeCardImageCandidates(game, false);
      var localPrimary = imageCandidates.length ? String(imageCandidates[0] || "").trim() : "";
      if (/^\/local\/game-images\//i.test(localPrimary)) {
        imageCandidates = [localPrimary];
      }
      if (!imageCandidates.length) {
        imageCandidates = [localCardFallback];
      } else if (imageCandidates[imageCandidates.length - 1] !== localCardFallback) {
        imageCandidates.push(localCardFallback);
      }
      var image = imageCandidates[0];
      var bannerBg = 'url("' + image + '"), url("' + localCardFallback + '")';
      var gameName = String((game && game.name) || "Game").replace(/\s+/g, " ").trim();

      var item = document.createElement("div");
      item.className = "casino-list-item";
      var anchor = document.createElement("a");
      anchor.setAttribute("href", launchPath || "#");

      var banner = document.createElement("div");
      banner.className = "casino-list-item-banner";
      banner.setAttribute("data-home-source-bg", bannerBg);
      banner.style.backgroundImage = bannerBg;
      banner.style.backgroundSize = "cover";
      banner.style.backgroundPosition = "center center";
      banner.style.backgroundRepeat = "no-repeat";
      banner.style.position = "relative";

      var imgNode = document.createElement("img");
      imgNode.setAttribute("alt", gameName || "Game");
      imgNode.setAttribute("loading", "lazy");
      imgNode.setAttribute("decoding", "async");
      imgNode.style.position = "absolute";
      imgNode.style.left = "0";
      imgNode.style.top = "0";
      imgNode.style.width = "100%";
      imgNode.style.height = "100%";
      imgNode.style.objectFit = "cover";
      imgNode.style.objectPosition = "center center";
      imgNode.style.display = "block";
      bindBannerImageFallback(imgNode, imageCandidates);
      banner.appendChild(imgNode);

      var name = document.createElement("div");
      name.className = "casino-list-name";
      name.textContent = gameName || "Game";

      anchor.appendChild(banner);
      anchor.appendChild(name);
      item.appendChild(anchor);
      return item;
    }

    function renderInlineLobbyCards(mode, payload, imageManifest) {
      if (!isHomeRoutePath()) {
        return false;
      }
      var list = getInlineLobbyListNode();
      if (!list) {
        return false;
      }
      var games = collectInlineLobbyGames(payload, mode);
      games = applyLocalManifestImagesToGames(mode, games, imageManifest);
      if (!games.length) {
        return false;
      }

      var memberAccount = resolveMemberAccountFromStorage();
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < games.length; i += 1) {
        fragment.appendChild(buildInlineLobbyCard(games[i], memberAccount));
      }
      list.innerHTML = "";
      list.appendChild(fragment);
      list.setAttribute("data-local-lobby-mode", normalizeLobbyMode(mode));
      return true;
    }

    function ensureInlineLobbyHomeState(forceLoad) {
      clearLegacyLobbyHashFromUrl();
      if (maybeRedirectLegacyLobbyPathToHome()) {
        return;
      }
      if (!isHomeRoutePath()) {
        return;
      }
      var locationMode = parseLobbyModeFromLocation();
      var activeMode = normalizeLobbyMode(HOME_INLINE_LOBBY_ACTIVE_MODE);
      var targetMode = locationMode || activeMode || DEFAULT_HOME_INLINE_LOBBY_MODE;
      if (!targetMode) {
        targetMode = DEFAULT_HOME_INLINE_LOBBY_MODE;
      }
      if (!forceLoad && activeMode === targetMode) {
        var list = getInlineLobbyListNode();
        if (list) {
          var renderedMode = normalizeLobbyMode(list.getAttribute("data-local-lobby-mode") || "");
          var renderedCards = list.querySelectorAll(":scope > .casino-list-item");
          if (renderedMode === targetMode && renderedCards && renderedCards.length > 0) {
            updateHomeLobbyTabActive(targetMode);
            return;
          }
        }
      }
      writeLobbyModeToHistory(targetMode, true);
      loadInlineLobbyMode(targetMode);
    }

    function loadInlineLobbyMode(mode) {
      var normalizedMode = normalizeLobbyMode(mode);
      if (!normalizedMode || !isHomeRoutePath()) {
        return;
      }
      HOME_INLINE_LOBBY_ACTIVE_MODE = normalizedMode;
      HOME_INLINE_LOBBY_REQUEST_ID += 1;
      var requestId = HOME_INLINE_LOBBY_REQUEST_ID;
      updateHomeLobbyTabActive(normalizedMode);
      updateCasinoStatus("loading");

      var imageManifestPromise = ENABLE_LOCAL_MANIFEST_IMAGE_OVERRIDE
        ? fetchLocalGameImagesManifest(false)
        : Promise.resolve(null);
      Promise.all([fetchHomeApiGamesData(false), imageManifestPromise])
        .then(function (values) {
          if (requestId !== HOME_INLINE_LOBBY_REQUEST_ID) {
            return;
          }
          var payload = values && values[0] ? values[0] : null;
          var imageManifest = values && values[1] ? values[1] : null;
          var rendered = renderInlineLobbyCards(normalizedMode, payload, imageManifest);
          if (rendered) {
            applyLocalHomeCardImages();
            dedupeCasinoCards();
            collapseRepeatedHomeSections();
            updateCasinoStatus("idle");
            return;
          }
          if (Date.now() - lastCasinoErrorAt < 3000) {
            updateCasinoStatus("error");
          } else {
            updateCasinoStatus("idle");
          }
        })
        .catch(function () {
          if (requestId !== HOME_INLINE_LOBBY_REQUEST_ID) {
            return;
          }
          lastCasinoErrorAt = Date.now();
          updateCasinoStatus("error");
        });
    }

    function tryHandleInlineLobbyTabClick(event) {
      if (!event || !event.target) {
        return false;
      }
      if (typeof event.target.closest !== "function") {
        return false;
      }
      var mode = resolveLobbyModeFromNode(event.target);
      if (!mode) {
        return false;
      }
      if (!isHomeRoutePath()) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === "function") {
          event.stopImmediatePropagation();
        }
        persistLobbyMode(mode);
        window.location.assign("/home");
        return true;
      }
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }
      writeLobbyModeToHistory(mode, false);
      loadInlineLobbyMode(mode);
      return true;
    }

    function syncInlineLobbyTabState() {
      if (!isHomeRoutePath()) {
        return;
      }
      var mode = normalizeLobbyMode(HOME_INLINE_LOBBY_ACTIVE_MODE) || parseLobbyModeFromLocation() || DEFAULT_HOME_INLINE_LOBBY_MODE;
      updateHomeLobbyTabActive(mode);
    }

    function enforceExpLabels() {
      var nodes = document.querySelectorAll(".user-balance div, .user-balance span, .user-details .user-balance div");
      for (var i = 0; i < nodes.length; i += 1) {
        var node = nodes[i];
        if (!node || (node.children && node.children.length)) {
          continue;
        }
        var text = String(node.textContent || "");
        if (!text) {
          continue;
        }
        var next = text.replace(/^(\s*)exposure\s*:/i, "$1EXP:").replace(/^(\s*)exp\s*:/i, "$1EXP:");
        if (next !== text) {
          node.textContent = next;
        }
      }

      // Force balance sync from storage if UI shows 0
      try {
        var balanceValNodes = document.querySelectorAll(".local-balance-val, .user-balance b, .user-balance strong");
        var needsSync = false;
        for (var j = 0; j < balanceValNodes.length; j += 1) {
          var bNode = balanceValNodes[j];
          var bText = String(bNode.textContent || "").trim();
          if (bText === "0" || bText === "0.00") {
            needsSync = true;
            break;
          }
        }
        if (needsSync) {
          var snapshot = readPersistWalletSnapshot();
          if (snapshot && snapshot.balance > 0) {
            patchHeaderWallet(snapshot.balance, snapshot.exposure, snapshot.name, snapshot.available);
          }
        }
      } catch (_e) { }
    }

    var lastSweepAt = 0;
    var SWEEP_MIN_INTERVAL_MS = 900;

    function markUnavailableOddsMarkets() {
      var markets = document.querySelectorAll(".game-market");
      for (var i = 0; i < markets.length; i++) {
        var market = markets[i];
        var titleNode = market.querySelector(".market-title");
        var title = normalizeText(titleNode ? titleNode.textContent || "" : "");
        if (/\(odds unavailable\)/i.test(title)) {
          market.setAttribute("data-local-odds-unavailable", "1");
          market.setAttribute("aria-disabled", "true");
        } else {
          market.removeAttribute("data-local-odds-unavailable");
          market.removeAttribute("aria-disabled");
        }
      }
    }

    function syncGameDetailMarketPnl() {
      markUnavailableOddsMarkets();
      syncGameDetailMarketPnlWithHelpers(fetchOpenBetsForExp, normalizeOpenBetsRows, normalizeText);
    }

    window.setInterval(syncGameDetailMarketPnl, 5000);
    setTimeout(syncGameDetailMarketPnl, 1500);

    function runSweep(forceHomeWork) {
      enforceMobileHeaderLayout();
      stripLotteryMenuEntries();
      ensureUserUiVisible();
      removeInjectedFallbackUserMenus();
      annotateExpTriggers();
      enforceExpLabels();
      repairVisibleMojibakeText(document.body);

      // Always sync legacy market/sidebar rows if present
      syncLegacyMyMarketRows(Boolean(forceHomeWork));

      // Sync market PNL on match pages
      syncGameDetailMarketPnl();

      if (!isHomeRoutePath()) {
        return;
      }
      ensureInlineLobbyHomeState(Boolean(forceHomeWork));
      syncInlineLobbyTabState();
      dedupeCasinoCards();
      collapseRepeatedHomeSections();
    }

    function scheduleSweep(priority) {
      var now = Date.now();
      var elapsed = now - lastSweepAt;
      var minDelay = priority ? 80 : 120;
      var wait = Math.max(minDelay, SWEEP_MIN_INTERVAL_MS - elapsed);
      clearTimeout(dedupeTimer);
      dedupeTimer = setTimeout(function () {
        lastSweepAt = Date.now();
        runSweep(Boolean(priority));
      }, wait);
    }

    function nodeLooksSweepRelevant(node) {
      if (!node || node.nodeType !== 1) {
        return false;
      }
      if (
        node.matches &&
        node.matches(
          ".header-top, .user-details, .user-balance, .dropdown-menu, .news, .casino-list, .casino-list-item, .casino-tab, .casino-tab-list, .home-page, .center-main-container"
        )
      ) {
        return true;
      }
      if (
        node.closest &&
        node.closest(
          ".header-top, .user-details, .user-balance, .dropdown-menu, .news, .casino-list, .casino-list-item, .casino-tab, .casino-tab-list, .home-page, .center-main-container"
        )
      ) {
        return true;
      }
      return false;
    }

    function mutationLooksSweepRelevant(mutation) {
      if (!mutation) {
        return false;
      }
      if (mutation.type === "attributes") {
        return nodeLooksSweepRelevant(mutation.target);
      }
      var added = mutation.addedNodes || [];
      for (var i = 0; i < added.length; i += 1) {
        if (nodeLooksSweepRelevant(added[i])) {
          return true;
        }
      }
      return false;
    }

    if (typeof window.fetch === "function" && !window.__LOCAL_CASINO_FETCH_DEDUPE_INSTALLED__) {
      window.__LOCAL_CASINO_FETCH_DEDUPE_INSTALLED__ = true;
      var nativeFetch = window.fetch.bind(window);
      var inFlight = new Map();
      var recent = new Map();
      var TRACKED_ENDPOINTS = new Set([
        "/api/front/casino/tablelist",
        "/api/front/get_casino_table_list",
        "/api/front/casino/data2",
        "/api/front/vcasino/data2",
        "/api/front/casino/tabdata",
        "/api/front/casino/tablist",
        "/api/front/get_casino_tab_list",
        "/api/front/casino/alllist",
        "/api/front/get_casino_list"
      ]);

      function normalizeEndpoint(rawUrl) {
        if (!rawUrl) {
          return "";
        }
        try {
          return String(new URL(String(rawUrl), window.location.origin).pathname || "")
            .trim()
            .toLowerCase();
        } catch (_error) {
          return "";
        }
      }

      function bodyToKey(body) {
        if (body == null) {
          return "";
        }
        if (typeof body === "string") {
          return body.slice(0, 2048);
        }
        if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) {
          return body.toString().slice(0, 2048);
        }
        if (typeof FormData !== "undefined" && body instanceof FormData) {
          var chunks = [];
          body.forEach(function (value, key) {
            chunks.push(String(key) + "=" + String(value));
          });
          return chunks.join("&").slice(0, 2048);
        }
        return String(body).slice(0, 2048);
      }

      window.fetch = function (input, init) {
        var rawUrl =
          typeof input === "string"
            ? input
            : input && typeof input.url === "string"
              ? input.url
              : "";
        var endpoint = normalizeEndpoint(rawUrl);
        var method = String((init && init.method) || (input && input.method) || "GET").toUpperCase();
        if (!TRACKED_ENDPOINTS.has(endpoint) || (method !== "GET" && method !== "POST")) {
          return nativeFetch(input, init);
        }

        var requestBody =
          init && Object.prototype.hasOwnProperty.call(init, "body") ? init.body : input && input.body;
        var dedupeKey = method + "|" + endpoint + "|" + (method === "GET" ? "" : bodyToKey(requestBody));
        var now = Date.now();

        var cached = recent.get(dedupeKey);
        if (cached && now - Number(cached.at || 0) < CASINO_REQUEST_RECENT_TTL_MS && cached.response) {
          try {
            return Promise.resolve(cached.response.clone());
          } catch (_cacheCloneErr) { }
        }

        if (inFlight.has(dedupeKey)) {
          return inFlight.get(dedupeKey).then(function (response) {
            try {
              return response.clone();
            } catch (_inflightCloneErr) {
              return response;
            }
          });
        }

        pendingCasinoRequests += 1;
        updateCasinoStatus("loading");

        var fetchPromise = nativeFetch(input, init)
          .then(function (response) {
            if (!response || !response.ok) {
              lastCasinoErrorAt = Date.now();
            }
            try {
              if (response && response.ok) {
                recent.set(dedupeKey, {
                  at: Date.now(),
                  response: response.clone()
                });
                if (recent.size > 32) {
                  var oldestKey = recent.keys().next().value;
                  if (oldestKey) {
                    recent.delete(oldestKey);
                  }
                }
              }
            } catch (_cloneErr) { }
            return response;
          })
          .catch(function (error) {
            lastCasinoErrorAt = Date.now();
            throw error;
          })
          .finally(function () {
            inFlight.delete(dedupeKey);
            pendingCasinoRequests = Math.max(0, pendingCasinoRequests - 1);
            if (pendingCasinoRequests > 0) {
              updateCasinoStatus("loading");
            } else if (Date.now() - lastCasinoErrorAt < 3000) {
              updateCasinoStatus("error");
            } else {
              updateCasinoStatus("idle");
            }
          });

        inFlight.set(dedupeKey, fetchPromise);
        return fetchPromise.then(function (response) {
          try {
            return response.clone();
          } catch (_responseCloneErr) {
            return response;
          }
        });
      };

      ensureStyle();
      runSweep(true);

      document.addEventListener(
        "click",
        function (event) {
          if (tryHandleInlineLobbyTabClick(event)) {
            return;
          }
          if (tryHandleExpClick(event)) {
            return;
          }
          if (toggleDropdownFromTarget(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          if (
            event.target &&
            event.target.closest &&
            event.target.closest(".user-details .dropdown, .user-menu, .user-dropdown, .user-balance .dropdown")
          ) {
            return;
          }
          closeAllUserDropdowns(null);
        },
        true
      );

      window.addEventListener("resize", function () {
        scheduleSweep(false);
      });
      document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
          scheduleSweep(true);
        }
      });
      document.addEventListener("keydown", function (event) {
        if (event && event.key === "Escape") {
          closeExpMarketModal();
        }
      });
      window.addEventListener("pageshow", function () {
        scheduleSweep(true);
      });
      window.addEventListener("popstate", function () {
        scheduleSweep(true);
      });

      if (window.MutationObserver && document.body) {
        var observer = new MutationObserver(function (mutations) {
          if (document.hidden) {
            return;
          }
          for (var i = 0; i < mutations.length; i += 1) {
            if (!mutationLooksSweepRelevant(mutations[i])) {
              continue;
            }
            scheduleSweep(false);
            return;
          }
        });
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "style"]
        });
      }

      window.setInterval(function () {
        if (document.hidden) {
          return;
        }
        scheduleSweep(false);
      }, 12000);
    }
  }

  installLocalApiAuthBridge();

  function scheduleNonCriticalInstall(task, timeoutMs) {
    if (typeof task !== "function") {
      return;
    }
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(
        function () {
          try {
            task();
          } catch (_error) {
          }
        },
        { timeout: Math.max(80, Number(timeoutMs || 0)) }
      );
      return;
    }
    setTimeout(function () {
      try {
        task();
      } catch (_error) {
      }
    }, 0);
  }

  function installDeferredRuntimeFixes() {
    scheduleNonCriticalInstall(installLocalDemoLogin, 120);
    scheduleNonCriticalInstall(installLocalPaymentUi, 150);
    scheduleNonCriticalInstall(installLocalWalletSync, 220);
    scheduleNonCriticalInstall(installLocalHomeCardImageFix, 280);
    scheduleNonCriticalInstall(installMobileUiSafetyFixes, 340);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installDeferredRuntimeFixes, { once: true });
  } else {
    installDeferredRuntimeFixes();
  }
})();
