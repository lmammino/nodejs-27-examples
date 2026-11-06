const rawLogs = {
  service: ['auth', 'payments', 'search', 'notifications'],
  status: [200, 503, 200, 500],
  latencyMs: [12, 450, 28, 310],
}

// 1. Check if any service returned a 503 (short-circuits on the 2nd item!)
const hasServiceUnavailable = rawLogs.status.values().includes(503)
console.log('Any 503 errors?', hasServiceUnavailable) // true

// 2. Build a CSV of failing endpoints without ever allocating an array
const failingCsv = Iterator.zipKeyed(rawLogs)
  .filter((entry) => entry.status >= 500)
  .map((entry) => `${entry.service},${entry.status},${entry.latencyMs}ms`)
  .join('\n')

console.log(failingCsv)
// payments,503,450ms
// notifications,500,310ms
