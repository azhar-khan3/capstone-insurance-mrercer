const { Admin } = require("../models/adminModel")
const bcrypt = require("bcryptjs");

const createAdmin = async (req, res) => {

    const body = req.body;
    const newAdmin = new Admin(body);
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
    newAdmin.save().then((doc) => res.status(201).send(doc));
}


const loginAdmin = async (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        let user = await Admin.findOne({
            email: login.email
        });
       
        if (!user) {
            return res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
        let match = await user.compareUserPassword(login.password, user.password);
        if (match) {
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: 604800
            })
            if (token) {
                return res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        } else {

            return res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}


module.exports = { createAdmin, loginAdmin }