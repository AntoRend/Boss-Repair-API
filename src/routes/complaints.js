const express = require('express')

const complaints = require('../usecases/complaints')

const router = express.Router()

router.post('/create', async (req, res) => {
  try {
    const newComplaint = await complaints.create(req.body)
    res.json({
      success: true,
      message: 'Your Complaint is registered ',
      data: { newComplaint: newComplaint }
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
    const allComplaints = await complaints.getAll()
    res.json({
      success: true,
      message: 'All Complaints',
      data: { AllComplaints: allComplaints }
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
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const complaint = await complaints.getOne(id)
    res.json({
      success: true,
      data: {
        Complaint: complaint
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
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const complaintUpdated = await complaints.updateOne(id, newData)
    res.json({
      success: true,
      message: 'The complaint is updated',
      data: {
        ComplaintUpdated: complaintUpdated
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
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const complaintDeleted = await complaints.deleteOne(id)
    res.json({
      success: true,
      message: 'The complaint is deleted',
      data: {
        complaintDeleted: complaintDeleted
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
