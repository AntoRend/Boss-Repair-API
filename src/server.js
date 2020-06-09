// Import Express
const express = require('express')
const app = express()

// Import routes
const adminRouter = require('./routes/admins')
const usersRouter = require('./routes/users')
const repairmanRouter = require('./routes/repairman')
const quotationRouter = require('./routes/quotations')
const orderRouter = require('./routes/orders')
const complaintRouter = require('./routes/complaints')
const authRouter = require('./routes/auth')

// Import CORS
const cors = require('cors')

// Json middleware
app.use(express.json(), cors())

app.use('/administrators', adminRouter)
app.use('/users', usersRouter)
app.use('/repairmen', repairmanRouter)
app.use('/quotations', quotationRouter)
app.use('/orders', orderRouter)
app.use('/complaints', complaintRouter)
app.use('/auth', authRouter)

module.exports = app
