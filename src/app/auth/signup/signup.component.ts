import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../api/api/auth.service';
import { UserService } from '../../api/api/user.service';
import { CreateUser200Response, User } from '../../api';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public readonly kanjiKrateIcon = '../../assets/kanjikrateicon.png';
  public signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {
    this.signupForm = this.initFormGroup();
  }

  private initFormGroup(): FormGroup {
    return this.fb.group({
      email: [''],
      password: [''],
    });
  }

  public async signUp() {
    (await this.authService.createUser(this.signupForm.value))
      .pipe(
        catchError((error: any) => {
          console.error('An error or occurred:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error(err),
      });
  }
}
