import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-learn-wordlist-card',
  templateUrl: './learn-wordlist-card.component.html',
  styleUrls: ['./learn-wordlist-card.component.scss']
})
export class LearnWordlistCardComponent implements OnInit {

  @Input("word") word : string = "";
  @Input("index") index : number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
