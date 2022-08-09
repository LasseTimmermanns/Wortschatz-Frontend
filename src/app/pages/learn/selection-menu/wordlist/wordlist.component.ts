import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.scss']
})
export class WordlistComponent implements OnInit {

  title: string = "Wordlist 1";
  words: string[] = ["Hund", "Katze", "Maus", "geht", "raus", "aus", "meinem", "Haus", "!"];

  constructor() { }

  ngOnInit(): void {
  }

}
