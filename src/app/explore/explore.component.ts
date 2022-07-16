import { Component, OnInit } from '@angular/core';
import {first} from "rxjs";

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
  isDragging: boolean = false;
  attempt : number = 0;
  lastX: number = 0;
  lastY: number = 0;

  constructor() { }

  ngOnInit(): void {
  }


  cardPressing(event: any){
    event.preventDefault();
    this.lastX = event.pageX;
    this.lastY = event.pageY;

    console.log("First Pressing X = " + event.pageX)

    this.isDragging = true;
  }

  cardReleasing(event: any){
    event.preventDefault();
    console.log("now releasing")
    this.isDragging = false;
  }


  cardMoving(event: any){
    if(!this.isDragging) return;
    this.attempt = 0;

    let firstMarginLeft : number = event.currentTarget.style.marginLeft.replace("px", "");
    let marginX = +firstMarginLeft + event.pageX - this.lastX;
    event.currentTarget.style.marginLeft =  marginX + "px";

    let firstMarginTop : number = event.currentTarget.style.marginTop.replace("px", "");
    let marginY = +firstMarginTop + event.pageY - this.lastY;
    event.currentTarget.style.marginTop =  marginY + "px";


    this.lastX = event.pageX;
    this.lastY = event.pageY;
  }
}
