const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const MAIN_HOST = "allpanelexch9.co";
const MIRROR_HOSTS = [
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
];

const TEXT_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".js",
  ".css",
  ".json",
  ".txt",
  ".xml",
  ".svg",
  ".map",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs"
]);

const SKIP_DIRS = new Set([".git", "node_modules"]);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function shouldProcess(filePath) {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) {
        continue;
      }
      walk(path.join(dir, entry.name), out);
      continue;
    }
    const abs = path.join(dir, entry.name);
    if (shouldProcess(abs)) {
      out.push(abs);
    }
  }
  return out;
}

function rewriteMainHost(content) {
  const hostPattern = `${escapeRegex(MAIN_HOST)}(?:\\:\\d+)?`;
  const withSlash = new RegExp(`(?:https?:)?//${hostPattern}/`, "g");
  const bareHost = new RegExp(`(?:https?:)?//${hostPattern}(?=[\"'\\s,<>\\)])`, "g");
  return content.replace(withSlash, "/").replace(bareHost, "");
}

function rewriteMirrorHost(content, host) {
  const hostPattern = escapeRegex(host);
  const hostRegex = new RegExp(`(?:https?:)?//${hostPattern}(?=[/?#]|$)`, "g");
  return content.replace(hostRegex, `/${host}`);
}

function rewriteContent(content) {
  let output = rewriteMainHost(content);
  for (const host of MIRROR_HOSTS) {
    output = rewriteMirrorHost(output, host);
  }
  return output;
}

function normalizeCloudflareHtml(content) {
  let output = content;

  // Rocket Loader rewrites JS script type to "<hash>-text/javascript".
  output = output.replace(
    /\btype=(["'])[a-f0-9]{8,}-text\/javascript\1/gi,
    'type="text/javascript"'
  );

  // Remove Cloudflare-only script attributes not needed on local/self-hosted copy.
  output = output.replace(/\sdata-cf-settings=(["'])[^"']*\1/gi, "");
  output = output.replace(/\sdata-cfasync=(["'])[^"']*\1/gi, "");

  // Remove Rocket Loader bootstrap tag.
  output = output.replace(
    /<script[^>]+src=["']\/cdn-cgi\/scripts\/7d0fa10a\/cloudflare-static\/rocket-loader\.min\.js["'][^>]*><\/script>/gi,
    ""
  );

  // Remove Cloudflare challenge bootstrap block that injects /cdn-cgi/challenge-platform/* script.
  output = output.replace(
    /<script>\(function\(\)\{function c\(\)[\s\S]*?challenge-platform\/scripts\/jsd\/main\.js[\s\S]*?<\/script>/gi,
    ""
  );

  return output;
}

function ensureFallbackAssets() {
  const fallbackPairs = [
    [
      path.join(ROOT_DIR, "theme", "sitethemes", "allpanelexch.com", "front", "logo.png"),
      path.join(ROOT_DIR, "theme", "sitethemes", "jsk2468.com", "front", "logo.png")
    ],
    [
      path.join(ROOT_DIR, "front", "v93", "static", "front", "img", "fav-icons", "fav-icon.png"),
      path.join(ROOT_DIR, "theme", "icons", "ic_notify.png")
    ]
  ];

  for (const [source, target] of fallbackPairs) {
    if (!fs.existsSync(source) || fs.existsSync(target)) {
      continue;
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}

function main() {
  const files = walk(ROOT_DIR);
  let changed = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    let rewritten = rewriteContent(original);
    const ext = path.extname(file).toLowerCase();
    if (ext === ".html" || ext === ".htm") {
      rewritten = normalizeCloudflareHtml(rewritten);
    }
    if (rewritten === original) {
      continue;
    }
    fs.writeFileSync(file, rewritten, "utf8");
    changed += 1;
  }

  ensureFallbackAssets();
  console.log(`Localized URLs in ${changed} files.`);
}

main();
