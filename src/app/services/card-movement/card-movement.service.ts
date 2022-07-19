import {ComponentRef, ElementRef, Injectable} from '@angular/core';
import {CardComponent} from "../../pages/explore/card/card.component";
import {CardStyleService} from "../card-style/card-style.service";
import {ExploreComponent} from "../../pages/explore/explore.component";

@Injectable({
  providedIn: 'root'
})
export class CardMovementService {

  constructor(private cardStyleService : CardStyleService) { }

  pressCard(elRef : ElementRef, event : any){
    event.preventDefault();
    let card = elRef.nativeElement;
    card.lastX = event.pageX;
    card.lastY = event.pageY;
    /*this.cardStyleService.setTransformOrigin(elRef, event.pageX - card.getBoundingClientRect().x,
      event.pageY - card.getBoundingClientRect().y)*/
    card.isDragging = true;
  }

  moveCard(elRef : ElementRef, event : any){
    if(elRef == undefined) return;
    let card = elRef.nativeElement;
    if(!elRef.nativeElement.isDragging) return;
    event.preventDefault();

    let firstMarginLeft : number = card.style.marginLeft.replace("px", "");
    let marginX = +firstMarginLeft + event.pageX - card.lastX;
    let firstMarginTop : number = card.style.marginTop.replace("px", "");
    let marginY = +firstMarginTop + event.pageY - card.lastY;

    this.cardStyleService.updateMargins(elRef, marginX, marginY);
    card.lastX = event.pageX;
    card.lastY = event.pageY;
  }

  releaseCard(elRef : ElementRef, event : any){
    event.preventDefault();
    let card = elRef.nativeElement;

    card.isDragging = false;

    let rotation = this.cardStyleService.getRotation(elRef);
    if(rotation < 5 && rotation > -5){
      this.cardStyleService.rotate(elRef,0);
      this.cardStyleService.resetMargins(elRef);
    }else{
      ExploreComponent.exploreComponent.removeCard(elRef);
    }
  }
}
