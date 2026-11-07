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

The TCP server example connects three clients concurrently. Each handler waits
100 ms to simulate asynchronous I/O. The connection loop dispatches handlers
without awaiting them, so the three waits overlap. Each rejected handler promise
is caught and its socket is destroyed. The server caps open connections at ten,
and stops listening after the clients finish.

You should see three `Handler started` messages before the first `Response queued`
message. To see the sequential counter-example, replace the dispatch and its
`.catch()` inside the loop with `await handleConnection(socket)`. Now each handler
finishes before the next starts. A handler that waits for its client to disconnect
could delay every connection behind it.

The server iterator yields TCP connections, not application-level requests. The
server keeps accepting connections while the loop waits, so slow consumers can
buffer connections without bound unless you set `server.maxConnections`.
Choose an appropriate resource limit even when handlers run concurrently.

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
