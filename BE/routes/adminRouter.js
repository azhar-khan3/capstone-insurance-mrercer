const express = require('express');
const { loginAdmin, createAdmin } = require('../controllers/adminController');

const router = express.Router()

router.route("/")
    .post(createAdmin);

router.route('/login')
         .post(loginAdmin);

module.exports = router