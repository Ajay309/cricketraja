const crypto = require("crypto");
const { API_SECRET } = require("./config");

function evpBytesToKey(password, salt, keyLen, ivLen) {
  let derived = Buffer.alloc(0);
  let block = Buffer.alloc(0);

  while (derived.length < keyLen + ivLen) {
    const hash = crypto.createHash("md5");
    hash.update(block);
    hash.update(password);
    hash.update(salt);
    block = hash.digest();
    derived = Buffer.concat([derived, block]);
  }

  return {
    key: derived.subarray(0, keyLen),
    iv: derived.subarray(keyLen, keyLen + ivLen)
  };
}

function encryptPayload(payload) {
  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const salt = crypto.randomBytes(8);
  const { key, iv } = evpBytesToKey(Buffer.from(API_SECRET, "utf8"), salt, 32, 16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([Buffer.from("Salted__"), salt, encrypted]).toString("base64");
}

function decryptPayload(base64Value) {
  const raw = Buffer.from(base64Value, "base64");
  if (raw.length < 16) {
    throw new Error("Encrypted payload is too short.");
  }
  const header = raw.subarray(0, 8).toString("utf8");
  if (header !== "Salted__") {
    throw new Error("Invalid encrypted payload header.");
  }

  const salt = raw.subarray(8, 16);
  const encrypted = raw.subarray(16);
  const { key, iv } = evpBytesToKey(Buffer.from(API_SECRET, "utf8"), salt, 32, 16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const plaintext = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
  return JSON.parse(plaintext);
}

function wrapEncryptedPayload(payload) {
  return { data: encryptPayload(payload) };
}

function unwrapSnapshotPayload(wrapper) {
  if (!wrapper || typeof wrapper !== "object") {
    return wrapper;
  }
  if (typeof wrapper.data !== "string") {
    return wrapper;
  }
  try {
    return decryptPayload(wrapper.data);
  } catch {
    return wrapper;
  }
}

module.exports = {
  encryptPayload,
  decryptPayload,
  wrapEncryptedPayload,
  unwrapSnapshotPayload
};
