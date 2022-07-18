import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CardMovementService} from "../../../services/card-movement/card-movement.service";
import {CardStyleService} from "../../../services/card-style/card-style.service";
import {ExploreComponent} from "../explore.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  isTop: boolean = true;
  word : String = "skurril";
  isDragging: boolean = false;
  index : number = 0;
  elRef : ElementRef;
  frequencyWhite = Array(3).fill(0).map((x,i)=>i);
  frequencyGrey = Array(2).fill(0).map((x,i)=>i);
  synonyms : string[] = ["absonderlich", "ausgefallen", "befremdend", "bizarr"];
  showFront : boolean = true;

  ngOnInit(): void {
    if(this.index == 0){
      this.isTop = true;
    }

    this.elRef.nativeElement.index = this.index;
    this.elRef.nativeElement.style.zIndex = ExploreComponent.stack_size - this.index;
    this.cardStyleService.resetMargins(this.elRef);
  }


  constructor(private elRefConstructor:ElementRef, private cardMovementService : CardMovementService, private cardStyleService : CardStyleService) {
    this.elRef = elRefConstructor;
  }

  @HostListener('pointerdown', ['$event'])
    cardPressing(event: any){
      this.cardMovementService.pressCard(this.elRef, event);
    }

    cardYes(){
      this.cardStyleService.animateMargin(this.elRef, this.elRef.nativeElement.offsetWidth / 2, 0, 200);
      this.removeAfterTime(500);
  }

    cardNo(){
      this.cardStyleService.animateMargin(this.elRef, this.elRef.nativeElement.offsetWidth / 2, 0, 200, false);
      this.removeAfterTime(500);
  }

  removeAfterTime(time : number){
    let elRef = this.elRef;
    setTimeout(function(){
      ExploreComponent.exploreComponent.removeCard(elRef);
    }, time);
  }

  switchDisplay(){
    this.showFront = !this.showFront;
  }
}
