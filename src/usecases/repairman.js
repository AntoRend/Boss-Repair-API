const bcrypt = require('bcrypt')
const createError = require('http-errors')

// Model import
const Repairman = require('../models/repairman').model
const Quotation = require('../models/orderRepair')
const Order = require('../models/orders')

// Sign Up function for repairman or service centers
async function signUp (repairmanData) {
  const { fullName, passwordConfirm, email, password } = repairmanData
  // Validation of repairman input information
  if (!fullName) throw new Error('Nombre: este campo debe contener al menos 3 letras o numeros ')
  if (fullName < 3) throw new Error('Nombre: este campo debe contener al menos 3 letras o numeros ')

  // Validation of account input information
  if (!email) throw new Error('Email: este campo es requerido')
  if (!password) throw new Error('Contraseña: este campo es requerido')
  if (password !== passwordConfirm) throw new Error('La contraseña no coincide, verificalo')

  // Unique validation
  const repairmanExists = await Repairman.findOne({ email })
  if (repairmanExists) throw createError(409, `El email [${email}] ya existe`)

  // Password validation
  if (password.length < 6) throw createError(409, 'Por favor, introduzca una contraseña de al menos 6 caracteres')

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

function getOrderRepair (specialty) {
  return Quotation.find({ specialty: specialty })
}

function getOrders (id) {
  return Order.find({ idRepairmanResponse: id })
}

async function getQuotes (id) {
  const repairer = await Repairman.findById(id)
  const repairType = repairer.specialty
  console.log(repairType)

  return Quotation.find({ category: repairType })
}

module.exports = {
  signUp,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  getOrders,
  getQuotes,
  getOrderRepair
}
