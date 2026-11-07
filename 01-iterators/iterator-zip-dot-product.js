const a = [1, 2, 3]
const b = [4, 5, 6]

const dotProduct = Iterator.zip([a, b], { mode: 'strict' })
  .map(([x, y]) => x * y)
  .reduce((sum, product) => sum + product, 0)

console.log(dotProduct) // 32 (1 * 4 + 2 * 5 + 3 * 6)
