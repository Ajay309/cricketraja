const assert = require("node:assert/strict");
const test = require("node:test");
const axios = require("axios");
const { fetchOddsApiMatches, fetchOddsApiOdds } = require("../odds-api");

test("live odds use header auth and unsupported sections stay suspended without selections", async () => {
  const originalGet = axios.get;
  const originalEnv = {
    ODDS_API_KEY: process.env.ODDS_API_KEY,
    ODDS_API_KEYS_CRICKET: process.env.ODDS_API_KEYS_CRICKET,
    ODDS_API_TIME_FORMAT: process.env.ODDS_API_TIME_FORMAT
  };
  const requests = [];
  process.env.ODDS_API_KEY = "test-key";
  process.env.ODDS_API_KEYS_CRICKET = "cricket_odi";
  process.env.ODDS_API_TIME_FORMAT = "";
  axios.get = async (url, config) => {
    requests.push({ url, config });
    return {
      data: [
        {
          id: "12345678-match",
          home_team: "India",
          away_team: "New Zealand",
          commence_time: "2026-11-13T02:00:00Z",
          bookmakers: [
            {
              markets: [
                {
                  key: "h2h",
                  outcomes: [
                    { name: "India", price: 1.9 },
                    { name: "New Zealand", price: 2.1 }
                  ]
                }
              ]
            }
          ]
        }
      ],
      headers: {}
    };
  };

  try {
    const matches = await fetchOddsApiMatches("cricket");
    const odds = await fetchOddsApiOdds("cricket", matches[0].gmid);

    assert.equal(matches.length, 1);
    assert.match(matches[0].stime, /^\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2} [AP]M$/);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].config.headers["x-api-key"], "test-key");
    assert.equal(Object.hasOwn(requests[0].config.params, "apiKey"), false);
    assert.equal(odds.t1[0].status, "OPEN");
    assert.equal(odds.t1[0].t2[0].b1, 1.9);
    assert.equal(odds.t1.length, 9);
    assert.ok(odds.t1.slice(1).every((market) =>
      market.status === "SUSPENDED" &&
      market.t2.length === 0 &&
      market.t1.length === 0 &&
      market.mname.includes("Odds unavailable")
    ));
  } finally {
    axios.get = originalGet;
    for (const [name, value] of Object.entries(originalEnv)) {
      if (value === undefined) {
        delete process.env[name];
      } else {
        process.env[name] = value;
      }
    }
  }
});
