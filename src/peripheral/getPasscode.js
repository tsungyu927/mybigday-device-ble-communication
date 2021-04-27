const _ = require('lodash')
const passcodeArr = []
const passFromInternet = [
  '123456',
  '987654',
  '091284',
  '112345',
  '984374'
]

const PushPasscodeToArray = (passcode) => {
  passcodeArr.push(passcode)
  console.log(passcodeArr)
}

const getPasscodeArr = () => {
  return passcodeArr
}

const checkIsExist = (data) => {
  if (_.includes(passFromInternet, data)) {
    return true
  }
  return false
}

module.exports = { PushPasscodeToArray, getPasscodeArr, checkIsExist }