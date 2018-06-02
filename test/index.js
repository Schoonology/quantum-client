const td = require('testdouble')
const test = require('ava')

test.afterEach(t => td.reset())

test('quantum.send sends bits to the provided deviceID', t => {
  const bitsToBuffer = td.replace('../lib/bits-to-buffer')
  const addressFromDeviceId = td.replace('../lib/address-from-device-id')
  const sendBufferToAddress = td.replace('../lib/send-buffer-to-address')
  const quantum = require('../lib')

  td.when(bitsToBuffer('bits')).thenReturn('bits buffer')
  td.when(bitsToBuffer('device id')).thenReturn('device id buffer')
  td.when(addressFromDeviceId('device id buffer')).thenResolve('address')

  return quantum.send({ deviceId: 'device id', bits: 'bits' })
    .then(() => {
      td.verify(sendBufferToAddress('address', 'bits buffer'))
      t.pass()
    })
})
