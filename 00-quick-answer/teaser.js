const items = ['Keyboard', 'Mouse', 'Monitor']
const prices = [0.1, 0.2, 0.3]

const lines = Iterator.zipKeyed({ item: items, price: prices })
  .map(({ item, price }) => `${item} ($${price.toFixed(2)})`)
  .join(', ')

console.log(`${lines} -> Total: $${Math.sumPrecise(prices)}`)
// Keyboard ($0.10), Mouse ($0.20), Monitor ($0.30) -> Total: $0.6
