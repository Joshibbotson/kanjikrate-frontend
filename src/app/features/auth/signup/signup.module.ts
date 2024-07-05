import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../../api';

@NgModule({
  declarations: [],
  imports: [CommonModule, SignupComponent],
  providers: [provideHttpClient(), AuthService],
})
export class SignupModule {}
