const bcrypt = require('bcrypt')
const saltRounds = 10

// modify hash property with our params
function hash (plainText) {
  return bcrypt.hash(plainText, saltRounds)
}

module.exports = {
  ...bcrypt,
  hash
}
