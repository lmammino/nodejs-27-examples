import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import vfs from 'node:vfs'

async function loadAppConfig(configDir) {
  const raw = await readFile(join(configDir, 'app.json'), 'utf8')
  return JSON.parse(raw)
}

// Create an in-memory VFS that automatically unmounts at the end of the block
{
  using memoryFs = vfs.create()
  memoryFs.mkdirSync('/etc/myapp', { recursive: true })
  memoryFs.writeFileSync(
    '/etc/myapp/app.json',
    JSON.stringify({ env: 'test', featureFlags: ['vfs'] }),
  )

  // Mount into Node's reserved virtual namespace (e.g. /dev/null/vfs/1)
  const mountPoint = memoryFs.mount()

  // Regular node:fs functions can now read from the mounted path!
  const config = await loadAppConfig(join(mountPoint, 'etc/myapp'))
  console.log('Loaded from VFS:', config)
}
// memoryFs is automatically unmounted here!
