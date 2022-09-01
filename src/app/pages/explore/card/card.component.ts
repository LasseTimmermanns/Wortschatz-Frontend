import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {CardMovementService} from "../../../services/explore/Card/card-movement/card-movement.service";
import {CardStyleService} from "../../../services/explore/Card/card-style/card-style.service";
import {ExploreComponent} from "../explore.component";
import {WordAddService} from "../../../services/explore/add-word/word-add.service";
import {Word} from "./word/word";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @HostBinding('class.rotate-left-animation') rotateLeft: boolean = false;
  @HostBinding('class.rotate-right-animation') rotateRight: boolean = false;

  word: Word | undefined;
  isTop: boolean = true;
  isDragging: boolean = false;
  index : number = 0;
  elRef : ElementRef;
  stack_size : number = 5;
  frequencyGrey : any = undefined;
  frequencyWhite : any = undefined;
  showBack : boolean = false;
  willBeRemoved : boolean = false;

  ngOnInit(): void {
    if(this.index == 0)
      this.isTop = true;

    this.elRef.nativeElement.index = this.index;
    this.elRef.nativeElement.style.zIndex = ExploreComponent.STACK_SIZE - this.index;
    this.cardStyleService.resetMargins(this.elRef);
  }

  createArray(length : number) : any{
    return Array(length).fill(0).map((x,i)=>i);
  }

  updateFrequency(){
    if(this.word == undefined) return;
    this.frequencyWhite = this.createArray(this.word.frequency);
    this.frequencyGrey = this.createArray(5 - this.word.frequency);
  }

  constructor(private elRefConstructor : ElementRef,
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
    if(this.word == undefined) return;
    this.wordAddService.addWord(this.word.word);
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

  async switchDisplay(){
    this.showBack = !this.showBack;
    await this.word?.getInfos();
    if(this.frequencyGrey == undefined)
      this.updateFrequency();
  }
}
