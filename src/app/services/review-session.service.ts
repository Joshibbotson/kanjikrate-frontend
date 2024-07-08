import { Injectable } from '@angular/core';

export enum Answer {
  FORGOT,
  REMEMBER,
}

@Injectable({
  providedIn: 'root',
})
export class ReviewSessionService {
  private readonly cardIndexKey = 'currCardIndex'
  private readonly cardIdsKey = 'cardIds'
  constructor() {}

  public storeCardIds(ids: string[]): void {
    localStorage.setItem(this.cardIdsKey, JSON.stringify(ids));
  }

  public get getCurrCardIndex(): number | null {
    const cardIndex = localStorage.getItem(this.cardIndexKey)
    if(cardIndex !== null){
      return JSON.parse(cardIndex)
    }
    return null
  }

  public setCurrIndexByCardId(id:string){
    const cardIdsArr = this.getLocalStorageCardIds
    const newCardIndex = cardIdsArr?.findIndex((cardId) => id === cardId)
    if(newCardIndex){
      this.updateCurrentIndex(newCardIndex)
    }
  }

  public updateCurrentIndex(index: number): number {
    const currIndex = localStorage.getItem(this.cardIndexKey)
    if(!currIndex){
       localStorage.setItem(this.cardIndexKey, JSON.stringify(0))
       return 0
    }
     localStorage.setItem(this.cardIndexKey, JSON.stringify(index))
     return index
  }

  public getCardIdByIndex(index:number):string | null{
    const cardIds = this.getLocalStorageCardIds
    if(cardIds !== null && cardIds.length > 0){
      return cardIds[index]
    }
    return null
  }

 

  public get getLocalStorageCardIds(): string[] | null {
    const cardIds = localStorage.getItem(this.cardIdsKey);
    if (cardIds) {
      const parsedCardIds = JSON.parse(cardIds);
      return parsedCardIds;
    }
    return null;
  }

  public get getLocalStorageCardIdsLength(): number | null {
    const cardIds = this.getLocalStorageCardIds
    if (cardIds !== null) {
      return cardIds.length;
    }
    return null;
  }
}
