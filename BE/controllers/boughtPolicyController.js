const { Bought } = require('../models/boughtPolicyModel');
const { Employee } = require('../models/employeeModel');

const getBoughtPolicy = async (req, res) => {
  await Employee.findOne({ _id: req.params.id }).populate('policies')
    .then(function (dbPolicy) {
      res.json(dbPolicy);
    })
    .catch(function (err) {
      res.json(err);
    });
}

const postBoughtPolicy = async (req, res) => {
  Bought.create(req.body)
    .then(function (dbPolicy) {
      return Employee.findOneAndUpdate({ _id: req.params.id }, { $push: { policies: dbPolicy._id } }, { new: true });
    })
    .then(function (dbEmployee) {
      res.json(dbEmployee)
    })
}

module.exports = {
  getBoughtPolicy,
  postBoughtPolicy
}


