import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SingleMailMessageComponent } from './pages/single-mail-message/single-mail-message.component';
import { AuthGuard } from './shared/login/auth.guard';
import { LogoutGuard } from './shared/logout/logout.guard';

const routes: Routes = [
  {
    path: '', component: LoginRegisterComponent, pathMatch: 'full', canActivate: [LogoutGuard]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'mail/show/:id', component: SingleMailMessageComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
