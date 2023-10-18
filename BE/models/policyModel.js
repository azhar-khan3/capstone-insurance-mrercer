const mongoose = require('mongoose')

const policySchema =mongoose.Schema({
    PolicyName: {
        type: String
    },
    Dependants: {
        type: String
    },
    Age: {
        type: Number
    },
    Premium: {
        type: Number
    },
    ClaimAmount:{
        type:Number
    },
    Description: {
        type: String
    },
    Duration:{
        type:Number
    }
    
})

const Policy = mongoose.model('Policy', policySchema)

module.exports = { Policy }