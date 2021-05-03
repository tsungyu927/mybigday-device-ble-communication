const _ = require('lodash')
const passcodeArr = []
const passFromInternet = []

const PushPasscodeToArray = (passcode) => {
  passcodeArr.push(passcode)
  console.log(passcodeArr)
}

const getPasscodeArr = () => {
  return passcodeArr
}

const getCorrectPassArr = () => {
  return passFromInternet
}

const setCorrectPass = (pass) => {
  passFromInternet.push(pass)
}

const checkIsExist = (data) => {
  if (_.includes(passFromInternet, data)) {
    return true
  }
  return false
}

module.exports = { PushPasscodeToArray, getPasscodeArr, checkIsExist, setCorrectPass, getCorrectPassArr }