const bcrypt = require('bcrypt')
const createError = require('http-errors')

const User = require('../models/users').model
const Quotation = require('../models/orderRepair')
const Order = require('../models/orders')

async function signUp (userData) {
  const { firstName, lastName, email, password, passwordConfirm } = userData
  // Validation of user input information
  if (!firstName) throw new Error('Nombre: este campo es requerido')
  if (!lastName) throw new Error('Apellidos: este campo es requerido')

  // Validation of account input information
  if (!email) throw new Error('Email: este campo es requerido')
  if (!password) throw new Error('Contraseña: este campo es requerido')
  if (password !== passwordConfirm) throw new Error('La contraseña no coincide, verificalo')
  // Unique validation
  const userAlreadyExist = await User.findOne({ email })
  if (userAlreadyExist) throw createError(409, `El email [${email}] ya existe`)

  // Password validation
  if (password.length < 6) throw createError(409, 'Por favor, introduzca una contraseña de al menos 6 caracteres')

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
