const mongoose = require('mongoose')

const repairmanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 3,
    require: true,
    trim: true
    // lowercase: true
  },
  specialty: {
    type: String,
    require: true,
    trim: true,
    lowercase: true
  },
  // entityType: {
  //   type: String,
  //   required: true,
  //   enum: ['Fisica', 'Moral']
  // },
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
  isActive: {
    type: Boolean,
    // require: true,
    default: false
  },
  subscription: {
    type: String,
    enum: ['none', 'Por año', 'Por comisión'],
    default: 'none'
  },
  serviceRating: {
    type: Number,
    required: true,
    default: 0
  },
  validated: {
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: String,
    require: true,
    default: 'repairman'
  }
})

const model = mongoose.model('repairman', repairmanSchema)

module.exports = {
  model,
  schema: repairmanSchema
}
