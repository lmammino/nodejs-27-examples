// Node.js 26 and earlier - manual event-to-promise wiring
import { createServer, createConnection } from 'node:net'
import { once } from 'node:events'

const server = createServer((socket) => {
  socket.end('Hello from TCP server\n')
})
server.listen(0, '127.0.0.1')
await once(server, 'listening')

const { port } = server.address()
const client = createConnection({ port, host: '127.0.0.1' })
await once(client, 'connect')

for await (const chunk of client) {
  console.log('Received:', chunk.toString().trim())
}
server.close()
