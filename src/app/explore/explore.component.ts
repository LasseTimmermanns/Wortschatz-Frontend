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
  target: any = null;

  constructor() { }

  ngOnInit(): void {
  }


  cardPressing(event: any){
    event.preventDefault();
    this.target = event.currentTarget;
    this.lastX = event.pageX;
    this.lastY = event.pageY;
    this.isDragging = true;
  }

  cardReleasing(event: any){
    event.preventDefault();
    this.isDragging = false;

    let rotation = this.target.style.rotate.replace("deg", "")
    if(rotation < 10 && rotation > -10){
      this.rotate(this.target, 0);
      this.updateMargins(this.target, 0, 0)
    }

  }


  cardMoving(event: any){
    if(!this.isDragging) return;
    event.preventDefault();
    this.attempt = 0;

    let firstMarginLeft : number = this.target.style.marginLeft.replace("px", "");
    let marginX = +firstMarginLeft + event.pageX - this.lastX;
    let firstMarginTop : number = this.target.style.marginTop.replace("px", "");
    let marginY = +firstMarginTop + event.pageY - this.lastY;

    this.updateMargins(this.target, marginX, marginY);

    let deg = marginX / 15;
    this.rotate(this.target, deg);
    this.lastX = event.pageX;
    this.lastY = event.pageY;
  }

  rotate(element : any, deg : number){
    element.style.rotate = deg + "deg";
  }

  updateMargins(element : any, marginLeft : number, marginTop : number){
    element.style.marginLeft = marginLeft + "px";
    element.style.marginTop = marginTop + "px";
  }
}
