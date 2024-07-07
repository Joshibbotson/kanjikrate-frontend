import { Component } from '@angular/core';
import { Card, CardService } from '../../api';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { DeckCardComponent } from '../../ui/deck-card/deckCard.component';
import {
  ButtonComponent,
  EBtnColourScheme,
  EBtnSize,
} from '../../ui/button/button.component';
import { ProgressBarComponent } from '../../ui/progress-bar/progress-bar.component';

enum Answer {
  REMEMBER,
  FORGOT,
}
@Component({
  selector: 'app-revision-session',
  standalone: true,
  templateUrl: './revisionSession.component.html',
  styleUrl: './revisionSession.component.scss',
  imports: [DeckCardComponent, ButtonComponent, ProgressBarComponent],
})
/**
 * So here we want to access localstorage for say cardIds
 * and current index, iterate forward
 */
export class RevisionSessionComponent {
  public cardData: Card | null = null;
  public readonly btnSize = EBtnSize;
  public readonly btnColour = EBtnColourScheme;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cardService: CardService
  ) {
    const id = this.activatedRoute.snapshot.params['cardId'];
    this.fetchCardById(id);
  }

  private async fetchCardById(id: string) {
    console.log(id);
    this.cardService
      .readCardById(id)
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe((res) => {
        this.cardData = res.data ? res.data : null;
        console.log(this.cardData);
      });
  }

  private async reviewCard(answer: Answer) {}

  private updateCurrentIndex() {}

  private getCardIds() {}

  public async nextCard(answer: Answer) {}
}
