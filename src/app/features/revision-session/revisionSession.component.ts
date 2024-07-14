import { Component, OnDestroy, signal } from '@angular/core';
import { Card, CardService } from '../../api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { DeckCardComponent } from '../../ui/deck-card/deckCard.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { ProgressBarComponent } from '../../ui/progress-bar/progress-bar.component';
import { Answer, ReviewSessionService } from './review-session.service';
import { timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EBtnColourScheme } from '../../ui/button/enums/colour.enum';
import { EBtnSize } from '../../ui/button/enums/size.enum';
import { BreadCrumbsComponent } from '../../ui/bread-crumbs/bread-crumbs.component';
import { IBreadCrumbsPart } from '../../ui/bread-crumbs/bread-crumbs.types';

enum Grades {
  BAD = 1,
  OKAY = 2,
  GOOD = 3,
  GREAT = 4,
  PERFECT = 5,
}

@Component({
  selector: 'app-revision-session',
  standalone: true,
  templateUrl: './revisionSession.component.html',
  styleUrl: './revisionSession.component.scss',
  imports: [
    DeckCardComponent,
    ButtonComponent,
    ProgressBarComponent,
    BreadCrumbsComponent,
  ],
})
export class RevisionSessionComponent implements OnDestroy {
  public cardData: Card | null = null;
  public readonly btnSize = EBtnSize;
  public readonly btnColour = EBtnColourScheme;
  public readonly answer = Answer;
  public sessionLength = signal<number>(0);
  public sessionProgress = signal<number>(0);
  public timer$: Subscription | undefined;
  private timerRunning = false;
  private seconds = 0;
  private routeSub: Subscription | undefined;
  public loading = true;
  public errorMsg: string | undefined;
  private gradesMap: { [key: number]: string } = {
    [Grades.BAD]: 'Oh no :(',
    [Grades.OKAY]: 'Okay!',
    [Grades.GOOD]: 'Good!',
    [Grades.GREAT]: 'Great!',
    [Grades.PERFECT]: 'Perfect!',
  };
  public breadCrumbLinks = signal<IBreadCrumbsPart[]>([]);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cardService: CardService,
    private readonly reviewSessionsService: ReviewSessionService,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.initProgressBarValues();
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      const id = params['cardId'];
      this.fetchCardById(id);
      this.reviewSessionsService.setCurrIndexByCardId(id);
      this.initProgressBarValues();
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private startTimer() {
    if (!this.timerRunning) {
      const newTimer = timer(0, 1000);
      this.timer$ = newTimer.subscribe((n) => {
        const data = (this.seconds = n);
      });

      this.timerRunning = true;
    }
  }

  public stopTimer() {
    if (this.timer$) {
      this.timer$.unsubscribe();
      this.timerRunning = false;
    }
  }

  private initProgressBarValues() {
    const fetchedSessionlength =
      this.reviewSessionsService.getLocalStorageCardIds?.length;
    if (fetchedSessionlength) {
      this.sessionLength.set(fetchedSessionlength);
    }
    const fetchedSessionProgress = this.reviewSessionsService.getCurrCardIndex;
    if (fetchedSessionProgress) {
      this.sessionProgress.set(fetchedSessionProgress);
    }
  }

  private async fetchCardById(id: string) {
    console.log(id);
    this.cardService
      .readCardById(id)
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe((res) => {
        if (res.data) {
          this.cardData = res.data ? res.data : null;
          this.initialiseBreadCrumbs(res.data?._id);
        }
      });
  }

  public async reviewCard(answer: Answer) {
    this.stopTimer();
    const score = this.calculateGrade(answer, this.seconds);
    if (this.cardData) {
      await this.cardService
        .reviewCardById(this.cardData?._id, { score })
        .subscribe({
          next: (res) => {
            this.openSnackBar(score);

            if (res.success) {
              const currCardIndex = this.reviewSessionsService.getCurrCardIndex;
              const cardIdsLength =
                this.reviewSessionsService.getLocalStorageCardIdsLength;
              if (cardIdsLength === null) {
                return;
              }
              if (currCardIndex !== null && currCardIndex + 1 > cardIdsLength) {
                return;
              }
              if (currCardIndex !== null) {
                const newIndex = currCardIndex + 1;
                this.reviewSessionsService.updateCurrentIndex(newIndex);
                this.sessionProgress.set(this.sessionProgress() + 1);
                const nextCardId =
                  this.reviewSessionsService.getCardIdByIndex(newIndex);
                if (nextCardId !== null) {
                  this.router.navigate([
                    'decks',
                    this.cardData?.deck,
                    'revision-session',
                    nextCardId,
                  ]);
                  this.fetchCardById(nextCardId);
                }
              }
            }
          },
          error: (err) => {
            console.error('failed to review card with error of:', err);
          },

          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  public async nextCard(answer: Answer) {
    this.stopTimer();
    await this.reviewCard(answer);
    const cardReview = await this.reviewCard(answer);
  }

  private calculateGrade(answer: Answer, seconds: number) {
    if (answer === Answer.FORGOT) {
      return Grades.BAD;
    }
    if (seconds < 2) {
      return Grades.PERFECT;
    }
    if (seconds >= 2 && seconds < 4) {
      return Grades.GREAT;
    }
    if (seconds >= 4 && seconds < 6) {
      return Grades.GOOD;
    }
    return Grades.OKAY;
  }

  public openSnackBar(grade: number) {
    this._snackBar.open(
      `${this.cardData?.front} ${this.gradesMap[grade]}`,
      'close',
      {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }

  private initialiseBreadCrumbs(id: string) {
    this.breadCrumbLinks.set([
      {
        display: 'Decks',
        link: '/decks',
      },
      {
        display: this.cardData?.front || 'id',
        link: `/decks/${this.cardData?.deck}/revision-session/${id}`,
      },
    ]);
  }
}
