const bitsToBuffer = require('./bits-to-buffer')
const addressFromDeviceId = require('./address-from-device-id')
const sendBufferToAddress = require('./send-buffer-to-address')

function send({ deviceId, bits }) {
  const buffer = bitsToBuffer(bits)

  return addressFromDeviceId(deviceId)
    .then((address) => sendBufferToAddress(address, buffer))
}

module.exports = {
  send
}
