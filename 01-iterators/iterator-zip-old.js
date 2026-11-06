// Node.js 26 and earlier - only works on materialized arrays
const sensors = ['temp-1', 'humidity-1', 'pressure-1']
const readings = [21.4, 48.0, 1013.2]
const units = ['C', '%', 'hPa']

const paired = sensors.map((sensor, i) => [sensor, readings[i], units[i]])
for (const [sensor, value, unit] of paired) {
  console.log(`${sensor}: ${value} ${unit}`)
}
