const express = require('express')

const Repairmen = require('../usecases/repairman')
const { userAuth, adminAuth } = require('../middlewares/auth')

const router = express.Router()

// Register
router.post('/signup', async (req, res) => {
  try {
    const newRepairman = await Repairmen.signUp(req.body)
    res.json({
      success: true,
      message: 'Registro Exitoso',
      data: { Repairman: newRepairman }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get all Repairmen
router.get('/', async (req, res) => {
  try {
    const allRepairmen = await Repairmen.getAll()
    res.json({
      success: true,
      message: 'All Repairmen',
      data: { Repairmen: allRepairmen }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get one repairman
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const repairman = await Repairmen.getOne(id)
    res.json({
      success: true,
      data: {
        Repairman: repairman
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

// update one repairman
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const repairmanUpdated = await Repairmen.updateOne(id, newData)
    res.json({
      success: true,
      message: 'The repairer is updated',
      data: {
        repairmanUpdated: repairmanUpdated
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

// delete one repairman
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const repairmanDeleted = await Repairmen.deleteOne(id)
    res.json({
      success: true,
      message: 'The repairman is deleted',
      data: {
        repairmanDeleted: repairmanDeleted
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

router.get('/repairs/:specialty', async (req, res) => {
  try {
    const { specialty } = req.params
    const ordersData = await Repairmen.getOrderRepair(specialty)
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

router.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params
    const ordersData = await Repairmen.getOrders(id)
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

router.get('/repair-quotes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const quotes = await Repairmen.getQuotes(id)
    res.json({
      success: true,
      data: {
        quotesData: quotes
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
