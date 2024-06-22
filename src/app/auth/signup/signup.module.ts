import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { AuthService } from '../auth.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, SignupComponent],
  providers: [provideHttpClient(), AuthService],
})
export class SignupModule {}
