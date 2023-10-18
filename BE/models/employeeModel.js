const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const employeeSchema = mongoose.Schema({
    empName: { type: String },
    empId: { type: String },
    empMobile: { type: Number },
    empAge: { type: Number },
    empSalary: { type: Number },
    empAddress: { type: String },
    empCompany: { type: String },
    empPswd: { type: String },
    empEmail: { type: String },
    policies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bought"
    }],
    empImg:
    {
        type: String
    }

})

employeeSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}


employeeSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = { Employee }

