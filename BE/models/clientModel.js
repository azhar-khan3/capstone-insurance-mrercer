const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    clientName: {
        type: String
    },
    location: {
        type: String
    },
    email:{
        type: String
    },
    mobile:{
        type: String
    },
    policies: [
        { type: mongoose.Schema.ObjectId,
           ref:"Policy"
        }
    ]

})

const Client = mongoose.model('Client', clientSchema)

module.exports = { Client }