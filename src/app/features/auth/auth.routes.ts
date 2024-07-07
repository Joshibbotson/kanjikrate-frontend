import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
  {
    title: 'signup',
    path: 'signup',
    component: SignupComponent,
  },
  {
    title: 'login',
    path: 'login',
    component: LoginComponent,
  },
];
