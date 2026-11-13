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

const { startServer } = require("./backend/app");

startServer();
