import { Component, OnDestroy, signal } from '@angular/core';
import { Card, CardService } from '../../api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { DeckCardComponent } from '../../ui/deck-card/deckCard.component';
import {
  ButtonComponent,
  EBtnColourScheme,
  EBtnSize,
} from '../../ui/button/button.component';
import { ProgressBarComponent } from '../../ui/progress-bar/progress-bar.component';
import { Answer, ReviewSessionService } from '../../services/review-session.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-revision-session',
  standalone: true,
  templateUrl: './revisionSession.component.html',
  styleUrl: './revisionSession.component.scss',
  imports: [DeckCardComponent, ButtonComponent, ProgressBarComponent],
})
/**
 * So here we want to access localstorage for say cardIds
 * and current index, iterate forward
 * Make into service
 */
export class RevisionSessionComponent implements OnDestroy {
  public cardData: Card | null = null;
  public readonly btnSize = EBtnSize;
  public readonly btnColour = EBtnColourScheme;
  public readonly answer = Answer
  public sessionLength = signal<number>(0)
  public sessionProgress = signal<number>(0)
  public timer$: Subscription | undefined
  private timerRunning = false;
  private scoreMultiplier = 0;
  private routeSub: Subscription | undefined;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cardService: CardService,
    private readonly reviewSessionsService:ReviewSessionService,
    private readonly router:Router
  ) {
    this.initProgressBarValues()
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      const id = params['cardId'];
      this.fetchCardById(id);
      this.reviewSessionsService.setCurrIndexByCardId(id);
      this.initProgressBarValues()
      this.startTimer()
    });
  }

  ngOnDestroy(): void {
    this.stopTimer()
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private startTimer(){
    if(!this.timerRunning){
      const newTimer = timer(0, 1000)
      this.timer$ = newTimer.subscribe(n => {
        const data =  this.scoreMultiplier = n
      })
      
      this.timerRunning = true
    }
  }

  public stopTimer(){
    if(this.timer$){
      this.timer$.unsubscribe();
      this.timerRunning = false;
    }
  }
  
  private initProgressBarValues(){
    const fetchedSessionlength = this.reviewSessionsService.getLocalStorageCardIds?.length 
    if(fetchedSessionlength){
      this.sessionLength.set(fetchedSessionlength)
    }
    const fetchedSessionProgress = this.reviewSessionsService.getCurrCardIndex
    if(fetchedSessionProgress){
      this.sessionProgress.set(fetchedSessionProgress)
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
        this.cardData = res.data ? res.data : null;
      });
  }

  // setup review card route that accepts a score
  private async reviewCard(answer: Answer) {
    const score = answer * this.scoreMultiplier
  }

  public async nextCard(answer: Answer) {
      this.stopTimer()
    // send card for review first, ensure it succeeds before next card.
    const cardReview = await this.reviewCard(answer)
    const currCardIndex = this.reviewSessionsService.getCurrCardIndex
    const cardIdsLength = this.reviewSessionsService.getLocalStorageCardIdsLength 
    if (cardIdsLength === null){
      return
    }
    if(currCardIndex !== null && currCardIndex + 1 > cardIdsLength){
      return
    }
    if(currCardIndex !== null){
      const newIndex = currCardIndex + 1
      this.reviewSessionsService.updateCurrentIndex(newIndex)
      this.sessionProgress.set(this.sessionProgress() + 1)
      const nextCardId = this.reviewSessionsService.getCardIdByIndex(newIndex)
      if(nextCardId !== null){

        this.router.navigate(['decks', this.cardData?.deck, 'revision-session', nextCardId])
        this.fetchCardById(nextCardId)
      }
    }
  }
}
