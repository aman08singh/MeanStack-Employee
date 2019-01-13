import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Importing forms module
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeecomponentComponent } from './employeecomponent/employeecomponent.component';

//Importing httpclient module
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    EmployeecomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //Adding httpclientModule class here.
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
