const orderLines = [
  { item: 'USB-C Hub', qty: 2, unitPrice: 39.99 },
  { item: 'Mouse', qty: 1, unitPrice: 49.99 },
  { item: 'Monitor', qty: 1, unitPrice: 249.95 },
]

const total = Math.sumPrecise(
  orderLines.values().map((line) => line.qty * line.unitPrice),
)

console.log(`Order total: $${total}`) // Order total: $379.92
