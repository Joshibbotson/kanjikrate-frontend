import { Component } from '@angular/core';
import { Card } from '../../api';
import { ActivatedRoute } from '@angular/router';

enum Answer {
  REMEMBER,
  FORGOT
}
@Component({
  selector: 'app-revision-session',
  standalone: true,
  templateUrl: './revisionSession.component.html',
  styleUrl: './revisionSession.component.scss',
  imports: [],
})
/**
 * So here we want to access localstorage for say cardIds
 * and current index, iterate forward 
 */
export class RevisionSessionComponent {
  // public cardData: Card | null

  constructor(
  private readonly activatedRoute: ActivatedRoute
  ) {
    const id = this.activatedRoute.snapshot.params['cardId'];
    this.fetchCardById(id)
  }

  private async fetchCardById(id:string){}

  private async reviewCard(answer: Answer){
    
  }

  private updateCurrentIndex(){}

  private getCardIds(){}

  public async nextCard(answer: Answer){}



}
