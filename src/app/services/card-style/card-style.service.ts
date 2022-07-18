import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardStyleService {

  constructor() { }

  public resetMargins(elRef : ElementRef){
    let index = elRef.nativeElement.index;
    this.updateMargins(elRef, index * 5, index * 5);
  }

  public calculateRotation(margin: number) : number{
    return margin / 30;
  }

  public setTransformOrigin(elRef : ElementRef, x : number, y : number){
    elRef.nativeElement.style.transformOrigin = x + " " + y;
  }

  public rotate(elRef : ElementRef, deg : number){
    elRef.nativeElement.style.rotate = deg + "deg";
  }

  public animateMargin(elRef : ElementRef, marginLeft : number = 0, marginTop : number = 0, time : number = 1000, positive : boolean = true){
    let times = 0;
    let thisService = this;
    let timeout = 10;


    //X
    let stepSizeX = this.calculateStepSize(marginLeft, time / timeout);
    let stepSizeY = this.calculateStepSize(marginTop, time / timeout);
    let factor = 1;
    if(!positive) factor = -1;
    let interval = setInterval(function(){
      if(times * timeout >= time){
        console.log("CLEAR")
        clearInterval(interval);
      }
      times++;

      thisService.updateMargins(elRef, factor * Math.pow(stepSizeX * times, 3), factor * Math.pow(stepSizeY * times, 3))

      console.log("Oooo Yeaaa!");


    }, timeout);
  }

  getMarginTop(elRef : ElementRef) : number{
    return +elRef.nativeElement.style.marginTop.replace("px", "");
  }

  getMarginLeft(elRef : ElementRef) : number{
    return +elRef.nativeElement.style.marginLeft.replace("px", "")
  }

  calculateStepSize(x : number, steps : number) : number{
    let lastX = Math.pow(x, 1 / 3);
    return lastX / steps;
  }

  public updateMargins(elRef : ElementRef, marginLeft : number = 0, marginTop : number = 0){
    elRef.nativeElement.style.marginLeft = marginLeft + "px";
    elRef.nativeElement.style.marginTop = marginTop + "px";
    this.rotate(elRef, this.calculateRotation(marginLeft));
  }
}
