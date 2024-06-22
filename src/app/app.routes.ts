import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { title: 'signup', path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuardService],
})
export class AppRoutingModule {}
