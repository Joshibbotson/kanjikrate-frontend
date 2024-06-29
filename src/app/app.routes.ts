import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DecksListComponent } from './decks-list/decks-list.component';

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
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    title: 'decks',
    path: 'decks',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: DecksListComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
