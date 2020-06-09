const express = require('express')
const users = require('../usecases/users')
const { userAuth, adminAuth } = require('../middlewares/auth')

const router = express.Router()

// Register
router.post('/signup', async (request, response) => {
  try {
    const newUser = await users.signUp(request.body)
    response.json({
      success: true,
      message: 'Registro Exitoso',
      data: {
        user: newUser
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// get all users
router.get('/', adminAuth, async (req, res) => {
  try {
    const allUsers = await users.getUsers()
    res.json({
      success: true,
      message: 'All Users',
      data: { users: allUsers }
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
router.get('/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const user = await users.getUser(id)
    res.json({
      success: true,
      data: {
        User: user
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

// update one user
router.patch('/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const userUpdated = await users.updateUser(id, newData)
    res.json({
      success: true,
      message: 'The user is updated',
      data: {
        userUpdated: userUpdated
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

// delete one user
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const userDeleted = await users.deleteUser(id)
    res.json({
      success: true,
      message: 'The user is deleted',
      data: {
        userDeleted: userDeleted
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

router.get('/quotations/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const quotesData = await users.getQuotatios(id)
    res.json({
      success: true,
      data: {
        quotesData: quotesData
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

router.get('/orders/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const ordersData = await users.getOrders(id)
    res.json({
      success: true,
      data: {
        ordersData: ordersData
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
