const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema =mongoose.Schema({
    email:{type:String},
    password:{type:String},
})


adminSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
    }

adminSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = { Admin }