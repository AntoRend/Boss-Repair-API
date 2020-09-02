const createError = require('http-errors')

const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

// import models
const User = require('../models/users').model
const Repairman = require('../models/repairman').model
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
  const userInValidation = user || admin || repairer
  if (!userInValidation) throw createError(401, 'Invalid Data')

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
