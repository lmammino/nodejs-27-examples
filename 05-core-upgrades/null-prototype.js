const ordinary = {}
console.log(ordinary.constructor === Object) // true
console.log(ordinary['__proto__'] === Object.prototype) // true

const headers = { __proto__: null }
console.log(headers.constructor) // undefined
console.log(headers['__proto__']) // undefined

headers['__proto__'] = 'some header value'
console.log(headers['__proto__']) // 'some header value'
console.log(Object.getPrototypeOf(headers)) // null
