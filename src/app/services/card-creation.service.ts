import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {CardComponent} from "../pages/explore/card/card.component";

@Injectable({
  providedIn: 'root'
})
export class CardCreationService {

  constructor() { }


  createCards(viewContainerRef : ViewContainerRef, stack_size: number) : ComponentRef<CardComponent>[]{
    let out : ComponentRef<CardComponent>[] = [];

    for(let i = 0; i < stack_size; i++){
      out.push(this.createCard(viewContainerRef, i, "skurril"))
    }

    return out;
  }

  private createCard(viewContainerRef : ViewContainerRef, index : number, word : String) : ComponentRef<CardComponent>{
    let component : ComponentRef<CardComponent> = viewContainerRef.createComponent(CardComponent);
    component.instance.index = index;
    component.instance.word = word;
    return component;
  }
}
