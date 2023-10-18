const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    employees: [
        { type: mongoose.Schema.ObjectId,
            ref:"Employee"
        }
    ]

})

const Organization = mongoose.model('Organization', organizationSchema)

module.exports = { Organization }