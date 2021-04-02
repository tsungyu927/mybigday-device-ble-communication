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

module.exports = {
  bleStart: bleStart,
  startDeviceScan: startDeviceScan,
  establishConnect: establishConnect,
  cancelConnection: cancelConnection,
  checkIsConnected: checkIsConnected,
  stopDeviceScan: stopDeviceScan,
  readCharacteristic: readCharacteristic,
  writeCharacteristic: writeCharacteristic,
}