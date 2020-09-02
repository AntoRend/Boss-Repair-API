const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types } = Schema

const quotationSchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  brandAndModel: {
    type: String,
    required: true
  },
  problemDescription: {
    type: String,
    required: true
  },
  file: {

  },
  location: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Sin respuesta', 'Cotizaciones disponibles', 'Activa', 'Finalizada', 'En disputa'],
    default: 'Sin respuesta',
    required: true
  },
  idUser: {
    type: Types.ObjectId,
    ref: 'users',
    default: '5edbdd252e0d5792dc4c7dbe'
  },
  idRepairmanResponse: {
    type: Types.ObjectId,
    ref: 'repairman',
    default: '5edbdd252e0d5792dc4c7dbe'
  },
  homeRepair: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: new Date().toLocaleString(),
    required: true
  },
  answers: [],
  updates: []
})

module.exports = mongoose.model('orderrepair', quotationSchema)
