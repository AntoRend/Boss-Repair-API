const createError = require('http-errors')

const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

// import models
const User = require('../models/users')
const Repairman = require('../models/repairman')
const Admin = require('../models/admin')

// function Login (validation general)
async function logIn (email, password) {
  // Validation of admin input information
  if (!email) throw createError(400, 'Invalid data')
  if (!password) throw createError(400, 'Invalid data')

  // Queries to search user, admin or repairman account
  const user = await User.findOne({ email }).select('+password')
  const admin = await Admin.findOne({ email }).select('+password')
  const repairer = await Repairman.findOne({ email }).select('+password')
  let userInValidation = {}

  // Account validation
  if (user !== null && admin === null && repairer === null) {
    userInValidation = user
  } else if (user === null && admin !== null && repairer === null) {
    userInValidation = admin
  } else if (user === null && admin === null && repairer !== null) {
    userInValidation = repairer
    if (!userInValidation.validated) throw createError(401, 'Reparador no activo. Favor de verificar con el administrador')
  } else {
    throw createError(401, 'Invalid Data')
  }

  // Password validation
  const { password: hash } = userInValidation
  const isPasswordCorrect = await bcrypt.compare(password, hash)
  if (!isPasswordCorrect) throw createError(401, 'Invalid Data')
  const token = jwt.sign({ id: userInValidation._id })
  return { token, userId: userInValidation._id, role: userInValidation.role }
}

module.exports = {
  logIn
}
