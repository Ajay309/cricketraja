(function () {
  var hostname = window.location.hostname || "";
  var cleanHost = hostname.replace(/^www\./i, "");
  var siteName = cleanHost || "example.com";

  function titleize(value) {
    if (!value) {
      return "Our Site";
    }
    var parts = value.split(".");
    var main = parts[0] || value;
    return main.charAt(0).toUpperCase() + main.slice(1);
  }

  var displayName = cleanHost ? titleize(siteName) : "Our Site";

  var nameNodes = document.querySelectorAll("[data-site-name]");
  nameNodes.forEach(function (node) {
    node.textContent = displayName;
  });

  var emailNodes = document.querySelectorAll("[data-site-email]");
  emailNodes.forEach(function (node) {
    var user = node.getAttribute("data-email-user") || "support";
    var email = user + "@" + siteName;
    node.textContent = email;
    if (node.tagName.toLowerCase() === "a") {
      node.setAttribute("href", "mailto:" + email);
    }
  });

  if (document.title.indexOf("Our Site") !== -1) {
    document.title = document.title.replace("Our Site", displayName);
  }

  // Force enable scrolling on mobile
  function enableScroll() {
    document.documentElement.style.setProperty("height", "auto", "important");
    document.documentElement.style.setProperty(
      "overflow-y",
      "auto",
      "important"
    );
    document.body.style.setProperty("height", "auto", "important");
    document.body.style.setProperty("overflow-y", "auto", "important");
    document.body.style.setProperty("position", "static", "important");
    document.body.style.setProperty("overflow-x", "hidden", "important");
  }
  enableScroll();
  window.addEventListener("load", enableScroll);
  setTimeout(enableScroll, 100);
  setTimeout(enableScroll, 500);
})();
