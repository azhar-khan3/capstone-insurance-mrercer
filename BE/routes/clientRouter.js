const express = require('express')
const { getClient, getOneClient, createClient, updateClient,deleteClient } = require('../controllers/clientController')

const router = express.Router();

router.route("/")
    .get(getClient)
    .post(createClient);

router
    .route('/:id')
    .get(getOneClient)
    .patch(updateClient)
    .delete(deleteClient);

module.exports = router