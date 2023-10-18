const { Contact } = require("../models/contactUsModel")

const getContactDetails = async (req, res) => {
  const allContact = await Contact.find()
  res.send(allContact)
}

const postContactDetails = async (req, res) => {
  const newContact = await Contact.create(req.body)
  res.send(newContact)
}

module.exports = {
    postContactDetails,
    getContactDetails
}