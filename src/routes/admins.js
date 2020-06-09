const express = require('express')
const Admins = require('../usecases/admin')
// const { adminAuth } = require('../middlewares/auth')
const router = express.Router()

// Sign Up function
router.post('/signup', async (req, res) => {
  try {
    const newAdmin = await Admins.signUp(req.body)
    res.json({
      success: true,
      message: 'Successful registration',
      data: { admin: newAdmin }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get all
router.get('/', async (req, res) => {
  try {
    const allAdmins = await Admins.getAdmins()
    res.json({
      success: true,
      message: 'All Admins',
      data: { Admins: allAdmins }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get one user
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const admin = await Admins.getAdmin(id)
    res.json({
      success: true,
      data: {
        Admin: admin
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// update one
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const adminUpdated = await Admins.updateAdmin(id, newData)
    res.json({
      success: true,
      message: 'The admin is updated',
      data: {
        adminUpdated: adminUpdated
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// delete one
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const adminDeleted = await Admins.deleteAdmin(id)
    res.json({
      success: true,
      message: 'The Admin is deleted',
      data: {
        adminDeleted: adminDeleted
      }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router
