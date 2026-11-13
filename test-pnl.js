const bets = [
  { nation: "VfL Wolfsburg W", btype: "back", urate: 1.78, amount: 100, risk: 100, pnl: 78, mid: "1" }
];

function calculateBook(bets) {
  const runners = Array.from(new Set(bets.map(b => b.nation)));
  // Wait, what if there's an implied runner that wasn't bet on? 
  // We can't know the other runners unless the market provides them, or the frontend matches by `nat`.
  return bets;
}
console.log(calculateBook(bets));
