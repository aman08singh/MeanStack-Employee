//Built in imports
import { Component, OnInit } from '@angular/core';

//Local imports
import { EmployeeserviceService } from '../shared/employeeservice.service';

//Importing NgForm from @angular/forms
import { NgForm } from '@angular/forms';

//Importing employeeclass class model from employeeclass.model.ts file
import { Employeeclass } from "../shared/employeeclass.model";


//Injecting employee service class
//In order to inject the service class we have to add the class inside this component providers array.

//Declaring M object for javascript toast.
//Variable M is of type any.
declare var M : any;

@Component({
  selector: 'app-employeecomponent',
  templateUrl: './employeecomponent.component.html',
  styleUrls: ['./employeecomponent.component.css'],
  //Injecting the service class. Inside the array we have the Employeeservice service
  providers: [EmployeeserviceService]
})
export class EmployeecomponentComponent implements OnInit {
  //Adding constructor parameter. employeeService is of type Employeeservice service
  constructor(private employeeService: EmployeeserviceService) { }

  //We can call the resetForm function here i.e., ngOnInit lifecycle hook.
  //ngOnInit will be invoked only when this component is fullly loaded.
  ngOnInit() {
    //We can' t pass value to this form parameter here.
    this.resetForm();
    //Calling refreshEmployeeList() function inside ngOnInit.
    this.refreshEmployeeList();
  }

  //Definying reset form function.
  //It has a sigle parameter form that is the type NgForm. In order to use this class we have to import NgForms from angular forms.
  //We may need to call this reset form function from various parts of the application.
  //In some cases we cannot pass value for this parameter so, we made this parameter as nullable.
  //First we will check whether we have a value for this forms parameter.
  //If value for this parameter is passed we can reset the form by calling the reset function.
  //After that we can manually reset these forms controls, since we have designed this form using selectedEmployee property from employeeservice service.
  //We can do this by this.employeeService.selectedEmployee.
  //We can wire this resetForm function to this reset button click event.
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
      this.employeeService.selectedEmployee = {
        //Here we have set the selectedEmployee property with an object containing empty or null value for those properties.
        _id: "",
        empid: "",
        firstname: "",
        middlename: "",
        lastname: "",
        position: "",
        office: "",
        salary: null
      }
  }

  //Adding onSubmit function from employeecomponent.component.html
  //In this function we have a single parameter it's of the type NgForm. Inside this function we have to insert new employee into MongoDb. For that we need to post request from the node.js API from employeeController.js
  //In order to consume the post request we will create a function inside the EmployeeService class in employeeservice.service.ts file.
  //Calling employeeservice from employeeservice.service.ts.
  onSubmit(form : NgForm){
    //Calling employeeservice.
    //We have to pass object of employee containing details of new employee, for that we can pass form.value.
    //Here we have form object in order to retrieve value of form elements.
    //form.value will be an object of employee itself.
    //As postEmployee function from employeeservice.service.ts will return observable, so we can subscribe to that observable here.
    //Here we can define a callback function, it has a single parameter response i.e., res. SO it will have the response returned from the node.js project.
    //So firat of all inside this function after inserting a new record, we need to reset the form. For that we can call this reset function by passing this employee form object.
    //Adding if statement for update, delete operation.
    if(form.value._id == "") {
    this.employeeService.postEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      //Refreshing employee list by calling this function
      this.refreshEmployeeList();
      //Making a toast request.
      //In order to apply round border you can use the class rounded.
      M.toast({html : 'Saved Successfully', classes : 'rounded'});
    });
  }
  else{
    this.employeeService.putEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      //Refreshing employee list by calling this function
      this.refreshEmployeeList();
      //Making a toast request.
      //In order to apply round border you can use the class rounded.
      M.toast({html : 'Updated Successfully', classes : 'rounded'});
    });
  }
}

  //Calling getEmployeeList() function from employeeservice.service.ts file
  //Defining a new function
  //this.employeeService.getEmployeeList() this bascially returns an observable from the getEmployeeList() function in the employeeservice.service.ts file.
  //Subscribing to that observable here. Defining a callback function with a single parameter response.
  //Now inside this response parameter we will have an array of records from the employees collection. So we can assign that array into thie employees array in the employeeservice.service.ts file. We can do this by this.employeeService.employees = res.
  //We have to cast this response as an array. On not doing that it will return error. To do that we have to import employee model. After which we have to add as Employeeclass[] statement after res.
  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employeeclass[];
    });
  }

  //Defining onEdit function for editing feature.
  //It has a single parameter emp of employee model class.
  //inside that we just need to set this object into the selected employee property of employeeservice service class in employeeservice.service.ts file. So that it will update this form with selected employee content.
  onEdit(emp : Employeeclass) {
    this.employeeService.selectedEmployee = emp;
  }

  //Defining onDelete function for deleteing records
  onDelete(_id : string, form : NgForm) {
    //Delete operation is a loss of data, so we have to confirm the operation from client side.
    //Inside if statement we will confirm by asking the question. If the user confirms this operation, it will return a true value.
    if(confirm('Are you sure you want to delete this record ?')==true) {
      //So inside this if we are safe to delete the record. For that we will call the function deleteEmployee from employeeservice.service.ts file. In this function we have passed _id value.
      //This function returns observable, so we can subscribe to that function here.
      //Inside the subscribe function we will have a callback function, with a single parameter res.
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        //After deleting this employee we have to refresh this employee list, fo that we can call the function refreshEmployeeList().
        this.refreshEmployeeList();
        //Then we will reset this form if there is an emoloyee selected for update operation, for that we can call the function resetForm().
        this.resetForm(form);
        //We have to show the toast message, for that we can use M.toast, inside that we will show this message Deleted Successfully.
        M.toast({ html: 'Deleted Successfully', classes: 'rounded'});
      });
    }
  }
}
