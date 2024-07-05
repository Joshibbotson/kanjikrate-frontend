import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SignupModule } from './features/auth/signup/signup.module';
import { DashboardModule } from './features/dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [AppComponent, CommonModule, DashboardModule, SignupModule],
})
export class AppModule {}
