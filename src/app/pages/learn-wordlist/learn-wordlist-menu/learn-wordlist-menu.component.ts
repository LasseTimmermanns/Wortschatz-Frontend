import { Component, OnInit } from '@angular/core';
import {Wordlist} from "../Wordlist/wordlist";
import {LearnWordlistComponent} from "../learn-wordlist.component";

@Component({
  selector: 'app-learn-wordlist-menu',
  templateUrl: './learn-wordlist-menu.component.html',
  styleUrls: ['./learn-wordlist-menu.component.scss']
})
export class LearnWordlistMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isShuffled() : boolean{
    return Wordlist.instance.shuffled;
  }

  shuffle(){
    Wordlist.instance.shuffle();
    LearnWordlistComponent.instance.createCards();
  }

}
