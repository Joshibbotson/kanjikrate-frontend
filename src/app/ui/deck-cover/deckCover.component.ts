import { Component, InputSignal, input } from '@angular/core';
import { Deck } from '../../api';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { EBtnSize } from '../button/button.component';
import { EBtnColourScheme } from '../button/button.component';
import { ReviewSessionService } from '../../features/revision-session/review-session.service';
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
  constructor(private readonly reviewSessionsService:ReviewSessionService,
   private readonly  router:Router){}

  public startNewRevSession():void{
    this.reviewSessionsService.storeCardIds(this.deckInfo().cards)
    const startingCardId = this.reviewSessionsService.getCardIdByIndex(0)
    this.reviewSessionsService.updateCurrentIndex(0)
    this.router.navigate(['/decks', this.deckInfo()._id, 'revision-session', startingCardId]); 
  }

}
