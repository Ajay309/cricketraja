
    (function () {
      if (window.__localWelcomeBannerInjected) return;
      window.__localWelcomeBannerInjected = true;

      var path = String((window.location && window.location.pathname) || "").toLowerCase();
      if (path.indexOf("/admin") === 0) {
        return;
      }

      var POPUP_ID = "local-welcome-banner-popup";
      var STYLE_ID = "local-welcome-banner-style";
      var DISMISS_KEY = "localWelcomeBannerDismissed";
      var BANNER_SRC = "/sitethemedata.com/common/wel-banner/wel-1772484069516.png";

      function isHomeRoute() {
        var p = String((window.location && window.location.pathname) || "").toLowerCase();
        return p === "/home";
      }

      function ensureStyle() {
        if (document.getElementById(STYLE_ID)) return;
        var style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = [
          ".local-welcome-overlay{position:fixed;inset:0;background: rgba(107, 62, 30, 0.42);z-index:2147483640;display:flex;align-items:flex-start;justify-content:center;padding:108px 12px 16px;overflow:auto;}",
          ".local-welcome-card{width:min(1000px,calc(100vw - 40px));background: #6B3E1E;border-radius:2px;box-shadow: 0 18px 45px rgba(0,0,0,.45);overflow:hidden;}",
          ".local-welcome-head{height:44px;background: #6B3E1E;display:flex;justify-content:flex-end;align-items:center;padding:0 10px;}",
          ".local-welcome-close{border: 0;background: transparent;color: #fff;font-size:52px;line-height:1;cursor:pointer;padding:0 6px;}",
          ".local-welcome-image-wrap{background: #6B3E1E;display:flex;align-items:center;justify-content:center;}",
          ".local-welcome-image{width:100%;height:auto;display:block;}",
          "@media (max-width:900px){.local-welcome-overlay{padding:14px 8px}.local-welcome-card{width:min(1000px,calc(100vw - 16px))}.local-welcome-head{height:40px}.local-welcome-close{font-size:44px}}"
        ].join("");
        document.head.appendChild(style);
      }

      function closePopup() {
        var node = document.getElementById(POPUP_ID);
        if (node && node.parentNode) {
          node.parentNode.removeChild(node);
        }
        try {
          sessionStorage.setItem(DISMISS_KEY, "1");
        } catch (_e) {}
      }

      function buildPopup() {
        if (document.getElementById(POPUP_ID)) return;
        ensureStyle();

        var overlay = document.createElement("div");
        overlay.id = POPUP_ID;
        overlay.className = "local-welcome-overlay";

        var card = document.createElement("div");
        card.className = "local-welcome-card";

        var head = document.createElement("div");
        head.className = "local-welcome-head";

        var topClose = document.createElement("button");
        topClose.className = "local-welcome-close";
        topClose.type = "button";
        topClose.setAttribute("aria-label", "Close");
        topClose.textContent = "\u00d7";
        topClose.addEventListener("click", closePopup);
        head.appendChild(topClose);

        var imageWrap = document.createElement("div");
        imageWrap.className = "local-welcome-image-wrap";
        var image = document.createElement("img");
        image.className = "local-welcome-image";
        image.src = BANNER_SRC;
        image.alt = "Welcome Banner";
        imageWrap.appendChild(image);

        card.appendChild(head);
        card.appendChild(imageWrap);
        overlay.appendChild(card);

        overlay.addEventListener("click", function (event) {
          if (event.target === overlay) {
            closePopup();
          }
        });

        document.body.appendChild(overlay);
      }

      function maybeShowBanner() {
        var current = String((window.location && window.location.pathname) || "").toLowerCase();
        if (current === "/" || current === "/login") {
          try {
            sessionStorage.removeItem(DISMISS_KEY);
          } catch (_e) {}
        }
        if (!isHomeRoute()) return;
        try {
          if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
        } catch (_e) {}
        window.setTimeout(buildPopup, 700);
      }

      function installRouteListeners() {
        if (window.__localWelcomeBannerRouteHooked) return;
        window.__localWelcomeBannerRouteHooked = true;

        var rawPushState = history.pushState;
        var rawReplaceState = history.replaceState;
        history.pushState = function () {
          var result = rawPushState.apply(this, arguments);
          window.setTimeout(maybeShowBanner, 160);
          return result;
        };
        history.replaceState = function () {
          var result = rawReplaceState.apply(this, arguments);
          window.setTimeout(maybeShowBanner, 160);
          return result;
        };
        window.addEventListener("popstate", function () {
          window.setTimeout(maybeShowBanner, 160);
        });
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", maybeShowBanner);
      } else {
        maybeShowBanner();
      }

      installRouteListeners();
    })();
  