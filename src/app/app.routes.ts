import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"home",
    component:HomeComponent,
    canActivate:[authGuard]
  },
  {
    path:"user",
    component:UserPageComponent,
    canActivate:[authGuard]

  }
  ,
  {
    path:"reserva",
    component:ContentPageComponent,

    canActivate:[authGuard]

  }

];
