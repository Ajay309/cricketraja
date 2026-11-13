(function () {
  if (window.__LOCAL_RUNTIME_FIXES_INSTALLED__) {
    return;
  }
  window.__LOCAL_RUNTIME_FIXES_INSTALLED__ = true;

  var MIRRORED_HOSTS = new Set([
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

  var AUTH_REQUIRED_ENDPOINTS = new Set([
    "/api/front/userdata",
    "/api/front/local-userdata",
    "/api/front/userdata-plain",
    "/api/front/placebet",
    "/api/front/placebetbadla",
    "/api/front/placebetcasino",
    "/api/front/balance",
    "/api/front/mybet",
    "/api/front/open_bets",
    "/api/front/get_open_bets",
    "/api/front/statement",
    "/api/front/profitloss",
    "/api/front/book",
    "/api/front/casino/book",
    "/api/front/vcasino/book",
    "/api/front/casino/launch",
    "/api/front/casino/launchother",
    "/api/front/casino/tablelist"
  ]);

  var HOME_GAME_IMAGE_ORDER = Array.isArray(window.__LOCAL_HOME_GAME_IMAGE_ORDER__)
    ? window.__LOCAL_HOME_GAME_IMAGE_ORDER__.slice()
    : [];
  var ENABLE_HOME_IMAGE_FALLBACK_ORDER = false;
  var HOME_MAC88_PROVIDER_TOKEN = "mac88";
  var HOME_MAC88_GAME_MIN = 30;
  var HOME_MAC88_GAME_MAX = 35;
  var ENABLE_HOME_API_GAME_LIMIT = false;
  var HOME_MAC88_REFRESH_MS = Math.max(
    10000,
    Number(window.__LOCAL_HOME_MAC88_REFRESH_MS || 45000)
  );
  var WALLET_SYNC_INTERVAL_MS = Math.max(
    1500,
    Number(window.__LOCAL_WALLET_SYNC_INTERVAL_MS || 2500)
  );
  var UI_SWEEP_INTERVAL_MS = Math.max(
    700,
    Number(window.__LOCAL_UI_SWEEP_INTERVAL_MS || 900)
  );
  var BRANDING_SWEEP_INTERVAL_MS = Math.max(
    10000,
    Number(window.__LOCAL_BRANDING_SWEEP_MS || 20000)
  );
  var WHITE_SCREEN_GUARD_DELAY_MS = Math.max(
    8000,
    Number(window.__LOCAL_WHITE_SCREEN_GUARD_DELAY_MS || 12000)
  );
  var EXTERNAL_NAV_ALLOWED_HOST_SUFFIXES = [
    "allpanelexch.com",
    "allpanelexch9.co",
    "diamondexch99.now",
    "diamondexch99.now",
    "sportsscore24.com",
    "11xplay.global",
    "supabase.co",
    "ecoassetsservice.com",
    "sprintstaticdata.com",
    "sitethemedata.com",
    "jsdelivr.net",
    "cloudflare.com",
    "jquery.com",
    "gstatic.com",
    "google.com"
  ];
  var walletSyncInFlight = false;
  var lastWalletStamp = "";
  var lastBrandingSweepAt = 0;
  var lastBrandingSweepPath = "";
  var homeMac88SelectionIndices = null;
  var homeMac88SelectionIds = null;
  var homeMac88SelectionReady = false;
  var homeMac88SelectionInFlight = false;
  var homeMac88SelectionUpdatedAt = 0;
  var whiteScreenGuardStartedAt = Date.now();
  var viewportResizeTimer = null;
  var BRAND_TEXT = "CRICKETRAJA";
  var BRAND_LOGO_PATH = "https://sitethemedata.com/sitethemes/diamondexch99.com/front/logo.png";

  function parseJsonSafe(value, fallback) {
    if (!value || typeof value !== "string") {
      return fallback || {};
    }
    try {
      var parsed = JSON.parse(value);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
      return fallback || {};
    } catch (_error) {
      return fallback || {};
    }
  }

  function normalizeLegacyToken(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  function normalizeApiStem(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string") {
      return "";
    }
    try {
      return new URL(rawUrl, window.location.origin).pathname.toLowerCase();
    } catch (_error) {
      return "";
    }
  }

  function isHostnameAllowed(hostname) {
    var normalizedHost = String(hostname || "")
      .trim()
      .toLowerCase();
    if (!normalizedHost) {
      return false;
    }
    if (
      normalizedHost === String(window.location.hostname || "").toLowerCase() ||
      normalizedHost === "localhost" ||
      normalizedHost === "127.0.0.1"
    ) {
      return true;
    }
    for (var i = 0; i < EXTERNAL_NAV_ALLOWED_HOST_SUFFIXES.length; i += 1) {
      var suffix = EXTERNAL_NAV_ALLOWED_HOST_SUFFIXES[i];
      if (
        normalizedHost === suffix ||
        normalizedHost.lastIndexOf("." + suffix) === normalizedHost.length - suffix.length - 1
      ) {
        return true;
      }
    }
    return false;
  }

  function shouldAllowExternalNavigation(rawUrl) {
    var value = String(rawUrl || "").trim();
    if (!value) {
      return true;
    }
    var lowered = value.toLowerCase();
    if (lowered === "about:blank" || lowered.indexOf("javascript:") === 0) {
      return true;
    }
    try {
      var parsed = new URL(value, window.location.origin);
      var protocol = String(parsed.protocol || "").toLowerCase();
      if (protocol && protocol !== "http:" && protocol !== "https:") {
        return true;
      }
      if (parsed.origin === window.location.origin) {
        return true;
      }
      return isHostnameAllowed(parsed.hostname);
    } catch (_error) {
      return true;
    }
  }

  function sanitizeToken(value) {
    var raw = String(value == null ? "" : value).trim();
    if (!raw) {
      return "";
    }
    if (/^bearer\s+/i.test(raw)) {
      raw = raw.replace(/^bearer\s+/i, "").trim();
    }
    try {
      var parsed = JSON.parse(raw);
      if (typeof parsed === "string") {
        raw = parsed;
      }
    } catch (_error) { }
    return String(raw || "").replace(/^"+|"+$/g, "").trim();
  }

  function getPersistRoot() {
    return parseJsonSafe(localStorage.getItem("persist:root") || "{}", {});
  }

  function getIdentity() {
    var root = getPersistRoot();
    var token = sanitizeToken(root.token || "");
    var data = parseJsonSafe(root.data || "{}", {});
    var auth = parseJsonSafe(root.auth || "{}", {});
    var user = parseJsonSafe(root.user || "{}", {});
    var userData = parseJsonSafe(user.data || "{}", {});

    var username = String(
      data.uname ||
      data.username ||
      data.user_name ||
      auth.uname ||
      auth.username ||
      auth.user_name ||
      userData.uname ||
      userData.username ||
      userData.user_name ||
      ""
    )
      .trim()
      .toLowerCase();

    if (!token) {
      token = sanitizeToken(
        data.token ||
        data.auth ||
        auth.token ||
        auth.auth ||
        userData.token ||
        userData.auth ||
        ""
      );
    }

    return {
      token: token,
      username: username
    };
  }

  function shouldSwapLogoSrc(srcValue) {
    var source = String(srcValue || "").trim().toLowerCase();
    if (!source || source.indexOf("logo") === -1) {
      return false;
    }
    if (source.indexOf("front/logo.png") >= 0) {
      return true;
    }
    if (
      source.indexOf("diamondexch") >= 0 ||
      source.indexOf("diamondexch") >= 0 ||
      source.indexOf("allpanelex") >= 0
    ) {
      return true;
    }
    if (source.indexOf("/assets/images/logo.webp") >= 0 || source.indexOf("/logo.webp") >= 0) {
      return true;
    }
    return false;
  }

  function enforceBranding(rootNode) {
    var scope = rootNode && rootNode.querySelectorAll ? rootNode : document;
    if (!scope || !scope.querySelectorAll) {
      return;
    }

    if (typeof window.LOGO_PATH === "string") {
      window.LOGO_PATH = BRAND_LOGO_PATH;
    }
    if (typeof window.LOGO_PATH_LOGIN === "string") {
      window.LOGO_PATH_LOGIN = BRAND_LOGO_PATH;
    }
    if (typeof document.title === "string" && /(diamondexch|diamondexch)/gi.test(document.title)) {
      document.title = document.title.replace(/diamondexch|diamondexch/gi, BRAND_TEXT);
    }

    var logoNodes = scope.querySelectorAll("img[src*='logo'], .logo img, .logo-header img, .header-logo img");
    for (var i = 0; i < logoNodes.length; i += 1) {
      var img = logoNodes[i];
      if (!img || typeof img.getAttribute !== "function" || typeof img.setAttribute !== "function") {
        continue;
      }
      var src = img.getAttribute("src") || "";
      var inHeader =
        !!img.closest &&
        !!img.closest(".header, .header-top, .logo, .logo-header, .header-logo, .top-header, .navbar");
      if (inHeader || shouldSwapLogoSrc(src)) {
        img.setAttribute("src", BRAND_LOGO_PATH);
      }
      var altText = String(img.getAttribute("alt") || "");
      if (/(diamondexch|diamondexch)/gi.test(altText)) {
        img.setAttribute("alt", altText.replace(/diamondexch|diamondexch/gi, BRAND_TEXT));
      }
    }

    var textNodes = scope.querySelectorAll("a, span, div, p, strong, b, h1, h2, h3, h4, h5, title");
    for (var j = 0; j < textNodes.length; j += 1) {
      var node = textNodes[j];
      if (!node || node.children.length > 0) {
        continue;
      }
      var value = String(node.textContent || "");
      if (!value || !/(diamondexch|diamondexch)/gi.test(value)) {
        continue;
      }
      node.textContent = value.replace(/diamondexch|diamondexch/gi, BRAND_TEXT);
    }
  }

  function maybeEnforceBranding(rootNode, force) {
    var now = Date.now();
    var currentPath = String((window.location && window.location.pathname) || "").toLowerCase();
    if (!force) {
      if (currentPath === lastBrandingSweepPath && now - lastBrandingSweepAt < BRANDING_SWEEP_INTERVAL_MS) {
        return;
      }
    }
    lastBrandingSweepAt = now;
    lastBrandingSweepPath = currentPath;
    enforceBranding(rootNode);
  }

  function installExternalNavigationGuard() {
    if (window.__LOCAL_EXTERNAL_NAV_GUARD_INSTALLED__) {
      return;
    }
    window.__LOCAL_EXTERNAL_NAV_GUARD_INSTALLED__ = true;

    var nativeOpen = typeof window.open === "function" ? window.open.bind(window) : null;
    if (nativeOpen) {
      window.open = function guardedWindowOpen(url, target, features) {
        if (!shouldAllowExternalNavigation(url)) {
          return null;
        }
        return nativeOpen(url, target, features);
      };
    }

    try {
      var nativeAssign = window.location.assign.bind(window.location);
      window.location.assign = function guardedLocationAssign(nextUrl) {
        if (!shouldAllowExternalNavigation(nextUrl)) {
          return;
        }
        nativeAssign(nextUrl);
      };
    } catch (_error) { }

    try {
      var nativeReplace = window.location.replace.bind(window.location);
      window.location.replace = function guardedLocationReplace(nextUrl) {
        if (!shouldAllowExternalNavigation(nextUrl)) {
          return;
        }
        nativeReplace(nextUrl);
      };
    } catch (_error) { }

    document.addEventListener(
      "click",
      function (event) {
        var targetNode = event.target;
        if (!targetNode || !targetNode.closest) {
          return;
        }
        var anchor = targetNode.closest("a[href]");
        if (!anchor || typeof anchor.getAttribute !== "function") {
          return;
        }
        var href = String(anchor.getAttribute("href") || "").trim();
        if (!href) {
          return;
        }
        if (shouldAllowExternalNavigation(href)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );
  }

  function installWhiteScreenRecovery() {
    if (window.__LOCAL_WHITE_SCREEN_GUARD_INSTALLED__) {
      return;
    }
    window.__LOCAL_WHITE_SCREEN_GUARD_INSTALLED__ = true;
    whiteScreenGuardStartedAt = Date.now();

    window.setInterval(function () {
      if (!isDocumentVisible() || !window.location) {
        return;
      }
      if (Date.now() - whiteScreenGuardStartedAt < WHITE_SCREEN_GUARD_DELAY_MS) {
        return;
      }
      var pathname = String(window.location.pathname || "").toLowerCase();
      if (!pathname || pathname === "/" || pathname.indexOf("/admin") === 0) {
        return;
      }
      var root = document.getElementById("root");
      if (!root) {
        return;
      }
      var hasRootContent = root.children && root.children.length > 0;
      var bodyText = String((document.body && document.body.textContent) || "").trim();
      if (hasRootContent || bodyText.length > 32) {
        return;
      }
      var lockKey = "local_white_screen_guard_reloaded_" + pathname;
      try {
        if (sessionStorage.getItem(lockKey) === "1") {
          return;
        }
        sessionStorage.setItem(lockKey, "1");
      } catch (_storageError) { }
      window.location.reload();
    }, 8000);
  }

  function resolveCurrentWalletAmount() {
    var root = getPersistRoot();
    var data = parseJsonSafe(root.data || "{}", {});
    var auth = parseJsonSafe(root.auth || "{}", {});
    var user = parseJsonSafe(root.user || "{}", {});
    var userData = parseJsonSafe(user.data || "{}", {});
    var rawValue =
      data.bal != null
        ? data.bal
        : data.balance != null
          ? data.balance
          : auth.bal != null
            ? auth.bal
            : auth.balance != null
              ? auth.balance
              : userData.bal != null
                ? userData.bal
                : userData.balance;
    var value = Number(rawValue);
    if (!Number.isFinite(value) || value < 0) {
      return Number.NaN;
    }
    return value;
  }

  function resolveExposureValue(rawObject) {
    if (!rawObject || typeof rawObject !== "object") {
      return "";
    }
    var exposureKeys = [
      "exp",
      "exposure",
      "exposure_value",
      "exposureValue",
      "expo",
      "exposure_amt",
      "exposureAmt"
    ];
    for (var i = 0; i < exposureKeys.length; i += 1) {
      var key = exposureKeys[i];
      var value = rawObject[key];
      if (value != null && String(value).trim() !== "") {
        return value;
      }
    }
    return "";
  }

  function formatHeaderAmount(value, fallbackText) {
    var parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed.toFixed(2);
    }
    var raw = value != null ? String(value).trim() : "";
    return raw || fallbackText;
  }

  function normalizeExposureDisplayValue(value) {
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
    if (parsed > 0) {
      parsed = -parsed;
    }
    return Number(parsed.toFixed(2));
  }

  function computeAvailableBalanceValue(balance, exposureDisplay) {
    var balanceNumber = Number(balance);
    var exposureNumber = Number(exposureDisplay);
    if (!Number.isFinite(balanceNumber)) {
      return Number.NaN;
    }
    if (!Number.isFinite(exposureNumber)) {
      exposureNumber = 0;
    }
    return Number((balanceNumber + exposureNumber).toFixed(2));
  }

  function injectIdentityIntoObject(obj, identity) {
    var payload = obj && typeof obj === "object" ? Object.assign({}, obj) : {};
    if (identity.username) {
      if (!payload.uname) {
        payload.uname = identity.username;
      }
      if (!payload.username) {
        payload.username = identity.username;
      }
      if (!payload.user_name) {
        payload.user_name = identity.username;
      }
      if (!payload.member_account) {
        payload.member_account = identity.username;
      }
    }
    if (identity.token) {
      if (!payload.token) {
        payload.token = identity.token;
      }
      if (!payload.auth) {
        payload.auth = identity.token;
      }
      if (!payload.access_token) {
        payload.access_token = identity.token;
      }
    }
    return payload;
  }

  function injectIdentityIntoBody(body, contentType, identity) {
    if (body == null || body === "") {
      var next = injectIdentityIntoObject({}, identity);
      if (String(contentType || "").toLowerCase().indexOf("application/x-www-form-urlencoded") >= 0) {
        return new URLSearchParams(next).toString();
      }
      return JSON.stringify(next);
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
          return JSON.stringify(injectIdentityIntoObject(JSON.parse(text), identity));
        } catch (_error) {
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

  function buildHeaders(baseHeaders, identity) {
    var headers = new Headers(baseHeaders || {});
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

  function isDocumentVisible() {
    return !document.hidden;
  }

  function updateViewportHeightVariable() {
    if (!document.documentElement || typeof window.innerHeight !== "number") {
      return;
    }
    var vh = Math.max(1, window.innerHeight * 0.01);
    document.documentElement.style.setProperty("--app-vh", vh + "px");
  }

  function installViewportHeightFix() {
    if (window.__LOCAL_VIEWPORT_FIX_INSTALLED__) {
      return;
    }
    window.__LOCAL_VIEWPORT_FIX_INSTALLED__ = true;
    updateViewportHeightVariable();
    window.addEventListener("resize", function () {
      if (viewportResizeTimer) {
        window.clearTimeout(viewportResizeTimer);
      }
      viewportResizeTimer = window.setTimeout(updateViewportHeightVariable, 120);
    });
    window.addEventListener("orientationchange", function () {
      window.setTimeout(updateViewportHeightVariable, 200);
    });
  }

  function optimizeMediaElements(rootNode) {
    if (!rootNode) {
      return;
    }

    var nodes = [];
    if (rootNode.nodeType === 1 && rootNode.matches && rootNode.matches("img,iframe")) {
      nodes.push(rootNode);
    }
    if (rootNode.querySelectorAll) {
      var found = rootNode.querySelectorAll("img,iframe");
      for (var i = 0; i < found.length; i += 1) {
        nodes.push(found[i]);
      }
    }

    for (var j = 0; j < nodes.length; j += 1) {
      var node = nodes[j];
      if (!node || !node.tagName) {
        continue;
      }
      var tag = String(node.tagName || "").toLowerCase();
      if (tag === "img") {
        if (!node.getAttribute("decoding")) {
          node.setAttribute("decoding", "async");
        }
        if (
          !node.getAttribute("loading") &&
          !node.closest(".header-top, .header, .logo-header, .logo")
        ) {
          node.setAttribute("loading", "lazy");
        }
      } else if (tag === "iframe") {
        if (!node.getAttribute("loading")) {
          node.setAttribute("loading", "lazy");
        }
      }
    }
  }

  function shouldPatchEndpoint(stem) {
    return AUTH_REQUIRED_ENDPOINTS.has(stem);
  }

  function installApiAuthBridge() {
    if (window.__LOCAL_API_AUTH_BRIDGE_INSTALLED__) {
      return;
    }
    window.__LOCAL_API_AUTH_BRIDGE_INSTALLED__ = true;

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
        var body = Object.prototype.hasOwnProperty.call(nextInit, "body") ? nextInit.body : null;

        if (method !== "GET" && method !== "HEAD") {
          if (!body && input && typeof input === "object" && typeof input.text === "function") {
            body = null;
          }
          body = injectIdentityIntoBody(body, contentType, identity);
          if (
            body != null &&
            typeof body === "string" &&
            String(headers.get("Content-Type") || "").trim() === ""
          ) {
            headers.set("Content-Type", "application/json");
          }
          nextInit.body = body;
        }

        nextInit.headers = headers;
        nextInit.method = method;
        if (input && typeof input === "object" && typeof input.url === "string") {
          input = rawUrl;
        }
        return nativeFetch(input, nextInit);
      };
    }

    if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
      var nativeOpen = window.XMLHttpRequest.prototype.open;
      var nativeSetRequestHeader = window.XMLHttpRequest.prototype.setRequestHeader;
      var nativeSend = window.XMLHttpRequest.prototype.send;

      window.XMLHttpRequest.prototype.open = function (method, url) {
        this.__localAuthMethod = String(method || "GET").toUpperCase();
        this.__localAuthUrl = String(url || "");
        this.__localAuthStem = normalizeApiStem(this.__localAuthUrl);
        this.__localAuthPatch = shouldPatchEndpoint(this.__localAuthStem);
        this.__localAuthHeaders = {};
        return nativeOpen.apply(this, arguments);
      };

      window.XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        this.__localAuthHeaders = this.__localAuthHeaders || {};
        this.__localAuthHeaders[String(name || "").toLowerCase()] = String(value || "");
        return nativeSetRequestHeader.apply(this, arguments);
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
          } catch (_error) { }
        }
        if (identity.token && !headers["x-access-token"]) {
          try {
            this.setRequestHeader("x-access-token", identity.token);
            headers["x-access-token"] = identity.token;
          } catch (_error) { }
        }
        if (identity.token && !headers["x-auth-token"]) {
          try {
            this.setRequestHeader("x-auth-token", identity.token);
            headers["x-auth-token"] = identity.token;
          } catch (_error) { }
        }
        if (identity.username && !headers["x-user-name"]) {
          try {
            this.setRequestHeader("x-user-name", identity.username);
            headers["x-user-name"] = identity.username;
          } catch (_error) { }
        }

        var method = String(this.__localAuthMethod || "GET").toUpperCase();
        if (method !== "GET" && method !== "HEAD") {
          var contentType = headers["content-type"] || "";
          body = injectIdentityIntoBody(body, contentType, identity);
          if (
            typeof body === "string" &&
            String(contentType || "").trim() === ""
          ) {
            try {
              this.setRequestHeader("Content-Type", "application/json");
              headers["content-type"] = "application/json";
            } catch (_error) { }
          }
        }
        return nativeSend.call(this, body);
      };
    }
  }

  function toLocalMirrorUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string") {
      return rawUrl;
    }
    var value = String(rawUrl || "").trim();
    if (!value || value.indexOf("data:") === 0 || value.indexOf("blob:") === 0) {
      return rawUrl;
    }
    try {
      var parsed = new URL(value, window.location.origin);
      var host = String(parsed.hostname || "").toLowerCase();
      if (!MIRRORED_HOSTS.has(host)) {
        return rawUrl;
      }
      return "/" + host + parsed.pathname + parsed.search + parsed.hash;
    } catch (_error) {
      return rawUrl;
    }
  }

  function rewriteSrcSet(value) {
    var raw = String(value || "").trim();
    if (!raw) {
      return value;
    }
    return raw
      .split(",")
      .map(function (part) {
        var item = String(part || "").trim();
        if (!item) {
          return item;
        }
        var chunks = item.split(/\s+/);
        var urlPart = chunks.shift() || "";
        var descriptor = chunks.join(" ");
        var localUrl = toLocalMirrorUrl(urlPart);
        return descriptor ? localUrl + " " + descriptor : localUrl;
      })
      .join(", ");
  }

  function rewriteStyleUrls(value) {
    var raw = String(value || "");
    if (!raw) {
      return value;
    }
    if (raw.indexOf("http") === -1 && raw.indexOf("//") === -1) {
      return value;
    }

    var rewritten = raw.replace(
      /https?:\/\/([a-z0-9.-]+)(\/[^"')\s]*)/gi,
      function (match, host, restPath) {
        var normalizedHost = String(host || "").toLowerCase();
        if (!MIRRORED_HOSTS.has(normalizedHost)) {
          return match;
        }
        return "/" + normalizedHost + String(restPath || "");
      }
    );

    rewritten = rewritten.replace(
      /\/\/([a-z0-9.-]+)(\/[^"')\s]*)/gi,
      function (match, host, restPath) {
        var normalizedHost = String(host || "").toLowerCase();
        if (!MIRRORED_HOSTS.has(normalizedHost)) {
          return match;
        }
        return "/" + normalizedHost + String(restPath || "");
      }
    );

    return rewritten;
  }

  function rewriteElementSource(el, attr) {
    if (!el || !attr || typeof el.getAttribute !== "function" || typeof el.setAttribute !== "function") {
      return;
    }
    var current = el.getAttribute(attr);
    if (!current) {
      return;
    }
    if (
      (attr === "href" || attr === "src") &&
      current.indexOf("http://") !== 0 &&
      current.indexOf("https://") !== 0 &&
      current.indexOf("//") !== 0
    ) {
      return;
    }
    if (attr === "style" && current.indexOf("http") === -1 && current.indexOf("//") === -1) {
      return;
    }
    var next;
    if (attr === "srcset") {
      next = rewriteSrcSet(current);
    } else if (attr === "style") {
      next = rewriteStyleUrls(current);
    } else {
      next = toLocalMirrorUrl(current);
    }
    if (next && next !== current) {
      el.setAttribute(attr, next);
    }
  }

  function rewriteSourcesInTree(rootNode) {
    if (!rootNode) {
      return;
    }
    if (rootNode.nodeType === 1) {
      rewriteElementSource(rootNode, "src");
      rewriteElementSource(rootNode, "srcset");
      rewriteElementSource(rootNode, "href");
      rewriteElementSource(rootNode, "style");
    }
    if (!rootNode.querySelectorAll) {
      return;
    }
    var nodes = rootNode.querySelectorAll("[src],[srcset],[href],[style]");
    for (var index = 0; index < nodes.length; index += 1) {
      var node = nodes[index];
      rewriteElementSource(node, "src");
      rewriteElementSource(node, "srcset");
      rewriteElementSource(node, "href");
      rewriteElementSource(node, "style");
    }
    optimizeMediaElements(rootNode);
  }

  function installSourceRewrite() {
    if (window.__LOCAL_SOURCE_REWRITE_INSTALLED__) {
      return;
    }
    window.__LOCAL_SOURCE_REWRITE_INSTALLED__ = true;
    rewriteSourcesInTree(document.documentElement);

    if (!window.MutationObserver || !document.documentElement) {
      return;
    }
    var pendingMutations = [];
    var scheduled = false;
    var scheduleFlush =
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : function (callback) {
          return window.setTimeout(callback, 16);
        };

    function flushMutations() {
      scheduled = false;
      var queue = pendingMutations.splice(0, pendingMutations.length);
      for (var i = 0; i < queue.length; i += 1) {
        var mutation = queue[i];
        if (mutation.type === "attributes") {
          rewriteElementSource(mutation.target, mutation.attributeName);
          continue;
        }
        if (mutation.addedNodes && mutation.addedNodes.length) {
          for (var j = 0; j < mutation.addedNodes.length; j += 1) {
            rewriteSourcesInTree(mutation.addedNodes[j]);
          }
        }
      }
    }

    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i += 1) {
        pendingMutations.push(mutations[i]);
      }
      if (!scheduled) {
        scheduled = true;
        scheduleFlush(flushMutations);
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["src", "srcset", "style"]
    });
  }

  function getCasinoRouteInfo(pathname) {
    var match = String(pathname || "").match(/^\/casino\/([a-z0-9_-]+)$/i);
    if (!match || !match[1]) {
      return null;
    }
    var routeId = String(match[1] || "").trim();
    if (!routeId) {
      return null;
    }
    var normalized = normalizeLegacyToken(routeId);
    if (!normalized || KNOWN_CASINO_ROUTE_IDS.has(normalized)) {
      return null;
    }
    return {
      routeId: routeId
    };
  }

  function toFallbackCasinoPath(routeId, currentUrl) {
    var urlObj = currentUrl ? new URL(currentUrl, window.location.origin) : new URL(window.location.href);
    var next = new URL(urlObj.toString());
    next.pathname = "/casino/superover2";
    if (!next.searchParams.get("gid")) {
      next.searchParams.set("gid", routeId);
    }
    return next.pathname + next.search + next.hash;
  }

  function installCasinoRouteFallback() {
    if (window.__LOCAL_CASINO_ROUTE_FALLBACK_INSTALLED__) {
      return;
    }
    window.__LOCAL_CASINO_ROUTE_FALLBACK_INSTALLED__ = true;

    function rewriteCurrentRoute() {
      var info = getCasinoRouteInfo(window.location.pathname || "");
      if (!info) {
        return;
      }
      var nextPath = toFallbackCasinoPath(info.routeId);
      if ((window.location.pathname + window.location.search + window.location.hash) !== nextPath) {
        window.history.replaceState(window.history.state || null, document.title || "", nextPath);
      }
    }

    rewriteCurrentRoute();

    if (window.history && typeof window.history.pushState === "function") {
      var nativePushState = window.history.pushState;
      window.history.pushState = function (state, title, url) {
        if (typeof url === "string") {
          try {
            var parsed = new URL(url, window.location.origin);
            var info = getCasinoRouteInfo(parsed.pathname);
            if (info) {
              url = toFallbackCasinoPath(info.routeId, parsed.toString());
            }
          } catch (_error) { }
        }
        return nativePushState.call(this, state, title, url);
      };
    }

    if (window.history && typeof window.history.replaceState === "function") {
      var nativeReplaceState = window.history.replaceState;
      window.history.replaceState = function (state, title, url) {
        if (typeof url === "string") {
          try {
            var parsed = new URL(url, window.location.origin);
            var info = getCasinoRouteInfo(parsed.pathname);
            if (info) {
              url = toFallbackCasinoPath(info.routeId, parsed.toString());
            }
          } catch (_error) { }
        }
        return nativeReplaceState.call(this, state, title, url);
      };
    }

    document.addEventListener(
      "click",
      function (event) {
        var anchor = event.target && event.target.closest ? event.target.closest("a[href]") : null;
        if (!anchor) {
          return;
        }
        var href = anchor.getAttribute("href") || "";
        if (!href || href.indexOf("/casino/") !== 0) {
          return;
        }
        var info = getCasinoRouteInfo(href.split("?")[0]);
        if (!info) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(toFallbackCasinoPath(info.routeId, href));
      },
      true
    );
  }

  function ensureUiHideStyle() {
    var styleId = "local-runtime-hide-style";
    if (document.getElementById(styleId)) {
      return;
    }
    var style = document.createElement("style");
    style.id = styleId;
    style.textContent = [
      "html, body { overflow-y: auto !important; max-width: 100%; overflow-x: hidden !important; -webkit-text-size-adjust: 100%; }",
      "body, #root, .wrapper { min-height: calc(var(--app-vh, 1vh) * 100); }",
      "*, *::before, *::after { box-sizing: border-box; }",
      "img, video, canvas, svg, iframe { max-width: 100%; height: auto; }",
      ".center-main-container, .home-page, .casino-list, .header, .header-top, .header-bottom, .news { max-width: 100% !important; }",
      ".casino-list-item-banner { background-size: cover !important; background-position: center center !important; background-repeat: no-repeat !important; }",
      ".user-details, .user-name, .user-menu, .user-dropdown { position: relative; z-index: 40; }",
      ".user-details .dropdown-menu, .user-menu .dropdown-menu, .user-dropdown .dropdown-menu { z-index: 1200 !important; right: 0 !important; left: auto !important; }",
      ".rules-modal, #rulesModal, .rules-popup, .download-apk, .rules-link { display: none !important; }",
      ".icon-tv, .fa-tv, .fa-television, #tvshow, #livetv, #tv-box-popup, .tv-box-popup, [onclick*='changetv'], [href*='gettv/'] { display: none !important; visibility: hidden !important; }",
      "",
      ".user-balance .dropdown, .user-balance .user-name, .user-balance .username { display: none !important; }",
      ".user-balance > div:nth-child(n+3), .local-runtime-available { display: none !important; }",
      "@media (max-width: 991.98px) {",
      "  body { font-size: 13px !important; }",
      "  .wrapper { min-width: 0 !important; width: 100% !important; }",
      "  .header-top { padding: 6px 8px !important; display: flex !important; align-items: center !important; flex-wrap: wrap !important; row-gap: 6px !important; }",
      "  .header-top, .header, .top-header { overflow: visible !important; }",
      "  .logo-header img, .logo img { max-height: 46px !important; width: auto !important; }",
      "  .user-details { margin-left: auto !important; display: flex !important; align-items: center !important; gap: 4px !important; flex-wrap: nowrap !important; justify-content: flex-end !important; }",
      "  .user-details { position: relative !important; z-index: 80 !important; pointer-events: auto !important; }",
      "  .user-details .dropdown-toggle, .user-name, .user-dropdown { display: inline-flex !important; align-items: center !important; visibility: visible !important; opacity: 1 !important; }",
      "  .user-details .dropdown-menu, .user-menu .dropdown-menu, .user-dropdown .dropdown-menu { position: absolute !important; right: 0 !important; left: auto !important; transform: none !important; z-index: 1300 !important; }",
      "",
      "  .user-balance .dropdown, .user-balance .user-name, .user-balance .username { display: none !important; }",
      "  .user-details[data-local-user-primary='1'] { flex-direction: column !important; align-items: flex-end !important; justify-content: center !important; text-align: right !important; gap: 2px !important; }",
      "  .user-details[data-local-user-primary='1'] .user-name, .user-details[data-local-user-primary='1'] .username { order: 1 !important; margin: 0 !important; }",
      "  .user-details[data-local-user-primary='1'] .user-balance { order: 2 !important; display: flex !important; flex-direction: column !important; align-items: flex-end !important; gap: 1px !important; }",
      "  [data-local-user-primary='0'] { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }",
      "  .user-balance, .user-name { font-size: 12px !important; line-height: 1.2 !important; margin: 0 !important; text-align: right !important; }",
      "  .news { min-height: 28px !important; height: auto !important; }",
      "  .news marquee, .news span { font-size: 11px !important; }",
      "  .center-main-container { width: 100% !important; padding: 0 4px !important; }",
      "  .casino-list { display: grid !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 2px !important; padding: 0 !important; margin-top: 6px !important; }",
      "  .casino-list-item { width: 100% !important; min-width: 0 !important; height: auto !important; margin: 0 !important; }",
      "  .casino-list-item-banner { width: 100% !important; height: 86px !important; min-height: 86px !important; }",
      "  .casino-list-name { font-size: 8px !important; line-height: 1.1 !important; min-height: 16px !important; padding: 2px 1px !important; font-weight: 700 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }",
      "  .table-responsive, .bet-table, .market-table, .bet-table-wrap { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }",
      "  .table-responsive table, .bet-table table, .market-table table { display: block !important; min-width: 640px !important; white-space: nowrap !important; }",
      "}",
      "@media (max-width: 575.98px) {",
      "  .casino-list-item-banner { height: 78px !important; min-height: 78px !important; }",
      "  .casino-list-name { font-size: 7px !important; min-height: 14px !important; padding: 2px 1px !important; }",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function unlockPageScroll() {
    var body = document.body;
    var html = document.documentElement;
    if (!body || !html) {
      return;
    }

    body.classList.remove("modal-open");
    body.classList.remove("local-payment-lock");
    body.classList.remove("swal2-shown");
    body.classList.remove("swal2-height-auto");
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    body.style.maxHeight = "";
    body.style.overflow = "auto";
    body.style.overflowY = "auto";
    body.style.paddingRight = "";
    body.style.touchAction = "auto";
    body.style.pointerEvents = "auto";
    html.style.overflow = "auto";
    html.style.overflowY = "auto";
    html.style.touchAction = "auto";
  }

  function nodeIsVisible(node) {
    if (!node) {
      return false;
    }
    if (node.hidden) {
      return false;
    }
    var style;
    try {
      style = window.getComputedStyle(node);
    } catch (_error) {
      return false;
    }
    if (!style) {
      return false;
    }
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }
    return true;
  }

  function isRulesModalLike(node) {
    if (!node || node.nodeType !== 1) {
      return false;
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
    if (text.indexOf("rules") >= 0 && text.indexOf("accept") >= 0 && text.indexOf("cancel") >= 0) {
      return true;
    }
    return false;
  }

  function hasActiveBlockingModal() {
    var modalLike = document.querySelectorAll(".modal, .offcanvas, [role='dialog']");
    for (var i = 0; i < modalLike.length; i += 1) {
      var node = modalLike[i];
      if (!nodeIsVisible(node)) {
        continue;
      }
      var className = String(node.className || "").toLowerCase();
      var ariaHidden = String(node.getAttribute("aria-hidden") || "").toLowerCase();
      var styleDisplay = String(node.style && node.style.display ? node.style.display : "").toLowerCase();
      var isShown =
        className.indexOf("show") >= 0 ||
        ariaHidden === "false" ||
        styleDisplay === "block" ||
        styleDisplay === "flex";
      if (isShown && isRulesModalLike(node)) {
        continue;
      }
      if (isShown) {
        return true;
      }
    }

    var swalContainers = document.querySelectorAll(".swal2-container");
    for (var j = 0; j < swalContainers.length; j += 1) {
      var swalNode = swalContainers[j];
      if (!nodeIsVisible(swalNode)) {
        continue;
      }
      var swalClassName = String(swalNode.className || "").toLowerCase();
      if (swalClassName.indexOf("swal2-shown") >= 0 || swalClassName.indexOf("swal2-backdrop-show") >= 0) {
        return true;
      }
    }

    return false;
  }

  function clearStaleBlockingOverlays() {
    if (hasActiveBlockingModal()) {
      return;
    }

    var removed = false;
    var overlays = document.querySelectorAll(
      ".modal-backdrop, .offcanvas-backdrop, .swal2-container, .swal-overlay, .swal-overlay--show-modal, .sidebar-backdrop, .local-payment-overlay, #local-welcome-banner-popup, .local-welcome-overlay"
    );
    for (var i = 0; i < overlays.length; i += 1) {
      var node = overlays[i];
      if (!node) {
        continue;
      }
      if (node.parentNode) {
        node.parentNode.removeChild(node);
        removed = true;
      }
    }

    var body = document.body;
    if (body) {
      body.classList.remove("modal-open");
      body.classList.remove("swal2-shown");
      body.classList.remove("swal2-height-auto");
    }

    if (removed) {
      unlockPageScroll();
    }
  }

  function hideRulesAndPaymentNodes() {
    function shouldPreserveHeaderNode(node, normalizedText) {
      if (!node) {
        return false;
      }
      if (
        /(balance\s*:|exp\s*:|statement|signout|change password|current bet|activity logs|casino results|live casino bets|security auth verification|username|user\b)/i.test(
          normalizedText || ""
        )
      ) {
        return true;
      }
      if (
        node.closest &&
        node.closest(
          ".user-details, .user-balance, .user-menu, .user-dropdown, .depowith, [class*='user-detail'], [class*='user-menu']"
        )
      ) {
        return true;
      }
      if (
        node.querySelector &&
        node.querySelector(
          ".user-details, .user-balance, .user-menu, .user-dropdown, .dropdown-toggle, .dropdown-menu, [class*='user'], [class*='balance']"
        )
      ) {
        return true;
      }
      return false;
    }

    var forceHide = document.querySelectorAll(".download-apk, .rules-link");
    for (var i = 0; i < forceHide.length; i += 1) {
      forceHide[i].style.display = "none";
    }

    var headerNodes = document.querySelectorAll(
      ".header-top a, .header-top button, header a, header button, .top-header a, .top-header button, .topbar a, .topbar button"
    );
    for (var j = 0; j < headerNodes.length; j += 1) {
      var node = headerNodes[j];
      var text = String(node.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      if (!text) {
        continue;
      }
      if ((text === "rules" || text.indexOf("download apk") >= 0) && !shouldPreserveHeaderNode(node, text)) {
        node.style.display = "none";
      }
    }

    var hiddenRulesUi = false;
    var modalNodes = document.querySelectorAll(
      "#rulesModal, .rules-modal, .modal.rules-modal, [id*='rules'][class*='modal'], .modal, [role='dialog']"
    );
    for (var k = 0; k < modalNodes.length; k += 1) {
      var modalNode = modalNodes[k];
      if (!modalNode || !isRulesModalLike(modalNode)) {
        continue;
      }
      var acceptButton = modalNode.querySelector(
        "button.btn-success, .modal-footer .btn-success, [role='button'].btn-success, button"
      );
      if (acceptButton && typeof acceptButton.click === "function") {
        try {
          acceptButton.click();
        } catch (_clickErr) { }
      }
      modalNode.classList.remove("show");
      modalNode.setAttribute("aria-hidden", "true");
      modalNode.style.setProperty("display", "none", "important");
      modalNode.style.setProperty("visibility", "hidden", "important");
      modalNode.style.setProperty("opacity", "0", "important");
      modalNode.style.setProperty("pointer-events", "none", "important");
      hiddenRulesUi = true;
      if (modalNode.parentNode) {
        modalNode.parentNode.removeChild(modalNode);
      }
    }
    clearStaleBlockingOverlays();
    if (hiddenRulesUi) {
      var body = document.body;
      if (body) {
        body.classList.remove("modal-open");
        body.classList.remove("local-payment-lock");
      }
      unlockPageScroll();
    }
  }

  function hideTvNodes() {
    var selectors = [
      ".icon-tv",
      ".fa-tv",
      ".fa-television",
      "#tvshow",
      "#livetv",
      "#tv-box-popup",
      ".tv-box-popup",
      "[onclick*='changetv']",
      "[href*='gettv/']"
    ];
    var nodes = document.querySelectorAll(selectors.join(", "));
    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      if (!node) {
        continue;
      }
      var hideTarget = node.closest
        ? node.closest("a, button, [role='button'], td, th, li, div, span")
        : null;
      if (!hideTarget || hideTarget === document.body || hideTarget === document.documentElement) {
        hideTarget = node;
      }
      hideTarget.style.display = "none";
      hideTarget.style.visibility = "hidden";
    }
  }

  function normalizeActionText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function hideNativePaymentNodes() {
    return;
    var selectors = [
      "a",
      "button",
      "[role='button']",
      ".btn",
      "[onclick*='deposit']",
      "[onclick*='deposite']",
      "[onclick*='withdraw']",
      "[href*='deposit']",
      "[href*='deposite']",
      "[href*='withdraw']",
      "[class*='deposit']",
      "[class*='deposite']",
      "[class*='withdraw']",
      "[class*='depowith']",
      "[id*='deposit']",
      "[id*='deposite']",
      "[id*='withdraw']"
    ];
    var candidates = document.querySelectorAll(selectors.join(", "));
    for (var i = 0; i < candidates.length; i += 1) {
      var node = candidates[i];
      if (!node || (node.closest && node.closest("#local-runtime-payment-actions"))) {
        continue;
      }

      var text = normalizeActionText(node.textContent || "");
      var attrs = normalizeActionText(
        [
          node.getAttribute("id") || "",
          node.getAttribute("class") || "",
          node.getAttribute("href") || "",
          node.getAttribute("onclick") || "",
          node.getAttribute("data-action") || "",
          node.getAttribute("data-type") || "",
          node.getAttribute("data-name") || "",
          node.getAttribute("title") || ""
        ].join(" ")
      );

      var isDeposit =
        text.indexOf("deposit") >= 0 ||
        attrs.indexOf("deposit") >= 0 ||
        attrs.indexOf("deposite") >= 0;
      var isWithdraw = text.indexOf("withdraw") >= 0 || attrs.indexOf("withdraw") >= 0;
      if (!isDeposit && !isWithdraw) {
        continue;
      }
      var hideTarget = node.closest ? node.closest("a, button, [role='button'], .btn, li") : null;
      if (!hideTarget || hideTarget === document.body || hideTarget === document.documentElement) {
        hideTarget = node;
      }
      if (
        hideTarget.id === "root" ||
        (hideTarget.classList &&
          (hideTarget.classList.contains("wrapper") ||
            hideTarget.classList.contains("header") ||
            hideTarget.classList.contains("header-top") ||
            hideTarget.classList.contains("top-header") ||
            hideTarget.classList.contains("center-main-container")))
      ) {
        continue;
      }
      var hideTag = String(hideTarget.tagName || "").toLowerCase();
      if (
        (hideTag === "div" || hideTag === "span" || hideTag === "li") &&
        hideTarget.children &&
        hideTarget.children.length > 6
      ) {
        continue;
      }
      hideTarget.setAttribute("aria-hidden", "true");
      hideTarget.hidden = true;
      if (hideTarget.classList) {
        hideTarget.classList.add("hidden");
      }
      hideTarget.style.setProperty("display", "none", "important");
      hideTarget.style.setProperty("visibility", "hidden", "important");
      hideTarget.style.setProperty("opacity", "0", "important");
      hideTarget.style.setProperty("pointer-events", "none", "important");
    }
  }

  function findNativePaymentAction(action) {
    var wanted = action === "withdrawal" ? "withdraw" : "deposit";
    var candidates = document.querySelectorAll("a, button, [role='button'], .btn");
    for (var i = 0; i < candidates.length; i += 1) {
      var node = candidates[i];
      if (!node || (node.closest && node.closest("#local-runtime-payment-actions"))) {
        continue;
      }
      if (node.disabled) {
        continue;
      }
      var text = normalizeActionText(node.textContent || "");
      var attrs = normalizeActionText(
        [
          node.getAttribute("id") || "",
          node.getAttribute("class") || "",
          node.getAttribute("href") || "",
          node.getAttribute("onclick") || "",
          node.getAttribute("data-action") || "",
          node.getAttribute("data-type") || "",
          node.getAttribute("data-name") || "",
          node.getAttribute("title") || ""
        ].join(" ")
      );
      var containsWord = text.indexOf(wanted) >= 0 || attrs.indexOf(wanted) >= 0;
      if (!containsWord) {
        if (wanted === "deposit" && attrs.indexOf("deposite") >= 0) {
          containsWord = true;
        }
      }
      if (!containsWord) {
        continue;
      }
      return node;
    }
    return null;
  }

  function triggerPaymentAction(action) {
    var nativeNode = findNativePaymentAction(action);
    if (!nativeNode) {
      return false;
    }
    try {
      nativeNode.click();
      return true;
    } catch (_error) {
      return false;
    }
  }

  function resolveHeaderTopNode() {
    return (
      document.querySelector(".header-top") ||
      document.querySelector(".top-header") ||
      document.querySelector(".header .top") ||
      document.querySelector("header")
    );
  }

  function enforceUserSectionVisibility() {
    var header = resolveHeaderTopNode();
    if (!header || !header.querySelectorAll) {
      return;
    }

    function hideNode(node) {
      if (!node || node.nodeType !== 1) {
        return;
      }
      node.hidden = true;
      node.setAttribute("aria-hidden", "true");
      node.style.setProperty("display", "none", "important");
      node.style.setProperty("visibility", "hidden", "important");
      node.style.setProperty("opacity", "0", "important");
      node.style.setProperty("pointer-events", "none", "important");
    }

    function showNode(node) {
      if (!node || node.nodeType !== 1) {
        return;
      }
      node.hidden = false;
      node.removeAttribute("hidden");
      if (String(node.getAttribute("aria-hidden") || "").toLowerCase() === "true") {
        node.removeAttribute("aria-hidden");
      }
      if (node.classList) {
        node.classList.remove("d-none");
        node.classList.remove("hidden");
        node.classList.remove("invisible");
      }
      node.style.setProperty("visibility", "visible", "important");
      node.style.setProperty("opacity", "1", "important");
      node.style.setProperty("pointer-events", "auto", "important");
    }

    function collectTopLevelUserDetails() {
      var candidates = header.querySelectorAll(".user-details, [class*='user-detail']");
      var out = [];
      for (var i = 0; i < candidates.length; i += 1) {
        var node = candidates[i];
        if (!node || node.nodeType !== 1) {
          continue;
        }
        var parentDetail =
          node.parentElement && node.parentElement.closest
            ? node.parentElement.closest(".user-details, [class*='user-detail']")
            : null;
        if (parentDetail) {
          continue;
        }
        out.push(node);
      }
      return out;
    }

    function scoreNode(node) {
      var score = 0;
      if (nodeIsVisible(node)) {
        score += 1000;
      }
      if (node.querySelector(".user-balance")) {
        score += 120;
      }
      if (node.querySelector(".user-name, .username, .dropdown-toggle")) {
        score += 80;
      }
      if (node.closest && node.closest(".dropdown-menu")) {
        score -= 500;
      }
      var text = normalizeActionText(node.textContent || "");
      if (text.indexOf("balance") >= 0) {
        score += 40;
      }
      if (text.indexOf("exposure") >= 0 || text.indexOf("exp:") >= 0) {
        score += 30;
      }
      try {
        var rect = node.getBoundingClientRect();
        if (rect && rect.width > 0 && rect.height > 0) {
          score += 20;
        }
      } catch (_error) { }
      return score;
    }

    var detailNodes = collectTopLevelUserDetails();
    if (!detailNodes.length) {
      return;
    }

    var primaryNode = detailNodes[0];
    var bestScore = scoreNode(primaryNode);
    for (var j = 1; j < detailNodes.length; j += 1) {
      var candidateNode = detailNodes[j];
      var candidateScore = scoreNode(candidateNode);
      if (candidateScore > bestScore) {
        bestScore = candidateScore;
        primaryNode = candidateNode;
      }
    }

    var isNarrow = false;
    try {
      isNarrow = !!(window.matchMedia && window.matchMedia("(max-width: 991.98px)").matches);
    } catch (_error) { }

    for (var k = 0; k < detailNodes.length; k += 1) {
      var detailNode = detailNodes[k];
      var keepNode = detailNode === primaryNode;
      detailNode.setAttribute("data-local-user-primary", keepNode ? "1" : "0");
      if (!keepNode) {
        hideNode(detailNode);
        continue;
      }
      showNode(detailNode);
      detailNode.style.setProperty("display", "flex", "important");
      detailNode.style.setProperty("justify-content", "flex-end", "important");
      detailNode.style.setProperty("text-align", "right", "important");
      if (isNarrow) {
        detailNode.style.setProperty("flex-direction", "column", "important");
        detailNode.style.setProperty("align-items", "flex-end", "important");
        detailNode.style.setProperty("row-gap", "2px", "important");
      } else {
        detailNode.style.setProperty("align-items", "center", "important");
      }
    }

    var balanceBlocks = primaryNode.querySelectorAll(".user-balance");
    var primaryBalanceBlock = null;
    for (var b = 0; b < balanceBlocks.length; b += 1) {
      var block = balanceBlocks[b];
      if (nodeIsVisible(block)) {
        primaryBalanceBlock = block;
        break;
      }
    }
    if (!primaryBalanceBlock && balanceBlocks.length) {
      primaryBalanceBlock = balanceBlocks[0];
    }
    for (var c = 0; c < balanceBlocks.length; c += 1) {
      var balanceNode = balanceBlocks[c];
      if (balanceNode !== primaryBalanceBlock) {
        hideNode(balanceNode);
      } else {
        showNode(balanceNode);
        balanceNode.style.setProperty("text-align", "right", "important");
      }
    }

    var nameNodes = primaryNode.querySelectorAll(".user-name, .username");
    var primaryNameNode = null;
    for (var n = 0; n < nameNodes.length; n += 1) {
      if (nodeIsVisible(nameNodes[n])) {
        primaryNameNode = nameNodes[n];
        break;
      }
    }
    if (!primaryNameNode && nameNodes.length) {
      primaryNameNode = nameNodes[0];
    }
    for (var m = 0; m < nameNodes.length; m += 1) {
      var nameNode = nameNodes[m];
      if (nameNode !== primaryNameNode) {
        hideNode(nameNode);
      } else {
        showNode(nameNode);
      }
    }

    var toggleNodes = primaryNode.querySelectorAll(
      ".user-details .dropdown-toggle, .user-name, .username, .user-dropdown .dropdown-toggle, .dropdown-toggle"
    );
    for (var t = 0; t < toggleNodes.length; t += 1) {
      showNode(toggleNodes[t]);
      if (toggleNodes[t].style.display === "none") {
        toggleNodes[t].style.setProperty("display", "inline-flex", "important");
      }
    }
  }

  function installTopPaymentButtons() {
    var wrap = document.getElementById("local-runtime-payment-actions");
    if (wrap && wrap.parentNode) {
      wrap.parentNode.removeChild(wrap);
    }
  }

  function applyWalletToHeader(balance, exp) {
    var balanceValue = formatHeaderAmount(balance, "0.00");
    var exposureDisplay = normalizeExposureDisplayValue(exp);
    var expValue = formatHeaderAmount(exposureDisplay, "0.00");
    var identity = getIdentity();
    var root = getPersistRoot();
    var data = parseJsonSafe(root.data || "{}", {});
    var auth = parseJsonSafe(root.auth || "{}", {});
    var userState = parseJsonSafe(root.user || "{}", {});
    var userData = parseJsonSafe(userState.data || "{}", {});
    var displayName = String(
      userData.user_name ||
      userData.uname ||
      userData.username ||
      data.user_name ||
      data.uname ||
      data.username ||
      auth.user_name ||
      auth.uname ||
      auth.username ||
      identity.username ||
      ""
    ).trim();
    enforceUserSectionVisibility();
    var headerRoot = resolveHeaderTopNode();
    var primaryUserContainer = headerRoot
      ? headerRoot.querySelector("[data-local-user-primary='1']")
      : null;
    var scopeNode = primaryUserContainer || headerRoot || document;

    function setUsernameOnNode(node, nameText) {
      if (!node || node.nodeType !== 1 || !nameText) {
        return false;
      }
      var textNode = null;
      var extraTextNodes = [];
      for (var i = 0; i < node.childNodes.length; i += 1) {
        var child = node.childNodes[i];
        if (child && child.nodeType === 3) {
          if (!textNode) {
            textNode = child;
          } else {
            extraTextNodes.push(child);
          }
        }
      }
      if (textNode) {
        textNode.nodeValue = nameText + " ";
      } else {
        node.insertBefore(document.createTextNode(nameText + " "), node.firstChild || null);
      }
      for (var j = 0; j < extraTextNodes.length; j += 1) {
        var extraNode = extraTextNodes[j];
        if (extraNode && extraNode.parentNode === node) {
          node.removeChild(extraNode);
        }
      }
      return true;
    }

    function ensureLabelValueRow(rowNode, labelText, valueText) {
      if (!rowNode || rowNode.nodeType !== 1) {
        return false;
      }
      var labelNode = null;
      var valueNode = null;
      var children = rowNode.children;
      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        if (!child || child.nodeType !== 1) {
          continue;
        }
        var tagName = String(child.tagName || "").toLowerCase();
        if (!labelNode && tagName === "span") {
          labelNode = child;
          continue;
        }
        if (!valueNode && (tagName === "b" || tagName === "strong")) {
          valueNode = child;
        }
      }
      if (!labelNode) {
        labelNode = document.createElement("span");
        rowNode.insertBefore(labelNode, rowNode.firstChild || null);
      }
      if (!valueNode) {
        valueNode = document.createElement("b");
        if (labelNode.nextSibling) {
          rowNode.insertBefore(valueNode, labelNode.nextSibling);
        } else {
          rowNode.appendChild(valueNode);
        }
      }
      labelNode.textContent = labelText + " ";
      valueNode.textContent = valueText;
      var rowChildren = Array.prototype.slice.call(rowNode.children || []);
      for (var rc = 0; rc < rowChildren.length; rc += 1) {
        var rowChild = rowChildren[rc];
        if (!rowChild || rowChild === labelNode || rowChild === valueNode) {
          continue;
        }
        rowNode.removeChild(rowChild);
      }
      var textNodes = Array.prototype.slice.call(rowNode.childNodes || []);
      for (var tn = 0; tn < textNodes.length; tn += 1) {
        var textNode = textNodes[tn];
        if (!textNode || textNode.nodeType !== 3) {
          continue;
        }
        if (String(textNode.nodeValue || "").trim()) {
          rowNode.removeChild(textNode);
        }
      }
      return true;
    }

    var foundName = false;
    if (displayName) {
      var userNameNodes = scopeNode.querySelectorAll(".user-name, .username");
      if ((!userNameNodes || !userNameNodes.length) && scopeNode !== document) {
        userNameNodes = document.querySelectorAll(".user-name, .username");
      }
      for (var n = 0; n < userNameNodes.length; n += 1) {
        if (setUsernameOnNode(userNameNodes[n], displayName)) {
          foundName = true;
        }
      }
    }

    var foundBalance = false;
    var foundExp = false;
    var balanceBlocks = scopeNode.querySelectorAll(".user-balance");
    if ((!balanceBlocks || !balanceBlocks.length) && scopeNode !== document) {
      balanceBlocks = document.querySelectorAll(".user-balance");
    }
    for (var b = 0; b < balanceBlocks.length; b += 1) {
      var block = balanceBlocks[b];
      if (!block || block.nodeType !== 1) {
        continue;
      }
      var rows = [];
      for (var c = 0; c < block.children.length; c += 1) {
        var rowCandidate = block.children[c];
        if (
          rowCandidate &&
          rowCandidate.nodeType === 1 &&
          String(rowCandidate.tagName || "").toLowerCase() === "div"
        ) {
          rows.push(rowCandidate);
        }
      }
      if (!rows.length) {
        var createdBalanceRow = document.createElement("div");
        block.appendChild(createdBalanceRow);
        rows.push(createdBalanceRow);
      }
      if (ensureLabelValueRow(rows[0], "Balance:", balanceValue)) {
        foundBalance = true;
      }
      var exposureRow = rows.length > 1 ? rows[1] : null;
      if (!exposureRow) {
        exposureRow = document.createElement("div");
        block.appendChild(exposureRow);
      }
      if (ensureLabelValueRow(exposureRow, "Exp:", expValue)) {
        foundExp = true;
      }
      for (var r = rows.length - 1; r >= 2; r -= 1) {
        var extraRow = rows[r];
        if (extraRow && extraRow.parentNode === block) {
          block.removeChild(extraRow);
        }
      }
    }

    var headerTarget =
      primaryUserContainer ||
      scopeNode.querySelector(".user-details") ||
      document.querySelector(".header-top .user-details, .top-header .user-details, .user-details") ||
      resolveHeaderTopNode();
    if (!headerTarget) {
      return;
    }

    var staleInlineNodes = document.querySelectorAll(
      ".local-runtime-balance, .local-runtime-exp, .local-runtime-available, .local-runtime-user"
    );
    for (var s = 0; s < staleInlineNodes.length; s += 1) {
      var staleNode = staleInlineNodes[s];
      if (!staleNode || !staleNode.parentNode) {
        continue;
      }
      var isAvailableInlineNode =
        staleNode.classList && staleNode.classList.contains("local-runtime-available");
      if (!isAvailableInlineNode && headerTarget.contains(staleNode)) {
        continue;
      }
      staleNode.parentNode.removeChild(staleNode);
    }

    function upsertInlineNode(className, text) {
      var node = headerTarget.querySelector("." + className);
      if (!node) {
        node = document.createElement("span");
        node.className = className;
        node.style.display = "block";
        node.style.marginLeft = "0";
        node.style.whiteSpace = "nowrap";
        node.style.textAlign = "right";
        headerTarget.appendChild(node);
      }
      node.textContent = text;
    }

    if (!foundBalance) {
      upsertInlineNode("local-runtime-balance", "Balance: " + balanceValue);
    }
    if (!foundExp) {
      upsertInlineNode("local-runtime-exp", "Exp: " + expValue);
    }
    if (displayName && !foundName) {
      upsertInlineNode("local-runtime-user", displayName);
    }

    enforceUserSectionVisibility();
  }

  function persistWallet(balance, exp) {
    var root = getPersistRoot();
    var data = parseJsonSafe(root.data || "{}", {});
    var user = parseJsonSafe(root.user || "{}", {});
    var userData = parseJsonSafe(user.data || "{}", {});
    var auth = parseJsonSafe(root.auth || "{}", {});
    var normalizedExp = normalizeExposureDisplayValue(exp);

    data.bal = balance;
    data.exp = normalizedExp;
    data.exposure = normalizedExp;
    userData.bal = balance;
    userData.exp = normalizedExp;
    userData.exposure = normalizedExp;
    auth.bal = balance;
    auth.exp = normalizedExp;
    auth.exposure = normalizedExp;

    user.data = JSON.stringify(userData);
    root.data = JSON.stringify(data);
    root.user = JSON.stringify(user);
    root.auth = JSON.stringify(auth);
    localStorage.setItem("persist:root", JSON.stringify(root));
  }

  function applyPersistedWalletToHeader() {
    var root = getPersistRoot();
    var data = parseJsonSafe(root.data || "{}", {});
    var auth = parseJsonSafe(root.auth || "{}", {});
    var user = parseJsonSafe(root.user || "{}", {});
    var userData = parseJsonSafe(user.data || "{}", {});
    var balance = Number(
      userData.bal != null
        ? userData.bal
        : data.bal != null
          ? data.bal
          : auth.bal != null
            ? auth.bal
            : userData.balance != null
              ? userData.balance
              : data.balance != null
                ? data.balance
                : auth.balance
    );
    if (!Number.isFinite(balance)) {
      return;
    }
    var exp = normalizeExposureDisplayValue(
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
                : auth.exposure
    );
    applyWalletToHeader(Number(balance.toFixed(2)), exp);
  }

  async function syncWallet() {
    if (walletSyncInFlight || !isDocumentVisible()) {
      return;
    }
    var identity = getIdentity();
    if (!identity.username && !identity.token) {
      return;
    }
    walletSyncInFlight = true;
    try {
      var headers = buildHeaders({ "Content-Type": "application/json" }, identity);
      var response = await window.fetch("/api/front/local-userdata", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(
          injectIdentityIntoObject(
            {
              uname: identity.username || ""
            },
            identity
          )
        )
      });
      var payload = await response.json().catch(function () {
        return {};
      });
      if (!payload || Number(payload.status) !== 200 || !payload.data || typeof payload.data !== "object") {
        return;
      }
      var nextBalance = Number(payload.data.bal != null ? payload.data.bal : payload.data.balance);
      if (!Number.isFinite(nextBalance)) {
        return;
      }
      var nextExp = normalizeExposureDisplayValue(resolveExposureValue(payload.data));
      var stamp = nextBalance.toFixed(2) + "|" + String(nextExp);
      if (stamp === lastWalletStamp) {
        applyWalletToHeader(nextBalance, nextExp);
        return;
      }
      lastWalletStamp = stamp;
      persistWallet(nextBalance, nextExp);
      applyWalletToHeader(nextBalance, nextExp);
      decorateCasinoLaunchLinks();
    } catch (_error) {
    } finally {
      walletSyncInFlight = false;
    }
  }

  function installWalletSync() {
    if (window.__LOCAL_WALLET_SYNC_INSTALLED__) {
      return;
    }
    window.__LOCAL_WALLET_SYNC_INSTALLED__ = true;
    var runSync = function () {
      syncWallet();
    };
    runSync();
    document.addEventListener("visibilitychange", function () {
      if (isDocumentVisible()) {
        runSync();
      }
    });
    window.addEventListener("focus", runSync);
    window.setInterval(runSync, WALLET_SYNC_INTERVAL_MS);
  }

  function extractBackgroundImageUrls(backgroundValue) {
    var urls = [];
    var raw = String(backgroundValue || "");
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

  function normalizeHomeImagePath(rawPath) {
    var value = String(rawPath || "").trim();
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
        host === "api2b.pro"
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

    value = value
      .replace(/([^:])\/{2,}/g, "$1/")
      .replace(
        /^\/dataobj\.ecoassetsservice\.com\/casino-icons\/default\.(jpg|jpeg|png)$/i,
        "/dataobj.ecoassetsservice.com/casino-icons/default.jpg"
      );
    return value;
  }

  function isDefaultHomeImagePath(pathValue) {
    var token = normalizeLegacyToken(pathValue);
    if (!token) {
      return true;
    }
    return (
      token.indexOf("defaultjpg") >= 0 ||
      token.indexOf("defaultjpeg") >= 0 ||
      token.indexOf("defaultpng") >= 0
    );
  }

  function resolvePreferredBannerImagePath(banner, fallbackPath) {
    if (!banner) {
      return normalizeHomeImagePath(fallbackPath);
    }

    var candidates = [];
    if (typeof banner.getAttribute === "function") {
      candidates.push(String(banner.getAttribute("data-home-source-bg") || ""));
    }
    if (banner.style) {
      candidates.push(String(banner.style.backgroundImage || ""));
    }
    if (typeof window.getComputedStyle === "function") {
      try {
        candidates.push(String(window.getComputedStyle(banner).backgroundImage || ""));
      } catch (_error) {
      }
    }

    for (var i = 0; i < candidates.length; i += 1) {
      var urls = extractBackgroundImageUrls(candidates[i]);
      for (var j = 0; j < urls.length; j += 1) {
        var normalized = normalizeHomeImagePath(urls[j]);
        if (!normalized || isDefaultHomeImagePath(normalized)) {
          continue;
        }
        return normalized;
      }
    }

    var normalizedFallback = normalizeHomeImagePath(fallbackPath);
    if (normalizedFallback && !isDefaultHomeImagePath(normalizedFallback)) {
      return normalizedFallback;
    }
    return "";
  }

  function applyHomeGameImageOrder() {
    if (!ENABLE_HOME_IMAGE_FALLBACK_ORDER) {
      return;
    }
    if (
      !window.location ||
      String(window.location.pathname || "").toLowerCase() !== "/home" ||
      !isDocumentVisible()
    ) {
      return;
    }
    var banners = document.querySelectorAll(".casino-list-item-banner");
    if (!banners || !banners.length) {
      return;
    }
    for (var i = 0; i < banners.length; i += 1) {
      var banner = banners[i];
      if (typeof banner.getAttribute === "function" && typeof banner.setAttribute === "function") {
        var sourceBg = banner.getAttribute("data-home-source-bg") || "";
        if (!sourceBg) {
          sourceBg = String((banner.style && banner.style.backgroundImage) || "");
          if (!sourceBg && typeof window.getComputedStyle === "function") {
            sourceBg = String(window.getComputedStyle(banner).backgroundImage || "");
          }
          if (sourceBg) {
            banner.setAttribute("data-home-source-bg", sourceBg);
          }
        }
      }
      var fallbackImagePath = HOME_GAME_IMAGE_ORDER.length
        ? HOME_GAME_IMAGE_ORDER[i % HOME_GAME_IMAGE_ORDER.length]
        : "";
      var imagePath = resolvePreferredBannerImagePath(banner, fallbackImagePath);
      if (!imagePath) {
        continue;
      }
      var nextBackground =
        'url("' + imagePath + '"), url("/dataobj.ecoassetsservice.com/casino-icons/default.jpg")';
      if (banner.style && banner.style.backgroundImage !== nextBackground) {
        banner.style.backgroundImage = nextBackground;
        banner.style.backgroundSize = "cover";
        banner.style.backgroundPosition = "center";
        banner.style.backgroundRepeat = "no-repeat";
      } else if (typeof banner.setAttribute === "function") {
        banner.setAttribute("style", "background-image: " + nextBackground + ";");
      }
    }
  }

  function randomizeHomeGameEntries(entries) {
    var list = Array.isArray(entries) ? entries.slice() : [];
    for (var i = list.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }

  function extractHomeApiGameList(payload) {
    if (!payload || typeof payload !== "object") {
      return [];
    }
    var containers = [payload.data, payload];
    for (var i = 0; i < containers.length; i += 1) {
      var container = containers[i];
      if (!container || typeof container !== "object") {
        continue;
      }
      if (Array.isArray(container.t1)) {
        return container.t1;
      }
      if (Array.isArray(container.gameLists)) {
        return container.gameLists;
      }
      if (Array.isArray(container.list)) {
        return container.list;
      }
      if (Array.isArray(container.rows)) {
        return container.rows;
      }
    }
    return [];
  }

  function resolveHomeGameProviderToken(game) {
    if (!game || typeof game !== "object") {
      return "";
    }
    var providerKeys = [
      "vendorCode",
      "provider",
      "providerName",
      "provider_name",
      "vendor",
      "vendorName",
      "providerCode",
      "gameProvider",
      "game_provider",
      "platform",
      "pname",
      "company"
    ];
    for (var i = 0; i < providerKeys.length; i += 1) {
      var key = providerKeys[i];
      var token = normalizeLegacyToken(game[key]);
      if (token) {
        return token;
      }
    }
    var imageHint = String(
      game.imgpath || game.img || game.image || game.icon || game.imgUrl2 || ""
    ).toLowerCase();
    if (imageHint.indexOf("mac88") !== -1) {
      return HOME_MAC88_PROVIDER_TOKEN;
    }
    return "";
  }

  function isMac88HomeGame(game) {
    var providerToken = resolveHomeGameProviderToken(game);
    return providerToken === HOME_MAC88_PROVIDER_TOKEN || providerToken.indexOf(HOME_MAC88_PROVIDER_TOKEN) !== -1;
  }

  function collectHomeGameIdTokens(game) {
    if (!game || typeof game !== "object") {
      return [];
    }
    var keys = [
      "gmid",
      "mid",
      "oldgmid",
      "id",
      "ename",
      "provider_game_uid",
      "game_uid",
      "gameID"
    ];
    var tokens = [];
    for (var i = 0; i < keys.length; i += 1) {
      var rawValue = String(game[keys[i]] || "").trim();
      if (!rawValue) {
        continue;
      }
      if (!isLikelyProviderGid(rawValue)) {
        continue;
      }
      var normalized = normalizeLegacyToken(rawValue);
      if (!normalized) {
        continue;
      }
      if (tokens.indexOf(normalized) === -1) {
        tokens.push(normalized);
      }
    }
    return tokens;
  }

  function buildMac88HomeSelection(gameList) {
    if (!Array.isArray(gameList) || !gameList.length) {
      return {
        indices: new Set(),
        ids: new Set()
      };
    }
    var mac88Entries = [];
    for (var i = 0; i < gameList.length; i += 1) {
      if (isMac88HomeGame(gameList[i])) {
        mac88Entries.push({
          index: i,
          ids: collectHomeGameIdTokens(gameList[i])
        });
      }
    }
    if (!mac88Entries.length) {
      return {
        indices: new Set(),
        ids: new Set()
      };
    }
    if (mac88Entries.length > HOME_MAC88_GAME_MAX) {
      mac88Entries = randomizeHomeGameEntries(mac88Entries).slice(0, HOME_MAC88_GAME_MAX);
    }
    var selectedIndices = new Set();
    var selectedIds = new Set();
    for (var j = 0; j < mac88Entries.length; j += 1) {
      var entry = mac88Entries[j];
      selectedIndices.add(entry.index);
      for (var k = 0; k < entry.ids.length; k += 1) {
        selectedIds.add(entry.ids[k]);
      }
    }
    return {
      indices: selectedIndices,
      ids: selectedIds
    };
  }

  function requestHomeMac88Selection(forceRefresh) {
    if (!forceRefresh) {
      var now = Date.now();
      if (homeMac88SelectionInFlight) {
        return;
      }
      if (homeMac88SelectionUpdatedAt && now - homeMac88SelectionUpdatedAt < HOME_MAC88_REFRESH_MS) {
        return;
      }
    }

    homeMac88SelectionInFlight = true;
    var identity = getIdentity();
    var headers = buildHeaders({ "Content-Type": "application/json" }, identity);
    var bodyPayload = injectIdentityIntoObject(
      {
        gmid: 35,
        ismob: IS_MOBILE ? 0 : 1
      },
      identity
    );

    window
      .fetch("/api/front/get_casino_table_list", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyPayload)
      })
      .then(function (response) {
        return response.json().catch(function () {
          return {};
        });
      })
      .then(function (payload) {
        var gameList = extractHomeApiGameList(payload);
        var nextSelection = buildMac88HomeSelection(gameList);
        homeMac88SelectionIndices = nextSelection.indices;
        homeMac88SelectionIds = nextSelection.ids;
        homeMac88SelectionReady = true;
        homeMac88SelectionUpdatedAt = Date.now();
      })
      .catch(function () {
      })
      .finally(function () {
        homeMac88SelectionInFlight = false;
      });
  }

  function cardHasMac88Hint(card) {
    if (!card) {
      return false;
    }
    var samples = [];
    samples.push(String(card.textContent || ""));
    if (typeof card.getAttribute === "function") {
      samples.push(String(card.getAttribute("class") || ""));
      samples.push(String(card.getAttribute("id") || ""));
      samples.push(String(card.getAttribute("data-provider") || ""));
      samples.push(String(card.getAttribute("data-provider-name") || ""));
      samples.push(String(card.getAttribute("data-provider-code") || ""));
      samples.push(String(card.getAttribute("data-vendor") || ""));
      samples.push(String(card.getAttribute("data-game-provider") || ""));
    }
    if (typeof card.querySelector === "function") {
      var banner = card.querySelector(".casino-list-item-banner");
      if (banner && typeof banner.getAttribute === "function") {
        samples.push(String(banner.getAttribute("data-home-source-bg") || ""));
        samples.push(String(banner.getAttribute("style") || ""));
      }
    }
    var normalized = normalizeLegacyToken(samples.join(" "));
    return normalized.indexOf(HOME_MAC88_PROVIDER_TOKEN) !== -1;
  }

  function resolveHomeCardGameId(card) {
    if (!card || typeof card.querySelectorAll !== "function") {
      return "";
    }
    var direct = extractProviderGidFromElement(card);
    if (direct) {
      return direct;
    }
    var nestedCandidates = card.querySelectorAll(
      "[href], [onclick], [data-gid], [data-mid], [data-gmid], [data-id], [data-game], [data-gameid], [data-provider-game-uid], [data-game-uid]"
    );
    for (var i = 0; i < nestedCandidates.length; i += 1) {
      var nestedValue = extractProviderGidFromElement(nestedCandidates[i]);
      if (nestedValue) {
        return nestedValue;
      }
    }
    return "";
  }

  function applyHomeApiGameLimit() {
    if (!ENABLE_HOME_API_GAME_LIMIT) {
      return;
    }
    if (
      !window.location ||
      String(window.location.pathname || "").toLowerCase() !== "/home" ||
      !isDocumentVisible()
    ) {
      return;
    }

    var cards = Array.prototype.slice.call(document.querySelectorAll(".casino-list-item"));
    if (!cards.length) {
      return;
    }

    requestHomeMac88Selection(false);

    var allowedIndices = homeMac88SelectionIndices instanceof Set ? homeMac88SelectionIndices : null;
    var allowedIds = homeMac88SelectionIds instanceof Set ? homeMac88SelectionIds : null;
    if ((!allowedIndices || !allowedIndices.size) && (!allowedIds || !allowedIds.size)) {
      var hintedIndices = [];
      for (var i = 0; i < cards.length; i += 1) {
        if (cardHasMac88Hint(cards[i])) {
          hintedIndices.push(i);
        }
      }
      if (hintedIndices.length > HOME_MAC88_GAME_MAX) {
        hintedIndices = randomizeHomeGameEntries(hintedIndices).slice(0, HOME_MAC88_GAME_MAX);
      }
      if (hintedIndices.length) {
        allowedIndices = new Set(hintedIndices);
        allowedIds = null;
      } else if (!homeMac88SelectionReady) {
        return;
      } else {
        allowedIndices = new Set();
        allowedIds = new Set();
      }
    }

    var visibleCount = 0;
    for (var j = 0; j < cards.length; j += 1) {
      var card = cards[j];
      var keep = false;
      if (allowedIds && allowedIds.size) {
        var cardGameId = resolveHomeCardGameId(card);
        var normalizedCardGameId = normalizeLegacyToken(cardGameId);
        if (normalizedCardGameId && allowedIds.has(normalizedCardGameId)) {
          keep = true;
        }
      }
      if (!keep && allowedIndices && allowedIndices.size && allowedIndices.has(j)) {
        keep = true;
      }
      if (keep) {
        visibleCount += 1;
      }
      card.setAttribute("data-home-api-card-visible", keep ? "1" : "0");
      card.style.display = keep ? "" : "none";
      card.style.visibility = keep ? "" : "hidden";
      card.style.pointerEvents = keep ? "" : "none";
    }

    if (visibleCount > HOME_MAC88_GAME_MAX) {
      var keepPool = [];
      for (var k = 0; k < cards.length; k += 1) {
        if (cards[k].getAttribute("data-home-api-card-visible") === "1") {
          keepPool.push(k);
        }
      }
      keepPool = randomizeHomeGameEntries(keepPool).slice(0, HOME_MAC88_GAME_MAX);
      var forcedSet = new Set(keepPool);
      for (var m = 0; m < cards.length; m += 1) {
        var enforceKeep = forcedSet.has(m);
        cards[m].setAttribute("data-home-api-card-visible", enforceKeep ? "1" : "0");
        cards[m].style.display = enforceKeep ? "" : "none";
        cards[m].style.visibility = enforceKeep ? "" : "hidden";
        cards[m].style.pointerEvents = enforceKeep ? "" : "none";
      }
    }
  }

  function decorateCasinoLaunchLinks() {
    if (!document.querySelectorAll || !window.location) {
      return;
    }
    var identity = getIdentity();
    if (!identity.username) {
      return;
    }
    var walletAmount = resolveCurrentWalletAmount();
    var amountText = Number.isFinite(walletAmount) ? walletAmount.toFixed(2) : "";
    var anchors = document.querySelectorAll("a[href^='/casino/']");
    if (!anchors || !anchors.length) {
      return;
    }
    for (var i = 0; i < anchors.length; i += 1) {
      var anchor = anchors[i];
      if (!anchor || typeof anchor.getAttribute !== "function" || typeof anchor.setAttribute !== "function") {
        continue;
      }
      var href = String(anchor.getAttribute("href") || "").trim();
      if (!href || href.indexOf("/casino/") !== 0) {
        continue;
      }
      try {
        var parsed = new URL(href, window.location.origin);
        var pathname = String(parsed.pathname || "");
        if (!/^\/casino\/[a-z0-9_-]+$/i.test(pathname)) {
          continue;
        }
        var currentMember = String(parsed.searchParams.get("member") || "").trim().toLowerCase();
        var currentAmount = String(parsed.searchParams.get("amount") || "").trim();
        var dirty = false;
        if (currentMember !== identity.username) {
          parsed.searchParams.set("member", identity.username);
          dirty = true;
        }
        if (amountText && currentAmount !== amountText) {
          parsed.searchParams.set("amount", amountText);
          dirty = true;
        }
        if (dirty) {
          anchor.setAttribute("href", parsed.pathname + parsed.search + parsed.hash);
        }
      } catch (_error) { }
    }
  }

  function extractProviderGidFromUrl(rawUrl) {
    var value = String(rawUrl || "").trim();
    if (!value) {
      return "";
    }
    try {
      var parsed = new URL(value, window.location.origin);
      var queryGid = String(parsed.searchParams.get("gid") || "").trim();
      if (queryGid) {
        return queryGid;
      }
      var casinoMatch = String(parsed.pathname || "").match(/^\/casino\/([a-z0-9_-]+)$/i);
      if (casinoMatch && casinoMatch[1]) {
        return String(casinoMatch[1] || "").trim();
      }
    } catch (_error) { }
    return "";
  }

  function isLikelyProviderGid(rawValue) {
    var value = String(rawValue || "").trim();
    if (!value) {
      return false;
    }
    var normalized = normalizeLegacyToken(value);
    if (!normalized || KNOWN_CASINO_ROUTE_IDS.has(normalized)) {
      return false;
    }
    if (/^[a-f0-9]{16,64}$/i.test(value)) {
      return true;
    }
    if (/^[a-z0-9][a-z0-9_-]*-[a-f0-9]{6,16}$/i.test(value)) {
      return true;
    }
    return /^[a-z0-9][a-z0-9_-]{4,}$/i.test(value) && value.indexOf("-") !== -1;
  }

  function extractProviderGidFromElement(element) {
    if (!element || typeof element.getAttribute !== "function") {
      return "";
    }
    var attributeKeys = [
      "data-gid",
      "data-mid",
      "data-gmid",
      "data-id",
      "data-game",
      "data-gameid",
      "data-provider-game-uid",
      "data-game-uid",
      "gid",
      "mid",
      "gmid",
      "oldgmid",
      "id",
      "ename"
    ];
    for (var i = 0; i < attributeKeys.length; i += 1) {
      var attributeValue = String(element.getAttribute(attributeKeys[i]) || "").trim();
      if (attributeValue && isLikelyProviderGid(attributeValue)) {
        return attributeValue;
      }
    }

    var hrefCandidate = extractProviderGidFromUrl(element.getAttribute("href") || "");
    if (hrefCandidate && isLikelyProviderGid(hrefCandidate)) {
      return hrefCandidate;
    }

    var onclickRaw = String(element.getAttribute("onclick") || "");
    if (onclickRaw) {
      var tokenMatch = onclickRaw.match(/([a-z0-9][a-z0-9_-]*-[a-f0-9]{6,16}|[a-f0-9]{16,64})/i);
      if (tokenMatch && tokenMatch[1] && isLikelyProviderGid(tokenMatch[1])) {
        return String(tokenMatch[1] || "").trim();
      }
    }
    return "";
  }

  function findProviderGidFromClickTarget(target) {
    if (!target || !target.closest) {
      return "";
    }
    var node = target;
    while (node && node !== document.body) {
      var direct = extractProviderGidFromElement(node);
      if (direct) {
        return direct;
      }
      node = node.parentElement;
    }

    var card = target.closest(
      ".casino-list-item, [class*='casino-list-item'], .casino-item, .slot-item, .casino-box, .card"
    );
    if (!card || typeof card.querySelectorAll !== "function") {
      return "";
    }
    var nestedCandidates = card.querySelectorAll("[href], [onclick], [data-gid], [data-mid], [data-gmid]");
    for (var i = 0; i < nestedCandidates.length; i += 1) {
      var nestedValue = extractProviderGidFromElement(nestedCandidates[i]);
      if (nestedValue) {
        return nestedValue;
      }
    }
    return "";
  }

  function installDirectProviderLaunchClickOverride() {
    if (window.__LOCAL_PROVIDER_CLICK_OVERRIDE_INSTALLED__) {
      return;
    }
    window.__LOCAL_PROVIDER_CLICK_OVERRIDE_INSTALLED__ = true;

    document.addEventListener(
      "click",
      function (event) {
        var target = event.target;
        if (!target || !target.closest) {
          return;
        }
        var clickable = target.closest("a, button, img, div, span");
        if (!clickable) {
          return;
        }
        var providerGid = findProviderGidFromClickTarget(clickable);
        if (!providerGid) {
          return;
        }
        var identity = getIdentity();
        var launchPath = "/provider-game?gid=" + encodeURIComponent(providerGid);
        if (identity.username) {
          launchPath += "&member=" + encodeURIComponent(identity.username);
        }
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(launchPath);
      },
      true
    );
  }

  function runUiSweep(forceBranding) {
    if (!isDocumentVisible()) {
      return;
    }
    hideRulesAndPaymentNodes();
    hideTvNodes();
    unlockPageScroll();
    installTopPaymentButtons();
    enforceUserSectionVisibility();
    applyPersistedWalletToHeader();
    maybeEnforceBranding(document.documentElement, !!forceBranding);
    applyHomeApiGameLimit();
    applyHomeGameImageOrder();
    decorateCasinoLaunchLinks();
  }

  function installUiMutationSweep() {
    if (window.__LOCAL_UI_MUTATION_SWEEP_INSTALLED__) {
      return;
    }
    window.__LOCAL_UI_MUTATION_SWEEP_INSTALLED__ = true;
    if (!window.MutationObserver || !document.documentElement) {
      return;
    }
    var pending = false;
    var raf =
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : function (callback) {
          return window.setTimeout(callback, 16);
        };
    var run = function () {
      pending = false;
      runUiSweep(false);
    };
    var observer = new MutationObserver(function () {
      if (pending) {
        return;
      }
      pending = true;
      raf(run);
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true
    });
  }

  function bootstrap() {
    installViewportHeightFix();
    ensureUiHideStyle();
    installExternalNavigationGuard();
    installWhiteScreenRecovery();
    installSourceRewrite();
    installApiAuthBridge();
    installCasinoRouteFallback();
    installDirectProviderLaunchClickOverride();
    runUiSweep(true);
    installWalletSync();
    installUiMutationSweep();
    optimizeMediaElements(document.documentElement);
    if (!window.__LOCAL_UI_SWEEP_INTERVAL_INSTALLED__) {
      window.__LOCAL_UI_SWEEP_INTERVAL_INSTALLED__ = true;
      window.setInterval(function () {
        runUiSweep(false);
      }, UI_SWEEP_INTERVAL_MS);
    }
  }

  var bootstrapStarted = false;
  function startBootstrapOnce() {
    if (bootstrapStarted) {
      return;
    }
    bootstrapStarted = true;
    bootstrap();
  }

  startBootstrapOnce();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      runUiSweep(true);
      optimizeMediaElements(document.documentElement);
    });

    var onWindowLoad = function () {
      runUiSweep(true);
      window.removeEventListener("load", onWindowLoad);
    };
    window.addEventListener("load", onWindowLoad);
  } else {
    window.setTimeout(function () {
      runUiSweep(true);
    }, 0);
  }
})();

