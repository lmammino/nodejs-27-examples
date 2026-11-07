// Node.js 26 and earlier
const predicted = [18, 21, 20, 23]
const actual = [19, 20, 22, 21]

const errors = predicted.map((prediction, i) => actual[i] - prediction)
console.log(errors) // [1, -1, 2, -2]
