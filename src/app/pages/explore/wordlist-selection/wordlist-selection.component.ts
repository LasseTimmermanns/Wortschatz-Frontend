import {Component, ElementRef, OnInit} from '@angular/core';
import {WordAddService} from "../../../services/explore/add-word/word-add.service";
import {WordlistSelectionCreatorService} from "../../../services/explore/wordlistselection-creator/wordlist-selection-creator.service";
import {WordlistService} from "../../../services/explore/wordlist/wordlist.service";

@Component({
  selector: 'app-wordlist-selection',
  templateUrl: './wordlist-selection.component.html',
  styleUrls: ['./wordlist-selection.component.scss']
})
export class WordlistSelectionComponent implements OnInit {

  public static wordlistSelectionComponent : WordlistSelectionComponent;

  lists : any = []

  constructor(private wordAddService : WordAddService,
              private wordlistSelectionCreator : WordlistSelectionCreatorService,
              private wordlistService : WordlistService) {}

  ngOnInit(): void {
    WordlistSelectionComponent.wordlistSelectionComponent = this;
    this.generateWordlists();
  }

  spanClick(event : any){
    let index = event.currentTarget.getAttribute("index");
    this.lists[index].selected = !this.lists[index].selected;
    let wordlistId = this.lists[index].id;

    this.lists[index].selected ? this.wordAddService.addToWordlists(wordlistId) : this.wordAddService.removeFromWordlists(wordlistId);
  }

  async generateWordlists(){
    this.lists = await this.wordlistSelectionCreator.getWordlists();
  }

  removeWordlists(){
    this.lists = [];
  }

  createWordlist(){
    this.wordlistService.createWordlist();
  }


}
