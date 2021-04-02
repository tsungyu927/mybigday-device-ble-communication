const CharacteristicWithBleno = require('./characteristics.js')

module.exports = function blenoStart(bleno, name, serviceUuids) {

  bleno.on('stateChange', function (state) {
    console.log('on -> stateChange: ' + state)
    if (state === 'poweredOn') {
      bleno.startAdvertising(name, [serviceUuids])
    } else {
      bleno.stopAdvertising()
    }
  })

  bleno.on('advertisingStart', function (error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'))

    if (!error) {
      bleno.setServices([
        new bleno.PrimaryService({
          uuid: '2a27',
          characteristics: [
            CharacteristicWithBleno(bleno)
          ]
        })
      ])
    }
  })
}
