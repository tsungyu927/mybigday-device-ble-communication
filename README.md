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
| cancelConnection | Function |  |  | Stop connection |
| checkIsConnected | Function |  |  | Check connection status |
| readCharacteristic | Function | characteristicUuid |  | Read **Characteristic** of peripheral which had benn connected and return it (whole object) |
| writeCharacteristic | Function | characteristicUuid, value |  | Write **Value** to peripheral which had been connected |

> Example  ( Central )
```javascript
import {BleManager} from 'react-native-ble-plx'
const ble = require('mybigday-device-ble-communication')

const [bleManager] = useState(new BleManager())
// initial by using central as parameters
const bleCentral = ble.initialBle('central')

// start bleManager 
const bleStatePoweredOn = await bleCentral.bleStart(bleManager)
if(bleStatePoweredOn){
  // start scan
  bleCentral.on('startScan', async obj => {
      if (obj !== {}) {
          // start to connect
          await bleCentral.establishConnect()
      }
    },
    {
      // scan for specific device||serviceUUID
      serviceUUID: serviceUUID,
      deviceName: deviceName,
    }
  )
}

// listening to connection
bleCentral.on('connect', () => {
  // connected success
  
})
// listening to disconnection
bleCentral.on('disconnect', () => {
  // disconnected success

})

// write characteristic 
await bleCentral.writeCharacteristic(characteristicUuid ,txt.toString())
await bleCentral.readCharacteristic(characteristicUuid)
```
----
### **Peripheral**
> Props

| Prop  | Type | Param | Required | Description |
| :------------ | :------:| :----:| :----:| :-----|
| startAdvertising    | Function | bleno, name, serviceUuids | ✓ | Start **Broadcasting** if state is **poweredOn**  | 
| getPasscodeArr      | Function |  |  | To get the **passcode array** which had been saved |
| on     | Function | characterChange |  | Listening to Characteristic when central write the characteristic, return the **updated value** which has been written |

> Example ( Peripheral )
```javascript
const bleno = require('@abandonware/bleno')
const ble = require('mybigday-device-ble-communication')

// initial by using peripheral as parameters
const blePeripheral = ble.initialBle('peripheral')  
blePeripheral.startAdvertising(bleno, name, serviceUuids)

// listening to character
blePeripheral.on('characterChange', (characterUuid, value) => {
  // character changes
  console.log(`${characterUuid} change the value to: ${value}`)
})
```

