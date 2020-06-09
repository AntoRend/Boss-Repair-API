const mongoose = require('mongoose')

const complaintsSchema = new mongoose.Schema({
  idUserRequesting: {
    type: String,
    required: true
  },
  idRepairman: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  evidence: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date().toDateString(),
    required: true
  },
  status: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('complaints', complaintsSchema)
