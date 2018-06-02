const bitsToBuffer = require('./bits-to-buffer')
const addressFromDeviceId = require('./address-from-device-id')
const sendBufferToAddress = require('./send-buffer-to-address')

function send({ deviceId, bits }) {
  const deviceIdBuffer = bitsToBuffer(deviceId)
  const bitsBuffer = bitsToBuffer(bits)

  return addressFromDeviceId(deviceIdBuffer)
    .then((address) => sendBufferToAddress(address, bitsBuffer))
}

module.exports = {
  send
}
