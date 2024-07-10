import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card, CardService, Deck, DeckService } from '../../../api';
import { ButtonComponent } from '../../../ui/button/button.component';
import { DeckCardComponent } from '../../../ui/deck-card/deckCard.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-deck',
    standalone: true,
    templateUrl: './deck.component.html',
    styleUrl: './deck.component.scss',
    imports: [DeckCardComponent, ButtonComponent, MatProgressBarModule, MatPaginatorModule]
  
})
export class DeckComponent {
  public deckData: Deck | undefined;
  public loading = false
  public cardsData: Card[] | undefined;
  public totalCards = 100;
  public pageSize = 5;
  public currentPage = 0;
  constructor(
    private readonly deckService: DeckService,
    private readonly cardService: CardService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    const id = this.activatedRoute.snapshot.params['id'];
    this.fetchDeckById(id);
    this.fetchCardsByField('deck',id,this.currentPage, this.pageSize)

  }

  private fetchCardsByField(field: string, objectId:string, page: number, size: number) {
    this.loading = true
    this.cardService
      .readCardByField({
        field,
        objectId,
        take: size,
        skip: page * size,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.cardsData = res.data;
          this.totalCards = res.totalCount || 0;
        },
        error: (err) => {
          console.error('Subscription error:', err);
          this.cardsData = [];
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  private fetchDeckById(id:string) {
    this.loading = true
    this.deckService
      .readDeckById(id)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.deckData = res.data;
          }
        },
        error: (err) => {
          console.error(err)
        },
        complete: () => {
          this.loading = false
        }
      });
  }

  public onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    if(this.deckData?._id){

      this.fetchCardsByField('deck', this.deckData?._id, this.currentPage, this.pageSize);
    }
  }
}
