const sendBufferToAddress = require('../lib/send-buffer-to-address')
const EventEmitter = require('events')
const td = require('testdouble')
const test = require('ava')

test('sendBufferToAddress writes buffer to socket', t => {
  const socket = new EventEmitter()
  socket.setNoDelay = td.function()
  socket.write = td.function()

  process.nextTick(() => socket.emit('connect'))

  return sendBufferToAddress('address', 'buffer', { socket })
    .then(() => {
      td.verify(socket.setNoDelay(true))
      td.verify(socket.write('buffer'))
      t.pass()
    })
})

test('sendBufferToAddress forwards errors', t => {
  const socket = new EventEmitter()
  socket.setNoDelay = td.function()

  process.nextTick(() => socket.emit('error', new Error('Oops')))

  return sendBufferToAddress('address', 'buffer', { socket })
    .then(address => t.fail('should have thrown'))
    .catch(err => t.is(err.message, 'Oops'))
})
