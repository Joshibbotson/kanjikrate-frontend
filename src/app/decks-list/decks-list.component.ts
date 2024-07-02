import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeckService } from '../api';

@Component({
  selector: 'app-decks-list',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './decks-list.component.html',
  styleUrl: './decks-list.component.scss',
})
export class DecksListComponent {
  constructor(private readonly _deckService: DeckService) {
    // okay we should setup saving the user to localstorage for now
    // accept that this is the quickest way without setting up state management.
    this._deckService
      .readDeckByField({
        field: 'owner',
        objectId: '66813ded5b905a0bc7acf65d',
        take: 20,
        skip: 0,
      })
      .subscribe((val) => console.log(val));
  }
}
