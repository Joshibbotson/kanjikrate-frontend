import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../api';
import { ButtonComponent } from '../../../ui/button/button.component';

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
  public enableLoginBtn = true;
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
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    this.enableLoginBtn = false;
    this.authService
      .login(this.loginForm.value)
      .pipe(
        catchError((error: any) => {
          this.enableLoginBtn = true;
          this.errorMessage = error.error.error || 'An unknown error occurred!';
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          if (res.token && res.user) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          this.enableLoginBtn = true;
          console.error('An error occurred:', err);
        },
      });
  }
}
