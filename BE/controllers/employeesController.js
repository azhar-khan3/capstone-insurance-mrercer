const { Employee } = require("../models/employeeModel");
const { Organization } = require("../models/organizationModel");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcryptjs");

const getAllEmployees = async (req, res) => {
  const allEmployees = await Employee.find()
  res.send(allEmployees)
}

const getOneEmployee = async (req, res) => {
  const OneEmployee = await Employee.findById(req.params.id)
  res.send(OneEmployee)
}

const createEmployee = async (req, res) => {
  const body = req.body;
  const newEmployee = new Employee(body);
  const salt = await bcrypt.genSalt(10);
  newEmployee.empPswd = await bcrypt.hash(newEmployee.empPswd, salt);
  newEmployee.save().then((doc) => res.status(201).send(doc));

}

const updateEmployee = async (req, res) => {
  const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body)
  res.send(updateEmployee)
}



const deleteEmployee = async (req, res) => {
  const deleteEmployee = await Employee.findByIdAndDelete(req.params.id)
  res.send(deleteEmployee)
}

const getOrganizationEmployee = async (req, res) => {
  await Organization.findOne({ _id: req.params.id }).populate('employees')
    .then(function (dbEmployee) {
      res.json(dbEmployee);
    })
    .catch(function (err) {
      res.json(err);
    });
}

const postorganizationEmployee = async (req, res) => {
  //its my page
  // Upload image to cloudinary
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    let employee = new Employee({
      empName: req.body.empName,
      empId: req.body.empId,
      empMobile: req.body.empMobile,
      empAge: req.body.empAge,
      empSalary: req.body.empSalary,
      empAddress: req.body.empAddress,
      empCompany: req.body.empCompany,
      empPswd: req.body.empPswd,
      empEmail: req.body.empEmail,
      empPolicies: req.body.empPolicies,
      empImg: result.secure_url,
      cloudinary_id: result.public_id,
    });

    const salt = await bcrypt.genSalt(10);
    employee.empPswd = await bcrypt.hash(employee.empPswd, salt);
    // save user details in mongodb
    await employee.save()
      .then(function (dbEmployee) {
        return Organization.findOneAndUpdate({ _id: req.params.id }, { $push: { employees: dbEmployee._id } }, { new: true });
      })

      .then(function (dbEmployee) {
        res.json(dbEmployee)
      })
  }
  catch (err) {
    console.log(err);
  }
}


module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  getOneEmployee,
  deleteEmployee,
  getOrganizationEmployee,
  postorganizationEmployee
}

