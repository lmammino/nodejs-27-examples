const cartPrices = [0.1, 0.2, 0.3]
console.log(Math.sumPrecise(cartPrices))
// 0.6

const ledger = [1e20, 0.1, -1e20]
console.log(Math.sumPrecise(ledger))
// 0.1 (no precision lost!)
