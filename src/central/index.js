const em = require('./emitter')
const emitter = em.emitter
const {
  bleStart,
  startDeviceScan,
  establishConnect,
  cancelConnection,
  checkIsConnected,
  stopDeviceScan,
  readCharacteristic,
  writeCharacteristic,
} = require('./central')

function startScan(callback, options) {
  startDeviceScan(options.serviceUUID, options.deviceName)
  emitter.once('startScan', obj => {
    callback(obj)
  })
}

function checkConnectinConnect(callback) {
  emitter.once('connect', () => {
    console.log('is connected: true')
    callback()
  })
}

function checkConnectionDisconnect(callback) {
  emitter.once('disconnect', () => {
    console.log('is connected: false')
    callback()
  })
}

function on(state, callback, options) {
  switch (state) {
    case 'startScan':
      startScan(callback, options)
      break
    case 'connect':
      checkConnectinConnect(callback)
      break
    case 'disconnect':
      checkConnectionDisconnect(callback)
      break
    default:
      break
  }
}

module.exports = {
  on: on,
  bleStart: bleStart,
  establishConnect: establishConnect,
  cancelConnection: cancelConnection,
  checkIsConnected: checkIsConnected,
  stopDeviceScan: stopDeviceScan,
  readCharacteristic: readCharacteristic,
  writeCharacteristic: writeCharacteristic,
}
