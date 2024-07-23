import { Component, InputSignal, input } from '@angular/core';
import { CardService, Deck } from '../../api';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

import { ReviewSessionService } from '../../features/revision-session/review-session.service';
import { EBtnColourScheme } from '../button/enums/colour.enum';
import { EBtnSize } from '../button/enums/size.enum';
@Component({
  selector: 'app-deck-cover',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './deckCover.component.html',
  styleUrl: './deckCover.component.scss',
})
export class DeckCoverComponent {
  public readonly deckInfo: InputSignal<Deck> = input.required<Deck>();
  public readonly btnSize = EBtnSize;
  public readonly btnColour = EBtnColourScheme;
  constructor(
    private readonly reviewSessionsService: ReviewSessionService,
    private readonly cardService: CardService,
    private readonly router: Router
  ) {}

  public startNewRevSession(): void {
    this.cardService.readCardsForReview(this.deckInfo()._id).subscribe({
      next: (res) => {
        const cardIds = res.data?.map((card) => card._id);
        if (cardIds && cardIds?.length > 0) {
          this.reviewSessionsService.storeCardIds(cardIds);
        } else {
          this.reviewSessionsService.storeCardIds(
            this.shuffleArray(this.deckInfo().cards)
          );
        }

        const startingCardId = this.reviewSessionsService.getCardIdByIndex(0);
        this.reviewSessionsService.updateCurrentIndex(0);
        this.router.navigate([
          '/decks',
          this.deckInfo()._id,
          'revision-session',
          startingCardId,
        ]);
      },
      error: (err) => console.error(err),
    });
  }

  shuffleArray(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
}
