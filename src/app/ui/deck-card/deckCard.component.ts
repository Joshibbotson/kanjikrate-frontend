import { Component, OnChanges, SimpleChanges, input, signal } from '@angular/core';

export enum ECardFace {
  FRONT,
  BACK,
}

@Component({
  selector: 'app-deck-card',
  standalone: true,
  imports: [],
  templateUrl: './deckCard.component.html',
  styleUrl: './deckCard.component.scss',
})
export class DeckCardComponent implements OnChanges {
  public readonly front = input.required<string>();
  public readonly back = input.required<string>();
  currentShowingFace = signal(ECardFace.FRONT);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['front']){
      this.currentShowingFace.set(ECardFace.FRONT)
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
}
