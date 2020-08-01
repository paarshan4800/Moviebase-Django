import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { AuthenticationService } from '../authentication.service';
import {CookieService} from 'ngx-cookie-service'

import { MatDialog } from '@angular/material/dialog';
import {ErrordialogComponent} from '../errordialog/errordialog.component'
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.css'],
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  // Getters to minimize code in HTML
  get usernameControl() {
    return this.form.get('username');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthenticationService,
    public dialog: MatDialog,
    private router:Router,
    private cookie:CookieService
  ) {}

  ngOnInit(): void {}


  openDialog(error) {
    this.dialog.open(ErrordialogComponent,{data:{'msg':error},backdropClass: 'dialogBG'})
  }
  
  UserLoginSubmit() {
    this.authservice.pyUserLogin(this.form.value).subscribe(
      (data) => {
        this.cookie.set('username',data.username,null,'/')
        this.cookie.set('token',data.token,null,'/')
        this.router.navigate([''])
      },
      (error) => {
        this.openDialog(error);
      }
    );
  }
}
