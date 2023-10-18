const express = require('express');
const { postBoughtPolicy, getBoughtPolicy } = require('../controllers/boughtPolicyController');

const router = express.Router()


router.route("/:id")
    .get(getBoughtPolicy)
    .post(postBoughtPolicy);


module.exports = router


// api/v1/bought/id