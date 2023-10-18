const path = require('path');
const express = require('express');  //Definition
const bodyParser = require('body-parser');  //Definition
const cors = require('cors');  //Definition


//Routes
const employeesRouter=require('./routes/employeeRouter')
const policyRouter=require('./routes/policyRouter');
const boughtRouter=require('./routes/boughtPolicyRouter');
const contactUsRouter=require('./routes/contactUsRouter')
const adminRouter=require('./routes/adminRouter');
const organizationRouter=require('./routes/organizationRouter');
const clientRouter=require('./routes/clientRouter');
// Start express app
const app = express();



app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});


app.get('/', (req, res) => {
  res.send('Hello g welcome')
})

// ROUTES

//employee
app.use('/api/v1/employees', employeesRouter);

//policy
app.use('/api/v1/policies',policyRouter);

//bought
app.use('/api/v1/bought',boughtRouter)

//contactUs
app.use('/api/v1/contact',contactUsRouter);

//router
app.use('/api/v1/admin',adminRouter);

app.use('/api/v1/organization',organizationRouter);

app.use('/api/v1/client',clientRouter);



app.all('*', (req, res, next) => {
  res.status(404)
});
module.exports = app;
