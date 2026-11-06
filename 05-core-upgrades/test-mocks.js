import { test, mock } from 'node:test'
import assert from 'node:assert/strict'

test('mock shorthand helpers in Node.js 27', async () => {
  const getDiscount = mock.fn()
  getDiscount.mock.mockReturnValue(0.15)
  assert.strictEqual(getDiscount(), 0.15)

  const fetchUser = mock.fn()
  fetchUser.mock.mockResolvedValue({ id: 42, name: 'Luciano' })
  assert.deepStrictEqual(await fetchUser(), { id: 42, name: 'Luciano' })

  const failSync = mock.fn()
  failSync.mock.mockThrownValue(new Error('Invalid token'))
  assert.throws(() => failSync(), /Invalid token/)
})
