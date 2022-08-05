import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wordlist-selection',
  templateUrl: './wordlist-selection.component.html',
  styleUrls: ['./wordlist-selection.component.scss']
})
export class WordlistSelectionComponent implements OnInit {

  lists = [
    {name: "my wordlist", id: "3741892", active: false},
    {name: "my wordlist", id: "3741892", active: false},
    {name: "my wordlist", id: "3741892", active: false}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  spanClick(event : any){
    let index = event.currentTarget.getAttribute("index");
    this.lists[index].active = !this.lists[index].active;
  }


}
