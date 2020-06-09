const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userFirstName: {
    type: String,
    minlength: 3,
    require: true,
    trim: true,
    lowercase: true
  },
  userLastName: {
    type: String,
    require: true,
    trim: true,
    lowercase: true
  },
  birthDate: {
    type: String,
    require: true
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
  userAddress: {
    streetAddress: { type: String, require: true },
    city: { type: String, require: true },
    stateProvince: { type: String, require: true },
    zipCode: { type: String, require: true }
  },
  role: {
    type: String,
    require: true,
    default: 'user'
  }
})

module.exports = mongoose.model('users', userSchema)
