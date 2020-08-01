import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  username: string;

  constructor(
    private authservice: AuthenticationService,
    private cookie: CookieService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.username = this.cookie.get('username');
  }

  Logout() {
    this.cookie.delete('username', '/');
    this.cookie.delete('token', '/');
    this.snackbar.open('Logged Out', null, {
      duration: 1000,
    });
    this.router.navigate(['/login']);
  }
}
