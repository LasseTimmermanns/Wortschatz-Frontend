import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearnWordlistService} from "../../services/learn-wordlist/learn-wordlist.service";
import {Wordlist} from "./Wordlist/wordlist";
import {CardComponent} from "../explore/card/card.component";
import {LearnWordlistCardComponent} from "./learn-wordlist-card/learn-wordlist-card.component";

@Component({
  selector: 'app-learn-wordlist',
  templateUrl: './learn-wordlist.component.html',
  styleUrls: ['./learn-wordlist.component.scss']
})
export class LearnWordlistComponent implements OnInit {

  @ViewChild('createCardsHere', {read: ViewContainerRef}) createCardsHere! : ViewContainerRef;
  wordlist : Wordlist = new Wordlist("", []);
  wordlistId : string = "";
  public static readonly DRAW_CARD_SIZE = 10;
  public static instance : LearnWordlistComponent;

  constructor(private route: ActivatedRoute, private learnWordlistService : LearnWordlistService, private router : Router) {
    this.route.params.subscribe(async params => {
      if (!await learnWordlistService.hasAccess(params['wordlistid'])) {
        await router.navigate(["/learn"]);
        return;
      }
      this.wordlistId = params["wordlistid"];
      this.wordlist = await this.learnWordlistService.getWordlist(this.wordlistId);
      this.createCards();
    });
  }

  ngOnInit() {
    LearnWordlistComponent.instance = this;
  }

  createCards(){
    this.createCardsHere.clear();
    Wordlist.instance.nextStep();
    const list = Wordlist.instance.displayWords;

    for(let i = 0; i < LearnWordlistComponent.DRAW_CARD_SIZE; i++){
      this.createCard(this.createCardsHere, list[i], i);
    }
  }

  createCard(viewContainerRef : ViewContainerRef, word : string, index : number){
    let component : ComponentRef<LearnWordlistCardComponent> = viewContainerRef.createComponent(LearnWordlistCardComponent);
    component.instance.word = word;
    component.instance.index = index;
  }
}
