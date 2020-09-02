const Orders = require('../models/orders')
const Quote = require('../models/orderRepair')

async function create (idRepairmanResponse, quotationId, cost) {
  const quote = await Quote.findById(quotationId)
  const newData = ({
    specialty: quote.specialty,
    deviceType: quote.deviceType,
    model: quote.modelType,
    problemDescription: quote.problemDescription,
    mailUserRequesting: quote.userEmail
    // quotationId: quote._id
  })

  const newOrder = new Orders({
    // idUserRequesting, // : idUserRequesting,
    idRepairmanResponse, // : idRepairmanResponse,
    quotationId,
    cost: cost,
    ...newData
  })
  const error = newOrder.validateSync()
  if (error) throw error

  return newOrder.save()
}

// Get all oders
function getAll () {
  return Orders.find()
}

// Get One oder
function getOne (id) {
  return Orders.findById(id)
}

// Update one oder
function updateOne (id, newData) {
  return Orders.findByIdAndUpdate(id, newData, { new: true })
}

async function updateFeatues (id, newData) {
  // return Quotation.findByIdAndUpdate(id, { answer: newData }, { new: true })
  const order = await Orders.findById(id)
  const update = [...order.addFeatures, newData]

  return await order.update({ addFeatures: update, status: 'Proceso activo' })
}

// Delete one oder
function deleteOne (id) {
  return Orders.findOneAndDelete(id)
}

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  updateFeatues,
  deleteOne
}
