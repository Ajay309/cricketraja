(function installAdminRuntimeGuards() {
  if (window.__ADMIN_RUNTIME_GUARDS_INSTALLED__) {
    return;
  }
  window.__ADMIN_RUNTIME_GUARDS_INSTALLED__ = true;

  var ADMIN_SOCKET_BLOCKLIST = ["nginxx.operator.buzz"];
  var ADMIN_NAV_ALLOWLIST_SUFFIXES = [
    String((window.location && window.location.hostname) || "").toLowerCase(),
    "localhost",
    "127.0.0.1"
  ];
  var lastGestureAt = 0;

  function isHostAllowed(hostname) {
    var host = String(hostname || "")
      .trim()
      .toLowerCase();
    if (!host) {
      return false;
    }
    for (var i = 0; i < ADMIN_NAV_ALLOWLIST_SUFFIXES.length; i += 1) {
      var suffix = String(ADMIN_NAV_ALLOWLIST_SUFFIXES[i] || "").trim().toLowerCase();
      if (!suffix) {
        continue;
      }
      if (host === suffix || host.lastIndexOf("." + suffix) === host.length - suffix.length - 1) {
        return true;
      }
    }
    return false;
  }

  function shouldAllowExternalNavigation(rawUrl) {
    if (window.__ALLOW_ADMIN_EXTERNAL_NAV__ === true) {
      return true;
    }
    var value = String(rawUrl || "").trim();
    if (!value) {
      return true;
    }
    var lowered = value.toLowerCase();
    if (lowered.indexOf("javascript:") === 0 || lowered.indexOf("mailto:") === 0 || lowered.indexOf("tel:") === 0) {
      return true;
    }
    try {
      var parsed = new URL(value, window.location.origin);
      if (parsed.origin === window.location.origin) {
        return true;
      }
      return isHostAllowed(parsed.hostname);
    } catch (_error) {
      return true;
    }
  }

  function createNoopSocket() {
    var socket = {
      connected: false,
      disconnected: true,
      on: function () {
        return socket;
      },
      once: function () {
        return socket;
      },
      off: function () {
        return socket;
      },
      emit: function () {
        return socket;
      },
      connect: function () {
        return socket;
      },
      disconnect: function () {
        return socket;
      },
      open: function () {
        return socket;
      },
      close: function () {
        return socket;
      },
      removeAllListeners: function () {
        return socket;
      }
    };
    return socket;
  }

  function shouldBlockSocketUrl(rawUrl) {
    if (window.__ALLOW_ADMIN_EXTERNAL_SOCKET__ === true) {
      return false;
    }
    var value = String(rawUrl || "").trim();
    if (!value) {
      return false;
    }
    try {
      var parsed = new URL(value, window.location.origin);
      var host = String(parsed.hostname || "").trim().toLowerCase();
      if (!host) {
        return false;
      }
      for (var i = 0; i < ADMIN_SOCKET_BLOCKLIST.length; i += 1) {
        var blocked = ADMIN_SOCKET_BLOCKLIST[i];
        if (host === blocked || host.lastIndexOf("." + blocked) === host.length - blocked.length - 1) {
          return true;
        }
      }
      return !isHostAllowed(host);
    } catch (_error) {
      return false;
    }
  }

  function wrapIoFactory(ioFactory) {
    if (typeof ioFactory !== "function" || ioFactory.__ADMIN_IO_GUARDED__) {
      return ioFactory;
    }
    var wrapped = function guardedIo(url, options) {
      if (shouldBlockSocketUrl(url)) {
        return createNoopSocket();
      }
      return ioFactory.call(this, url, options);
    };
    wrapped.__ADMIN_IO_GUARDED__ = true;
    wrapped.__ADMIN_NATIVE_IO__ = ioFactory;
    for (var key in ioFactory) {
      if (Object.prototype.hasOwnProperty.call(ioFactory, key)) {
        wrapped[key] = ioFactory[key];
      }
    }
    return wrapped;
  }

  function installSocketGuard() {
    if (window.__ADMIN_SOCKET_GUARD_INSTALLED__) {
      return;
    }
    window.__ADMIN_SOCKET_GUARD_INSTALLED__ = true;

    var ioValue = window.io;

    function setWrappedIo(nextValue) {
      ioValue = wrapIoFactory(nextValue);
      return ioValue;
    }

    function tryWrap() {
      if (typeof ioValue === "function" && !ioValue.__ADMIN_IO_GUARDED__) {
        ioValue = wrapIoFactory(ioValue);
      }
      if (typeof window.io !== "function" || window.io.__ADMIN_IO_GUARDED__) {
        return false;
      }
      try {
        window.io = setWrappedIo(window.io);
        return true;
      } catch (_error) {
        return false;
      }
    }

    try {
      var descriptor = Object.getOwnPropertyDescriptor(window, "io");
      if (!descriptor || descriptor.configurable) {
        Object.defineProperty(window, "io", {
          configurable: true,
          enumerable: true,
          get: function () {
            return ioValue;
          },
          set: function (nextValue) {
            ioValue = setWrappedIo(nextValue);
          }
        });
      }
    } catch (_descriptorError) {}

    if (typeof ioValue === "function") {
      ioValue = wrapIoFactory(ioValue);
    }

    if (tryWrap()) {
      return;
    }

    var handle = window.setInterval(function () {
      if (tryWrap()) {
        window.clearInterval(handle);
      }
    }, 50);

    window.setTimeout(function () {
      window.clearInterval(handle);
    }, 15000);
  }

  function installOpenGuard() {
    if (window.__ADMIN_OPEN_GUARD_INSTALLED__) {
      return;
    }
    window.__ADMIN_OPEN_GUARD_INSTALLED__ = true;
    if (typeof document !== "undefined" && document.addEventListener) {
      var markGesture = function () {
        lastGestureAt = Date.now();
      };
      document.addEventListener("click", markGesture, true);
      document.addEventListener("keydown", markGesture, true);
      document.addEventListener("touchstart", markGesture, true);
    }
    if (typeof window.open !== "function") {
      return;
    }
    var nativeOpen = window.open.bind(window);
    window.open = function guardedOpen(url, target, features) {
      if (shouldAllowExternalNavigation(url)) {
        return nativeOpen(url, target, features);
      }
      if (Date.now() - lastGestureAt < 1200) {
        return nativeOpen(url, target, features);
      }
      return null;
    };
  }

  function installInactivityReloadGuard(reloadAfterSeconds) {
    if (window.__ADMIN_FOCUS_GUARD_STATE__ && window.__ADMIN_FOCUS_GUARD_STATE__.installed) {
      return window.__ADMIN_FOCUS_GUARD_STATE__;
    }
    var threshold = Number(reloadAfterSeconds);
    if (!isFinite(threshold) || threshold < 5) {
      threshold = 20;
    }
    var state = {
      installed: true,
      outSeconds: 0,
      timerId: null,
      threshold: threshold
    };
    window.__ADMIN_FOCUS_GUARD_STATE__ = state;

    window.addEventListener("blur", function () {
      if (state.timerId) {
        return;
      }
      state.timerId = window.setInterval(function () {
        state.outSeconds += 1;
      }, 1000);
    });

    window.addEventListener("focus", function () {
      if (state.outSeconds >= state.threshold) {
        window.location.reload();
        return;
      }
      state.outSeconds = 0;
      if (state.timerId) {
        window.clearInterval(state.timerId);
        state.timerId = null;
      }
    });

    return state;
  }

  window.__adminInstallFocusReloadGuard = installInactivityReloadGuard;
  installSocketGuard();
  installOpenGuard();
})();

