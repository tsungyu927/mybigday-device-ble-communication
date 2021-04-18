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
const em = require('./emitter')
const emitter = em.emitter

const bleStart = manager => {
  return new Promise((resolve, reject) => {
    setBleManager(manager)
    try {
      bleManager.onStateChange(state => {
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
        [uuid],
        {allowDuplicates: false},
        (error, device) => {
          if (error) {
            console.error(error)
          } else {
            if (device.name === name) {
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
    await stopDeviceScan()
    // ===============================
    emitter.emit('startScan', deviceObj)
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
  let isConnected = await bleManager.isDeviceConnected(deviceId)
  if (isConnected) {
    emitter.emit('connect')

    // 監聽disconnect事件
    bleManager.onDeviceDisconnected(deviceId, () => {
      emitter.emit('disconnect')
    })
  }
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
  emitter.emit('disconnect')
  // =========================
  // return await checkIsConnected()
}

const checkIsConnected = async () => {
  return await bleManager.isDeviceConnected(deviceId)
}

const stopDeviceScan = async () => {
  console.log('stopDeviceScan')
  await bleManager.stopDeviceScan()
}

const readCharacteristic = async characteristicUuid => {
  return await bleManager.readCharacteristicForDevice(
    deviceId,
    serviceUUID,
    characteristicUuid,
  )
}

const writeCharacteristic = async (characteristicUuid, value) => {
  // Convert value to base64
  const base64Value = Buffer.from(value).toString('base64')
  console.log(`Device is connected: ${await checkIsConnected()}`)
  // ============================
  await bleManager.discoverAllServicesAndCharacteristicsForDevice(deviceId)
  await bleManager.writeCharacteristicWithResponseForDevice(
    deviceId,
    serviceUUID,
    characteristicUuid,
    base64Value,
  )
  const result = await readCharacteristic(characteristicUuid)
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
