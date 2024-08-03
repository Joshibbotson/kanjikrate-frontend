import { Component, inject, output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../ui/button/button.component';
import { EBtnColourScheme } from '../../../../ui/button/enums/colour.enum';
import { EBtnSize } from '../../../../ui/button/enums/size.enum';
import { RouterLink } from '@angular/router';
import { DeckService } from '../../../../api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalAuthService } from '../../../auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-deck-create',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './deck-create.component.html',
  styleUrl: './deck-create.component.scss',
})
export class DeckCreateComponent {
  private _deckService = inject(DeckService);
  private _localAuthService = inject(LocalAuthService);
  public readonly btnSize = EBtnSize;
  public readonly btnColour = EBtnColourScheme;
  public cancelClick = output<void>();
  public saveClick = output<void>();
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    owner: new FormControl(this._localAuthService.User?._id),
  });
  public loading = signal<boolean>(false);

  onCancelClick() {
    this.cancelClick.emit();
  }

  onSaveClick() {
    this.loading.set(true);
    this._deckService.createDeck(this.formGroup.value).subscribe({
      next: () => {
        this.loading.set(false);
        this.saveClick.emit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
