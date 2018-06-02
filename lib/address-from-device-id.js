const dgram = require('dgram')

function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces()

  return Object.keys(interfaces)
    .map(name => interfaces[name].map(ifaceinfo => ({ name: name, ...ifaceinfo })))
    .reduce((agg, arr) => agg.concat(arr), [])
}

function getInterfaceAddresses() {
  return getNetworkInterfaces()
    .filter(iface => !iface.internal)
    .filter(iface => iface.family === 'IPv4')
    .map(iface => iface.address)
}

module.exports = function addressFromDeviceId(deviceId, { socket }) {
  socket = socket || dgram.createSocket('udp4')

  socket.bind(7777)
  socket.on('listening', () => {
    getInterfaceAddresses()
      .forEach(addr => socket.addMembership(address, addr))
  })

  return new Promise((resolve, reject) => {
    socket.on('message', (data, { address }) => {
      if (data.equals(deviceId)) {
        resolve(address)
      }
    })

    socket.on('error', reject)
  })
}
