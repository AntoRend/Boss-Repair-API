const createError = require('http-errors')

const bcrypt = require('../lib/bcrypt')

const Admin = require('../models/admin')

async function signUp (adminData) {
  const { adminFirstName, adminLastName, email, password } = adminData
  // Validation of admin input information
  if (!adminFirstName) throw new Error('Nombre: este campo es requerido')
  if (!adminLastName) throw new Error('Apellidos: este campo es requerido')

  // Validation of account input information
  if (!email) throw new Error('Email: este campo es requerido')
  if (!password) throw new Error('Contraseña: este campo es requerido')

  // Unique validation
  const adminAlreadyExist = await Admin.findOne({ email })
  if (adminAlreadyExist) throw createError(409, `El email ${email} ya existe`)

  // Password validation
  if (password.length < 8) throw createError(409, 'Por favor, introduzca una contraseña de al menos 8 caracteres')

  // Password encryption
  const hash = await bcrypt.hash(password)
  const newAdmin = new Admin({ ...adminData, password: hash })
  const error = newAdmin.validateSync()
  if (error) throw error
  return newAdmin.save()
}

function getAdmins () {
  return Admin.find({})
}

function getAdmin (id) {
  return Admin.findById(id)
}

function updateAdmin (id, newData) {
  return Admin.findByIdAndUpdate(id, newData, { new: true })
}

function deleteAdmin (id) {
  return Admin.findByIdAndDelete(id)
}

module.exports = {
  signUp,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin
}
