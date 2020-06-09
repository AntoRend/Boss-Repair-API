const jwt = require('../lib/jwt')

const User = require('../models/users')
const Repairman = require('../models/repairman')
const Admin = require('../models/admin')

// authentication for Admin on page process
async function adminAuth (req, res, next) {
  // verify Authorization header in requests
  const { authorization: token } = req.headers
  try {
    const decodedToken = await jwt.verify(token)
    const { id } = decodedToken

    const admin = await Admin.findById(id)
    if (!admin) throw new Error('Unauthorized')
    next()
  } catch (error) {
    res.status(401)
    res.json({
      success: false,
      message: 'Unauthorized'
    })
  }
}

// User authentication on page process
function userAuth (req, res, next) {
  const { authorization: token } = req.headers
  console.log('Authorization')
  try {
    const decodedToken = jwt.verify(token)
    next()
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: 'Unauthorized'
    })
  }
}

// authentication for Repairman on page process
async function repairAuth (req, res, next) {
  // verify Authorization header in requests
  const { authorization: token } = req.headers
  try {
    const decodedToken = await jwt.verify(token)
    const { id } = decodedToken

    const repairer = await Repairman.findById(id)
    if (!repairer) throw new Error('Unauthorized')
    next()
  } catch (error) {
    res.status(401)
    res.json({
      success: false,
      message: 'Unauthorized'
    })
  }
}

module.exports = {
  userAuth,
  adminAuth,
  repairAuth
}
