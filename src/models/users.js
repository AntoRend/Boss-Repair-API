const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 3,
    require: true,
    trim: true
    // lowercase: true
  },
  lastName: {
    type: String,
    require: true,
    trim: true
    // lowercase: true
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
  passwordConfirm: {
    type: String,
    require: true,
    trim: true,
    select: false
  },
  streetAndNumber: { type: String, require: true },
  municipality: { type: String, require: true },
  city: { type: String, require: true },
  zipCode: { type: String, require: true },
  role: {
    type: String,
    require: true,
    default: 'user'
  }
})

// module.exports = mongoose.model('users', userSchema)

const model = mongoose.model('users', userSchema)

module.exports = {
  model,
  schema: userSchema
}
