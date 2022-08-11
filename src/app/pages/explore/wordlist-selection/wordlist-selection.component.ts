import {Component, ElementRef, OnInit} from '@angular/core';
import {WordAddService} from "../../../services/explore/add-word/word-add.service";
import {WordlistSelectionService} from "../../../services/explore/wordlist-selection/wordlist-selection.service";

@Component({
  selector: 'app-wordlist-selection',
  templateUrl: './wordlist-selection.component.html',
  styleUrls: ['./wordlist-selection.component.scss']
})
export class WordlistSelectionComponent implements OnInit {

  public static wordlistSelectionComponent : WordlistSelectionComponent;

  lists : any = []

  constructor(private wordAddService : WordAddService,
              private wordlistSelectionService : WordlistSelectionService) {}

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
    this.lists = await this.wordlistSelectionService.getWordlists();
  }

  removeWordlists(){
    this.lists = [];
  }

  createWordlist(){
    this.wordlistSelectionService.createWordlist();
  }


}
