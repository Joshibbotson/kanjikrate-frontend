import { Injectable } from '@angular/core';

export enum Answer {
  REMEMBER,
  FORGOT,
}

@Injectable({
  providedIn: 'root',
})
export class ReviewSessionService {
  constructor() {}

  public storeCardIds(ids: number[]): void {
    localStorage.setItem('cardIds', JSON.stringify(ids));
  }

  public updateCurrentIndex() {}

  public getLocalStorageCardIds(): number[] | null {
    const cardIds = localStorage.getItem('cardIds');
    if (cardIds) {
      const parsedCardIds = JSON.parse(cardIds);
      return parsedCardIds;
    }
    return null;
  }
}
