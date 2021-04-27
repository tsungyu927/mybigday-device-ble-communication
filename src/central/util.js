let bleManager = {}
let deviceObj = {}
let serviceUUID = ''
let characteristicUUID = ''
let deviceId = ''
let deviceName = ''

function setBleManager(manager) {
  bleManager = manager
}

function setDevice(device) {
  deviceObj = device
}

function setServiceUUID(uuid) {
  serviceUUID = uuid
}

function setCharacteristicUUID(uuid) {
  characteristicUUID = uuid
}

function setDeviceId(id) {
  deviceId = id
}

function setDeviceName(name) {
  deviceName = name
}

export {
  bleManager,
  deviceObj,
  serviceUUID,
  characteristicUUID,
  deviceId,
  deviceName,
  setBleManager,
  setDevice,
  setServiceUUID,
  setCharacteristicUUID,
  setDeviceId,
  setDeviceName,
}
