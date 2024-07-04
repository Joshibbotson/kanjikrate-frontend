import { Component } from '@angular/core';
import { DeckCardComponent } from '../ui/deck-card/deckCard.component';
import { Deck, DeckService } from '../api';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { ButtonComponent } from "../ui/button/button.component";

@Component({
    selector: 'app-deck',
    standalone: true,
    templateUrl: './deck.component.html',
    styleUrl: './deck.component.scss',
    imports: [DeckCardComponent, ButtonComponent]
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
