import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { LocalAuthService } from '../auth.service';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginComponent],
  providers: [provideHttpClient(), LocalAuthService],
})
export class LoginModule {}
