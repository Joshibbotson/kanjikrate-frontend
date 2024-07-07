import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { AuthGuardService } from '../auth/auth-guard.guard';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Routes = [
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
];
