import { Component } from '@angular/core';
import { DeckCardComponent } from '../ui/deck-card/deckCard.component';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [DeckCardComponent],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
})
export class DeckComponent {}
