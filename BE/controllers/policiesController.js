const { Client } = require("../models/clientModel")
const { Policy } = require("../models/policyModel")

const getPolicies = async (req, res) => {
  const allPolicies = await Policy.find()
  res.send(allPolicies)
}

const getOnePolicy = async (req, res) => {
  const OnePolicy = await Policy.findById(req.params.id)
  res.send(OnePolicy)
}

const createPolicy = async (req, res) => {
  const newPolicy = await Policy.create(req.body)
  res.send(newPolicy)
}

const updatePolicy = async (req, res) => {
  const updatePolicy = await Policy.findByIdAndUpdate(req.params.id, req.body)
  res.send(updatePolicy)
}

const deletePolicy = async (req, res) => {
  const deletePolicy = await Policy.findByIdAndDelete(req.params.id)
  res.send(deletePolicy)
}

const getClientPolicy=async(req,res)=>{
  await Client.findOne({_id:req.params.id}).populate('policies')
  .then(function(dbPolicies) {
    res.json(dbPolicies);
  })
  .catch(function(err) {
    res.json(err);
  });
}

const postClientPolicy=async(req,res)=>{
  Policy.create(req.body)
  .then(function(dbPolicies) {
    return Client.findOneAndUpdate({ _id: req.params.id }, {$push: {policies: dbPolicies._id}}, { new: true });
  })
  .then(function(dbPolicies) {
      res.json(dbPolicies)
  })
}



module.exports = {
  getPolicies,
  createPolicy,
  updatePolicy,
  getOnePolicy,
  deletePolicy,
  postClientPolicy,
  getClientPolicy

}