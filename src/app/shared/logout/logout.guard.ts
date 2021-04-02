import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MailsService } from '../../services/mails.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(
    private cookieService:CookieService,
    private mailsService:MailsService,
    private router:Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.cookieService.check("connect.sid") && this.mailsService.getToken()){
        this.router.navigateByUrl('/home');
        return false;
      }else{
        return true;
      }
  }
  
}
