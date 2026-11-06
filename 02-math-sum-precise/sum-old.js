// Node.js 26 and earlier - floating-point drift in action
const cartPrices = [129.99, 49.99, 349.95]
const naiveTotal = cartPrices.reduce((sum, price) => sum + price, 0)

console.log(naiveTotal)
// 529.9300000000001 (!)

// Even worse: catastrophic cancellation when large and small numbers mix
const ledger = [1e20, 0.1, -1e20]
console.log(ledger.reduce((sum, n) => sum + n, 0))
// 0 (the 0.1 completely vanished!)
