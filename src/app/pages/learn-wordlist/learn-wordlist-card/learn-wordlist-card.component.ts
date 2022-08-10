import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ExploreComponent} from "../../explore/explore.component";
import {LearnWordlistComponent} from "../learn-wordlist.component";
import {Wordlist} from "../Wordlist/wordlist";

@Component({
  selector: 'app-learn-wordlist-card',
  templateUrl: './learn-wordlist-card.component.html',
  styleUrls: ['./learn-wordlist-card.component.scss']
})
export class LearnWordlistCardComponent implements OnInit {

  @Input("word") word : string = "";
  @Input("index") index : number = 0;

  constructor(private elRef : ElementRef) { }

  ngOnInit(): void {
    this.elRef.nativeElement.style.marginLeft = this.index * 2 + "px"
    this.elRef.nativeElement.style.marginTop = this.index * 2 + "px"
    this.elRef.nativeElement.style.zIndex = LearnWordlistComponent.DRAW_CARD_SIZE - this.index;
  }

  @HostListener('click', ["$event"])
  click(event : any){
    this.elRef.nativeElement.remove();
    if(this.index === LearnWordlistComponent.DRAW_CARD_SIZE - 1){
      LearnWordlistComponent.instance.createCards();
    }


  }

}
