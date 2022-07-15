import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  cards = [
    {word:'Superman'},
    {word:'Batman'},
    {word:'BatGirl'},
    {word:'Robin'},
    {word:'Flash'}
  ];

  stack_size = 5

  constructor() { }

  ngOnInit(): void {
  }

}
