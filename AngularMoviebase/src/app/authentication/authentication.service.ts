import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL, ENV } from '../DevProd';

import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //Base Url
  baseUrl: string;

  // Other Urls
  urlUserRegistration = 'register/';
  urlUserLogin = 'login/';

  constructor(private http: HttpClient) {
    this.baseUrl = URL;
  }
  // API REQUESTS
  pyUserRegistration(data: object) {
    return this.http
      .post<any>(this.baseUrl + this.urlUserRegistration, data)
      .pipe(catchError(this.errorHandler));
  }

  pyUserLogin(data: object) {
    return this.http
      .post<any>(this.baseUrl + this.urlUserLogin, data)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error['msg'] || 'SERVER ERROR');
  }

}
