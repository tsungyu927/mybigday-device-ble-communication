let bleManager = {}
let serviceUUID = ''
let deviceId = ''
let deviceName = ''

function setBleManager(manager) {
  bleManager = manager
}

function setServiceUUID(uuid) {
  serviceUUID = uuid
}

function setDeviceId(id) {
  deviceId = id
}

function setDeviceName(name) {
  deviceName = name
}

export {
  bleManager,
  serviceUUID,
  deviceId,
  deviceName,
  setBleManager,
  setServiceUUID,
  setDeviceId,
  setDeviceName,
}
