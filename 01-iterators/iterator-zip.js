const predicted = [18, 21, 20, 23]
const actual = [19, 20, 22, 21]

const errors = Iterator.zip([predicted, actual])
  .map(([prediction, observation]) => observation - prediction)
  .toArray()

console.log(errors) // [1, -1, 2, -2]
