import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthenticationRoutingModule} from './authentication-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../material/material.module';
import { ErrordialogComponent } from './errordialog/errordialog.component'


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ErrordialogComponent],
  entryComponents:[
    ErrordialogComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthenticationModule { }
