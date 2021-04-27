const { PushPasscodeToArray, checkIsExist } = require('./getPasscode.js')
const em = require('./emitter')
const emitter = em.emitter

const CharacteristicWithBleno = (bleno, characteristicUuid) => {

  class Characteristic extends bleno.Characteristic {
    constructor() {
      super({
        uuid: characteristicUuid,
        properties: ['read', 'write', 'notify'],
        value: null
      })
      this._value = new Buffer.alloc(0)
      this._updateValueCallback = null
    }

    onReadRequest(offset, callback) {
      console.log('Characteristic - onReadRequest: value = ' + this._value.toString('utf8'))
      callback(this.RESULT_SUCCESS, this._value)
    }

    onWriteRequest(data, offset, withoutResponse, callback) {
      const res = checkIsExist(data.toString('utf8'))
      if (res) {
        this._value = data
      } else {
        const buf = Buffer.alloc(9, 'Tk9UIEVYSVNU', 'base64')
        this._value = buf // NOT EXIST
      }

      if (this._updateValueCallback) {
        console.log('Characteristic - onWriteRequest: notifying')
        this._updateValueCallback(this._value)
      }

      if (res) {
        console.log('Characteristic - onWriteRequest: value = ' + this._value.toString('utf8'))
        // ================================
        // Push Passcode to array (wait to print)
        PushPasscodeToArray(this._value.toString('utf8'))
        // trigger emitter
        emitter.emit('characterChange', this.uuid, this._value.toString('utf8'))
        // ================================
      } else {
        console.log('Characteristic - onWriteRequest: NOT EXIST')
      }

      callback(this.RESULT_SUCCESS)
    }

    onSubscribe(maxValueSize, updateValueCallback) {
      console.log('Characteristic - onSubscribe')
      this._updateValueCallback = updateValueCallback
    }

    onUnsubscribe() {
      console.log('Characteristic - onUnsubscribe')
      this._updateValueCallback = null
    }

  }

  return new Characteristic

}


module.exports = CharacteristicWithBleno