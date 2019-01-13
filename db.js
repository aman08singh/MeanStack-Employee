//importing modules
//const express = require('express');
const mongoose = require('mongoose');
/* const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path'); */

//var app=express();

//const route = require('./routes/route');

//connect to mongodb. CrudDB is the name of the database. 27017 it the default port number
mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => { //This is a callback function. err stores possible errors, while connecting to the database.
    if(!err) //When there is no error, this message will be printed on the console window
        console.log('MongoDB connection succeeded');
    else //If error occurs, then this message will be printed along with detailed error object and the description of the error, on the console window. We call json stringfy function in order to convert this object into string, with in the nation of two space characters. 2 signifies the space characters.
        console.log('Error in DB connection : '+JSON.stringify(err, undefined, 2));    
});

//exporting mongoose database connection outside this 
module.exports = mongoose;


/* //on connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to MongoDB @ 27017');
});

//off connection
mongoose.connection.on('error', (err)=>{
    if(err)
    {
        console.log('Error in database occured due to '+err);
    }
}); */

//port no.
/* const port = 3000;

//adding middleware
app.use(cors());
app.use(bodyparser());

//static files
app.use(express.static(path.join(__dirname, 'public')));// __dirname refers to the current directory. And the function joins to the public directory.

//adding routes
app.use('/api', route);

//testing server
app.get('/', (req,res)=>{
    res.send('Server is running');
});

app.listen(port, ()=>{
    console.log('Server started at port:'+port);
}); */