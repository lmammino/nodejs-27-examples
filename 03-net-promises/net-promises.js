import { listen } from 'node:net/promises'
import { createInterface } from 'node:readline'

const ac = new AbortController()
const server = await listen({
  port: 8124,
  host: '127.0.0.1',
  signal: ac.signal,
})
server.maxConnections = 10

const clients = new Map()

async function handleConnection(socket) {
  const clientId = `${socket.remoteAddress}:${socket.remotePort}`
  const lines = createInterface({ input: socket, crlfDelay: Infinity })
  clients.set(clientId, socket)

  // Close the line iterator even if the connection ends abruptly.
  socket.once('close', () => lines.close())
  socket.on('error', (error) => {
    console.error(`${clientId}:`, error.message)
    lines.close()
  })

  socket.write(`Connected as ${clientId}\n`)
  console.log(`${clientId} joined`)

  try {
    for await (const message of lines) {
      for (const [otherId, otherSocket] of clients) {
        if (otherId !== clientId && !otherSocket.destroyed) {
          otherSocket.write(`${clientId} > ${message}\n`)
        }
      }
    }
  } finally {
    clients.delete(clientId)
    lines.close()
    socket.destroy()
    console.log(`${clientId} left`)
  }
}

process.once('SIGINT', () => {
  ac.abort()
  for (const socket of clients.values()) socket.destroy()
})

console.log('Chat listening on 127.0.0.1:8124. Press Ctrl+C to stop.')

for await (const socket of server) {
  // Each handler stays active for the lifetime of its connection.
  void handleConnection(socket).catch((error) => {
    console.error('Connection handler failed:', error)
    socket.destroy()
  })
}
