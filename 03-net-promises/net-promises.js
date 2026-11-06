import { connect, listen } from 'node:net/promises'

const ac = new AbortController()
const server = await listen({
  port: 0,
  host: '127.0.0.1',
  signal: ac.signal,
})

// Consume incoming connections with for await...of!
const serverLoop = (async () => {
  for await (const socket of server) {
    socket.end('Hello from async-iterable TCP server!\n')
    ac.abort() // close server after serving one connection
  }
})()

const client = await connect({
  port: server.address().port,
  host: '127.0.0.1',
})

for await (const chunk of client) {
  console.log('Received:', chunk.toString().trim())
}

await serverLoop
