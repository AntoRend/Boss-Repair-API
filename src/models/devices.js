const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
  type:{
    type: String,
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  model: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('devices', deviceSchema)
