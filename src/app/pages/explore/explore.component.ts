import {
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  OnInit,
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

  public static stack_size : number = 5;
  public static exploreComponent: ExploreComponent;
  @ViewChild('createCardsHere', {read: ViewContainerRef}) createCardsHere! : ViewContainerRef;
  @ViewChild(CardComponent, {read: ElementRef}) card! : ElementRef;
  cards : ComponentRef<CardComponent>[] = [];


  @HostListener('pointerup', ["$event"])
  @HostListener('pointercancel', ["$event"])
  releaseCard(){
    if(this.cards.length < 1) return;
    let compRef : ComponentRef<CardComponent> = this.cards[0];
    let elRef : ElementRef = compRef.instance.elRef;
    this.cardMovementService.releaseCard(elRef, event)
  }

  @HostListener('pointermove', ["$event"])
  moveCard(){
    if(this.cards.length < 1){
      console.log("<1")
      return;
    };

    let compRef : ComponentRef<CardComponent> = this.cards[0];
    let elRef : ElementRef = compRef.instance.elRef;
    this.cardMovementService.moveCard(elRef, event);
  }

  constructor(private cardCreationService : CardCreationService, private cardMovementService : CardMovementService) { }

  createCards(){
    this.cards = (this.cardCreationService.createCards(this.createCardsHere, ExploreComponent.stack_size));
  }

  ngOnInit(): void {
    ExploreComponent.exploreComponent = this;
  }

  removeCard(elRef : ElementRef){
    elRef.nativeElement.remove();
    this.cards.shift();

    if(this.cards.length == 0){
      this.createCards()
      return;
    }

    this.cards[0].instance.isTop = true;
  }

}
