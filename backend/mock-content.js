const DEFAULT_EVENT_TABS = [
  { eid: 4, etId: 4, ename: "Cricket", cname: "Cricket", name: "Cricket", m: "sports", tab: true, oid: 1, isdefault: true },
  { eid: 1, etId: 1, ename: "Soccer", cname: "Soccer", name: "Soccer", m: "sports", tab: true, oid: 2, isdefault: false },
  { eid: 2, etId: 2, ename: "Tennis", cname: "Tennis", name: "Tennis", m: "sports", tab: true, oid: 3, isdefault: false },
  { eid: 10, etId: 10, ename: "Horse Racing", cname: "Horse Racing", name: "Horse Racing", m: "sports", tab: true, oid: 4, isdefault: false },
  { eid: 65, etId: 65, ename: "Greyhound", cname: "Greyhound", name: "Greyhound", m: "sports", tab: true, oid: 5, isdefault: false },
  { eid: 71, etId: 71, ename: "Live TV", cname: "Live TV", name: "Live TV", m: "sports", tab: true, oid: 6, isdefault: false },
  { eid: 5, etId: 5, ename: "Politics", cname: "Politics", name: "Politics", m: "sports", tab: false, oid: 7, isdefault: false },
  { eid: 43, etId: 43, ename: "Table Tennis", cname: "Table Tennis", name: "Table Tennis", m: "sports", tab: false, oid: 8, isdefault: false },
  { eid: 23, etId: 23, ename: "Basketball", cname: "Basketball", name: "Basketball", m: "sports", tab: false, oid: 9, isdefault: false },
  { eid: 7, etId: 7, ename: "Esoccer", cname: "Esoccer", name: "Esoccer", m: "sports", tab: false, oid: 10, isdefault: false },
  { eid: 3, etId: 3, ename: "Football", cname: "Football", name: "Football", m: "sports", tab: false, oid: 11, isdefault: false }
];


function pad2(value) {
  return String(value).padStart(2, "0");
}

