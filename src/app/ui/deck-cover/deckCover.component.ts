import { Component, InputSignal, input } from '@angular/core';
import { Deck } from '../../api';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { EBtnSize } from '../button/button.component';
import { EBtnColourScheme } from '../button/button.component';
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
}
