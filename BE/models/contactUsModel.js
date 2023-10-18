const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    message: {
        type: String
    }
    

})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = { Contact }