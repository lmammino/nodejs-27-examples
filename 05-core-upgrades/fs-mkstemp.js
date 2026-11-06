import { mkstemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const prefix = join(tmpdir(), 'export-')
const { path, handle } = await mkstemp(prefix)

try {
  await handle.writeFile('id,status\n1,ok\n', 'utf8')
  console.log(`Wrote temporary report to ${path}`)
} finally {
  await handle.close()
  await rm(path)
}
