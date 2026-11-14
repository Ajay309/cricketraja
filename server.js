const fs = require("node:fs");
const path = require("node:path");

const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile !== "function") {
    throw new Error("Loading the local .env file requires Node.js 20.6 or newer.");
  }
  process.loadEnvFile(envPath);
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const loaded = require("./backend/app");
// Vercel bundle mein exports .default ke andar aate hain, local mein seedhe
const appModule =
  typeof loaded.createAppServer === "function"
    ? loaded
    : loaded.default && typeof loaded.default.createAppServer === "function"
      ? loaded.default
      : loaded.default || loaded;

// Local: `node server.js`
if (require.main === module) {
  appModule.startServer();
}

// Vercel: listen() nahi, sirf request handler
let server;
module.exports = (req, res) => {
  if (!server) {
    server = appModule.createAppServer();
  }
  server.emit("request", req, res);
};