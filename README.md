# MyBigDay Passcode BLE
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

----
### **Central**
> Props

| Prop  | Type | Param | Required | Description |
| :------------ | :------:| :----:| :----:| :-----|
| bleStart      | Function | bleManager | ✓ | Start bleManager and return **true** if **PoweredOn** | 
| startDeviceScan      | Function | uuid, name | ✓ | Start to scan device and return **device with specific uuid and name** |
| establishConnect | Function |  | ✓ | Connect to the device which had been discovered and matched |
| stopDeviceScan | Function |  |  | Stop to scan for devices |
| cancelConnection | Function |  |  | Stop connection |
| checkIsConnected | Function |  |  | Check connection status |
| readCharacteristic | Function |  |  | Read **Characteristic** of peripheral which had benn connected and return it (whole object) |
| writeCharacteristic | Function | (string) |  | Write **Value** to peripheral which had been connected |

> Example  ( Central )
```javascript
import {BleManager} from 'react-native-ble-plx'
const ble = require('./src/mybigday-passcode-ble')

const [bleManager] = useState(new BleManager())
// initial by using central as parameters
const bleCentral = ble.initialBle('central')

// start bleManager 
await bleCentral.startDeviceScan(serviceUUID, deviceName)
// start to connect
await bleCentral.establishConnect()
// write characteristic 
await bleCentral.writeCharacteristic(txt.toString())
```
----
### **Peripheral**
> Props

| Prop  | Type | Param | Required | Description |
| :------------ | :------:| :----:| :----:| :-----|
| blenoStart    | Function | bleno, name, serviceUuids | ✓ | Start **Broadcasting** if state is **poweredOn**  | 
| getPasscodeArr      | Function |  |  | To get the **passcode array** which had been saved |

> Example ( Peripheral )
```javascript
const bleno = require('@abandonware/bleno')
const ble = require('./mybigday-passcode-ble')

// initial by using peripheral as parameters
const blePeripheral = ble.initialBle('peripheral')  
blePeripheral.blenoStart(bleno, name, serviceUuids)
```

