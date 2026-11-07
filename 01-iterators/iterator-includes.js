const message = 'Fixes APP-142. Follow-up work tracked in APP-208.'

const references = message.matchAll(/\bAPP-\d+\b/g).map((match) => match[0])

console.log(references.includes('APP-142')) // true
