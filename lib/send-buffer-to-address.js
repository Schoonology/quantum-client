const net = require('net')

const COMMAND_PORT = 7778

module.exports = function sendBufferToAddress(address, buffer, { socket } = {}) {
  socket = socket || net.createConnection(COMMAND_PORT, address)

  socket.setNoDelay(true)

  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      // HACK(schoon) - Ideally, this would use `socket.end` to both write our
      // buffer and FIN our socket. Unfortunately, the Photon firmware drops
      // all pending data in this situation, so our device will not receive
      // anything. As a workaround, we consider it safe here to resolve the
      // Promise, but need to delay the FIN packet until we can be reasonably
      // sure the data has been received.
      socket.write(buffer)
      resolve()
      setTimeout(() => socket.end(), 2000)
    })

    socket.on('error', reject)
  })
}
