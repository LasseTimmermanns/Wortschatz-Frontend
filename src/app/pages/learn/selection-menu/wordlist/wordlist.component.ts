import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.scss']
})
export class WordlistComponent implements OnInit {

  @Input("title") title : string = "Wordlist 1";
  @Input("id") id : string = "NO ID";
  @Input("words") words : string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
