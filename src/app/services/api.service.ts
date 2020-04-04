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

  private signinUrl: string = environment.apiBaseUrl + "/api/auth/login";
  private signupUrl: string = environment.apiBaseUrl + "/api/auth/register";
  private contactsUrl: string = environment.apiBaseUrl + "/api/contacts";
  // private testContactsUrl:string = environment.apiBaseUrl + "/api/contacts/test";



  constructor(
    private http: HttpClient,

  ) { }

  signin(model: Signin): Observable<UserDetails> {
    return this.http.post<UserDetails>(this.signinUrl, model);
  }

  signup(model: Signup): Observable<UserDetails> {
    return this.http.post<UserDetails>(this.signupUrl, model);
  }


  fetchContacts(email: string, token: string): Observable<Contact[]> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Contact[]>(this.contactsUrl + `/${email}`, { headers: this.httpHeaders });
  }

  addContact(email: string, token: string, model: Contact): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.contactsUrl + `/${email}`, model, { headers: this.httpHeaders });
  }

  updateContact(email: string, token: string, model: Contact): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(this.contactsUrl + `/${email}`, model, { headers: this.httpHeaders });
  }

  deleteContact(email: string, token: string, id: number): Observable<any> {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(this.contactsUrl + `/${email}/${id}`, { headers: this.httpHeaders });
  }

}
