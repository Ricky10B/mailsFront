import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailsService {
  url = 'http://localhost:4000/api';

  constructor(private http:HttpClient) { }

  getToken():string{
    return window.localStorage.getItem('token');
  }

  getAllMailsSends():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.getToken()}`)
    return this.http.get<any>(`${this.url}/user/mails/all/sends`, { headers, withCredentials:true });
  }

  getAllMailsReceiveds():Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<any>(`${this.url}/user/mails/all/received`, { headers, withCredentials: true });
  }

  getSingleMail(id:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<any>(`${this.url}/user/mail/${id}`, { headers, withCredentials: true });
  }

  sendMailUser(data:object):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post<any>(`${this.url}/send/mail/user`, data, { headers, withCredentials: true });
  }

  deleteMail(data:object, id:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post<any>(`${this.url}/user/mail/deleted/${id}`, data, { headers, withCredentials: true });
  }

}
