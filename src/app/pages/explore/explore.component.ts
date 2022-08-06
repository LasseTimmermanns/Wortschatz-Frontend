import {
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  OnInit, Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

import {CardComponent} from "./card/card.component";
import {CardCreationService} from "../../services/card-creation.service";
import {CardMovementService} from "../../services/card-movement/card-movement.service";
import {FilterComponent} from "./filter/filter.component";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  filterExtended = false;
  cardAdding = false;
  cardRemoving = false;
  public static stack_size : number = 5;
  public static exploreComponent: ExploreComponent;
  @ViewChild('createCardsHere', {read: ViewContainerRef}) createCardsHere! : ViewContainerRef;
  @ViewChild('cardWrapper', {read: ViewRef}) cardWrapper! : ViewRef;
  @ViewChild(CardComponent, {read: ElementRef}) card! : ElementRef;
  cards : ComponentRef<CardComponent>[] = [];

  @HostListener('pointerup', ["$event"])
  @HostListener('pointercancel', ["$event"])
  @HostListener('pointerleave', ["$event"])
  releaseCard(){
    if(this.cards.length < 1) return;
    let compRef : ComponentRef<CardComponent> = this.cards[0];
    this.cardMovementService.releaseCard(compRef, event)
  }

  ngAfterViewInit() : void{
    this.createCards();
  }

  @HostListener('pointermove', ["$event"])
  moveCard(){
    if(this.cards.length < 1) return;

    let compRef : ComponentRef<CardComponent> = this.cards[0];
    let elRef : ElementRef = compRef.instance.elRef;
    this.cardMovementService.moveCard(elRef, event);
  }

  constructor(private renderer : Renderer2, private cardCreationService : CardCreationService, private cardMovementService : CardMovementService) { }

  async createNewCards(){
    this.cards = await this.cardCreationService.createCards(this.createCardsHere, true, ExploreComponent.stack_size);

  }

  destroyCards(){
    const cardis  = Object.assign([], this.cards);
    for(let i = 0; i < cardis.length; i++){
      let card : ComponentRef<CardComponent> = cardis[i];
      this.removeCardFromGlobal(false);
      this.removeCardItself(card.instance.elRef);
    }
  }

  async createCards(){
    this.cards = await this.cardCreationService.createCards(this.createCardsHere, false, ExploreComponent.stack_size);
  }

  ngOnInit(): void {
    ExploreComponent.exploreComponent = this;
  }

  removeCardWithAnimation(elRef : ElementRef){
    this.renderer.addClass(elRef.nativeElement, "card-disappear");
    ExploreComponent.exploreComponent.removeCardFromGlobal();
    setTimeout(function (){
      ExploreComponent.exploreComponent.removeCardItself(elRef);
    }, 1000);
  }

  removeCardFromGlobal(createNew : boolean = true){
    this.cards[0].instance.willBeRemoved = true;
    this.cards.shift();

    if(this.cards.length == 0 && createNew){
      this.createCards();
      return;
    }

    if(this.cards.length > 0) this.cards[0].instance.isTop = true;
  }

  removeCardItself(elRef : ElementRef){
    elRef.nativeElement.remove();
  }

  cardAdded(){
    this.cardAdding = true;
    setTimeout(() => {
      this.cardAdding = false;
    }, 350)
  }

  cardRemoved(){
    this.cardRemoving = true;
    setTimeout(() => {
      this.cardRemoving = false;
    }, 350)
  }




}
