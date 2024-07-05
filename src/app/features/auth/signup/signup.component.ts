import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../api';
import { ButtonComponent } from '../../../ui/button/button.component';

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
      name: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
            localStorage.setItem('user', JSON.stringify(res.data));
          }
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error(err),
      });
  }
}
