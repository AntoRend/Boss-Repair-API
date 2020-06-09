const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  idUserRequesting: {
    type: String,
    required: true
  },
  idRepairmanResponse: {
    type: String,
    required: true
  },
  quotationId: {
    type: String,
    required: true
  },
  specialty: {
    type: String
    // required: true
  },
  deviceType: {
    type: String
    // required: true
  },
  modelType: {
    type: String
    // required: true
  },
  problemDescription: {
    type: String
    // required: true
  },
  cost: {
    type: Number,
    required: true
  },
  addFeatures: []
})

module.exports = mongoose.model('orders', orderSchema)
