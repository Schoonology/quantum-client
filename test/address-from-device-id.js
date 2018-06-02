const addressFromDeviceId = require('../lib/address-from-device-id')
const EventEmitter = require('events')
const td = require('testdouble')
const test = require('ava')

test('addressFromDeviceId resolves with udpinfo from matching beacon', t => {
  const socket = new EventEmitter()
  socket.bind = td.function()
  socket.addMembership = td.function()

  process.nextTick(() => socket.emit('message', new Buffer('wrong id'), { address: 'wrong address'}))
  process.nextTick(() => socket.emit('message', new Buffer('correct id'), { address: 'correct address'}))

  return addressFromDeviceId(new Buffer('correct id'), { socket })
    .then(address => t.is(address, 'correct address'))
})

test('addressFromDeviceId forwards errors', t => {
  const socket = new EventEmitter()
  socket.bind = td.function()
  socket.addMembership = td.function()

  process.nextTick(() => socket.emit('error', new Error('Oops')))

  return addressFromDeviceId(new Buffer('some id'), { socket })
    .then(address => t.fail('should have thrown'))
    .catch(err => t.is(err.message, 'Oops'))
})
