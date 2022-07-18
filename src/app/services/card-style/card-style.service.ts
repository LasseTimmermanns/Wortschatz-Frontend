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


  public setTransformOrigin(elRef : ElementRef, x : number, y : number){
    elRef.nativeElement.style.transformOrigin = x + " " + y;
  }

  public rotate(elRef : ElementRef, deg : number){
    elRef.nativeElement.style.rotate = deg + "deg";
  }

  public updateMargins(elRef : ElementRef, marginLeft : number, marginTop : number){
    elRef.nativeElement.style.marginLeft = marginLeft + "px";
    elRef.nativeElement.style.marginTop = marginTop + "px";
  }
}
