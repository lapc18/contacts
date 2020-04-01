import { Signup } from './../models/signup';
import { UserDetails } from './../models/user-details';
import { Signin } from './../models/signin';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpOptions: HttpHeaders;

  private signinUrl:string = environment.apiBaseUrl + "/api/auth/login";
  private signupUrl:string = environment.apiBaseUrl + "/api/auth/register";

  constructor(
    private http: HttpClient,
    
  ) { }

  signin(model: Signin): Observable<UserDetails> {
    console.log(model); 
    return this.http.post<UserDetails>(this.signinUrl, model);
  }

  signup(model: Signup): Observable<UserDetails> {
    return this.http.post<UserDetails>(this.signupUrl, model);
  }

}
