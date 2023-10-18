const { Client } = require("../models/clientModel");

const getClient = async (req, res) => {
    const allClient = await Client.find()
    res.send(allClient)
}

const getOneClient = async (req, res) => {
    const OneClient = await Client.findById(req.params.id)
    res.send(OneClient)
}

const createClient = async (req, res) => {
    const newClient = await Client.create(req.body)
    res.send(newClient)
}

const updateClient = async (req, res) => {
    const updateClient = await Client.findByIdAndUpdate(req.params.id, req.body)
    res.send(updateClient)
}

const deleteClient = async (req, res) => {
    const deleteClient = await Client.findByIdAndDelete(req.params.id)
    res.send(deleteClient)
}

module.exports = {
    getClient,
    getOneClient,
    createClient,
    updateClient,
    deleteClient
}