const bcrypt = require('bcrypt')
const createError = require('http-errors')

// Model import
const Repairman = require('../models/repairman')
const Quotation = require('../models/quotations')
const Order = require('../models/orders')

// Sign Up function for repairman or service centers
async function signUp (repairmanData) {
  const { fullName, entityType, workShopAddress, subscription, email, password } = repairmanData
  // Validation of repairman input information
  if (!fullName) throw new Error('Nombre: este campo debe contener al menos 3 letras o numeros ')
  if (fullName < 3) throw new Error('Nombre: este campo debe contener al menos 3 letras o numeros ')
  if (!entityType) throw new Error('Entidad fiscal: este campo es requerido')

  // Validation of account input information
  if (!email) throw new Error('Email: este campo es requerido')
  if (!password) throw new Error('Contraseña: este campo es requerido')

  // Unique validation
  const repairmanExists = await Repairman.findOne({ email })
  if (repairmanExists) throw createError(409, `El email [${email}] ya existe`)

  // Password validation
  if (password.length < 8) throw createError(409, 'Por favor, introduzca una contraseña de al menos 8 caracteres')

  // Business params validation
  if (!subscription.type) throw new Error('Tipo de suscripcion: este campo es requerido')
  if (!workShopAddress.streetAddress) throw new Error('Calle: este campo es requerido')
  if (!workShopAddress.city) throw new Error('Municipio: este campo es requerido')
  if (!workShopAddress.stateProvince) throw new Error('Estado: este campo es requerido')
  if (!workShopAddress.zipCode) throw new Error('C.P.: este campo es requerido')

  // Password encryption
  const hash = await bcrypt.hash(password, 10)
  const newRepairer = new Repairman({ ...repairmanData, password: hash })
  const error = newRepairer.validateSync()
  if (error) throw error
  return newRepairer.save()
}

function getAll () {
  return Repairman.find({})
}

function getOne (id) {
  return Repairman.findById(id)
}

function updateOne (id, newData) {
  return Repairman.findByIdAndUpdate(id, newData, { new: true })
}

// delete One user
function deleteOne (id) {
  return Repairman.findByIdAndDelete(id)
}

function getOrders (id) {
  return Order.find({ idRepairmanResponse: id })
}

module.exports = {
  signUp,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  getOrders
}
