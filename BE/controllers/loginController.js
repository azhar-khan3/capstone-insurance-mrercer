const { getOneEmployee } = require("./employeesController");
const { Employee } = require("../models/employeeModel");

exports.loginUser = async (req, res) => {
    const login = {
        empEmail: req.body.empEmail,
        empPswd: req.body.empPswd
    }
    try {
        let user = await Employee.findOne({
            empEmail: login.empEmail
        });
        //check if user exit
        if (!user) {
            return res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
        let match = await user.compareUserPassword(login.empPswd, user.empPswd);

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