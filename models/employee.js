//Request statement for mongoose package
const mongoose = require('mongoose');

//Creating model employee. For that calling mongoose function
var Employee = mongoose.model('Employee', { //Passing the model name Employee here. After that we have to specify the schema or structure of our model.
    empid: {type:String},
    firstname: {type:String},
    middlename: {type:String},
    lastname: {type:String},
    position: {type:String},
    office: {type:String},
    salary: {type:Number},
}); //Inside this application we will implement crud operation

//Exporting the module employee
module.exports = { Employee }; //Since we have the same identifier on both sides, we can use the es6 shorthand method. We just need to pass employee

//In order to insert new employee record into mongodb we just need to create an object of employee and call the function say from the object. It will insert a new record into this employees collection that we have already created. We have not specified in order to insert the record into this employees collection anywhere inside this model. By default mongoose will insert the new record into a collection with named employees. SO it will use the plural version of the model name that we have passed i.e., Employee as Employees.  We do not have to create a collection manually like as in SQL databases, mongoose will automatically create the collection as per our model. Without using the plural version of this model name we can pass the third parameter here.