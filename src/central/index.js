const em = require('./emitter')
const emitter = em.emitter
const {
  bleStart,
  startDeviceScan,
  establishConnect,
  cancelConnection,
  stopConnection,
  checkIsConnected,
  stopDeviceScan,
  readCharacteristic,
  writeCharacteristic,
} = require('./central')

function startScan(callback, options) {
  startDeviceScan(
    options.serviceUUID,
    options.deviceName,
    options.characteristicUUID,
  )
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
  emitter.once('disconnect', async () => {
    console.log('is connected: false')
    // 執行中止連線
    await stopConnection()
    // 觸發callback
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
