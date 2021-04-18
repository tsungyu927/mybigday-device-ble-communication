const CharacteristicWithBleno = require('./characteristics.js')
const em = require('./emitter')
const emitter = em.emitter

const characteristicUuid = '2a27'
const temp = '2a28'

module.exports = function startAdvertising(bleno, name, serviceUuids) {

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
          uuid: serviceUuids,
          characteristics: [
            CharacteristicWithBleno(bleno, characteristicUuid),
          ]
        })
      ])
    }
  })
  // ==========================================
  // not available on OS X 10.9
  bleno.on('accept', function (clientAddr) {
    // console.log(`accept: ${clientAddr}`)
    emitter.emit('connectionChange', 'connected......')
  })

  // ==========================================
  // Linux only
  bleno.on('disconnect', function () {
    emitter.emit('connectionChange', 'disconnect')
  })
}
