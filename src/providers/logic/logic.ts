import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LogicProvider {
  private flipCount = 0;
  private matchFound = false;
  public resetFlag = new Subject();
  public lockMatch = new Subject();
  public clickLock = new Subject<boolean>();
  public restartGame = new Subject();
  public $attempts = new Subject<number>();
  private attempts = 0;
  public flippedCards = [];
  constructor() {
  }

  flipCard(card) {
    this.flippedCards.push(card);
    if (this.flippedCards.length >= 2) {
      this.checkMatch(card);
    }
  }

  checkMatch(card) {
    if (this.flippedCards[0].id === this.flippedCards[1].id) {
      this.lockMatch.next(card);
    } else {
      this.attempts++;
      this.$attempts.next(this.attempts);
      this.resetCards();
    }
    this.flippedCards = [];
  }

  resetCards() {
    this.resetFlag.next(true);
  }

  lockMatches(card) {
  }

  resetGame(type: string) {
    this.attempts = 0;
    this.$attempts.next(this.attempts);
    this.flippedCards = [];
    this.restartGame.next({restart: true});
  }

}
