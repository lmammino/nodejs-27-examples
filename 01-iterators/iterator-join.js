function* temperatureReadings() {
  while (true) {
    yield 18 + Math.random() * 6
  }
}

const readings = temperatureReadings()
  .take(5)
  .map((temperature) => `${temperature.toFixed(1)}°C`)
  .join(', ')

console.log(readings)
// For example: 21.3°C, 19.8°C, 23.1°C, 20.0°C, 22.4°C
