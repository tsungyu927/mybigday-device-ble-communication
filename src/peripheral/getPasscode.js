const passcodeArr = []

const PushPasscodeToArray = (passcode) => {
  passcodeArr.push(passcode)
  console.log(passcodeArr)
}

const getPasscodeArr = () => {
  return passcodeArr
}

module.exports = { PushPasscodeToArray, getPasscodeArr }