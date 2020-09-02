const express = require('express')

const orders = require('../usecases/orders')
const { userAuth, adminAuth } = require('../middlewares/auth')

const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const { idRepairmanResponse, quotationId, cost } = req.body
    const newOrder = await orders.create(
      // idUserRequesting,
      idRepairmanResponse,
      quotationId,
      cost
    )
    res.json({
      success: true,
      message: 'Your quote is registered ',
      data: { newOrder: newOrder }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get all orders
router.get('/', adminAuth, async (req, res) => {
  try {
    const allOrders = await orders.getAll()
    res.json({
      success: true,
      message: 'All orders',
      data: { allOrders: allOrders }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get one order
router.get('/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const order = await orders.getOne(id)
    res.json({
      success: true,
      data: {
        Order: order
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

// update one order
router.patch('/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const orderUpdated = await orders.updateOne(id, newData)
    res.json({
      success: true,
      message: 'The order is updated',
      data: {
        OrderUpdated: orderUpdated
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

// quote anser update
router.patch('/update-order/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const orderUpdated = await orders.updateFeatues(id, newData)
    res.json({
      success: true,
      message: 'The order is updated',
      data: {
        OrderUpdated: orderUpdated
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

// delete one order
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const orderDeleted = await orders.deleteOne(id)
    res.json({
      success: true,
      message: 'The order is deleted',
      data: {
        OrderDeleted: orderDeleted
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
