const Complaints = require('../models/complaints')

function create (complaintData) {
  const newComplaint = new Complaints(complaintData)
  const error = newComplaint.validateSync()
  if (error) throw error

  return newComplaint.save()
}

// Get all
function getAll () {
  return Complaints.find()
}

// Get One
function getOne (id) {
  return Complaints.findById(id)
}

// Update one
function updateOne (id, newData) {
  return Complaints.findByIdAndUpdate(id, newData, { new: true })
}

// Delete one
function deleteOne (id) {
  return Complaints.findOneAndDelete(id)
}

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne
}
