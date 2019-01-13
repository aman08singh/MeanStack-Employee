import { Injectable } from '@angular/core';


//Adding import statement for angular core packages and service class.
//Importing httpclient for making request to node.js
import { HttpClient } from '@angular/common/http'
import { Observable, from } from 'rxjs'; //import { Observable } from 'rxjs/Observable' was not working. So i imported whole rxjs
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';
//import { map } from 'rxjs/operators';
//import { toPromise } from 'rxjs/operators'

//Importing employee module from employeeclass.model.ts
import { Employeeclass } from './employeeclass.model'

@Injectable({
  providedIn: 'root'
})

export class EmployeeserviceService {
  //Creating two variables in the service class
  //Variable selectedEmployee is of Employeeclass model class.
  //With this selectedEmployee property we will design a form for insert and update operation that we can do in employee component HTML.
  selectedEmployee: Employeeclass;
  //Array of employees is of Employeeclass model class.
  //Inside this array we will save all employees from mongodb collection.
  employees: Employeeclass[];
  //We nee to make the post request into employees route. Creating a read only variable here.
  //Readonly variable is initialized with the URI for the employee controller in our node.js project
  readonly baseURL = 'http://localhost:3000/employee';

  //First of all we have to inject the httpclient into this constructor here.
  //In order to woek with httpclient we have to import Http client module in the app.module.ts.
  constructor(private http : HttpClient) { }

  //In order to consume the post request we will create a function in this class i.e., EmployeeserviceService class.
  //For this function we have a single parameter emp. It's of type Employee model class.
  //In order to make this post request we have to make a http request into the node.js project.
  //For that we can use httpclient import.
  postEmployee(emp : Employeeclass){
    //Making a post request. As a first parameter we have to pass the URI, after we have to pass the json object containing details of new employee.
    //So here we have returned this post function back to the caller.
    //Basically you can see that this post function returns an observable here.
    //So we can call this function inside the employeecomponent.component.ts file 
    return this.http.post(this.baseURL, emp);
  }

  //Function all employees from the employee collection in MongoDb.
  //Here we have made a get request into the node.js project i.e., employeeController.js file
  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  //Adding function to consume.
  //It has a single parameter emp, its of the type Employeeclass.
  //In order to consume the put route from nodejs, we can call the put function from http client object as a first parameter we will pass the uri here.
  //Here we have concatenated _id with the baseURL. As a second parameter we have passed the exact employee object. Now we can make use of this function inside employeecomponent.component.ts file.
  putEmployee(emp : Employeeclass) {
    return this.http.put(this.baseURL + '/' + emp._id, emp);
  }

  //Adding function inside this employeeclass class, in order to consume delete route from nodejs project
  //It has a single parameter _id. We will make this delete request by passing this URL, inside that we have appended _id
  deleteEmployee(_id : string) {
    return this.http.delete(this.baseURL + '/' + _id)
  }
}