function isoAfter(minutes) {
  const date = new Date(Date.now() + minutes * 60 * 1000);
  const pad = (v) => String(v).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const SPORTS_EVENTS = [
  {
    etid: 1,
    etId: 1,
    gmid: 578013911,
    mid: "578013911",
    etype: "Soccer",
    ename: "NANTES FC (W) V FLEURY 91 (W)",
    gname: "NANTES FC (W) V FLEURY 91 (W)",
    status: "IN-PLAY",
    gtype: "match",
    iscc: 0,
    iplay: true,
    stime: isoAfter(-5),
    bname: "MATCH_ODDS"
  },
  {
    etid: 4,
    etId: 4,
    gmid: 563894245,
    mid: "563894245",
    etype: "Cricket",
    ename: "C MCNALLY V LA TARARUDEE",
    gname: "C MCNALLY V LA TARARUDEE",
    status: "IN-PLAY",
    gtype: "match",
    iscc: 0,
    iplay: true,
    stime: isoAfter(-20),
    bname: "MATCH_ODDS"
  },
  {
    etid: 4,
    etId: 4,
    gmid: 100102,
    mid: "100102",
    etype: "Cricket",
    ename: "England v Pakistan",
    gname: "England v Pakistan",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(45),
    bname: "Match Odds"
  },
  {
    etid: 4,
    etId: 4,
    gmid: 100103,
    mid: "100103",
    etype: "Cricket",
    ename: "ICC Mens T20 World Cup",
    gname: "ICC Mens T20 World Cup",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(80),
    bname: "Bookmaker"
  },
  {
    etid: 4,
    etId: 4,
    gmid: 100104,
    mid: "100104",
    etype: "Cricket",
    ename: "Delhi Capitals XI v Chennai Super Kings XI",
    gname: "Delhi Capitals XI v Chennai Super Kings XI",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(95),
    bname: "Fancy"
  },
  {
    etid: 4,
    etId: 4,
    gmid: 100105,
    mid: "100105",
    etype: "Cricket",
    ename: "SNP XI v GAW XI",
    gname: "SNP XI v GAW XI",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(110),
    bname: "Bookmaker"
  },
  {
    etid: 4,
    etId: 4,
    gmid: 100106,
    mid: "100106",
    etype: "Cricket",
    ename: "Test A v Test B",
    gname: "Test A v Test B",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(135),
    bname: "Bookmaker"
  },
  {
    etid: 4,
    etId: 4,
    gmid: 100107,
    mid: "100107",
    etype: "Cricket",
    ename: "New Zealand T10 v Australia T10",
    gname: "New Zealand T10 v Australia T10",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(150),
    bname: "Match Odds"
  },
  {
    etid: 1,
    etId: 1,
    gmid: 200101,
    mid: "200101",
    etype: "Soccer",
    ename: "Real Madrid v Barcelona",
    gname: "Real Madrid v Barcelona",
    status: "IN-PLAY",
    gtype: "match",
    iscc: 0,
    iplay: true,
    stime: isoAfter(-10),
    bname: "Match Odds"
  },
  {
    etid: 1,
    etId: 1,
    gmid: 200102,
    mid: "200102",
    etype: "Soccer",
    ename: "Liverpool v Arsenal",
    gname: "Liverpool v Arsenal",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(90),
    bname: "Match Odds"
  },
  {
    etid: 2,
    etId: 2,
    gmid: 300101,
    mid: "300101",
    etype: "Tennis",
    ename: "Djokovic v Alcaraz",
    gname: "Djokovic v Alcaraz",
    status: "IN-PLAY",
    gtype: "match",
    iscc: 0,
    iplay: true,
    stime: isoAfter(-5),
    bname: "Match Odds"
  },
  {
    etid: 2,
    etId: 2,
    gmid: 300102,
    mid: "300102",
    etype: "Tennis",
    ename: "Sinner v Medvedev",
    gname: "Sinner v Medvedev",
    status: "UPCOMING",
    gtype: "match",
    iscc: 0,
    iplay: false,
    stime: isoAfter(60),
    bname: "Match Odds"
  }
];

const RACING_HORSE = [
  {
    etid: 10,
    etId: 10,
    gmid: 910101,
    mid: "910101",
    etype: "Horse Racing",
    ename: "Mumbai Race 1",
    status: "IN-PLAY",
    gtype: "horse",
    iscc: 0,
    iplay: true,
    stime: isoAfter(-2),
    cname: "Win"
  },
  {
    etid: 10,
    etId: 10,
    gmid: 910102,
    mid: "910102",
    etype: "Horse Racing",
    ename: "Delhi Race 3",
    status: "UPCOMING",
    gtype: "horse",
    iscc: 0,
    iplay: false,
    stime: isoAfter(25),
    cname: "Win"
  }
];

const RACING_GREYHOUND = [
  {
    etid: 65,
    etId: 65,
    gmid: 965101,
    mid: "965101",
    etype: "Greyhound",
    ename: "Greyhound Sprint 1",
    status: "IN-PLAY",
    gtype: "greyhound",
    iscc: 0,
    iplay: true,
    stime: isoAfter(-3),
    cname: "Win"
  },
  {
    etid: 65,
    etId: 65,
    gmid: 965102,
    mid: "965102",
    etype: "Greyhound",
    ename: "Greyhound Sprint 2",
    status: "UPCOMING",
    gtype: "greyhound",
    iscc: 0,
    iplay: false,
    stime: isoAfter(32),
    cname: "Win"
  }
];

const CASINO_TYPES = [
  { type: "lc", ctype: "lc", cname: "Live Casino", isown: true },
  { type: "vc", ctype: "vc", cname: "Virtual Casino", isown: true },
  { type: "slot", ctype: "slot", cname: "Slot Games", isown: false },
  { type: "xgame", ctype: "xgame", cname: "Crash Games", isown: false }
];

const CASINO_TABS = {
  lc: [
    { gmid: 35, cname: "Teen Patti" },
    { gmid: 36, cname: "Baccarat" },
    { gmid: 37, cname: "Roulette" }
  ],
  vc: [
    { gmid: 45, cname: "Virtual Teen Patti" },
    { gmid: 46, cname: "Virtual Baccarat" }
  ],
  slot: [
    { gmid: 55, cname: "Popular Slots" },
    { gmid: 56, cname: "New Slots" }
  ],
  xgame: [
    { gmid: 65, cname: "Aviator" },
    { gmid: 66, cname: "Mines" }
  ]
};

const CASINO_TABLES = [
  { gmid: 101, gname: "Matka Market", ename: "worli3", ctype: "lc", imgpath: "worli3.gif", status: "OPEN" },
  { gmid: 102, gname: "V VIP Teenpatti 1 Day", ename: "teen1", ctype: "lc", imgpath: "teen1.jpg", status: "OPEN" },
  { gmid: 103, gname: "Dolidana", ename: "dolidana", ctype: "lc", imgpath: "dolidana.gif", status: "OPEN" },
  { gmid: 104, gname: "Mogambo", ename: "mogambo", ctype: "lc", imgpath: "mogambo.gif", status: "OPEN" },
  { gmid: 105, gname: "20-20 Teen Patti VIP 1", ename: "teen20v1", ctype: "lc", imgpath: "teen20v1.jpg", status: "OPEN" },
  { gmid: 106, gname: "Lucky 6", ename: "lucky15", ctype: "lc", imgpath: "lucky15.jpg", status: "OPEN" },
  { gmid: 107, gname: "Beach Roulette", ename: "ourroullete", ctype: "lc", imgpath: "ourroullete.jpg", status: "OPEN" },
  { gmid: 108, gname: "Roulette", ename: "roulette11", ctype: "lc", imgpath: "roulette11.jpg", status: "OPEN" },
  { gmid: 109, gname: "Golden Roulette", ename: "roulette12", ctype: "lc", imgpath: "roulette12.jpg", status: "OPEN" },
  { gmid: 110, gname: "Teenpatti Poison One Day", ename: "poison", ctype: "lc", imgpath: "poison.jpg", status: "OPEN" },
  { gmid: 111, gname: "Unique Teenpatti", ename: "teenunique", ctype: "lc", imgpath: "teenunique.jpg", status: "OPEN" },
  { gmid: 112, gname: "Teenpatti Poison 20-20", ename: "poison20", ctype: "lc", imgpath: "poison20.jpg", status: "OPEN" },
  { gmid: 113, gname: "Unlimited Joker 20-20", ename: "joker20", ctype: "lc", imgpath: "joker20.jpg", status: "OPEN" },
  { gmid: 114, gname: "Teenpatti Joker 20-20", ename: "joker1", ctype: "lc", imgpath: "joker1.jpg", status: "OPEN" },
  { gmid: 115, gname: "Unlimited Joker One Day", ename: "joker120", ctype: "lc", imgpath: "joker120.jpg", status: "OPEN" },
  { gmid: 116, gname: "20-20 Teenpatti C", ename: "teen20c", ctype: "lc", imgpath: "teen20c.jpg", status: "OPEN" },
  { gmid: 117, gname: "Bollywood Casino 2", ename: "btable2", ctype: "lc", imgpath: "btable2.jpg", status: "OPEN" },
  { gmid: 118, gname: "Unique Roulette", ename: "ourroullete", ctype: "lc", imgpath: "ourroullete.jpg", status: "OPEN" },
  { gmid: 119, gname: "Mini Superover", ename: "superover", ctype: "lc", imgpath: "superover.jpg", status: "OPEN" },
  { gmid: 120, gname: "Goal", ename: "goal", ctype: "lc", imgpath: "goal.jpg", status: "OPEN" },
  { gmid: 121, gname: "Andar Bahar 150 Cards", ename: "ab20", ctype: "lc", imgpath: "ab20.jpg", status: "OPEN" },
  { gmid: 122, gname: "Lucky 15", ename: "lucky15", ctype: "lc", imgpath: "lucky15.jpg", status: "OPEN" },
  { gmid: 123, gname: "Super Over 2", ename: "superover2", ctype: "lc", imgpath: "superover2.jpg", status: "OPEN" },
  { gmid: 124, gname: "Queen Top Open Teenpatti", ename: "queen", ctype: "lc", imgpath: "queen.jpg", status: "OPEN" },
  { gmid: 125, gname: "Jack Top Open Teenpatti", ename: "jack", ctype: "lc", imgpath: "queen.jpg", status: "OPEN" },
  { gmid: 126, gname: "Sic Bo 2", ename: "sicbo2", ctype: "lc", imgpath: "sicbo2.jpg", status: "OPEN" },
  { gmid: 127, gname: "Sic Bo", ename: "sicbo", ctype: "lc", imgpath: "sicbo.jpg", status: "OPEN" },
  { gmid: 128, gname: "Ball By Ball", ename: "ballbyball", ctype: "lc", imgpath: "ballbyball.jpg", status: "OPEN" },
  { gmid: 129, gname: "Instant Teenpatti 2.0", ename: "teen120", ctype: "lc", imgpath: "teen120.jpg", status: "OPEN" },
  { gmid: 130, gname: "Teenpatti 1-Day", ename: "teen1", ctype: "lc", imgpath: "teen1.jpg", status: "OPEN" },
  { gmid: 131, gname: "20-20 Teenpatti", ename: "teen20", ctype: "lc", imgpath: "teen20.jpg", status: "OPEN" },
  { gmid: 132, gname: "Teenpatti Test", ename: "teensin", ctype: "lc", imgpath: "teensin.jpg", status: "OPEN" },
  { gmid: 133, gname: "Open Teenpatti", ename: "teen3", ctype: "lc", imgpath: "teen3.jpg", status: "OPEN" },
  { gmid: 134, gname: "Poker 1-Day", ename: "poker", ctype: "lc", imgpath: "poker.jpg", status: "OPEN" },
  { gmid: 135, gname: "Poker 20-20", ename: "poker20", ctype: "lc", imgpath: "poker20.jpg", status: "OPEN" },
  { gmid: 136, gname: "Poker 6 Players", ename: "poker6", ctype: "lc", imgpath: "poker6.jpg", status: "OPEN" },
  { gmid: 137, gname: "Baccarat", ename: "baccarat", ctype: "lc", imgpath: "baccarat.jpg", status: "OPEN" },
  { gmid: 138, gname: "Baccarat 2", ename: "baccarat2", ctype: "lc", imgpath: "baccarat2.jpg", status: "OPEN" },
  { gmid: 139, gname: "20-20 Dragon Tiger", ename: "dt20", ctype: "lc", imgpath: "dt20.jpg", status: "OPEN" },
  { gmid: 140, gname: "Dragon Tiger 6", ename: "dt6", ctype: "lc", imgpath: "dt6.jpg", status: "OPEN" },
  { gmid: 141, gname: "20-20 Dragon Tiger 2", ename: "dt202", ctype: "lc", imgpath: "dt202.jpg", status: "OPEN" },
  { gmid: 142, gname: "Amar Akbar Anthony", ename: "aaa", ctype: "lc", imgpath: "aaa.jpg", status: "OPEN" },
  { gmid: 143, gname: "7 Up & 7 Down", ename: "7updown", ctype: "lc", imgpath: "7updown.jpg", status: "OPEN" },
  { gmid: 144, gname: "32 Cards", ename: "32cards", ctype: "lc", imgpath: "32cards.jpg", status: "OPEN" },
  { gmid: 145, gname: "Lucky 7", ename: "lucky7", ctype: "lc", imgpath: "lucky7.jpg", status: "OPEN" },
  { gmid: 146, gname: "Cricket War", ename: "cricketwar", ctype: "lc", imgpath: "cricketwar.jpg", status: "OPEN" },
  { gmid: 147, gname: "Worli Matka", ename: "worli", ctype: "lc", imgpath: "worli.jpg", status: "OPEN" },
  { gmid: 148, gname: "Dragon Tiger", ename: "dt", ctype: "lc", imgpath: "dt.jpg", status: "OPEN" },
  { gmid: 149, gname: "One Day Teenpatti", ename: "teen1", ctype: "lc", imgpath: "teen1.jpg", status: "OPEN" },
  { gmid: 150, gname: "Andar Bahar", ename: "ab", ctype: "lc", imgpath: "ab.jpg", status: "OPEN" },
  { gmid: 151, gname: "Casino War", ename: "casinowar", ctype: "lc", imgpath: "casinowar.jpg", status: "OPEN" },
  { gmid: 152, gname: "Super Over", ename: "superover", ctype: "lc", imgpath: "superover.jpg", status: "OPEN" },
  { gmid: 153, gname: "Bollywood Casino", ename: "bollywood", ctype: "lc", imgpath: "bollywood.jpg", status: "OPEN" },
  { gmid: 154, gname: "Teenpatti 2.0", ename: "teen2", ctype: "lc", imgpath: "teen2.jpg", status: "OPEN" },
  { gmid: 155, gname: "Baccarat 1", ename: "baccarat1", ctype: "lc", imgpath: "baccarat1.jpg", status: "OPEN" },
  { gmid: 156, gname: "Sic Bo 1", ename: "sicbo1", ctype: "lc", imgpath: "sicbo1.jpg", status: "OPEN" },
  { gmid: 157, gname: "Dragon Tiger 3", ename: "dt3", ctype: "lc", imgpath: "dt3.jpg", status: "OPEN" },
  { gmid: 158, gname: "Matka 1", ename: "matka1", ctype: "lc", imgpath: "matka1.jpg", status: "OPEN" },
  { gmid: 159, gname: "Roulette 1", ename: "roulette1", ctype: "lc", imgpath: "roulette1.jpg", status: "OPEN" },
  { gmid: 160, gname: "Teenpatti 3", ename: "teen3", ctype: "lc", imgpath: "teen3.jpg", status: "OPEN" },
  { gmid: 201, gname: "Sweet Bonanza", ename: "slot1", ctype: "slot", imgpath: "slot1.jpg", status: "OPEN" },
  { gmid: 202, gname: "Gates of Olympus", ename: "slot2", ctype: "slot", imgpath: "slot2.jpg", status: "OPEN" },
  { gmid: 203, gname: "Starlight Princess", ename: "slot3", ctype: "slot", imgpath: "slot3.jpg", status: "OPEN" },
  { gmid: 204, gname: "Sugar Rush", ename: "slot4", ctype: "slot", imgpath: "slot4.jpg", status: "OPEN" },
  { gmid: 205, gname: "Big Bass Splash", ename: "slot5", ctype: "slot", imgpath: "slot5.jpg", status: "OPEN" },
  { gmid: 206, gname: "Wolf Gold", ename: "slot6", ctype: "slot", imgpath: "slot6.jpg", status: "OPEN" },
  { gmid: 207, gname: "The Dog House", ename: "slot7", ctype: "slot", imgpath: "slot7.jpg", status: "OPEN" },
  { gmid: 208, gname: "Fruit Party", ename: "slot8", ctype: "slot", imgpath: "slot8.jpg", status: "OPEN" },
  { gmid: 209, gname: "Joker's Jewels", ename: "slot9", ctype: "slot", imgpath: "slot9.jpg", status: "OPEN" },
  { gmid: 210, gname: "Hot to Burn", ename: "slot10", ctype: "slot", imgpath: "slot10.jpg", status: "OPEN" },
  { gmid: 211, gname: "Buffalo King", ename: "slot11", ctype: "slot", imgpath: "slot11.jpg", status: "OPEN" },
  { gmid: 212, gname: "Mustang Gold", ename: "slot12", ctype: "slot", imgpath: "slot12.jpg", status: "OPEN" },
  { gmid: 213, gname: "Wild West Gold", ename: "slot13", ctype: "slot", imgpath: "slot13.jpg", status: "OPEN" },
  { gmid: 214, gname: "Chilli Heat", ename: "slot14", ctype: "slot", imgpath: "slot14.jpg", status: "OPEN" },
  { gmid: 215, gname: "Great Rhino", ename: "slot15", ctype: "slot", imgpath: "slot15.jpg", status: "OPEN" },
  { gmid: 301, gname: "Aviator", ename: "x1", ctype: "xgame", imgpath: "x1.jpg", status: "OPEN" },
  { gmid: 302, gname: "CricketX", ename: "x2", ctype: "xgame", imgpath: "x2.jpg", status: "OPEN" },
  { gmid: 303, gname: "JetX", ename: "x3", ctype: "xgame", imgpath: "x3.jpg", status: "OPEN" },
  { gmid: 304, gname: "Mines", ename: "x4", ctype: "xgame", imgpath: "x4.jpg", status: "OPEN" },
  { gmid: 305, gname: "Plinko", ename: "x5", ctype: "xgame", imgpath: "x5.jpg", status: "OPEN" },
  { gmid: 306, gname: "Dice", ename: "x6", ctype: "xgame", imgpath: "x6.jpg", status: "OPEN" },
  { gmid: 307, gname: "Limbo", ename: "x7", ctype: "xgame", imgpath: "x7.jpg", status: "OPEN" },
  { gmid: 308, gname: "Hilo", ename: "x8", ctype: "xgame", imgpath: "x8.jpg", status: "OPEN" },
  { gmid: 309, gname: "Crash", ename: "x9", ctype: "xgame", imgpath: "x9.jpg", status: "OPEN" },
  { gmid: 310, gname: "Double", ename: "x10", ctype: "xgame", imgpath: "x10.jpg", status: "OPEN" }
];

// Dynamically pad to ensure a high density (400+) as requested
for (let i = 1; i <= 350; i++) {
  CASINO_TABLES.push({
    gmid: 1000 + i,
    gname: "Provider Game " + i,
    ename: "game" + i,
    ctype: i % 3 === 0 ? "slot" : (i % 5 === 0 ? "xgame" : "lc"),
    imgpath: "game" + (i % 20 + 1) + ".jpg",
    status: "OPEN"
  });
}

const IST_OFFSET_MINUTES = 330;
const IST_OFFSET_MS = IST_OFFSET_MINUTES * 60 * 1000;
const IST_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const WORLI3_MARKETS = [
  { mid: 194260227210211, mname: "Diamond Open", mtype: "OPEN", gno: "1", hour: 21, minute: 0 },
  { mid: 194260227220347, mname: "Diamond Close", mtype: "CLOSED", gno: "1", hour: 22, minute: 0 },
  { mid: 194260227230444, mname: "World Open", mtype: "OPEN", gno: "2", hour: 23, minute: 0 },
  { mid: 194260228000257, mname: "World Close", mtype: "CLOSED", gno: "2", hour: 23, minute: 55 },
  { mid: 194260228110245, mname: "Lords Open", mtype: "OPEN", gno: "4", hour: 11, minute: 0 },
  { mid: 194260228120307, mname: "Lords Close", mtype: "CLOSED", gno: "4", hour: 12, minute: 0 },
  { mid: 194260228130359, mname: "Riga Open", mtype: "OPEN", gno: "5", hour: 13, minute: 0 },
  { mid: 194260228140409, mname: "Riga Close", mtype: "CLOSED", gno: "5", hour: 14, minute: 0 },
  { mid: 194260228150551, mname: "Asia Open", mtype: "OPEN", gno: "6", hour: 15, minute: 0 },
  { mid: 194260228160414, mname: "Asia Close", mtype: "CLOSED", gno: "6", hour: 16, minute: 0 },
  { mid: 194260228170354, mname: "Taj Open", mtype: "OPEN", gno: "3", hour: 17, minute: 0 },
  { mid: 194260228180412, mname: "Taj Close", mtype: "CLOSED", gno: "3", hour: 18, minute: 0 },
  { mid: 194260228190337, mname: "Gulf Open", mtype: "OPEN", gno: "7", hour: 19, minute: 0 },
  { mid: 194260228200313, mname: "Gulf Close", mtype: "CLOSED", gno: "7", hour: 20, minute: 0 }
];

function getIstDateParts(nowUtcMs = Date.now()) {
  const istDate = new Date(nowUtcMs + IST_OFFSET_MS);
  return {
    year: istDate.getUTCFullYear(),
    month: istDate.getUTCMonth(),
    day: istDate.getUTCDate()
  };
}

function buildUtcFromIst(parts, hour, minute) {
  return Date.UTC(parts.year, parts.month, parts.day, hour, minute, 0, 0) - IST_OFFSET_MS;
}

function getNextMarketUtcMs(hour, minute, nowUtcMs = Date.now()) {
  const parts = getIstDateParts(nowUtcMs);
  let nextUtcMs = buildUtcFromIst(parts, hour, minute);
  if (nextUtcMs <= nowUtcMs) {
    nextUtcMs += 24 * 60 * 60 * 1000;
  }
  return nextUtcMs;
}

function formatCountdown(targetUtcMs, nowUtcMs = Date.now()) {
  const totalSec = Math.max(0, Math.floor((targetUtcMs - nowUtcMs) / 1000));
  const hours = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${pad2(hours)}:${pad2(mins)}:${pad2(secs)}`;
}

function formatIstMarketTime(targetUtcMs) {
  const d = new Date(targetUtcMs + IST_OFFSET_MS);
  const day = pad2(d.getUTCDate());
  const month = IST_MONTHS[d.getUTCMonth()] || "JAN";
  const year = String(d.getUTCFullYear()).slice(-2);
  const hour24 = d.getUTCHours();
  const minute = pad2(d.getUTCMinutes());
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${day} ${month} ${year} ${pad2(hour12)}:${minute} ${ampm}`;
}

function formatIstSlashDateTime(targetUtcMs) {
  const d = new Date(targetUtcMs + IST_OFFSET_MS);
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  const hour24 = d.getUTCHours();
  const minute = pad2(d.getUTCMinutes());
  const second = pad2(d.getUTCSeconds());
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${month}/${day}/${year} ${hour12}:${minute}:${second} ${ampm}`;
}

function buildWorliSubRows() {
  const rows = [];
  for (let sid = 1; sid <= 14; sid += 1) {
    rows.push({
      sid,
      sr: sid,
      gval: 0,
      gstatus: "OPEN",
      min: 10,
      max: 20000,
      subtype: "worli3",
      etype: "fancy"
    });
  }
  return rows;
}

function getWorli3TabData(nowUtcMs = Date.now()) {
  return WORLI3_MARKETS.map((market) => {
    const nextUtcMs = getNextMarketUtcMs(market.hour, market.minute, nowUtcMs);
    return {
      mid: market.mid,
      ptime: formatCountdown(nextUtcMs, nowUtcMs),
      mtime: formatIstMarketTime(nextUtcMs),
      mtype: market.mtype,
      mname: market.mname,
      gno: market.gno
    };
  });
}

function getWorli3Data2(typeValue = "worli3_194260227210211", nowUtcMs = Date.now()) {
  const raw = String(typeValue || "");
  const requestedMid = Number((raw.split("_")[1] || "").trim());
  const market = WORLI3_MARKETS.find((row) => Number(row.mid) === requestedMid) || WORLI3_MARKETS[0];
  const nextUtcMs = getNextMarketUtcMs(market.hour, market.minute, nowUtcMs);
  return {
    mid: market.mid,
    mtime: formatIstSlashDateTime(nextUtcMs),
    mname: market.mname,
    mtype: market.mtype,
    card: "1,1,1",
    remark: "",
    grp: 7,
    sub: buildWorliSubRows()
  };
}

function getWorli3LastResults() {
  return {
    res1: {
      cname: "Matka Market"
    },
    res: [
      { mid: 1, win: "Diamond" },
      { mid: 2, win: "World" },
      { mid: 3, win: "Taj" },
      { mid: 4, win: "Lords" },
      { mid: 5, win: "Riga" },
      { mid: 6, win: "Asia" },
      { mid: 7, win: "Gulf" }
    ]
  };
}

function toButtonRow(value, text, idBase) {
  return {
    bid: idBase,
    bval: Number(value),
    btxt: String(text),
    buttonval: Number(value),
    buttontext: String(text)
  };
}

function toInt(value, fallback) {
  const v = Number(value);
  return Number.isFinite(v) ? v : fallback;
}

function asSuccess(data) {
  return {
    success: true,
    status: 200,
    msg: "success",
    data
  };
}

function getTabList() {
  return DEFAULT_EVENT_TABS.map((tab) => ({ ...tab }));
}

function getHighlightHome(etidValue) {
  const etid = toInt(etidValue, 4);
  if (etid === 10) {
    return {
      t1: [
        { cname: "Win", children: RACING_HORSE.map((x) => ({ ...x })) },
        { cname: "Place", children: RACING_HORSE.map((x) => ({ ...x, cname: "Place" })) }
      ],
      t2: []
    };
  }
  if (etid === 65) {
    return {
      t1: [
        { cname: "Win", children: RACING_GREYHOUND.map((x) => ({ ...x })) }
      ],
      t2: []
    };
  }

  const rows = SPORTS_EVENTS.filter((row) => row.etid === etid);
  return {
    t1: rows.filter((row) => row.iplay).map((row) => ({ ...row })),
    t2: rows.filter((row) => !row.iplay).map((row) => ({ ...row }))
  };
}

function getTreeData() {
  const sportsList = getTabList().concat([
    { eid: 5, etId: 5, ename: "Politics", cname: "Politics", name: "Politics", m: "sports" },
    { eid: 43, etId: 43, ename: "Table Tennis", cname: "Table Tennis", name: "Table Tennis", m: "sports" },
    { eid: 23, etId: 23, ename: "Basketball", cname: "Basketball", name: "Basketball", m: "sports" },
    { eid: 7, etId: 7, ename: "Esoccer", cname: "Esoccer", name: "Esoccer", m: "sports" },
    { eid: 3, etId: 3, ename: "Football", cname: "Football", name: "Football", m: "sports" }
  ]);

  return {
    t1: getTabList(),
    t2: [
      {
        eid: 10,
        etId: 10,
        ename: "Horse Racing",
        cname: "Horse Racing",
        name: "Horse Racing",
        children: RACING_HORSE.map((row) => ({ ...row, ename: row.ename || row.cname, name: row.ename || row.cname }))
      },
      {
        eid: 65,
        etId: 65,
        ename: "Greyhound",
        cname: "Greyhound",
        name: "Greyhound",
        children: RACING_GREYHOUND.map((row) => ({ ...row, ename: row.ename || row.cname, name: row.ename || row.cname }))
      },
      ...sportsList.map(s => ({
        ...s,
        children: SPORTS_EVENTS.filter(e => e.etid === s.etId).map(e => ({
          ...e,
          ename: e.ename,
          cname: e.ename,
          name: e.ename
        }))
      }))
    ]
  };
}

function getLatestEvents() {
  return SPORTS_EVENTS.slice(0, 4).map((row) => ({
    sportId: row.etid,
    id: row.gmid,
    name: row.ename,
    iscc: 0,
    etid: row.etid,
    etId: row.etid,
    gmid: row.gmid,
    ename: row.ename,
    etype: row.etype,
    stime: row.stime,
    iplay: row.iplay
  }));
}

function getWelcomeBanners() {
  return {
    welcome_banner: {
      img_mobile: "wel-1772050956093.png",
      img_desktop: "wel-1772050956093.png",
      bdesc: "Welcome to CRICKETRAJA local mirror."
    }
  };
}

function getHighlightProduct() {
  return [
    {
      ename: "worli3",
      gtype: "Casino",
      etid: 0,
      fname: "Matka",
      company: 5
    },
    {
      ename: "teen20",
      gtype: "Casino",
      etid: 0,
      fname: "Teenpatti",
      company: 5
    }
  ];
}

function getTableList() {
  return [
    { type: "teen20", name: "Teen Patti 20-20" },
    { type: "dt20", name: "Dragon Tiger 20-20" },
    { type: "baccarat", name: "Baccarat" },
    { type: "roulette11", name: "Roulette" }
  ];
}

function getCasinoResults(formData = {}) {
  const type = String(formData.type || "teen20");
  return [
    { mid: "521102458", gtype: type, result: "A, 9, K", edt: new Date().toLocaleString() },
    { mid: "521102459", gtype: type, result: "Q, 7, 3", edt: new Date(Date.now() - 180000).toLocaleString() },
    { mid: "521102460", gtype: type, result: "J, 5, 2", edt: new Date(Date.now() - 360000).toLocaleString() }
  ];
}

function getCasinoAllList() {
  return CASINO_TYPES.map((row) => ({ ...row }));
}

function getCasinoCatList() {
  return [
    { id: "all", name: "All" },
    { id: "live", name: "Live Casino" },
    { id: "slot", name: "Slot Games" },
    { id: "xgame", name: "Crash Games" }
  ];
}

function getCasinoProviderList() {
  return [
    { id: "local", name: "CRICKETRAJA Local" },
    { id: "ezugi", name: "Ezugi" },
    { id: "evo", name: "Evolution" },
    { id: "turbogames", name: "Turbo Games" }
  ];
}

function getCasinoSlotList() {
  return CASINO_TABLES.filter((row) => row.ctype === "slot").map((row) => ({ ...row }));
}

function getCasinoOtherList() {
  return CASINO_TABLES.filter((row) => row.ctype === "xgame").map((row) => ({ ...row }));
}

function getCasinoTabList(type = "lc") {
  const key = String(type || "lc").toLowerCase();
  return (CASINO_TABS[key] || CASINO_TABS.lc).map((row) => ({ ...row }));
}

function getCasinoTableList(gmid, type = "") {
  const parsedGmid = toInt(gmid, 0);
  const key = String(type || "").toLowerCase();
  let rows = CASINO_TABLES;
  if (parsedGmid) {
    rows = rows.filter((row) => row.tabid === parsedGmid);
  } else if (key) {
    rows = rows.filter((row) => row.ctype === key || row.type === key);
  }
  return rows.map((row) => ({ ...row }));
}

function getCasinoData2() {
  return [
    {
      t: "live",
      cname: "Live Casino",
      data: CASINO_TABLES.filter((row) => row.ctype === "lc").map((row) => ({ ...row }))
    },
    {
      t: "virtual",
      cname: "Virtual Casino",
      data: CASINO_TABLES.filter((row) => row.ctype === "vc").map((row) => ({ ...row }))
    },
    {
      t: "slot",
      cname: "Slots",
      data: CASINO_TABLES.filter((row) => row.ctype === "slot").map((row) => ({ ...row }))
    },
    {
      t: "xgame",
      cname: "Crash",
      data: CASINO_TABLES.filter((row) => row.ctype === "xgame").map((row) => ({ ...row }))
    }
  ];
}

function getCasinoLastResults(gType = "teen20") {
  return {
    res1: {
      cname: String(gType || "teen20").toUpperCase()
    },
    res: [
      { no: 1, result: "A,9,K", time: new Date().toLocaleTimeString() },
      { no: 2, result: "Q,7,3", time: new Date(Date.now() - 60000).toLocaleTimeString() },
      { no: 3, result: "J,5,2", time: new Date(Date.now() - 120000).toLocaleTimeString() }
    ]
  };
}

function buildOdds(seed) {
  const base = Number(seed || 1.5);
  const vol = 10000000;
  return {
    b1: Number(base.toFixed(2)),
    bs1: vol,
    b2: Number((base - 0.02).toFixed(2)),
    bs2: vol - 1000,
    b3: Number((base - 0.04).toFixed(2)),
    bs3: vol - 2000,
    l1: Number((base + 0.02).toFixed(2)),
    ls1: vol,
    l2: Number((base + 0.04).toFixed(2)),
    ls2: vol - 1000,
    l3: Number((base + 0.06).toFixed(2)),
    ls3: vol - 2000
  };
}

function getGameDetail(etidValue, gmidValue) {
  const etid = toInt(etidValue, 4);
  const gmid = toInt(gmidValue, SPORTS_EVENTS.find((x) => x.etid === etid)?.gmid || 100101);
  const match = SPORTS_EVENTS.find((x) => x.gmid === gmid) || SPORTS_EVENTS[0];
  return [
    {
      gmid,
      oldgmid: gmid,
      etid,
      ename: match.ename,
      stime: match.stime,
      gtype: match.gtype,
      iplay: Boolean(match.iplay),
      scard: 1,
      gtv: "",
      status: match.status
    }
  ];
}

function getGameData(etidValue, gmidValue) {
  const etid = toInt(etidValue, 4);
  const gmid = toInt(gmidValue, SPORTS_EVENTS.find((x) => x.etid === etid)?.gmid || 100101);
  const marketId = String(gmid);
  const match = SPORTS_EVENTS.find((x) => String(x.gmid) === marketId) || SPORTS_EVENTS[0];
  const teams = String(match.ename || "").split(/\s+v\s+/i);

  const buildRunners = (names, pnlValues = []) => names.map((name, i) => {
    const pnl = pnlValues[i] || 0;
    return {
      sid: String(i + 1),
      selectionId: String(i + 1),
      runnerName: name,
      selectionName: name,
      nat: name,
      n: name,
      pnl: pnl,
      amt: pnl,
      sdata: pnl,
      ...buildOdds(1.8 + i * 0.1)
    };
  });

  const lmt = 50000;
  const matchRunners = buildRunners([teams[0] || "Team A", teams[1] || "Team B", "Draw"], [250, -100, -100]);
  const bookRunners = buildRunners([teams[0] || "Team A", teams[1] || "Team B"], [150, -50]);

  // Using t1 for markets, t2 for runners inside market
  const markets = [
    {
      mid: `${marketId}-m1`,
      mname: "MATCH_ODDS",
      dtype: 1,
      gtype: "match",
      status: "OPEN",
      min: 100,
      max: lmt,
      l: lmt,
      maxb: lmt,
      umaxbof: lmt,
      is_cashout: 1,
      t2: matchRunners,
      nation: matchRunners,
      runners: matchRunners,
      bhav: matchRunners,
      t1: matchRunners,
      is_cashout: 1,
      matchedBet: [],
      match_bet: []
    },
    {
      mid: `${marketId}-m2`,
      mname: "Bookmaker",
      dtype: 2,
      gtype: "book",
      status: "OPEN",
      min: 100,
      max: lmt * 4,
      l: lmt * 4,
      maxb: lmt * 4,
      umaxbof: lmt * 4,
      is_cashout: 1,
      t2: bookRunners,
      nation: bookRunners,
      runners: bookRunners,
      bhav: bookRunners,
      t1: bookRunners,
      is_cashout: 1,
      matchedBet: [],
      match_bet: []
    },
    {
      mid: `${marketId}-m3`,
      mname: "Game Winner 3/9",
      dtype: 1,
      gtype: "match",
      status: "OPEN",
      min: 100,
      max: lmt / 2,
      maxb: lmt / 2,
      is_cashout: 1,
      t2: bookRunners.map(r => ({ ...r, status: "SUSPENDED" })), // Suspended runners
      nation: bookRunners,
      runners: bookRunners,
      t1: bookRunners,
      is_cashout: 1,
      matchedBet: [],
      match_bet: []
    },
    {
      mid: `${marketId}-m4`,
      mname: "Game Winner 3/10",
      dtype: 1,
      gtype: "match",
      status: "OPEN",
      min: 100,
      max: lmt / 2,
      maxb: lmt / 2,
      is_cashout: 1,
      t2: bookRunners,
      nation: bookRunners,
      runners: bookRunners,
      t1: bookRunners,
      is_cashout: 1,
      matchedBet: [],
      match_bet: []
    },
    {
      mid: `${marketId}-m5`,
      mname: "Game To Deuce 3/3",
      dtype: 1,
      gtype: "match",
      status: "SUSPENDED", // Suspended market
      min: 100,
      max: lmt / 5,
      maxb: lmt / 5,
      is_cashout: 1,
      t2: buildRunners(["Yes", "No"]),
      nation: buildRunners(["Yes", "No"]),
      runners: buildRunners(["Yes", "No"]),
      t1: buildRunners(["Yes", "No"])
    }
  ];

  return { t1: markets };
}

function getButtonList(mode = "game") {
  const normalizedMode = String(mode || "game").trim().toLowerCase();
  const useCasinoPreset = normalizedMode === "casino" || normalizedMode === "cs";
  const baseRows = useCasinoPreset
    ? [
      [25, "25"],
      [50, "50"],
      [100, "100"],
      [200, "200"],
      [500, "500"],
      [1000, "1K"]
    ]
    : [
      [100, "100"],
      [200, "200"],
      [500, "500"],
      [1000, "1000"],
      [2000, "2000"]
    ];

  return {
    t1: baseRows.map((row, index) => toButtonRow(row[0], row[1], index + 1)),
    t2: [{ brate: 1, bratemin: 1, bratemul: 1 }]
  };
}

function searchGames(keyword) {
  const q = String(keyword || "").trim().toLowerCase();
  if (!q) {
    return [];
  }

  const rows = [
    ...SPORTS_EVENTS.map((row) => ({
      etid: row.etid,
      etId: row.etid,
      gmid: row.gmid,
      etype: row.etype,
      ename: row.ename,
      stime: row.stime
    })),
    ...CASINO_TABLES.map((row) => ({
      etid: 4,
      gmid: row.gmid,
      etype: "Casino",
      ename: row.gname,
      stime: isoAfter(10)
    }))
  ];

  return rows.filter((row) => row.ename.toLowerCase().includes(q)).slice(0, 50);
}

function getCheckServer() {
  return {
    status: "success",
    hosting: false,
    proxy: false
  };
}

function getCasinoLaunchPayload(id = "") {
  const rawId = String(id || "teen20");
  const cleanId = rawId.replace(/[^a-zA-Z0-9_-]/g, "") || "teen20";
  const normalizedCleanId = cleanId.toLowerCase();
  const matchedGame = CASINO_TABLES.find((row) => {
    const rowMid = String(row.mid || "");
    const rowGmid = String(row.gmid || "");
    const rowEname = String(row.ename || "").toLowerCase();
    return (
      rowMid === rawId ||
      rowMid === cleanId ||
      rowGmid === rawId ||
      rowGmid === cleanId ||
      rowEname === normalizedCleanId
    );
  });
  const resolvedGameId = String(
    matchedGame?.ename || matchedGame?.mid || matchedGame?.gmid || cleanId || "teen20"
  ).toLowerCase();

  const safeGameId =
    (resolvedGameId === "tv" ? "worli3" : resolvedGameId).replace(/[^a-z0-9_-]/g, "") ||
    "worli3";

  // Never point launch URL back to `/casino/<same-game>` because it can cause
  // self-loading loops inside embedded game frames. Use media route fallback
  // so unresolved games degrade to a stable black player instead of spinner.
  return {
    url: `/newmediaplayer/${safeGameId}/index.html`
  };
}

function getCricketTvPayload() {
  return {
    url: "/newmediaplayer/cricketv2/cf8e1735-3d55-49fc-9ce6-921e103bc7c5.html"
  };
}

module.exports = {
  asSuccess,
  getWorli3TabData,
  getWorli3Data2,
  getWorli3LastResults,
  getTabList,
  getHighlightHome,
  getTreeData,
  getLatestEvents,
  getWelcomeBanners,
  getHighlightProduct,
  getTableList,
  getCasinoResults,
  getCasinoAllList,
  getCasinoCatList,
  getCasinoProviderList,
  getCasinoSlotList,
  getCasinoOtherList,
  getCasinoTabList,
  getCasinoTableList,
  getCasinoData2,
  getCasinoLastResults,
  getGameDetail,
  getGameData,
  getButtonList,
  searchGames,
  getCheckServer,
  getCasinoLaunchPayload,
  getCricketTvPayload
};




