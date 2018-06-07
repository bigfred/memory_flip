import { Component, HostListener, Input, OnInit, OnDestroy, AnimationTransitionEvent, state, style, trigger, animate, transition } from '@angular/core';
import { LogicProvider } from '../../providers/logic/logic';
import { Subscription } from 'rxjs/Subscription';

interface Card {
  id: number;
  image: string;
  cardKey: string;
}

@Component({
  selector: 'card',
  templateUrl: 'card.html',
  animations: [
    trigger(
      "cardFlip",
      [
        state(
          "default",
          style({
            transform: 'rotateY(0)'
          })
        ),
        state(
          "flip",
          style({
            transform: 'rotateY(179.9deg)'
          })
        ),
        transition("default => flip", animate("0.6s")),
        transition("flip => default", animate("0.6s"))
      ]
    )
  ]
})
export class CardComponent implements OnInit, OnDestroy {
  public hover = false;
  public cardState = 'default';
  public lockFlip = false;
  public clickLock = false;
  @Input('card') card: Card;

  private watchReset: Subscription;
  private watchLockMatch: Subscription;
  private watchClickLock: Subscription;

  constructor(private gameLogic: LogicProvider) {
    // watch for reset
    this.watchReset = this.gameLogic.resetFlag.subscribe(reset => {
      if (reset == true && !this.lockFlip) {
        this.cardState = 'default';
      }
    });
    this.watchLockMatch = this.gameLogic.lockMatch.subscribe((lockCard: Card) => {
      if ((lockCard.id == this.card.id)) {
        this.lockFlip = true;
      }
    });
    this.watchClickLock = this.gameLogic.clickLock.subscribe(lockOn => {
      this.clickLock = lockOn;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('DESTROY');
    this.watchClickLock.unsubscribe();
    this.watchLockMatch.unsubscribe();
    this.watchReset.unsubscribe();
  }

  @HostListener('click') onClick() {
    if (this.cardState !== 'flip') {
      if (!this.lockFlip && !this.clickLock) {
        this.cardState = 'flip';
      }
      this.gameLogic.clickLock.next(true);
    }
  }

  handleDone(event) {
    if (event.toState === 'default') {
    }
    if (event.toState === 'flip') {
      this.gameLogic.flipCard(this.card);
    }
    this.gameLogic.clickLock.next(false);
  }


}
