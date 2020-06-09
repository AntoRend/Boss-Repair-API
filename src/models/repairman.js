const mongoose = require('mongoose')

const repairmanSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 3,
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
  workShopAddress: {
    streetAddress: { type: String, require: true },
    city: { type: String, require: true },
    stateProvince: { type: String, require: true },
    zipCode: { type: String, require: true }
  },
  subscription: {
    isActive: {
      type: Boolean,
      require: true,
      default: false
    },
    type: {
      type: String,
      enum: {
        values: ['none', 'forYear', 'byCommission'],
        message: 'Ingresar "none", "forYear" o "byCommission"'
      },
      required: true,
      default: 'none'
    }
  },
  entityType: {
    type: String,
    required: true,
    enum: {
      values: ['Fisica', 'Moral'],
      message: 'Ingresar "Fisica" o "Moral"'
    }
  },
  serviceRating: {
    type: Number,
    required: false,
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

module.exports = mongoose.model('repairman', repairmanSchema)
