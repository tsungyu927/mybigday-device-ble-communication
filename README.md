# MyBigDay Device BLE Communication
## **Introduction**

##### Central
- React Native App
- Used package: **[react-native-ble-plx](https://github.com/Polidea/react-native-ble-plx)**

##### Peripheral
- NodeJS
- Used package: **[bleno](https://github.com/abandonware/bleno#readmep:// "bleno")**

----
## **Documentation**
### **Getting Started**
`npm install `

`yarn add `
| Prop  | Type | Param | Required | Description |
| :------------ | :------:| :----:| :----:| :-----|
| initialBle    | Function | central, peripheral | ✓ | Choose which func to use | 
----
### **Central**
> Props

| Prop  | Type | Param | Required | Description |
| :------------ | :------:| :----:| :----:| :-----|
| bleStart | Function | bleManager | ✓ | Start ble and return **true** if bluetooth is **PowerOn** |
| on     | Function | state, callback, [option] | ✓ | **state**: <br /> <ul><li>**startScan**: Start to scan</li><li>**connect**: connected success</li><li>**disconnect**: disconnected success</li></ul>| 
| establishConnect | Function |  | ✓ | Connect to the device which had been discovered and matched |
| stopDeviceScan | Function |  |  | Stop to scan for devices |
| cancelConnection | Function |  |  | Stop connection manually |
| checkIsConnected | Function |  |  | Check connection status |
| readCharacteristic | Function | characteristicUuid |  | Read **Characteristic** of peripheral which had benn connected and return it (whole object) |
| writeCharacteristic | Function | characteristicUuid, value |  | Write **Value** to peripheral which had been connected, and get **true** if writing success, otherwise, return **false** |

> Example  ( Central )
```javascript
import {BleManager} from 'react-native-ble-plx'
const ble = require('mybigday-device-ble-communication')

const [bleManager] = useState(new BleManager())
// initial by using central as parameters
const bleCentral = ble.initialBle('central')

// start bleManager 
useEffect(() => {
  const linkBle = async () => {
    const bleStatePoweredOn = await bleCentral.bleStart(bleManager)
    if (bleStatePoweredOn) {
      // 監聽scan
      bleCentral.on(
        'startScan',
        async obj => {
          await connectToPeripheral(obj)
        },
        {
          serviceUUID: serviceUUID,
          characteristicUUID: characteristicUuid,
          deviceName: deviceName,
        },
      )
    }
  }
  const connectToPeripheral = async obj => {
    if (obj !== {}) {
      // 建立連線 並 回傳連線狀態
      await bleCentral.establishConnect()
    }
  }
  linkBle()
}, [])

// 監聽連線狀態
useEffect(() => {
  // listening to connection
  bleCentral.on('connect', () => {
    // connection success
    // 連線成功

  })
}, [])

// 監聽斷線狀態
useEffect(()=>{
  // listening to disconnection
  bleCentral.on('disconnect', () => {
    // disconnected success
    // 斷線成功
  })  
}, [])


// write characteristic and get true if write success
const result = await bleCentral.writeCharacteristic(characteristicUuid ,txt.toString())

// read characteristic and get result return
const result = await bleCentral.readCharacteristic(characteristicUuid)
```
----
### **Peripheral**
#### **Warning**
If central write the characteristic which is not existed in array(in getPasscode.js), value will be written in **"NOT EXIST"**.

> Props

| Prop  | Type | Param | Required | Description |
| :------------ | :------:| :----:| :----:| :-----|
| startAdvertising    | Function | bleno, name, serviceUuids, characteristicUuids | ✓ | Start **Broadcasting** if state is **poweredOn**  | 
| getPasscodeArr      | Function |  |  | To get the **passcode array** which had been saved, this array is saved with checked passcode |
| on     | Function | characterChange |  | Listening to Characteristic when central write the characteristic, return the **updated value** which has been written |
| setCorrectPass      | Function | pass: (string) |  | Push passcode into corrected array which got from line@, and these passcode will be used to check whether the characteristic wrote by central is existed or not. |
| getCorrectPassArr      | Function |  |  | To get the **correct passcode array** which had been saved |

> Example ( Peripheral )
```javascript
const bleno = require('@abandonware/bleno')
const ble = require('mybigday-device-ble-communication')

// initial by using peripheral as parameters
const blePeripheral = ble.initialBle('peripheral')  
blePeripheral.startAdvertising(bleno, name, serviceUuids, characteristicUuids)

// listening to character
blePeripheral.on('characterChange', (characterUuid, value) => {
  // character changes
  console.log(`${characterUuid} change the value to: ${value}`)
})

// push newest correct passcode to check array
blePeripheral.setCorrectPass('123456')

// get correct passcode
console.log(blePeripheral.getCorrectPassArr())

```

