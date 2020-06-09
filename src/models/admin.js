const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  adminFirstName: {
    type: String,
    minlength: 3,
    require: true,
    trim: true,
    lowercase: true
  },
  adminLastName: {
    type: String,
    require: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true,
    select: false
  },
  role: {
    type: String,
    require: true,
    default: 'administrator'
  }
})

module.exports = mongoose.model('admins', adminSchema)
