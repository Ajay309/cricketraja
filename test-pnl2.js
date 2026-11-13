const scopedOpen = [
  { nation: "VfL Wolfsburg W", btype: "back", urate: 1.78, amount: 100, risk: 100, pnl: 78, mid: "1" }
];

const pnlMap = {};
let fallbackPNL = 0; 
scopedOpen.forEach(bet => {
  const n = String(bet.nation || "").trim();
  if (n && pnlMap[n] === undefined) {
    pnlMap[n] = 0;
  }
});
scopedOpen.forEach(bet => {
  const n = String(bet.nation || "").trim();
  const amount = Number(bet.amount || bet.risk || bet.liability || 0);
  const isLay = String(bet.btype || "back").toLowerCase() === "lay";
  const odds = Number(bet.urate || 0);
  
  const profitIfWon = isLay ? - (amount * (odds - 1)) : (amount * (odds - 1));
  const profitIfLost = isLay ? amount : -amount;

  fallbackPNL += profitIfLost;

  if (n) {
    Object.keys(pnlMap).forEach(key => {
      if (key === n) {
        pnlMap[key] += profitIfWon;
      } else {
        pnlMap[key] += profitIfLost;
      }
    });
  }
});

const bookAggregated = Object.keys(pnlMap).map((nat, i) => ({
  sid: String(i + 1),
  mid: "1",
  nat,
  nation: nat,
  amt: Number(pnlMap[nat].toFixed(2)),
  sdata: Number(pnlMap[nat].toFixed(2))
}));

if (bookAggregated.length === 1) {
   bookAggregated.push({ sid: "2", mid: "1", nat: "Other", nation: "Other", amt: Number(fallbackPNL.toFixed(2)), sdata: Number(fallbackPNL.toFixed(2)) });
}
console.log(bookAggregated);
