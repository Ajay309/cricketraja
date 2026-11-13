const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { LocalDatabase } = require("../database");

test("accepted demo bet persists as open and is returned by My Market", (t) => {
  const filePath = path.join(__dirname, `local-db.bet-persistence-${process.pid}.json`);
  const db = new LocalDatabase(filePath);
  let reloaded;
  const originalSetTimeout = global.setTimeout;
  const longTimers = [];

  global.setTimeout = function (callback, delay, ...args) {
    const timer = originalSetTimeout(callback, delay, ...args);
    if (Number(delay) >= 30000) {
      longTimers.push(timer);
    }
    return timer;
  };

  t.after(() => {
    global.setTimeout = originalSetTimeout;
    for (const timer of longTimers) {
      clearTimeout(timer);
    }
    db.flushToDiskNow = () => {};
    if (reloaded) {
      reloaded.flushToDiskNow = () => {};
    }
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  const user = db.createUser({
    username: "demo01",
    password: "demo123",
    displayName: "demo01",
    startingBalance: 1500,
    isDemoUser: true
  });
  const token = db.createSession(user.username);
  const result = db.placeBet(token, {
    etid: "4",
    gameId: "3743668470",
    marketId: "3743668470",
    sectionId: "nz",
    uRate: 2.2,
    oRate: 2.2,
    amount: 100,
    betType: "back",
    eventName: "New Zealand v India",
    marketName: "MATCH_ODDS",
    sectionName: "New Zealand",
    gType: "match",
    profit: 120,
    size: "match",
    min: 100,
    max: 50000
  }, "/api/front/placebet");

  assert.equal(result.success, true);
  const bet = db.state.bets.demo01.find((row) => row.bid === result.data.bid);
  assert.ok(bet);
  assert.equal(bet.status, "OPEN");
  assert.equal(bet.mid, "3743668470");
  assert.equal(bet.urate, 2.2);
  assert.equal(bet.amount, 100);
  assert.equal(bet.btype, "back");
  assert.equal(user.balance, 1500);
  assert.equal(user.exposure, -100);
  assert.equal(result.data.available_balance, 1400);

  db.flushNow();
  const persisted = JSON.parse(fs.readFileSync(filePath, "utf8"));
  assert.equal(persisted.bets.demo01.find((row) => row.bid === bet.bid).status, "OPEN");
  assert.equal(persisted.users.demo01.balance, 1500);
  assert.equal(persisted.users.demo01.exposure, -100);

  reloaded = new LocalDatabase(filePath);
  const myMarket = reloaded.listOpenBets(token, {});
  assert.equal(myMarket.success, true);
  assert.ok(myMarket.data.some((row) => row.bid === bet.bid));
  assert.equal(myMarket.data.find((row) => row.bid === bet.bid).status, "OPEN");
  assert.equal(reloaded.state.users.demo01.balance, 1500);
  assert.equal(reloaded.state.users.demo01.exposure, -100);

  const cancelled = reloaded.deleteBet(token, { type: bet.bid });
  assert.equal(cancelled.success, true);
  assert.equal(reloaded.state.bets.demo01.find((row) => row.bid === bet.bid).status, "CANCELLED");
  assert.equal(reloaded.state.users.demo01.balance, 1500);
  assert.equal(reloaded.state.users.demo01.exposure, 0);
});
