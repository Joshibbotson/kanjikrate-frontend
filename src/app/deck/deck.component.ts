import { Component, InputSignal, Signal, input } from '@angular/core';
import { DeckCardComponent } from '../ui/deck-card/deckCard.component';
import { Deck, DeckService } from '../api';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [DeckCardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
})
export class DeckComponent {
  public deckData: Deck | undefined;
  constructor(
    private readonly deckService: DeckService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.fetchDeckById();
  }

  // in general we need some kind of loading mechanism
  private fetchDeckById() {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.deckService
      .readDeckById(id)
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.deckData = res.data;
        }
      });
  }
}
