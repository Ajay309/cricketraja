(function ($) {
  $.fn.menumaker = function (options) {
    var cssmenu = $(this),
      settings = $.extend(
        {
          format: "dropdown",
          sticky: false,
        },
        options
      );
    return this.each(function () {
      $(this)
        .find(".button")
        .on("click", function () {
          $(this).toggleClass("menu-opened");
          var mainmenu = $(this).next("ul");
          if (mainmenu.hasClass("open")) {
            mainmenu.slideToggle().removeClass("open");
          } else {
            mainmenu.slideToggle().addClass("open");
            if (settings.format === "dropdown") {
              mainmenu.find("ul").show();
            }
          }
        });
      cssmenu.find("li ul").parent().addClass("has-sub");
      multiTg = function () {
        cssmenu
          .find(".has-sub")
          .prepend('<span class="submenu-button"></span>');
        cssmenu.find(".submenu-button").on("click", function () {
          $(this).toggleClass("submenu-opened");
          if ($(this).siblings("ul").hasClass("open")) {
            $(this).siblings("ul").removeClass("open").slideToggle();
          } else {
            $(this).siblings("ul").addClass("open").slideToggle();
          }
        });
      };
      if (settings.format === "multitoggle") multiTg();
      else cssmenu.addClass("dropdown");
      if (settings.sticky === true) cssmenu.css("position", "fixed");
      resizeFix = function () {
        var mediasize = 920;
        if ($(window).width() > mediasize) {
          cssmenu.find("ul").show();
        }
        if ($(window).width() <= mediasize) {
          cssmenu.find("ul").hide().removeClass("open");
        }
      };
      resizeFix();
      return $(window).on("resize", resizeFix);
    });
  };
})(jQuery);

(function ($) {
  $(document).ready(function () {
    $("#cssmenu").menumaker({
      format: "multitoggle",
    });
  });
})(jQuery);

