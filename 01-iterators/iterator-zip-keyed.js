const columns = {
  id: [101, 102, 103],
  user: ['alice', 'bob', 'charlie'],
  role: new Set(['admin', 'editor', 'viewer']),
}

const rows = Iterator.zipKeyed(columns)

for (const row of rows) {
  console.log(`${row.user} (#${row.id}) has role: ${row.role}`)
}
// alice (#101) has role: admin
// bob (#102) has role: editor
// charlie (#103) has role: viewer
