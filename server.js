const fs = require("node:fs");
const path = require("node:path");

module.exports = (req, res) => {
  const out = { node: process.version };
  const dir = path.join(__dirname, "backend");
  try {
    const p = path.join(dir, "app.cjs");
    const src = fs.readFileSync(p, "utf8");
    out.appCjsSize = src.length;
    out.head = src.slice(0, 500);
    out.tail = src.slice(-400);
    out.hasCreateAppServer = src.includes("createAppServer");
  } catch (e) {
    out.readError = String(e);
  }
  try {
    const m = require("./backend/app");
    out.type = typeof m;
    out.keys = Object.keys(m || {});
  } catch (e) {
    out.requireError = String(e && e.stack ? e.stack : e).split("\n").slice(0, 6);
  }
  try {
    out.rootPkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
  } catch (e) {
    out.rootPkg = "not found";
  }
  res.statusCode = 200;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(out, null, 2));
};