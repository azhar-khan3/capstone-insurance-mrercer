const express = require('express')
const { getPolicies, createPolicy, getOnePolicy, updatePolicy, deletePolicy, getClientPolicy, postClientPolicy} = require('../controllers/policiesController')

const router = express.Router()

router.route("/")
    .get(getPolicies)
    .post(createPolicy);

router.route('/:id')
    .get(getOnePolicy)
    .patch(updatePolicy)
    .delete(deletePolicy);

router.route("/client/:id")
    .get(getClientPolicy)
    .post(postClientPolicy)


module.exports = router