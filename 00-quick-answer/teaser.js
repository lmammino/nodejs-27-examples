const items = ['Keyboard', 'Mouse', 'Monitor']
const prices = [129.99, 49.99, 349.95]

const lines = Iterator.zipKeyed({ item: items, price: prices })
  .map(({ item, price }) => `${item} ($${price.toFixed(2)})`)
  .join(', ')

console.log(`${lines} -> Total: $${Math.sumPrecise(prices)}`)
// Keyboard ($129.99), Mouse ($49.99), Monitor ($349.95) -> Total: $529.93
