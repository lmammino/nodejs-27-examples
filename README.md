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

The TCP server example handles one connection and then closes. If you extend it
with work awaited inside the connection loop, connections can buffer without
bound. Set `server.maxConnections` explicitly to limit concurrent connections.

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