(function () {
  if (window.__motherPanelHostingUiInstalled) return;
  window.__motherPanelHostingUiInstalled = true;

  function normalizePath(pathname) {
    return String(pathname || "")
      .replace(/\/+$/, "")
      .toLowerCase();
  }

  function isDashboardRoute() {
    const pathname = normalizePath(window.location.pathname);
    return pathname === "/admin/dashboard" || pathname === "/admin.99-exch.red/dashboard";
  }

  function getHostingMode() {
    const value = new URL(window.location.href).searchParams.get("hosting");
    return String(value || "").trim().toLowerCase();
  }

  function showNotice(type, text) {
    const safeText = String(text || "");
    if (window.PNotify) {
      new PNotify({
        title: type === "error" ? "Error" : "Success",
        text: safeText,
        type: type === "error" ? "error" : "success",
        styling: "bootstrap3",
        delay: 1800
      });
      return;
    }
    if (safeText) {
      alert(safeText);
    }
  }

  async function api(path, options = {}) {
    const init = {
      method: options.method || "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    };
    if (options.body !== undefined) {
      init.body = JSON.stringify(options.body);
    }
    const response = await fetch(path, init);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.success === false) {
      throw new Error(
        String(payload.message || `Request failed (${response.status})`).trim() || "Request failed."
      );
    }
    return payload;
  }

  function ensureSidebarHostingMenu() {
    const navLists = document.querySelectorAll(".sidebar-menu ul.nav");
    navLists.forEach((list) => {
      if (!list || list.querySelector('[data-hosting-menu="1"]')) return;

      const wrapper = document.createElement("li");
      wrapper.className = "sidebar-dropdown";
      wrapper.setAttribute("data-hosting-menu", "1");

      const titleLink = document.createElement("a");
      titleLink.href = "#";
      titleLink.className = "head-link endcooki";
      titleLink.style.color = "#212529";
      titleLink.innerHTML = "<span></span>Hosting";

      const submenu = document.createElement("div");
      submenu.className = "sidebar-submenu";
      submenu.style.display = "none";
      submenu.innerHTML =
        '<ul>' +
        '<li><a class="head-link endcooki" style="color:#212529" href="/admin/dashboard?hosting=domains">Domains</a></li>' +
        '<li><a class="head-link endcooki" style="color:#212529" href="/admin/dashboard?hosting=mirrors">Mirror Domains</a></li>' +
        '<li><a class="head-link endcooki" style="color:#212529" href="/admin/dashboard?hosting=dns">DNS Management</a></li>' +
        "</ul>";

      titleLink.addEventListener("click", function (event) {
        event.preventDefault();
        const open = submenu.style.display === "block";
        submenu.style.display = open ? "none" : "block";
        wrapper.classList.toggle("active", !open);
      });

      wrapper.appendChild(titleLink);
      wrapper.appendChild(submenu);

      const insertBeforeNode =
        list.querySelector('a[href="/admin/change-password"]') &&
        list.querySelector('a[href="/admin/change-password"]').closest("li");
      if (insertBeforeNode) {
        list.insertBefore(wrapper, insertBeforeNode);
      } else {
        list.appendChild(wrapper);
      }
    });
  }

  function addHostingStyles() {
    if (document.getElementById("hosting-inline-style")) return;
    const style = document.createElement("style");
    style.id = "hosting-inline-style";
    style.textContent = `
.hosting-panel { margin-top: 8px; }
.hosting-panel .hosting-card {background: #fff; border-radius: 12px; padding: 12px; margin-top: 10px;box-shadow: 0 4px 14px rgba(0,0,0,.16); }
.hosting-panel .hosting-title {color: #6B3E1E; font-weight: 700; margin: 0 0 8px; }
.hosting-panel .hosting-meta {color: #6B3E1E; font-size: 12px; margin: 0 0 12px; }
.hosting-panel .date-filter-bar a.date-btn { text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
.hosting-panel .date-filter-bar .active {border-color: #8B5A2B;color: #6B3E1E;box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.16); }
.hosting-panel .btn { width: auto !important; min-width: 120px; }
.hosting-panel .form-check-label {color: #6B3E1E; }
.hosting-panel .table-wrap {background: #fff; border-radius: 12px; padding: 10px;box-shadow: 0 4px 14px rgba(0,0,0,.16); }
.hosting-panel .table td, .hosting-panel .table th { vertical-align: middle; }
`;
    document.head.appendChild(style);
  }

  function renderTabs(mode) {
    return (
      '<div class="date-filter-bar">' +
      `<a class="date-btn ${mode === "domains" ? "active" : ""}" href="/admin/dashboard?hosting=domains">Domains</a>` +
      `<a class="date-btn ${mode === "mirrors" ? "active" : ""}" href="/admin/dashboard?hosting=mirrors">Mirror Domains</a>` +
      `<a class="date-btn ${mode === "dns" ? "active" : ""}" href="/admin/dashboard?hosting=dns">DNS Management</a>` +
      "</div>"
    );
  }

  function domainsView() {
    return `
${renderTabs("domains")}
<div class="hosting-card">
  <h3 class="hosting-title">Domain Manager</h3>
  <p class="hosting-meta">Add domain, auto assign port, configure nginx + DNS + optional SSL.</p>
  <form id="hosting-domain-form" class="row" style="row-gap:8px;">
    <div class="col-md-4 col-sm-12"><input class="form-control" name="domain_name" placeholder="example.com" required></div>
    <div class="col-md-2 col-sm-12"><input class="form-control" name="port" type="number" min="1025" max="65535" placeholder="Auto"></div>
    <div class="col-md-3 col-sm-12" style="display:flex;align-items:center;gap:12px;">
      <label class="form-check-label"><input type="checkbox" name="enable_ssl" value="1"> Enable SSL</label>
      <label class="form-check-label"><input type="checkbox" name="deploy_default_app" value="1"> Default App</label>
    </div>
    <div class="col-md-3 col-sm-12"><button class="btn btn-primary" type="submit">Add Domain</button></div>
  </form>
</div>
<div class="table-wrap" style="margin-top:10px;">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead><tr><th>Domain</th><th>Port</th><th>Status</th><th>SSL</th><th>Created</th><th>Actions</th></tr></thead>
      <tbody id="hosting-domains-body"><tr><td colspan="6">Loading...</td></tr></tbody>
    </table>
  </div>
</div>`;
  }

  function deployView() {
    return `
${renderTabs("deploy")}
<div class="hosting-card">
  <h3 class="hosting-title">Deploy Node App</h3>
  <p class="hosting-meta">Upload project.zip, run npm install, and start process with PM2.</p>
  <form id="hosting-deploy-form" class="row" style="row-gap:8px;">
    <div class="col-md-3"><select class="form-control" name="domain" id="deploy-domain-select" required><option value="">Select Domain</option></select></div>
    <div class="col-md-4"><input class="form-control" type="file" id="deploy-zip-file" accept=".zip" required></div>
    <div class="col-md-3"><input class="form-control" name="start_file" placeholder="Optional start file (e.g. app.js)"></div>
    <div class="col-md-2"><button class="btn btn-primary" type="submit">Deploy</button></div>
  </form>
  <div id="deploy-result" style="margin-top:8px;color: #6B3E1E;"></div>
</div>`;
  }

  function mirrorsView() {
    return `
${renderTabs("mirrors")}
<div class="hosting-card">
  <h3 class="hosting-title">Mirror Domains</h3>
  <p class="hosting-meta">Primary Website: <strong id="mirror-primary-domain">Loading...</strong> | Proxy Port: <strong id="mirror-target-port">3000</strong></p>
  <form id="hosting-mirror-form" class="row" style="row-gap:8px;">
    <div class="col-md-4 col-sm-12"><input class="form-control" name="domain_name" placeholder="example2.com" required></div>
    <div class="col-md-3 col-sm-12" style="display:flex;align-items:center;gap:12px;">
      <label class="form-check-label"><input type="checkbox" name="enable_ssl" value="1"> Enable SSL</label>
    </div>
    <div class="col-md-2 col-sm-12"><button class="btn btn-primary" type="submit">Add Domain</button></div>
  </form>
</div>
<div class="table-wrap" style="margin-top:10px;">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead><tr><th>Domain</th><th>Status</th><th>SSL</th><th>Created</th><th>Actions</th></tr></thead>
      <tbody id="hosting-mirrors-body"><tr><td colspan="5">Loading...</td></tr></tbody>
    </table>
  </div>
</div>`;
  }

  function dnsView() {
    return `
${renderTabs("dns")}
<div class="hosting-card">
  <h3 class="hosting-title">DNS Management</h3>
  <form id="hosting-dns-form" class="row" style="row-gap:8px;">
    <div class="col-md-3"><select class="form-control" id="dns-domain-select" name="domain" required><option value="">Select Domain</option></select></div>
    <div class="col-md-2"><select class="form-control" name="type"><option>A</option><option>AAAA</option><option>CNAME</option><option>TXT</option></select></div>
    <div class="col-md-2"><input class="form-control" name="name" value="@" placeholder="@ / www"></div>
    <div class="col-md-3"><input class="form-control" name="value" placeholder="Record value / IP" required></div>
    <div class="col-md-1"><input class="form-control" name="ttl" type="number" min="60" value="120"></div>
    <div class="col-md-1"><button class="btn btn-primary" type="submit">Add</button></div>
  </form>
</div>
<div class="table-wrap" style="margin-top:10px;">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead><tr><th>Type</th><th>Name</th><th>Value</th><th>TTL</th><th>Actions</th></tr></thead>
      <tbody id="hosting-dns-body"><tr><td colspan="5">Select domain to view records.</td></tr></tbody>
    </table>
  </div>
</div>`;
  }

  async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Unable to read zip file."));
      reader.readAsDataURL(file);
    });
  }

  function formatDate(value) {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString();
  }

  async function renderDomainsRows() {
    const tbody = document.getElementById("hosting-domains-body");
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
    try {
      const result = await api("/admin/api/domains");
      const rows = Array.isArray(result.data) ? result.data : [];
      if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="6">No domains added yet.</td></tr>';
        return;
      }
      tbody.innerHTML = rows
        .map(
          (row) =>
            `<tr>
              <td>${row.domain_name || "-"}</td>
              <td>${row.port || "-"}</td>
              <td>${row.status || "-"}</td>
              <td>${row.ssl_status || "-"}</td>
              <td>${formatDate(row.created_at)}</td>
              <td>
                <a class="btn btn-info btn-xs" href="/admin/dashboard?hosting=deploy&domain=${encodeURIComponent(
                  row.domain_name || ""
                )}">Manage</a>
                <button class="btn btn-danger btn-xs hosting-domain-delete" data-domain="${row.domain_name || ""}">Delete</button>
              </td>
            </tr>`
        )
        .join("");
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="6">${error.message}</td></tr>`;
    }
  }

  async function renderMirrorRows() {
    const tbody = document.getElementById("hosting-mirrors-body");
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
    try {
      const result = await api("/admin/api/mirror-domains");
      const rows = Array.isArray(result.data) ? result.data : [];
      const primary = document.getElementById("mirror-primary-domain");
      const port = document.getElementById("mirror-target-port");
      if (primary) primary.textContent = String(result.primary_website || "1xbets.xyz");
      if (port) port.textContent = String(result.proxy_port || "3000");
      if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="5">No mirror domains added yet.</td></tr>';
        return;
      }
      tbody.innerHTML = rows
        .map(
          (row) =>
            `<tr>
              <td>${row.domain_name || "-"}</td>
              <td>${row.status || "-"}</td>
              <td>${row.ssl_status || "-"}</td>
              <td>${formatDate(row.created_at)}</td>
              <td>
                <button class="btn btn-info btn-xs hosting-mirror-view" data-domain="${row.domain_name || ""}">View</button>
                <button class="btn btn-warning btn-xs hosting-mirror-disable" data-domain="${row.domain_name || ""}">Disable</button>
                <button class="btn btn-danger btn-xs hosting-mirror-delete" data-domain="${row.domain_name || ""}">Delete</button>
              </td>
            </tr>`
        )
        .join("");
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
    }
  }

  async function renderDomainOptions(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return [];
    const result = await api("/admin/api/domains");
    const rows = Array.isArray(result.data) ? result.data : [];
    const current = new URL(window.location.href).searchParams.get("domain") || "";
    select.innerHTML = '<option value="">Select Domain</option>' + rows.map((row) => `<option value="${row.domain_name}">${row.domain_name} : ${row.port || "-"}</option>`).join("");
    if (current && rows.some((row) => String(row.domain_name) === current)) {
      select.value = current;
    }
    return rows;
  }

  async function renderDnsRows(domain) {
    const tbody = document.getElementById("hosting-dns-body");
    if (!tbody) return;
    if (!domain) {
      tbody.innerHTML = '<tr><td colspan="5">Select domain to view records.</td></tr>';
      return;
    }
    tbody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
    try {
      const result = await api(`/admin/api/dns?domain=${encodeURIComponent(domain)}`);
      const rows = Array.isArray(result.data) ? result.data : [];
      if (!rows.length) {
        tbody.innerHTML = '<tr><td colspan="5">No DNS records found.</td></tr>';
        return;
      }
      tbody.innerHTML = rows
        .map(
          (row) =>
            `<tr>
              <td>${row.type || "-"}</td>
              <td>${row.name || "-"}</td>
              <td>${row.value || "-"}</td>
              <td>${row.ttl || "-"}</td>
              <td><button class="btn btn-danger btn-xs hosting-dns-delete" data-id="${row.id}" data-domain="${row.domain_name}">Delete</button></td>
            </tr>`
        )
        .join("");
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
    }
  }

  async function mountHostingPage(mode) {
    if (!isDashboardRoute()) return;
    if (!["domains", "mirrors", "deploy", "dns"].includes(mode)) return;
    const container = document.querySelector("body .container");
    if (!container) return;
    addHostingStyles();
    container.classList.add("hosting-panel");
    container.innerHTML =
      mode === "domains"
        ? domainsView()
        : mode === "mirrors"
          ? mirrorsView()
          : mode === "deploy"
            ? deployView()
            : dnsView();

    if (mode === "domains") {
      renderDomainsRows();
      const form = document.getElementById("hosting-domain-form");
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const fd = new FormData(form);
        const payload = {
          domain_name: String(fd.get("domain_name") || "").trim(),
          port: String(fd.get("port") || "").trim(),
          enable_ssl: fd.get("enable_ssl") ? 1 : 0,
          deploy_default_app: fd.get("deploy_default_app") ? 1 : 0
        };
        try {
          const result = await api("/admin/api/domains/add", { method: "POST", body: payload });
          showNotice("success", result.message || "Domain added.");
          form.reset();
          renderDomainsRows();
        } catch (error) {
          showNotice("error", error.message);
        }
      });
      document.addEventListener("click", async function (event) {
        const button = event.target && event.target.closest(".hosting-domain-delete");
        if (!button) return;
        event.preventDefault();
        const domainName = button.getAttribute("data-domain") || "";
        if (!domainName || !confirm(`Delete ${domainName}?`)) return;
        try {
          const result = await api("/admin/api/domains/delete", {
            method: "POST",
            body: { domain_name: domainName }
          });
          showNotice("success", result.message || "Domain deleted.");
          renderDomainsRows();
        } catch (error) {
          showNotice("error", error.message);
        }
      });
    }

    if (mode === "mirrors") {
      renderMirrorRows();
      const form = document.getElementById("hosting-mirror-form");
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const fd = new FormData(form);
        const payload = {
          domain_name: String(fd.get("domain_name") || "").trim(),
          enable_ssl: fd.get("enable_ssl") ? 1 : 0
        };
        try {
          const result = await api("/admin/api/mirror-domains/add", {
            method: "POST",
            body: payload
          });
          showNotice("success", result.message || "Mirror domain added.");
          form.reset();
          renderMirrorRows();
        } catch (error) {
          showNotice("error", error.message);
        }
      });

      document.addEventListener("click", async function (event) {
        const viewButton = event.target && event.target.closest(".hosting-mirror-view");
        if (viewButton) {
          event.preventDefault();
          const domainName = viewButton.getAttribute("data-domain") || "";
          if (!domainName) return;
          try {
            const result = await api(
              `/admin/api/mirror-domains/view?domain=${encodeURIComponent(domainName)}`
            );
            const row = result.data || {};
            alert(
              `Domain: ${row.domain_name || "-"}\nStatus: ${row.status || "-"}\nSSL: ${
                row.ssl_status || "-"
              }\nCreated: ${formatDate(row.created_at)}`
            );
          } catch (error) {
            showNotice("error", error.message);
          }
          return;
        }

        const disableButton = event.target && event.target.closest(".hosting-mirror-disable");
        if (disableButton) {
          event.preventDefault();
          const domainName = disableButton.getAttribute("data-domain") || "";
          if (!domainName || !confirm(`Disable ${domainName}?`)) return;
          try {
            const result = await api("/admin/api/mirror-domains/disable", {
              method: "POST",
              body: { domain_name: domainName }
            });
            showNotice("success", result.message || "Mirror domain disabled.");
            renderMirrorRows();
          } catch (error) {
            showNotice("error", error.message);
          }
          return;
        }

        const deleteButton = event.target && event.target.closest(".hosting-mirror-delete");
        if (deleteButton) {
          event.preventDefault();
          const domainName = deleteButton.getAttribute("data-domain") || "";
          if (!domainName || !confirm(`Delete ${domainName}?`)) return;
          try {
            const result = await api("/admin/api/mirror-domains/delete", {
              method: "POST",
              body: { domain_name: domainName }
            });
            showNotice("success", result.message || "Mirror domain deleted.");
            renderMirrorRows();
          } catch (error) {
            showNotice("error", error.message);
          }
        }
      });
    }

    if (mode === "deploy") {
      await renderDomainOptions("deploy-domain-select");
      const form = document.getElementById("hosting-deploy-form");
      const resultBox = document.getElementById("deploy-result");
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const fd = new FormData(form);
        const domain = String(fd.get("domain") || "").trim();
        const fileInput = document.getElementById("deploy-zip-file");
        const file = fileInput && fileInput.files && fileInput.files[0];
        if (!domain || !file) {
          showNotice("error", "Select domain and zip file.");
          return;
        }
        try {
          resultBox.textContent = "Uploading and deploying...";
          const zipBase64 = await fileToBase64(file);
          const payload = {
            domain,
            start_file: String(fd.get("start_file") || "").trim(),
            zip_base64: zipBase64
          };
          const result = await api("/admin/api/deploy", { method: "POST", body: payload });
          resultBox.textContent = result.message || "Deployment complete.";
          showNotice("success", result.message || "Deployment complete.");
          fileInput.value = "";
        } catch (error) {
          resultBox.textContent = error.message;
          showNotice("error", error.message);
        }
      });
    }

    if (mode === "dns") {
      await renderDomainOptions("dns-domain-select");
      const select = document.getElementById("dns-domain-select");
      renderDnsRows(select.value);
      select.addEventListener("change", function () {
        renderDnsRows(select.value);
      });
      const form = document.getElementById("hosting-dns-form");
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const fd = new FormData(form);
        const payload = {
          domain: String(fd.get("domain") || "").trim(),
          type: String(fd.get("type") || "A").trim(),
          name: String(fd.get("name") || "@").trim(),
          value: String(fd.get("value") || "").trim(),
          ttl: String(fd.get("ttl") || "120").trim()
        };
        try {
          const result = await api("/admin/api/dns/add", { method: "POST", body: payload });
          showNotice("success", result.message || "DNS added.");
          renderDnsRows(payload.domain);
        } catch (error) {
          showNotice("error", error.message);
        }
      });
      document.addEventListener("click", async function (event) {
        const button = event.target && event.target.closest(".hosting-dns-delete");
        if (!button) return;
        event.preventDefault();
        const id = button.getAttribute("data-id");
        const domain = button.getAttribute("data-domain");
        if (!id || !confirm("Delete this DNS record?")) return;
        try {
          const result = await api("/admin/api/dns/delete", {
            method: "POST",
            body: { id, domain }
          });
          showNotice("success", result.message || "DNS deleted.");
          renderDnsRows(domain);
        } catch (error) {
          showNotice("error", error.message);
        }
      });
    }
  }

  function boot() {
    ensureSidebarHostingMenu();
    mountHostingPage(getHostingMode());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
