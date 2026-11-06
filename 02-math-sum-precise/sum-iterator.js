const orderLines = [
  { qty: 3, unitPrice: 0.1 },
  { qty: 2, unitPrice: 0.2 },
  { qty: 1, unitPrice: 0.3 },
]

const total = Math.sumPrecise(
  orderLines.values().map((line) => line.qty * line.unitPrice),
)

console.log(`Order total: $${total}`) // Order total: $1