$(document).ready(function () {
  initTables();

  $(".sidebar-toggle").click(function () {
    if ($("#body").hasClass("sidebar-collapse")) {
      settogglenavigation("sidebar-collapse");
    } else {
      settogglenavigation("sidebar-collapsenon");
    }
    // window.location.href=base_url+"users/dashboard";
  });
});
function settogglenavigation(getvalue) {
  $.ajax({
    url: base_url + "users/settogglenavigation",
    type: "post",
    data: { setdefaulttoggle: getvalue },
    success: function (data) {},
    error: function (xhr, desc, err) {},
  });
}
function initTables() {
  $("table.dyntable:visible").each(function (i, ele) {
    var $table = $(ele);
    if (!$table.length || !(window && window.jQuery && $.fn && $.fn.dataTable)) {
      return;
    }
    if ($.fn.dataTable.isDataTable($table)) {
      return;
    }
    var source = $table.attr("source");
    var jsonStr = String($table.attr("jsonInfo") || "").trim();
    var columnsConfig = [];
    if (jsonStr) {
      try {
        columnsConfig = JSON.parse(jsonStr);
      } catch (_jsonError) {
        // Legacy pages still use JS-like arrays in jsonInfo.
        try {
          columnsConfig = eval(jsonStr);
        } catch (_legacyError) {
          columnsConfig = [];
        }
      }
    }

    $table.dataTable({
      searchable: true,
      pageLength: 10,
      sortable: true,
      serverSide: true,
      processing: true,
      pagingType: "full_numbers",
      ajax: source,
      columns: columnsConfig,
      dom: "lBfrtip",
      responsive: true,
      buttons: [
        {
          extend: "copyHtml5",
          exportOptions: {
            columns: ":visible",
          },
        },
        {
          extend: "excelHtml5",
          exportOptions: {
            columns: ":visible",
          },
        },
        {
          extend: "pdfHtml5",
          exportOptions: {
            columns: ":visible",
          },
        },
        "colvis",
      ],
    });

    var dtInstance = $table.dataTable();
    if (dtInstance && typeof dtInstance.fnFilterOnReturn === "function") {
      dtInstance.fnFilterOnReturn();
    }
  });
}

