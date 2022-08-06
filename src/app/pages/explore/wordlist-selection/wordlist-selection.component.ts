import {Component, ElementRef, OnInit} from '@angular/core';
import {WordAddService} from "../../../services/add-word/word-add.service";
import {WordlistCreatorService} from "../../../services/wordlists-creator/wordlist-creator.service";

@Component({
  selector: 'app-wordlist-selection',
  templateUrl: './wordlist-selection.component.html',
  styleUrls: ['./wordlist-selection.component.scss']
})
export class WordlistSelectionComponent implements OnInit {

  public static wordlistSelectionComponent : WordlistSelectionComponent;

  lists : any = []

  constructor(private wordAddService : WordAddService, private wordlistCreator : WordlistCreatorService) {}

  ngOnInit(): void {
    WordlistSelectionComponent.wordlistSelectionComponent = this;
    this.generateWordlists();
  }

  spanClick(event : any){
    let index = event.currentTarget.getAttribute("index");
    this.lists[index].active = !this.lists[index].active;
    let wordlistId = this.lists[index].id;

    this.lists[index].active ? this.wordAddService.addToWordlists(wordlistId) : this.wordAddService.removeFromWordlists(wordlistId);
  }

  async generateWordlists(){
    this.lists = await this.wordlistCreator.getWordlists();
    console.log(this.lists);
  }

  removeWordlists(){
    this.lists = [];
  }


}
