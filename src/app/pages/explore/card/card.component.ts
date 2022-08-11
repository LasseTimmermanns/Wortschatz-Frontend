import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {CardMovementService} from "../../../services/explore/Card/card-movement/card-movement.service";
import {CardStyleService} from "../../../services/explore/Card/card-style/card-style.service";
import {ExploreComponent} from "../explore.component";
import {WordAddService} from "../../../services/explore/add-word/word-add.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @HostBinding('class.rotate-left-animation') rotateLeft: boolean = false;
  @HostBinding('class.rotate-right-animation') rotateRight: boolean = false;

  isTop: boolean = true;
  word : string = "skurril";
  isDragging: boolean = false;
  index : number = 0;
  elRef : ElementRef;
  frequency : number = 0;
  frequencyGrey : any = undefined;
  frequencyWhite : any = undefined;
  synonyms : string[] = ["absonderlich", "ausgefallen", "befremdend", "bizarr"];
  showFront : boolean = true;
  willBeRemoved : boolean = false;
  kind : string = "";
  utilization : string = "";
  description : string = "";



  ngOnInit(): void {
    if(this.index == 0){
      this.isTop = true;
    }


    this.elRef.nativeElement.index = this.index;
    this.elRef.nativeElement.style.zIndex = ExploreComponent.stack_size - this.index;
    this.cardStyleService.resetMargins(this.elRef);
  }

  createArray(length : number) : any{
    return Array(length).fill(0).map((x,i)=>i);
  }

  updateFrequency(){
    this.frequencyWhite = this.createArray(this.frequency);
    this.frequencyGrey = this.createArray(5 - this.frequency);
  }


  constructor(private elRefConstructor:ElementRef,
              private cardMovementService : CardMovementService,
              private cardStyleService : CardStyleService,
              private wordAddService : WordAddService) {
    this.elRef = elRefConstructor;
  }

  @HostListener('pointerdown', ['$event'])
  cardPressing(event: any){
    this.cardMovementService.pressCard(this.elRef, event);
  }

    cardYes(){
      this.addToSelectedWordlists();
      if(this.willBeRemoved) return;
      this.rotateRight = true;
      this.removeAfterTime(300);
    }

    addToSelectedWordlists(){
      this.wordAddService.addWord(this.word);
      ExploreComponent.exploreComponent.cardAdded();
    }

    notPicked(){
      ExploreComponent.exploreComponent.cardRemoved();
    }

    cardNo(){
      this.notPicked();
      if(this.willBeRemoved) return;
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
