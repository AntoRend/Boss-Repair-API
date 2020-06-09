const jwt = require('jsonwebtoken')
const secret = '9ea8fa4cdd512e3f7b17eb70f685f976'

function sign (payload = {}) {
  return jwt.sign(payload, secret)
}

function verify (token = '') {
  return jwt.verify(token, secret)
}

module.exports = {
  ...jwt,
  sign,
  verify
}
