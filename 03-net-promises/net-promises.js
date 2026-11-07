import { connect, listen } from 'node:net/promises'
import { setTimeout as delay } from 'node:timers/promises'

const ac = new AbortController()
const server = await listen({
  port: 0,
  host: '127.0.0.1',
  signal: ac.signal,
})
server.maxConnections = 10

async function handleConnection(socket) {
  console.log('Handler started')
  await delay(100) // Simulate waiting for a database or another service.
  socket.end('Hello from async-iterable TCP server!\n')
  console.log('Response queued')
}

const serverLoop = (async () => {
  for await (const socket of server) {
    // Start the handler and immediately advance to the next connection.
    void handleConnection(socket).catch((error) => {
      console.error('Connection handler failed:', error)
      socket.destroy()
    })
  }
})()

try {
  // Connect three clients concurrently.
  await Promise.all(
    [1, 2, 3].map(async (id) => {
      const client = await connect({
        port: server.address().port,
        host: '127.0.0.1',
      })

      for await (const chunk of client) {
        console.log(`Client ${id}:`, chunk.toString().trim())
      }
    }),
  )
} finally {
  ac.abort()
  await serverLoop
}
