const Buffer = require('buffer/').Buffer
const {
  bleManager,
  serviceUUID,
  deviceId,
  deviceName,
  setBleManager,
  setServiceUUID,
  setDeviceId,
  setDeviceName,
} = require('./util')

const bleStart = manager => {
  return new Promise((resolve, reject) => {
    setBleManager(manager)
    try {
      bleManager.onStateChange(state => {
        console.log(state)
        switch (state) {
          case 'PoweredOn':
            console.log('PoweredOn')
            resolve(true)
            break
          default:
            break
        }
      }, true)
    } catch (e) {
      reject(e)
    }
  })
}

const startDeviceScan = (uuid, name) => {
  return new Promise((resolve, reject) => {
    setServiceUUID(uuid)
    setDeviceName(name)
    try {
      console.log('startDeviceScan')
      bleManager.startDeviceScan(
        [serviceUUID],
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            console.error(error)
          } else {
            if (device.name === deviceName) {
              resolve(addDevice(device))
            }
          }
        },
      )
    } catch (e) {
      reject(e)
    }
  })
}

const addDevice = async device => {
  // ==============================
  // 儲存DeviceId
  setDeviceId(device.id)
  // ==============================
  if (device.localName) {
    const deviceObj = {
      id: device.id,
      name: device.name,
      localName: device.localName,
      serviceUUIDs: device.serviceUUIDs,
      rssi: device.rssi,
    }

    // ==============================
    // 停止掃描
    stopDeviceScan()
    return deviceObj
  }
}
const establishConnect = async () => {
  // 建立連線
  try {
    await bleManager.connectToDevice(deviceId)
  } catch (err) {
    console.log(err.reason)
  }
  // 確認連線
  return await checkIsConnected()
}

const cancelConnection = async () => {
  // 終止連線
  try {
    await bleManager.cancelDeviceConnection(deviceId)
  } catch (err) {
    console.log(err.reason)
  }
  // 將資料清空 (除了bleManager)
  setServiceUUID('')
  setDeviceId('')
  // =========================
  return await checkIsConnected()
}

const checkIsConnected = async () => {
  return await bleManager.isDeviceConnected(deviceId)
}

const stopDeviceScan = () => {
  console.log('stopDeviceScan')
  bleManager.stopDeviceScan()
}

const readCharacteristic = async () => {
  return await bleManager.readCharacteristicForDevice(
    deviceId,
    serviceUUID,
    '2a27',
  )
}

const writeCharacteristic = async value => {
  // Convert value to base64
  const base64Value = Buffer.from(value).toString('base64')
  console.log(`Device is connected: ${await checkIsConnected()}`)
  // ============================
  await bleManager.discoverAllServicesAndCharacteristicsForDevice(deviceId)
  await bleManager.writeCharacteristicWithResponseForDevice(
    deviceId,
    serviceUUID,
    '2a27',
    base64Value,
  )
  const result = await readCharacteristic()
  // 確認寫入成功 透過讀取目前的特徵值和原本想寫入的值是否相同來判斷
  if (result.value === base64Value) {
    return true
  }
  return false
}

export {
  bleStart,
  startDeviceScan,
  establishConnect,
  cancelConnection,
  checkIsConnected,
  stopDeviceScan,
  readCharacteristic,
  writeCharacteristic,
}
