//We need to implement router from express.
//Adding require statement for express
const express = require('express');

//Importing object _id from mongoose
var ObjectId = require('mongoose').Types.ObjectId;

var router = express.Router(); //creating local variable by calling this out of function express constant inside. Retriving all the collections in the employee collection.

//Mongoose model employee
//Adding request statement for employee
var { Employee } = require('../employee'); // ../ means go up a folder in the directory i.e, employeeController is in the controllers but we have to map employee file, so the double dot will go up a directory and use the file specified. Inside this employee variable we will store the exported variable from this file from the file employee.js

//Adding router to retrive all employees from this employees collection
//Route for get request
//In order to get request we have to make a get request like this, => localhost:3000/employee/. In order to access routers from.
//It is the route that sends all the records from the employees collection.
router.get('/', (req, res) => {
    Employee.find((err, docs) => { //Checking if there is any error or not
        if(!err)
            res.send(docs); //If no error found we will pretend the documents that we have recieved from this employees collection, back to the response. For that we have called this send function from this response object by passing this documents that we have retrieved.
        else
            console.log('Error in retriving Employees: '+JSON.stringify(err, undefined, 2)); //If error occurs, then this message will be printed along with detailed error object and the description of the error, on the console window. We call json stringfy function in order to convert this object into string, with in the nation of two space characters. 2 signifies the space characters.    
    });
}); //Calling this function these two parameters request(req) and respond(res). Inside the function we need to retrieve all the course from the exployees collection. For that employee.find function can called, it will retrieve all the employees form the employee collection. After retriving all those records we will call this callback function with the two parameters Error(err) and Document(docs).

//Making get request for getting specific employees with respect to the _id
router.get('/:id', (req, res) => { // /:id is the uri for this route. TO make this get request you have to pass _id for the corresponding record. When we will make this request we will call this function with these two parameters, req and res like we have, done for the previoud routes. First of all we have to make sure that the _id which is passing through the uri should be a valid MongoDB _id. For that we have to import object _id, which is done on top.
    if (!ObjectId.isValid(req.params.id)) //Retriving the id from the URI, using req.params.id i.e., request object .params. Here we check the id is valid or not. We just need to call the function isValid, from this object id.
        return res.status(400).send('No record with given id : ' +req.params.id); // IIf it not a valid id we can return the status code 400, and we will send a message No record with given id.
        Employee.findById(req.params.id, (err, doc) => {
            if (!err) { //If no error we will return the document back to the response.
                res.send(doc);
            }
            else {
                console.log('Error in retriving Employee : ' +JSON.stringify(err, undefined, 2)); //If error occurs then we will print the error message in console window.
            }
        });//If the given id is valid we can retrieve the employee from the db. Here we have used the function findById. So first parameter should be the id that we have recieved through this uri here. As a second parameter we can pass this callback functions with these two parameters err(error) and doc. 
});

//Inserting new employee records into the db collection
//Defining one route with post request
//Uri of this post request will be the same as the get request on line 14 
router.post('/',(req,res) => { //Calling post method with the paremeters request and response
    //Creating an object on employee model class
    //Creating an object of mongoose model emp. It is filled with details of new employee.
    //We need to consume this post route from angular application i.e., employeecomponent.component.ts file.
    var emp = new Employee({ //Basically from this object we will send json data, containing details of new employee. Using that json data we have filled details of employee using req.body object.
        empid: req.body.empid, //Method for Retreving empid.
        firstname: req.body.firstname, //Method for Retreving firstname.
        middlename: req.body.middlename, //Method for Retreving middlename.
        lastname: req.body.lastname, //Method for Retreving lastname.
        position: req.body.position, //Method for Retreving position.
        office: req.body.office, //Method for Retreving office.
        salary: req.body.salary, //Method for Retreving salary.
    });
    //To insert the new record int mongodb we can call save function from the mongoose model object. After saving this callback function it will call this callback function with these two parameters err and doc. If any error occurs, it will be passed through this parameter, if the object is successful MongoDb will return an object containing details of newely inserted employee, with these properties using this doc parameter. Along with these properties, if you haven' t declared an attribute id, then mongodb will use this id property property to uniquelyidentify error code from a collection. It' s like a primary key in SQL database. Byu it won' t be in a sequence like 1,2,3... Instead it will a 24 hex character string in length.
    //So first in this callback function we will check if there is any error or not
    //If there is no error we will return the newely inserted doc back the error. If there occurs an error then we will print this message
    emp.save((err, doc) => {
        if(!err){
            res.send(doc);
        }
        else
        {
            console.log('Error in Employee save : ' + JSON.stringify(err, undefined, 2)); //It will print the statement with a detailed error object.
        }
    });
});

//Adding routes for update method.
//We have to use put web method.
//Router.put function can be called.
//As a second parameter we will call the req and respond.
//Checking the id passing through the uri is valid or not.
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    {
        return res.status(400).send('No record with the given id : ' +req.params.id); //If id is not valid we will return the message id is not valid with the given id.
    }
    //If the id is valid we can continue with the update operation.
    //Creating object
    //During object creation we will send JSON data containing new details of employees.
    //With that JSON we have created a normal object here. It 's not an object of the employee model that we have done in post request. Instead, it is a normal object.
    var emp = {
        empid: req.body.empid, //Method for Retreving empid.
        firstname: req.body.firstname, //Method for Retreving firstname.
        middlename: req.body.middlename, //Method for Retreving middlename.
        lastname: req.body.lastname, //Method for Retreving lastname.
        position: req.body.position, //Method for Retreving position.
        office: req.body.office, //Method for Retreving office.
        salary: req.body.salary, //Method for Retreving salary.
    };
    //In order to update the given id here, we can do this by calling the function, findByIdAndUpdate()
    //As the first parameter we have to pass the id we have recieved from this uri here
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, ( err, doc ) => { //With this new option we test the mongodb whether we want to return all data of employee or updated data of employee back to the response so if new is equal to true this callback parameter doc will have the value of updated employee details. Otherwise it will have the old employee details.
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in Employee Update : ' +JSON.stringify(err, undefined, 2));
        }
    });// It tells the mongodb that we have to update an employee, with this id, i.e, req.params.id. With these new informations inside this object as a third parameter we can pass an object with options like this
    //As the last parameter we will call the callback function like we do in other Mongoose operations. So here we have the callback function with error and doc parameter inside that we will check if there is any error or not. If there is no error we will return the doc back to the response. If there is any error then we will print another message in console window.
});

//Adding routes for delete method.
//We have to use router.delete function.
//We can call this function with these two parameters i.e., req and res
router.delete('/:id', (req, res) => { // /:id is the Uri.
    if(!ObjectId.isValid(req.params.id)) //Checking if the id passed is valid or not.
        return res.status(400).send('No record found with the given id : ' +req.params.id);
        
    Employee.findByIdAndRemove(req.params.id, (err, doc) => { //If found error we will delete the record by calling this function i.e., findByIdAndRemove. First parameter will be the id i.e., req.params.id.
    //After delete operation we will call this callback function.
        if(!err) //If there is no error, we will return the deleted employee details back to the response.
        {
            res.send(doc);
        }
        else{
            console.log('Error in Employee Delete : ' +JSON.stringify(err, undefined, 2)); //If error occurs we will print the error message in the console window.
        }
    });  
});

//Exporting the router object that we have created here.
module.exports = router;