const net = require('net')

module.exports = function sendBufferToAddress(address, buffer, { socket }) {
  socket = socket || net.createConnection(7778, address)

  socket.setNoDelay(true)

  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      socket.write(buffer)
      resolve()
    })

    socket.on('error', reject)
  })
}
