const devices = require('../models/devices')

async function getDevices () {
  const allDevices = await devices.find()
  return allDevices
}

async function addNewDevice (deviceData) {
  return devices.create(deviceData)
}

function deleteDevice (id) {
  return devices.findByIdAndRemove(id)
}

function updateDevice (id, deviceData) {
  return devices.findByIdAndUpdate(id, deviceData)
}

module.exports = {
  getDevices,
  addNewDevice,
  deleteDevice,
  updateDevice
}