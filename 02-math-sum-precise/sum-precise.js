const cartPrices = [129.99, 49.99, 349.95]
console.log(Math.sumPrecise(cartPrices))
// 529.93

const ledger = [1e20, 0.1, -1e20]
console.log(Math.sumPrecise(ledger))
// 0.1 (no precision lost!)
