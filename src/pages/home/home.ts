import { Component, OnInit } from '@angular/core';
import { LogicProvider } from '../../providers/logic/logic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  public cardMaster = [
    {
      id: 1,
      image: 'assets/imgs/lemmling-Cartoon-cat.svg'
    },
    {
      id: 2,
      image: 'assets/imgs/lemmling-Cartoon-cow.svg'
    },
    {
      id: 3,
      image: 'assets/imgs/lemmling-Cartoon-dog.svg'
    },
    {
      id: 4,
      image: 'assets/imgs/lemmling-Cartoon-elephant.svg'
    },
    {
      id: 5,
      image: 'assets/imgs/lemmling-Cartoon-giraffe.svg'
    },
    {
      id: 6,
      image: 'assets/imgs/lemmling-Cartoon-goat.svg'
    },
    {
      id: 7,
      image: 'assets/imgs/lemmling-Cartoon-owl.svg'
    },
    {
      id: 8,
      image: 'assets/imgs/lemmling-Cartoon-penguin.svg'
    },
    {
      id: 9,
      image: 'assets/imgs/lemmling-Cartoon-sheep.svg'
    }
  ];

  public cardList = [];

  constructor(private gameLogic: LogicProvider) {
    this.gameLogic.restartGame.subscribe((restart) => {
      this.cardList = [];
      setTimeout( () => {
        this.buildCardDeck();
      }, 100);
    });
  }


  ngOnInit() {
    this.buildCardDeck();
  }

  buildCardDeck() {
    this.cardList = this.shuffle(this.cardMaster.concat(this.cardMaster));
    for(let i = 0; i<this.cardList.length; i++) {
      this.cardList[i].cardKey = this.guid();
    }
    console.log('cards', this.cardList, this.cardList.length);
  }


  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

}
