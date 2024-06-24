import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
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
  {
    title: 'dashboard',
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
