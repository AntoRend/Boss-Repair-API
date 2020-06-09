const express = require('express')

const quotations = require('../usecases/quotations')
const { userAuth, adminAuth } = require('../middlewares/auth')

const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const newQuote = await quotations.create(req.body)
    res.json({
      success: true,
      message: 'Your quote is registered ',
      data: { newQuote: newQuote }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get all quotations
router.get('/', adminAuth, async (req, res) => {
  try {
    const allQuotations = await quotations.getAll()
    res.json({
      success: true,
      message: 'All quotations',
      data: { allQuotations: allQuotations }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      error: error.message
    })
  }
})

// get one quotation
router.get('/:id', userAuth, async (req, res) => {
  try {
    const { id } = req.params
    const quotation = await quotations.getOne(id)
    res.json({
      success: true,
      data: {
        Quotation: quotation
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

// update one quotation
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const quotationUpdated = await quotations.updateOne(id, newData)
    res.json({
      success: true,
      message: 'The quotation is updated',
      data: {
        QuotationUpdated: quotationUpdated
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
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const quotationDeleted = await quotations.deleteOne(id)
    res.json({
      success: true,
      message: 'The quotation is deleted',
      data: {
        QuotationDeleted: quotationDeleted
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
router.patch('/answers/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const quotationUpdated = await quotations.answerOne(id, newData)
    res.json({
      success: true,
      message: 'The answer is updated',
      data: {
        QuotationUpdated: quotationUpdated
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
