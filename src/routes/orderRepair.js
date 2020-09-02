const express = require('express')

const orderRepair = require('../usecases/quotations')
const { userAuth, adminAuth } = require('../middlewares/auth')

const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const newRepair = await orderRepair.create(req.body)
    res.json({
      success: true,
      message: 'Your Repair is registered ',
      data: { newRepair: newRepair }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get all repairs by email
router.get('/info-repairs/:email', async (req, res) => {
  try {
    const { email } = req.params
    const repair = await orderRepair.getQuotesByEmail(email)
    res.json({
      success: true,
      message: 'Your repairs ',
      data: {
        Repairs: repair
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

// get all orderRepair
router.get('/', async (req, res) => {
  try {
    const allOrderRepair = await orderRepair.getAll()
    res.json({
      success: true,
      message: 'All orderRepair',
      data: { allOrderRepair: allOrderRepair }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get one Repair
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const repair = await orderRepair.getOne(id)
    res.json({
      success: true,
      data: {
        Repair: repair
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

// update one repair
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const repairUpdated = await orderRepair.updateOne(id, newData)
    res.json({
      success: true,
      message: 'The repair is updated',
      data: {
        RepairUpdated: repairUpdated
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

// delete one quotation
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const repairDeleted = await orderRepair.deleteOne(id)
    res.json({
      success: true,
      message: 'The repair is deleted',
      data: {
        RepairDeleted: repairDeleted
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

// repair answer update
router.patch('/answers/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const repairUpdated = await orderRepair.answerOne(id, newData)
    res.json({
      success: true,
      message: 'The answer is updated',
      data: {
        RepairUpdated: repairUpdated
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

router.patch('/updates/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const repairUpdated = await orderRepair.updateFeatures(id, newData)
    res.json({
      success: true,
      message: 'The features is updated',
      data: {
        RepairUpdated: repairUpdated
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
