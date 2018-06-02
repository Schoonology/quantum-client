const net = require('net')

const COMMAND_PORT = 7778

module.exports = function sendBufferToAddress(address, buffer, { socket } = {}) {
  socket = socket || net.createConnection(COMMAND_PORT, address)

  socket.setNoDelay(true)

  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      // HACK to get around dropped data on the Particle side.
      socket.write(buffer)
      setTimeout(() => socket.end(), 500)
    })

    socket.on('close', resolve)
    socket.on('error', reject)
  })
}
