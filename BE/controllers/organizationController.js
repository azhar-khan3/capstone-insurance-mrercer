const { Organization } = require("../models/organizationModel");

const getOrganizations = async (req, res) => {
  const allOrganizations = await Organization.find()
  res.send(allOrganizations)
}

const getOneOrganization = async (req, res) => {
  const OneOrganization = await Organization.findById(req.params.id)
  res.send(OneOrganization)
}

const createOrganization = async (req, res) => {
  const newOrganization = await Organization.create(req.body)
  res.send(newOrganization)
}

const updateOrganization = async (req, res) => {
  const updateOrganization = await Organization.findByIdAndUpdate(req.params.id, req.body)
  res.send(updateOrganization)
}

const deleteOrganization = async (req, res) => {
  const deleteOrganization = await Organization.findByIdAndDelete(req.params.id)
  res.send(deleteOrganization)
}

module.exports = {
  getOrganizations,
  createOrganization,
  updateOrganization,
  getOneOrganization,
  deleteOrganization
}