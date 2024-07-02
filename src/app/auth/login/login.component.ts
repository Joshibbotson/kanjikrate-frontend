import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button.component';
import { AuthService } from '../../api/api/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public readonly kanjiKrateIcon = '../../assets/kanjikrateicon.png';
  public loginForm: FormGroup;
  public errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.initFormGroup();
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.keyDownLogin.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keyDownLogin.bind(this));
  }

  private initFormGroup(): FormGroup {
    return this.fb.group({
      email: [''],
      password: [''],
    });
  }

  public keyDownLogin(event: KeyboardEvent) {
    if (!this.loginForm.valid) {
      return;
    }
    if (event.key === 'Enter') {
      this.login();
    }
  }

  public login() {
    this.authService
      .login(this.loginForm.value)
      .pipe(
        catchError((error: any) => {
          this.errorMessage = error.error.error || 'An unknown error occurred!';
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
  }
}
