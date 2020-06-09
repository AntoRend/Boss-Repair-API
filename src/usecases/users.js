const bcrypt = require('bcrypt')
const createError = require('http-errors')

const User = require('../models/users')
const Quotation = require('../models/quotations')
const Order = require('../models/orders')

async function signUp (userData) {
  const { userFirstName, userLastName, email, password } = userData
  // Validation of user input information
  if (!userFirstName) throw new Error('Nombre: este campo es requerido')
  if (!userLastName) throw new Error('Apellidos: este campo es requerido')

  // Validation of account input information
  if (!email) throw new Error('Email: este campo es requerido')
  if (!password) throw new Error('Contraseña: este campo es requerido')

  // Unique validation
  const userAlreadyExist = await User.findOne({ email })
  if (userAlreadyExist) throw createError(409, `El email [${email}] ya existe`)

  // Password validation
  if (password.length < 8) throw createError(409, 'Por favor, introduzca una contraseña de al menos 8 caracteres')

  // Password encryption
  const hash = await bcrypt.hash(password, 10)
  const newUser = new User({ ...userData, password: hash })
  const error = newUser.validateSync()
  if (error) throw error
  return newUser.save()
}

function getUsers () {
  return User.find({})
}

function getUser (id) {
  return User.findById(id)
}

function updateUser (id, newData) {
  return User.findByIdAndUpdate(id, newData, { new: true })
}

// delete One user
function deleteUser (id) {
  return User.findByIdAndDelete(id)
}

function getQuotatios (id) {
  return Quotation.find({ idUserRequesting: id })
}

function getOrders (id) {
  return Order.find({ idUserRequesting: id })
}

module.exports = {
  signUp,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getQuotatios,
  getOrders
}
