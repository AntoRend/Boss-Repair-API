const Quotation = require('../models/orderRepair')
const Repairman = require('../models/repairman').model

function create (quotationData) {
  const newQuotation = new Quotation(quotationData)
  const error = newQuotation.validateSync()
  if (error) throw error

  return newQuotation.save()
}

// Get all quotations
function getAll () {
  return Quotation.find()
    .populate('idRepairmanResponse')
    .populate('idUser')
}

// Get One quotation
function getOne (id) {
  return Quotation.findById(id)
    .populate('idRepairmanResponse')
    .populate('idUser')
}

function getQuotesByEmail (email) {
  return Quotation.find({ userEmail: email })
    .populate('idRepairmanResponse')
    .populate('idUser')
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

async function updateFeatures (id, newData) {
  // return Quotation.findByIdAndUpdate(id, { answer: newData }, { new: true })
  const quote = await Quotation.findById(id)
  const update = [...quote.updates, newData]

  return await quote.update({ updates: update })
}

// Delete one quotation
function deleteOne (id) {
  return Quotation.findOneAndDelete(id)
}

module.exports = {
  create,
  getAll,
  getOne,
  getQuotesByEmail,
  updateOne,
  deleteOne,
  answerOne,
  updateFeatures
}
