import { Component, OnInit, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LocalAuthService } from '../auth/auth.service';
import { DeckCoverComponent } from '../../ui/deck-cover/deckCover.component';
import { User, Deck, DeckService } from '../../api';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BreadCrumbsComponent } from '../../ui/bread-crumbs/bread-crumbs.component';
import { IBreadCrumbsPart } from '../../ui/bread-crumbs/bread-crumbs.types';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateDeckdOutlineComponent } from './components/create-card-outline/create-deck-outline.component';
import { DeckCreateComponent } from './components/deck-create/deck-create.component';

@Component({
  selector: 'app-decks-list',
  standalone: true,
  templateUrl: './decks-list.component.html',
  styleUrl: './decks-list.component.scss',
  imports: [
    MatPaginatorModule,
    DeckCoverComponent,
    MatProgressBarModule,
    BreadCrumbsComponent,
    CreateDeckdOutlineComponent,
    DeckCreateComponent,
  ],
})
export class DecksListComponent implements OnInit {
  public readonly user: Partial<User> | null;
  public decksData: Deck[] | undefined;
  public totalDecks = 100;
  public pageSize = 10;
  public currentPage = 0;
  public loading: boolean = false;
  public breadCrumbLinks: IBreadCrumbsPart[] = [
    {
      display: 'Decks',
      link: '/decks',
    },
  ];
  public showCreateCard = signal<boolean>(false);

  constructor(
    private readonly _deckService: DeckService,
    private readonly localAuthService: LocalAuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.user = this.User;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const skip = params['skip'];
      const take = params['take'];
      if (skip === undefined || take === undefined) {
        this.updateQueryParams(this.currentPage, this.pageSize);
      } else {
        this.currentPage = skip ? +skip / this.pageSize : 0;
        this.pageSize = take ? +take : 10;
        this.fetchDecksByField('owner', this.currentPage, this.pageSize);
      }
    });
  }

  private get User() {
    return this.localAuthService.User;
  }

  private fetchDecksByField(field: string, page: number, size: number) {
    this.loading = true;
    const { take, skip } = {
      take: size,
      skip: page * size,
    };
    this._deckService
      .readDeckByField(take, skip, {
        field,
        objectId: this.user?._id,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.decksData = res.data;
          this.totalDecks = res.totalCount || 0;
        },
        error: (err) => {
          console.error('Subscription error:', err);
          this.decksData = [];
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  toggleCreateCard() {
    this.showCreateCard.set(!this.showCreateCard());
  }

  private updateQueryParams(page: number, size: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { skip: page * size, take: size },
      queryParamsHandling: 'merge',
    });
  }

  public onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        skip: this.currentPage * this.pageSize,
        take: this.pageSize,
      },
      queryParamsHandling: 'merge',
    });
    this.fetchDecksByField('owner', this.currentPage, this.pageSize);
  }

  closeCreateDeck() {
    this.showCreateCard.set(false);
  }
  onSaveDeck() {
    this.closeCreateDeck();
    this.fetchDecksByField('owner', this.currentPage, this.pageSize);
  }
}
