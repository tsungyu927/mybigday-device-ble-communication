function initialBle(type) {
  try {
    if (type === 'central') {
      return require('./src/central')
    } else if (type === 'peripheral') {
      return require('./src/peripheral')
    } else {
      throw new UndefineTypeError(' Using undefine type, please use {central} or {peripheral} as parameters. ')
    }
  } catch (error) {
    console.log(error.message)
  }
}

function UndefineTypeError(message) {
  this.message = message;
}

UndefineTypeError.prototype = new Error()
UndefineTypeError.prototype.constructor = UndefineTypeError
UndefineTypeError.prototype.showErr = function () {
  return this.message
}

module.exports.initialBle = initialBle