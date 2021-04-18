const em = require('./emitter')
const emitter = em.emitter

function listenToCharacter(callback) {
  emitter.on('characterChange', (characterUuid, value) => {
    callback(characterUuid, value)
  })
}


emitter.on('connectionChange', (status) => {
  console.log(`connection state change: ${status}`)
})

function on(state, callback) {
  switch (state) {
    case 'characterChange':
      listenToCharacter(callback)
      break
    default:
      break
  }
}

module.exports = {
  on: on,
  startAdvertising: require('./peripheral.js'),
  getPasscodeArr: require('./getPasscode.js'),
}
