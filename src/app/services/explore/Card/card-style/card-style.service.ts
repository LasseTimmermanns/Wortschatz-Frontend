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
    let rotationString = regexp.exec(input);
    let rotation = 0;
    if(rotationString != null)
      rotation = +rotationString[1];
    return rotation;
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
