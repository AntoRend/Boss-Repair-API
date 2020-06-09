const mongoose = require('mongoose')

const user = 'ltonnito'
const password = 'Kodemia123'
const host = 'kodemiaseptimag-bnup1.mongodb.net'
const dbName = 'Bossrepair'

const url = `mongodb+srv://${user}:${password}@${host}/${dbName}`

function connect () {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = {
  connect
}
