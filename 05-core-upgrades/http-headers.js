import { createServer } from 'node:http'
import { once } from 'node:events'
import assert from 'node:assert/strict'

const server = createServer((req, res) => {
  assert.strictEqual(Object.getPrototypeOf(req.headers), null)
  assert.throws(() => req.headers.hasOwnProperty('authorization'), TypeError)

  // Check for the header without relying on Object.prototype.
  const hasAuthorization = Object.hasOwn(req.headers, 'authorization')
  res.end(
    hasAuthorization
      ? 'Authorization header present'
      : 'No authorization header',
  )
})

server.listen(0, '127.0.0.1')
await once(server, 'listening')

try {
  const { port } = server.address()
  const response = await fetch(`http://127.0.0.1:${port}`, {
    headers: { authorization: 'Bearer example' },
  })
  console.log(await response.text()) // Authorization header present
} finally {
  server.close()
}
