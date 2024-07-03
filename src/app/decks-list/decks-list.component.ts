import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Deck, DeckService, User } from '../api';
import { LocalAuthService } from '../auth/auth.service';
import { catchError } from 'rxjs';
import { DeckCoverComponent } from '../ui/deck-cover/deckCover.component';

@Component({
  selector: 'app-decks-list',
  standalone: true,
  templateUrl: './decks-list.component.html',
  styleUrl: './decks-list.component.scss',
  imports: [MatPaginatorModule, DeckCoverComponent],
})
export class DecksListComponent {
  public readonly user: Partial<User> | null;
  public decksData: Deck[] | undefined;
  public totalDecks = 100;
  public pageSize = 10;
  public currentPage = 0;

  constructor(
    private readonly _deckService: DeckService,
    private readonly localAuthService: LocalAuthService
  ) {
    this.user = this.User;
    this.fetchDecksByField('owner', this.currentPage, this.pageSize);
  }

  private get User() {
    return this.localAuthService.User;
  }

  private fetchDecksByField(field: string, page: number, size: number) {
    this._deckService
      .readDeckByField({
        field,
        objectId: this.user?._id,
        take: size,
        skip: page * size,
      })
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.decksData = res.data;
        this.totalDecks = res.totalCount || 0;
      });
  }

  public onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchDecksByField('owner', this.currentPage, this.pageSize);
  }
}
