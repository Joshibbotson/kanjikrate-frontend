import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './features/auth/auth-guard.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DeckComponent } from './features/decks-list/deck/deck.component';
import { DecksListComponent } from './features/decks-list/decks-list.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RevisionSessionComponent } from './features/revision-session/revisionSession.component';

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
      {
        path: ':id',
        component: DeckComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: ':id/revision-session/:cardId',
        component: RevisionSessionComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
