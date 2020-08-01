import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router'

import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar'
import {ErrordialogComponent} from '../errordialog/errordialog.component'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.component.css'],
})
export class RegisterComponent implements OnInit {
  // Flags
  PasswordsMatch: boolean;

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required]],
  });

  // Getters to minimize code in HTML
  get usernameControl() {
    return this.form.get('username');
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get password2Control() {
    return this.form.get('password2');
  }

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthenticationService,
    public dialog: MatDialog,
    private snackbar:MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.PasswordsMatch = true;
  }

  CheckPasswords(): boolean {
    if (this.form.get('password').value === this.form.get('password2').value) {
      this.PasswordsMatch = true;
      return true;
    } else {
      this.PasswordsMatch = false;
      return false;
    }
  }

  openDialog(error) {
    this.dialog.open(ErrordialogComponent,{data:{'msg':error},backdropClass: 'dialogBG'})
  }

  displaySnackBar(msg:any) {
    let snackbarRef = this.snackbar.open(msg,null,{
      duration: 1500,
    });
  }

  UserRegisterSubmit() {
    if (this.CheckPasswords()) {
      this.authservice.pyUserRegistration(this.form.value).subscribe(
        (data) => {
          if(data.status === true) {
            this.displaySnackBar(data.response);
          }
        },
        (error) => {
          this.openDialog(error);
        }
      );
    }
  }
}

