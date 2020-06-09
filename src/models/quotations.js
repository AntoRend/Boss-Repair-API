const mongoose = require('mongoose')

const quotationSchema = new mongoose.Schema({
  idUserRequesting: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  deviceType: {
    type: String,
    required: true
  },
  modelType: {
    type: String,
    required: true
  },
  problemDescription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Sin respuesta', 'Cotizaciones disponibles', 'Respondida'],
    required: true
  },
  date: {
    type: Date,
    default: new Date().toDateString(),
    required: true
  },
  answers: []
})

module.exports = mongoose.model('quotations', quotationSchema)
