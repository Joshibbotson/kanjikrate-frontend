import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { AuthGuardService } from '../auth/auth-guard.guard';
import { RevisionSessionComponent } from '../revision-session/revisionSession.component';
import { DecksListComponent } from './decks-list.component';

export const deckRoutes: Routes = [
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
        path: ':id/revision-session/:cardId',
        component: RevisionSessionComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];
