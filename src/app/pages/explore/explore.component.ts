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
import {first} from "rxjs";
import {CardComponent} from "./card/card.component";
import {CardCreationService} from "../../services/card-creation.service";
import {CardMovementService} from "../../services/card-movement/card-movement.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  filterExtended = false;
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
    let elRef : ElementRef = compRef.instance.elRef;
    this.cardMovementService.releaseCard(elRef, event)
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

  createCards(){
    this.cards = (this.cardCreationService.createCards(this.createCardsHere, ExploreComponent.stack_size));
  }

  ngOnInit(): void {
    ExploreComponent.exploreComponent = this;

  }

  removeCardWithAnimation(elRef : ElementRef){
    this.renderer.addClass(elRef.nativeElement, "card-disappear");
    ExploreComponent.exploreComponent.removeCardFromGlobal();
    setTimeout(function (){
      ExploreComponent.exploreComponent.removeCardItSelf(elRef);
    }, 1000);
  }

  removeCardFromGlobal(){
    this.cards[0].instance.willBeRemoved = true;
    this.cards.shift();

    if(this.cards.length == 0){
      this.createCards()
      return;
    }

    this.cards[0].instance.isTop = true;
  }

  removeCardItSelf(elRef : ElementRef){
    elRef.nativeElement.remove();
  }




}
