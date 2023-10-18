const express = require('express');
const { getContactDetails, postContactDetails } = require('../controllers/contactUsController');

const router = express.Router()


router.route("/")
    .get(getContactDetails)
    .post(postContactDetails);


module.exports = router