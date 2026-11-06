function* nextSequenceId(start = 100) {
  let id = start
  while (true) yield id++
}

const sensors = ['temp-1', 'humidity-1', 'pressure-1']
const readings = new Map([
  ['t', 21.4],
  ['h', 48.0],
  ['p', 1013.2],
]).values()

// Lazily pairs an infinite generator, an array, and a Map iterator!
const zipped = Iterator.zip([nextSequenceId(), sensors, readings])

for (const [id, sensor, value] of zipped) {
  console.log(`#${id} ${sensor}: ${value}`)
}
// #100 temp-1: 21.4
// #101 humidity-1: 48
// #102 pressure-1: 1013.2
