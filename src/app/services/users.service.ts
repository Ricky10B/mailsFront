import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userLogin, userRegister } from '../models/users';
import { Observable } from 'rxjs';
import { MailsService } from './mails.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient, private mailsService:MailsService) { }

  signUp(data):Observable<userRegister>{
    return this.http.post<userRegister>(`${this.url}/registerUser`, data, { headers: this.headers, withCredentials: true })
  }

  signIn(data):Observable<userLogin>{
    return this.http.post<userLogin>(`${this.url}/loginUser`, data, { headers: this.headers, withCredentials: true })
  }

  logout():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.mailsService.getToken()}`);
    return this.http.get<any>(`${this.url}/logout`, { headers, withCredentials: true });
  }

}