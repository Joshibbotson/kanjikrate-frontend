import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

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
  public data: any;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.initFormGroup();
  }

  private initFormGroup(): FormGroup {
    return this.fb.group({
      email: [''],
      password: [''],
    });
  }

  public async signUp() {
    (await this.authService.registerUser(this.signupForm.value)).subscribe(
      (res: any) => (this.data = res.data)
    );
  }
}
