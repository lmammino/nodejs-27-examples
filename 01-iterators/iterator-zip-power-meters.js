function* powerReadings(readWatts) {
  while (true) {
    yield readWatts()
  }
}

// Simulated meters: each call produces a fresh reading in watts.
const solar = powerReadings(() => Math.round(Math.random() * 4000))
const household = powerReadings(() => Math.round(Math.random() * 3000))

const netPower = Iterator.zip([solar, household]).map(
  ([generation, consumption]) => generation - consumption,
)

for (const watts of netPower.take(5)) {
  if (watts > 0) {
    console.log(`Exporting ${watts} W`)
  } else if (watts < 0) {
    console.log(`Importing ${-watts} W`)
  } else {
    console.log('Generation matches consumption')
  }
}
