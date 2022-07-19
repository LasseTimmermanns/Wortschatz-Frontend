import {ElementRef, Injectable} from '@angular/core';
import {StyleHelperService} from "../style-helper/style-helper.service";

@Injectable({
  providedIn: 'root'
})
export class CardStyleService {

  constructor(private styleHelper : StyleHelperService) { }

  public resetMargins(elRef : ElementRef){
    let index = elRef.nativeElement.index;
    this.updateMargins(elRef, index * 5, index * 5);
  }

  public calculateRotation(margin: number) : number{
    return margin / 30;
  }

  public setTransformOrigin(elRef : ElementRef, x : number, y : number){
    console.log("x = " + x);
    console.log("y = " + y);
    console.log("--");
    elRef.nativeElement.style.transformOrigin = x + " " + y;
  }

  public rotate(elRef : ElementRef, deg : number){
    elRef.nativeElement.style.transform = 'translate(-50%, -50%)' + ' ' + 'rotate(' + deg + 'deg)';
  }

  public getRotation(elRef : ElementRef) : number{
    let input = elRef.nativeElement.style.transform;
    let regexp = new RegExp("rotate\\((.*?)deg\\)");
    // @ts-ignore
    return +regexp.exec(input)[1];
  }

  public animateMargin(elRef : ElementRef, marginLeft : number = 0, marginTop : number = 0, time : number = 1000, positive : boolean = true){
    let times = 0;
    let thisService = this;
    let timeout = 10;

    let stepSizeX = this.styleHelper.calculateStepSize(marginLeft, time / timeout);
    let stepSizeY = this.styleHelper.calculateStepSize(marginTop, time / timeout);

    let factor = 1;
    if(!positive) factor = -1;

    let interval = setInterval(function(){
      if(times * timeout >= time){
        clearInterval(interval);
      }
      times++;

      thisService.updateMargins(elRef, factor * Math.pow(stepSizeX * times, 2),
        factor * Math.pow(stepSizeY * times, 2))

    }, timeout);
  }

  getMarginTop(elRef : ElementRef) : number{
    return +elRef.nativeElement.style.marginTop.replace("px", "");
  }

  getMarginLeft(elRef : ElementRef) : number{
    return +elRef.nativeElement.style.marginLeft.replace("px", "")
  }

  public updateMargins(elRef : ElementRef, marginLeft : number = 0, marginTop : number = 0){
    elRef.nativeElement.style.marginLeft = marginLeft + "px";
    elRef.nativeElement.style.marginTop = marginTop + "px";
    this.rotate(elRef, this.calculateRotation(marginLeft));
  }
}
