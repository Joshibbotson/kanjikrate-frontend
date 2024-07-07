import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { deckRoutes } from './features/decks/decks.routes';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  ...dashboardRoutes,
  ...deckRoutes,
  {
    path: '*',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
