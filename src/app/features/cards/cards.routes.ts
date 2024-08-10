import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { AuthGuardService } from '../auth/auth-guard.guard';
import { CardsListComponent } from '../cards/cards-list.component';

export const cardsRoutes: Routes = [
  {
    title: 'Decks',
    path: 'decks',
    component: MainLayoutComponent,
    children: [
      {
        title: 'Cards',
        path: ':id',
        component: CardsListComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];
