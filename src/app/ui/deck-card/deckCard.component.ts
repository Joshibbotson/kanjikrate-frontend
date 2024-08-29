import {
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
  signal,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { EBtnColourScheme } from '../button/enums/colour.enum';
import { CardService } from '../../api';

export enum ECardFace {
  FRONT,
  BACK,
}

@Component({
  selector: 'app-deck-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './deckCard.component.html',
  styleUrl: './deckCard.component.scss',
})
export class DeckCardComponent implements OnChanges {
  public readonly color = EBtnColourScheme.DANGER;
  public readonly front = input.required<string>();
  public readonly back = input.required<string>();
  public readonly cardId = input.required<string>();
  currentShowingFace = signal(ECardFace.FRONT);
  // add output to prompt refresh.

  public readonly _cardservice = inject(CardService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['front']) {
      this.currentShowingFace.set(ECardFace.FRONT);
    }
  }

  toggleCardFace() {
    switch (this.currentShowingFace()) {
      case ECardFace.FRONT:
        this.currentShowingFace.set(ECardFace.BACK);
        break;
      default:
        this.currentShowingFace.set(ECardFace.FRONT);
    }
  }

  handleDelete() {
    console.log('delete called');
    this._cardservice.deleteCardById(this.cardId()).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
