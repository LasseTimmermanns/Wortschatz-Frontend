import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {CardMovementService} from "../../../services/card-movement/card-movement.service";
import {CardStyleService} from "../../../services/card-style/card-style.service";
import {ExploreComponent} from "../explore.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @HostBinding('class.rotate-left-animation') rotateLeft: boolean = false;
  @HostBinding('class.rotate-right-animation') rotateRight: boolean = false;

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
      this.rotateRight = true;
      this.removeAfterTime(300);
  }

    cardNo(){
      this.rotateLeft = true;
      this.removeAfterTime(300);
  }

  removeAfterTime(time : number){
    let elRef = this.elRef;
    setTimeout(function(){
      ExploreComponent.exploreComponent.removeCardWithAnimation(elRef);
    }, time);
  }

  switchDisplay(){
    this.showFront = !this.showFront;
  }
}
