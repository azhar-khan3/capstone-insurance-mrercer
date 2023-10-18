const mongoose = require('mongoose');

const boughtSchema =mongoose.Schema({
    PolicyName: {
        type: String
    },
    IncomeRange: {
        type: Number
    },
    Residance: {
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

const Bought = mongoose.model('Bought', boughtSchema)

module.exports = { Bought }


