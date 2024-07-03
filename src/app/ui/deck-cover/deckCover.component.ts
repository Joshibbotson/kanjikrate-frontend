import { Component, InputSignal, input } from '@angular/core';
import { Deck } from '../../api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deck-cover',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './deckCover.component.html',
  styleUrl: './deckCover.component.scss',
})
export class DeckCoverComponent {
  public readonly deckInfo: InputSignal<Deck> = input.required<Deck>();
}
