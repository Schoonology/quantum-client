const dgram = require('dgram')
const os = require('os')

const BEACON_PORT = 7777
const MULTICAST_ADDRESS = '224.0.0.42'

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

module.exports = function addressFromDeviceId(deviceId, { socket } = {}) {
  socket = socket || dgram.createSocket('udp4')

  socket.bind(BEACON_PORT)
  socket.on('listening', () => {
    getInterfaceAddresses()
      .forEach(addr => socket.addMembership(MULTICAST_ADDRESS, addr))
  })

  return new Promise((resolve, reject) => {
    socket.on('message', (data, { address }) => {
      if (data.equals(deviceId)) {
        resolve(address)
        socket.close()
      }
    })

    socket.on('error', reject)
  })
}
