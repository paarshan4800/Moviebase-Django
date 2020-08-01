import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { from } from 'rxjs';
import { ENV, URL } from '../DevProd';

import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  //Base Url
  baseUrl: string;

  // Other Urls
  APIKEY = '&apikey=8ecdf5bd';
  omdbSearchUrl: string = 'http://www.omdbapi.com/?s=';
  omdbGetMovieUrl: string = 'http://www.omdbapi.com/?i=';
  urlAddtoLikedList: string = 'addtolikedlist/';
  urlGetLikedList: string = 'getlikedlist/';
  urlMovieLikedOrNot: string = 'movielikedornot/';
  urlRemoveFromLikedList: string = 'removefromlikedlist/';
  urlMovieboard: string = 'movieboard/';

  // Headers
  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Token ' + this.cookie.get('token'),
      }),
    };
  }

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.baseUrl = URL;
  }

  // API REQUESTS

  pyAddToLikedList(data: object) {
    return this.http
      .post<any>(this.baseUrl + this.urlAddtoLikedList, data, this.getHeaders())
      .pipe(catchError(this.errorHandler));
  }

  pyRemoveFromLikedList(data: object) {
    return this.http
      .post<any>(
        this.baseUrl + this.urlRemoveFromLikedList,
        data,
        this.getHeaders()
      )
      .pipe(catchError(this.errorHandler));
  }

  pyGetLikedList() {
    return this.http
      .get<any>(this.baseUrl + this.urlGetLikedList, this.getHeaders())
      .pipe(catchError(this.errorHandler));
  }

  pyMovieLikedOrNot(data: object) {
    return this.http
      .post<any>(
        this.baseUrl + this.urlMovieLikedOrNot,
        data,
        this.getHeaders()
      )
      .pipe(catchError(this.errorHandler));
  }

  pyMovieboard() {
    return this.http
      .get<any>(this.baseUrl + this.urlMovieboard, this.getHeaders())
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || error.error['msg'] || 'SERVER ERROR');
  }

  // OMDB REQUESTS
  omdbSearchMovies(title: string) {
    return this.http
      .get<any>(this.omdbSearchUrl + title + this.APIKEY)
      .pipe(catchError(this.errorHandler));
  }

  omdbGetMovie(id: string) {
    return this.http
      .get<any>(this.omdbGetMovieUrl + id + this.APIKEY)
      .pipe(catchError(this.errorHandler));
  }
}
