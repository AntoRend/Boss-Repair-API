const Quotation = require('../models/quotations')

function create (quotationData) {
  const newQuotation = new Quotation(quotationData)
  const error = newQuotation.validateSync()
  if (error) throw error

  return newQuotation.save()
}

// Get all quotations
function getAll () {
  return Quotation.find()
}

// Get One quotation
function getOne (id) {
  return Quotation.findById(id)
}

// Update one quotation
function updateOne (id, newData) {
  return Quotation.findByIdAndUpdate(id, newData, { new: true })
}

async function answerOne (id, newData) {
  // return Quotation.findByIdAndUpdate(id, { answer: newData }, { new: true })
  const quote = await Quotation.findById(id)
  const update = [...quote.answers, newData]

  return await quote.update({ answers: update, status: 'Cotizaciones disponibles' })
}

// Delete one quotation
function deleteOne (id) {
  return Quotation.findOneAndDelete(id)
}

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  answerOne
}
