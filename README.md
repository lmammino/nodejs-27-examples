# Node.js 27 Examples

Code examples accompanying the article [**What's new in Node.js 27**](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-27/) on [nodejsdesignpatterns.com](https://nodejsdesignpatterns.com).

Each file is a self-contained, runnable demo of a single feature.

## Requirements

- **Node.js 27 (or `v27.0.0-alpha.0.0.0`+) or newer.** Several examples rely on features that landed in v27 (`Iterator.zip`, `Iterator.zipKeyed`, `Iterator.prototype.join`, `Iterator.prototype.includes`, `Math.sumPrecise`, `node:net/promises`, unflagged `node:vfs`, `fs.mkstemp`, and `node:test` mock shorthand helpers).
- Files ending in `-old.js` show how the same code looked in Node.js 26 and earlier, for side-by-side comparison.

## Running an example

```bash
node 01-iterators/iterator-zip.js
```

For the test runner example:

```bash
node --test 05-core-upgrades/test-mocks.js
```

To rerun the tests when files change:

```bash
node --test --watch 05-core-upgrades/test-mocks.js
```

To try the Permission Model's environment-variable filtering, quote the wildcard
patterns so the shell passes them to Node.js unchanged:

```bash
SECRET_KEY=super-secret APP_PORT=3000 \
  node --permission --allow-env='PUBLIC_*,APP_*' \
  --input-type=module -e 'console.log({ port: process.env.APP_PORT, secret: process.env.SECRET_KEY })'
# { port: '3000', secret: undefined }
```

## TCP chat example

Start the server with Node.js 27:

```bash
node 03-net-promises/net-promises.js
```

In two or three other terminals, connect with netcat:

```bash
nc 127.0.0.1 8124
```

Each client receives its connection ID (remote address and port). Type a message
and press Enter to send it to all other clients as `clientId > message`. The
server does not echo messages back to their sender. Press Ctrl+C in a client
terminal to disconnect, or in the server terminal to close all connections.

The server tracks active sockets in a map, reads complete lines with `readline`,
and removes clients when their handlers finish. The connection loop dispatches
handlers without awaiting them, so clients can stay connected concurrently.
Socket errors and rejected handler promises are handled, and the server caps
open connections at ten.

To try the wrong, sequential version, replace the dispatch and its `.catch()` in
the outer connection loop with `await handleConnection(socket)`. Only the first
client gets a handler until it disconnects. The later clients never join the map
while it remains connected, so the first client's messages have no recipients.

The server iterator yields connections, not individual chat messages. The server
keeps accepting connections while the loop waits, so slow consumers can buffer
connections without bound unless you set `server.maxConnections`.

## Structure

| Folder | Article section |
| --- | --- |
| `00-quick-answer/` | [Quick Answer: what's new in Node.js 27](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-27/#quick-answer-whats-new-in-nodejs-27) |
| `01-iterators/` | [New Iterator superpower: `zip`, `zipKeyed`, `join`, and `includes`](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-27/#new-iterator-superpower-zip-zipkeyed-join-and-includes) |
| `02-math-sum-precise/` | [More accurate sums with `Math.sumPrecise()`](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-27/#more-accurate-sums-with-mathsumprecise) |
| `03-net-promises/` | [`node:net/promises` and async-iterable TCP servers](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-27/#nodenetpromises-and-async-iterable-tcp-servers) |
| `04-vfs/` | [Virtual File System (`node:vfs`) is now unflagged](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-27/#virtual-file-system-nodevfs-is-now-unflagged) |
| `05-core-upgrades/` | [More Node.js Core upgrades: `fs`, Permissions, Test Runner, and HTTP](https://nodejsdesignpatterns.com/blog/whats-new-in-nodejs-27/#more-nodejs-core-upgrades-fs-permissions-test-runner-and-http) |

## License

[MIT](LICENSE)
