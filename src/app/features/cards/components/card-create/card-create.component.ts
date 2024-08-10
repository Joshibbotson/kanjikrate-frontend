import {
  AfterViewInit,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardService, DeckService } from '../../../../api';
import { EBtnColourScheme } from '../../../../ui/button/enums/colour.enum';
import { EBtnSize } from '../../../../ui/button/enums/size.enum';
import { LocalAuthService } from '../../../auth/auth.service';
import { ButtonComponent } from '../../../../ui/button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-create',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.scss',
})
export class CardCreateComponent implements AfterViewInit {
  private _cardService = inject(CardService);
  public readonly deckId = input.required<string>();
  public readonly btnSize = EBtnSize;
  public readonly btnColour = EBtnColourScheme;
  public cancelClick = output<void>();
  public saveClick = output<void>();
  public formGroup: FormGroup = new FormGroup({
    front: new FormControl(''),
    back: new FormControl(''),
    deck: new FormControl(''),
  });
  public loading = signal<boolean>(false);

  ngAfterViewInit() {
    this.formGroup.patchValue({ deck: this.deckId() });
  }

  onCancelClick() {
    this.cancelClick.emit();
  }

  onSaveClick() {
    this.loading.set(true);
    console.log(this.formGroup.value);
    this._cardService.createCard(this.formGroup.value).subscribe({
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