function timer_contdown(times) {
  var countDownDate = new Date(times).getTime();
  var timerNode = document.getElementById("timer1");
  var afterFiveNode = document.getElementById("after-five");
  if (!timerNode) {
    return;
  }
  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    timerNode.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    // If the count down is over, write some text

    if (distance < 300000) {
      $(".payment_block_offer").show();
      if (afterFiveNode) {
        afterFiveNode.innerHTML = minutes + "min " + seconds + "sek ";
      }
    }

    if (distance < 0) {
      clearInterval(x);
      timerNode.innerHTML = "EXPIRED";
      if (afterFiveNode) {
        afterFiveNode.innerHTML = "EXPIRED";
      }
    }
  }, 1000);
}

(function () {
  function matchesAny(pathname, list) {
    for (var i = 0; i < list.length; i += 1) {
      if (pathname.indexOf(list[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  function normalizeUserType(value) {
    var raw = String(value || "").trim().toLowerCase();
    if (!raw) return "User";
    if (raw.indexOf("hyper") >= 0 || raw.indexOf("owner") >= 0 || raw === "super senior" || raw === "supersenior") {
      return "Hyper Super Master";
    }
    if (raw.indexOf("super master") >= 0 || raw === "supermaster" || raw === "admin") {
      return "Super Master";
    }
    if (raw === "master" || raw === "agent") {
      return "Master";
    }
    return "User";
  }

  function roleFromType(type) {
    if (type === "Hyper Super Master") return "owner";
    if (type === "Super Master") return "super_master";
    if (type === "Master") return "master";
    return "user";
  }

  function typeToPathSegment(type) {
    var normalized = normalizeUserType(type);
    if (normalized === "Hyper Super Master") return "hypersupermaster";
    if (normalized === "Super Master") return "supermaster";
    if (normalized === "Master") return "master";
    return "user";
  }

  function downlineTypeForRole(role) {
    if (role === "owner") return "Super Master";
    if (role === "super_master") return "Master";
    if (role === "master") return "User";
    return "User";
  }

  function allowedTypesForRole(role) {
    if (role === "owner") return ["Super Master", "Master", "User"];
    if (role === "super_master") return ["Master", "User"];
    if (role === "master") return ["User"];
    return [];
  }

  function uniqueTypes(types) {
    var out = [];
    for (var i = 0; i < types.length; i += 1) {
      var normalized = normalizeUserType(types[i]);
      if (normalized === "Hyper Super Master") {
        continue;
      }
      if (out.indexOf(normalized) === -1) {
        out.push(normalized);
      }
    }
    return out;
  }

  function toNumberSafe(value) {
    if (typeof value === "number" && isFinite(value)) {
      return value;
    }
    var parsed = parseFloat(String(value || "").replace(/,/g, "").replace(/[^\d.-]/g, ""));
    return isFinite(parsed) ? parsed : 0;
  }

  function formatAmount(value) {
    var amount = toNumberSafe(value);
    try {
      return amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } catch (e) {
      return String(amount.toFixed(2));
    }
  }

  function buildRoleContext(res) {
    var user = (res && res.user_list) || {};
    var userType = normalizeUserType(user.user_type || "");
    var role = roleFromType(userType);
    var allowed = Array.isArray(user.allowed_listing_types) ? uniqueTypes(user.allowed_listing_types) : [];
    if (!allowed.length) {
      allowed = allowedTypesForRole(role);
    }
    var rawDefaultDownline = String(user.default_downline_role || "").trim();
    var defaultDownline = rawDefaultDownline ? normalizeUserType(rawDefaultDownline) : downlineTypeForRole(role);
    if (defaultDownline === "Hyper Super Master") {
      defaultDownline = downlineTypeForRole(role);
    }
    return {
      role: role,
      userType: userType,
      allowedTypes: allowed,
      defaultDownlineType: defaultDownline,
      username: String(user.username || "").trim(),
      displayName: String(user.display_name || "").trim(),
      balance: toNumberSafe(user.balance),
      isOwner: Boolean(user.is_owner)
    };
  }

  function hideAnchorAndContainer($anchor) {
    if (!$anchor || !$anchor.length) return;
    var $container = $anchor.closest("li");
    if (!$container.length) {
      $container = $anchor.closest(".shortcut-card");
    }
    if (!$container.length) {
      $container = $anchor.closest(".col-md-2, .col-lg-2, .col-sm-6, .col-6, .icon-box, .card").first();
    }
    if ($container.length) {
      $container.hide();
      return;
    }
    $anchor.hide();
  }

  function applyHeaderUsername(context) {
    var resolvedName = String(context.username || context.displayName || "admin").trim();
    if (!resolvedName) {
      return;
    }
    $(".userName").text(resolvedName);
    $(".balanceHeading span[onclick*='openNav33']").each(function () {
      var $el = $(this);
      if (!$el.find("svg").length) {
        $el.text(resolvedName);
      }
    });
  }

  function applyHeaderBalance(value) {
    var formatted = formatAmount(value);
    $(".mWallet").each(function () {
      $(this).text(formatted);
    });
  }

  function syncHeaderBalance() {
    if (!(window && window.jQuery) || window.__adminBalanceSyncInFlight) {
      return;
    }
    window.__adminBalanceSyncInFlight = true;
    $.ajax({
      url: "/admin/admin/dashboard/getDashboardData",
      method: "POST",
      dataType: "json",
      success: function (data) {
        if (data && typeof data.balance !== "undefined") {
          applyHeaderBalance(data.balance);
        }
      },
      complete: function () {
        window.__adminBalanceSyncInFlight = false;
      }
    });
  }

  function startHeaderBalanceAutoRefresh(context) {
    if (context && typeof context.balance !== "undefined") {
      applyHeaderBalance(context.balance);
    }
    syncHeaderBalance();
    if (typeof document !== "undefined" && typeof document.addEventListener === "function") {
      document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
          syncHeaderBalance();
        }
      });
    }
    if (!window.__adminBalanceSyncInterval) {
      window.__adminBalanceSyncInterval = window.setInterval(function () {
        if (typeof document !== "undefined" && document.hidden) {
          return;
        }
        syncHeaderBalance();
      }, 10000);
    }
  }

  function applyRoleBasedMenu(context) {
    var allowedTypes = context.allowedTypes || [];
    var defaultType = allowedTypes.length ? allowedTypes[0] : downlineTypeForRole(context.role);
    var defaultSegment = typeToPathSegment(defaultType);
    var allowedSegments = {};

    for (var i = 0; i < allowedTypes.length; i += 1) {
      allowedSegments[typeToPathSegment(allowedTypes[i])] = true;
    }

    var $ownerAdminLinks = $("a[href*='/admin/admin/users/hypersupermaster']");
    $ownerAdminLinks.each(function () {
      var $a = $(this);
      var text = String($a.text() || "").toLowerCase();
      if (text.indexOf("owner admin") !== -1) {
        hideAnchorAndContainer($a);
        return;
      }
      // Old generic "Users" shortcuts were hardcoded to owner listing; route them to current role view.
      $a.attr("href", "/admin/admin/users/" + defaultSegment);
    });

    var listingSelectors = {
      supermaster: "a[href*='/admin/admin/users/supermaster']",
      master: "a[href*='/admin/admin/users/master']",
      user: "a[href*='/admin/admin/users/user']"
    };

    Object.keys(listingSelectors).forEach(function (segment) {
      $(listingSelectors[segment]).each(function () {
        if (!allowedSegments[segment]) {
          hideAnchorAndContainer($(this));
        }
      });
    });

    $("a[href*='/admin/admin/closedusers/']").each(function () {
      var $a = $(this);
      if (!allowedTypes.length) {
        hideAnchorAndContainer($a);
        return;
      }
      $a.attr("href", "/admin/admin/closedusers/" + defaultSegment);
    });

    if (!context.isOwner) {
      $("a").each(function () {
        var $anchor = $(this);
        var text = String($anchor.text() || "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (text === "payments") {
          hideAnchorAndContainer($anchor);
        }
      });

      [
        "a[href*='/admin/payment-methods']",
        "a[href*='/admin/admin/payment-methods']",
        "a[href*='/admin/all-deposit-requests']",
        "a[href*='/admin/admin/all-deposit-requests']",
        "a[href*='/admin/all-withdraw-requests']",
        "a[href*='/admin/admin/all-withdraw-requests']",
        "a[href*='/admin/utr-numbers-list']",
        "a[href*='/admin/admin/utr-numbers-list']"
      ].forEach(function (selector) {
        $(selector).each(function () {
          hideAnchorAndContainer($(this));
        });
      });

      [
        "a[href*='/admin/addfunds']",
        "a[href*='/admin/admin/addfunds']",
        "a[href*='/admin/admin/my_market']",
        "a[href*='/admin/gameclientbet']",
        "a[href*='/admin/profitloss']",
        "a[href*='/admin/bethistory']",
        "a[href*='/admin/transaction-history-admin']",
        "a[href*='/admin/income-report']",
        "a[href*='/admin/clientpl']",
        "a[href*='/admin/sportspl']",
        "a[href*='/admin/new_chipsummary']",
        "a[href*='/admin/admin/acStatement']"
      ].forEach(function (selector) {
        $(selector).each(function () {
          var $anchor = $(this);
          hideAnchorAndContainer($anchor);
          var $dropdown = $anchor.closest(".sidebar-dropdown");
          if ($dropdown.length) {
            $dropdown.hide();
          }
        });
      });

      $(".sidebar-dropdown > a").each(function () {
        var $anchor = $(this);
        var text = String($anchor.text() || "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
        if (text === "report") {
          hideAnchorAndContainer($anchor);
        }
      });
    }

    var resolvedDownline = context.defaultDownlineType || downlineTypeForRole(context.role);
    var $userType = $("#user_type");
    if ($userType.length) {
      if ($userType.is("select")) {
        $userType.find("option").each(function () {
          var $option = $(this);
          var optionType = normalizeUserType($option.val());
          if (optionType !== resolvedDownline) {
            $option.remove();
          }
        });
      }
      $userType.val(resolvedDownline);
    }
  }

  function isSmallScreen() {
    return !!(
      window &&
      window.matchMedia &&
      window.matchMedia("(max-width: 1023px)").matches
    );
  }

  function shouldRenderDock() {
    if (!isSmallScreen()) {
      return false;
    }

    var pathname = (window.location.pathname || "").toLowerCase();
    var noDockPaths = [
      "/admin/login",
      "/admin/logout",
      "/admin/index",
      "/admin.99-exch.red/login",
      "/admin.99-exch.red/logout",
      "/admin.99-exch.red/index"
    ];

    if (pathname === "/admin" || pathname === "/admin.99-exch.red") {
      return false;
    }

    return !matchesAny(pathname, noDockPaths);
  }

  function getActiveKey() {
    var pathname = (window.location.pathname || "").toLowerCase();
    if (matchesAny(pathname, ["/all-utr-numbers-list", "/utr-numbers-list", "/utr-numbers"])) {
      return "utr";
    }
    if (matchesAny(pathname, ["/admin/users", "/closedusers", "/viewinfo"])) {
      return "users";
    }
    if (matchesAny(pathname, ["/all-deposit-requests", "/deposituser", "/deposit-requests"])) {
      return "deposit";
    }
    if (matchesAny(pathname, ["/all-withdraw-requests", "/withdrawuser", "/withdraw-requests"])) {
      return "withdraw";
    }
    return "home";
  }

  function injectDockStyles() {
    if (document.getElementById("admin-mobile-dock-style")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "admin-mobile-dock-style";
    style.textContent =
      "@media (max-width:1023px){" +
      "body.admin-mobile-dock-enabled{padding-bottom:84px !important;}" +
      ".admin-mobile-dock{position:fixed;left:0;right:0;bottom:0;z-index:9999;background: #8a5400;color: #fff;border-top:1px solid rgba(255,255,255,.2);font-family:inherit;}" +
      ".admin-mobile-dock ul{margin:0;padding:8px 8px 10px;list-style:none;display:grid;grid-template-columns:repeat(var(--dock-items,5),minmax(0,1fr));align-items:end;}" +
      ".admin-mobile-dock li{display:flex;justify-content:center;}" +
      ".admin-mobile-dock a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color: #fff;text-decoration:none;font-size:11px;line-height:1.1;min-height:56px;padding:4px 2px;border-radius:10px;width:100%;}" +
      ".admin-mobile-dock a i{font-size:18px;line-height:1;}" +
      ".admin-mobile-dock a.active{color: #ffe59c;}" +
      ".admin-mobile-dock li.center{transform:translateY(-22px);}" +
      ".admin-mobile-dock li.center a{width:74px;height:74px;min-height:74px;border-radius:999px;background: #8a5400;box-shadow: 0 1px 0 rgba(255,255,255,.18) inset, 0 -1px 0 rgba(0,0,0,.25) inset;}" +
      ".admin-mobile-dock li.center a i{font-size:24px;}" +
      ".admin-mobile-dock li.center a span{font-size:13px;font-weight:600;}" +
      "}";
    document.head.appendChild(style);
  }

  function buildDock(context) {
    if (!shouldRenderDock()) {
      return;
    }
    if (document.querySelector(".admin-mobile-dock")) {
      return;
    }

    var allowedTypes = context.allowedTypes || [];
    var defaultType = allowedTypes.length ? allowedTypes[0] : downlineTypeForRole(context.role);
    var usersHref = "/admin/admin/users/" + typeToPathSegment(defaultType);

    injectDockStyles();
    document.body.classList.add("admin-mobile-dock-enabled");

    var activeKey = getActiveKey();
    var showPaymentShortcuts = Boolean(context && context.isOwner);
    var items = showPaymentShortcuts
      ? [
          { key: "utr", href: "/admin/utr-numbers-list", label: "UTR", icon: "fas fa-link", center: false },
          { key: "users", href: usersHref, label: "Users", icon: "fas fa-users", center: false },
          { key: "home", href: "/admin/dashboard", label: "Home", icon: "fas fa-home", center: true },
          { key: "deposit", href: "/admin/all-deposit-requests", label: "Deposit", icon: "fas fa-money-bill-wave", center: false },
          { key: "withdraw", href: "/admin/all-withdraw-requests", label: "Withdraw", icon: "fas fa-hand-holding-usd", center: false }
        ]
      : [
          { key: "users", href: usersHref, label: "Users", icon: "fas fa-users", center: false },
          { key: "home", href: "/admin/dashboard", label: "Home", icon: "fas fa-home", center: false }
        ];

    var nav = document.createElement("nav");
    nav.className = "admin-mobile-dock";
    nav.setAttribute("aria-label", "Admin quick menu");
    nav.style.setProperty("--dock-items", String(items.length || 1));

    var list = document.createElement("ul");
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var li = document.createElement("li");
      if (item.center) {
        li.className = "center";
      }

      var link = document.createElement("a");
      link.href = item.href;
      if (item.key === activeKey) {
        link.className = "active";
      }

      var icon = document.createElement("i");
      icon.className = item.icon;
      icon.setAttribute("aria-hidden", "true");

      var label = document.createElement("span");
      label.textContent = item.label;

      link.appendChild(icon);
      link.appendChild(label);
      li.appendChild(link);
      list.appendChild(li);
    }

    nav.appendChild(list);
    document.body.appendChild(nav);
  }

  function fetchRoleContext(done) {
    if (!(window && window.jQuery)) {
      done(buildRoleContext(null));
      return;
    }
    $.ajax({
      url: "/admin/login/Admin/get_register_Data",
      method: "GET",
      dataType: "json",
      success: function (res) {
        done(buildRoleContext(res));
      },
      error: function () {
        done(buildRoleContext(null));
      }
    });
  }

  function bootstrapAdminUi() {
    fetchRoleContext(function (context) {
      window.__adminRoleContext = context;
      applyHeaderUsername(context);
      startHeaderBalanceAutoRefresh(context);
      applyRoleBasedMenu(context);
      buildDock(context);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrapAdminUi);
  } else {
    bootstrapAdminUi();
  }
})();
