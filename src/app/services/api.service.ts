import { Signup } from './../models/signup';
import { UserDetails } from './../models/user-details';
import { Signin } from './../models/signin';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpHeaders: HttpHeaders;

  private signinUrl:string = environment.apiBaseUrl + "/api/auth/login";
  private signupUrl:string = environment.apiBaseUrl + "/api/auth/register";
  private getContactsUrl:string = environment.apiBaseUrl + "/api/contacts";
  private testContactsUrl:string = environment.apiBaseUrl + "/api/contacts/test";

  

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

  

  fetchContacts(email:string, token:string): Observable<Contact[]> {
    console.log(email, token);
    this.httpHeaders = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<Contact[]>(this.getContactsUrl + `/${email}`, {headers: this.httpHeaders});
  }

}
