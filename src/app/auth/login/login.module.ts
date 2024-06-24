import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginComponent],
  providers: [provideHttpClient(), AuthService],
})
export class LoginModule {}
