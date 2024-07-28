import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../ui/button/button.component';
import { LocalAuthService } from '../auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, MatProgressBarModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public readonly kanjiKrateIcon = '../../assets/kanjikrateicon.png';
  public signupForm: FormGroup;
  public enableSignUpBtn = true;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: LocalAuthService,
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
    (await this.authService.signUp(this.signupForm.value)).subscribe({
      next: (res) => {
        if (res.token && res.data) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.enableSignUpBtn = true;
        this.loading = false;
        console.error('An error occurred:', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  public onEnterKey(event: Event): void {
    if (this.signupForm.valid) {
      event.preventDefault();
      this.signUp();
    }
  }
}
