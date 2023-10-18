const express = require('express')
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getOneEmployee,getOrganizationEmployee,postorganizationEmployee } = require('../controllers/employeesController');
const { loginUser } = require('../controllers/loginController');
const upload = require("../utils/multer");

const router = express.Router()

router.route("/")
    .get(getAllEmployees)
    .post(createEmployee)
    
router.route("/login").post(loginUser)


router.route("/:id")
     .patch(updateEmployee)
     .delete(deleteEmployee)
     .get(getOneEmployee)

router.route("/org/:id")
      .get(getOrganizationEmployee)
      .post(upload.single("empImg"),postorganizationEmployee)


module.exports = router