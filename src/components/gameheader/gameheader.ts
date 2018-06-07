import { Component } from '@angular/core';
import { LogicProvider } from '../../providers/logic/logic';

@Component({
  selector: 'gameheader',
  templateUrl: 'gameheader.html'
})
export class GameheaderComponent {
  public attempts = 0;

  constructor(private gameLogic: LogicProvider) {
    this.gameLogic.$attempts.subscribe(count => {
      this.attempts = count;
      console.log('attempts = ', count)
    });
  }

  restartGame() {
    this.attempts = 0;
    this.gameLogic.resetGame('restart');
  }

}
