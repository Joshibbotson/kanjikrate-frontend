import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { SignupModule } from './auth/signup/signup.module';

@NgModule({
  declarations: [],
  imports: [AppComponent, CommonModule, DashboardModule, SignupModule],
})
export class AppModule {}
