import { createServer } from 'node:http'

const server = createServer((req, res) => {
  console.log(
    'Object.getPrototypeOf(req.headers):',
    Object.getPrototypeOf(req.headers),
  )

  // Throws in Node.js 27: TypeError: req.headers.hasOwnProperty is not a function
  // if (req.headers.hasOwnProperty('authorization')) { ... }

  // Safe in all modern Node.js versions:
  if (Object.hasOwn(req.headers, 'authorization')) {
    res.end('Authorized\n')
    return
  }

  res.end('Anonymous\n')
})

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address()
  const response = await fetch(`http://127.0.0.1:${port}`, {
    headers: { authorization: 'Bearer token' },
  })
  console.log('Response:', (await response.text()).trim())
  server.close()
})
