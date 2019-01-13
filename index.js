//Request stamenets. Package imports
const express = require('express'); //Middleware of Mean Stack
const bodyParser = require('body-parser'); //Extract the entire body portion of incomming request stream.
//Request statement for cors package
const cors = require('cors');

//Local imports
const { mongoose } = require('./db.js'); // ./ refers to the current working directory or the directory in which this particular file is residing i.e, db.js is present in the root folder that is the Employee. Here we have used restructuring synrax from es6. basic assignment, importing mongoose from db.js. With this import we will esttblish a connection with MongoDB

//Adding request statement for the employee controller that we have added. So here we have the request statement for the controller, with the employee controller variable.
var employeeController = require ('./models/controllers/employeeController.js');

//Calling express function from db.js, result will be saved inside this app variable
var app = express();

//Configuring express middleware to send json data to nodeJs
app.use(bodyParser.json()); //Inside parentheses we are passing the result of this execution bodyParser.json()
//Using middleware function for cors. Inside which we have passed this function cors. So this will allow any request from any port number or domain.
//We have to be specific we need to allow request for this angular application which is running under port number 4200.
//Inorder to enable cors for the angular application, we can pass an object inside this function.
//So here we have origin property inside which we have to enable cors for this port number which is running at localhost
app.use(cors({ origin: 'http://localhost:4200' }));

//Starting the express server
app.listen(3000, () => console.log('Server started at port : 3000')); //First parameter is the port number, where we want to star this application. After starting the server this callback function will be invoked. Inside that we have a message for console window that is, server started at port : 3000

//Adding router from employees controller into this application
app.use('/employee', employeeController); // /employee is the base url for this controller employee. app.use is a middleware function.
