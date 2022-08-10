import {LearnWordlistComponent} from "../learn-wordlist.component";

export class Wordlist {

  public static instance : Wordlist;
  id : string = "";
  words : string[] = [];
  displayWords : string[] = [];
  private index : number = 0

  constructor(id : string, words: string[]) {
    this.id = id;
    this.words = words
    Wordlist.instance = this;
  }

  nextStep(){
    if(this.words.length == 0)
      return;

    this.displayWords = []

    while(this.displayWords.length < LearnWordlistComponent.DRAW_CARD_SIZE){
      if(this.index >= this.words.length)
        this.index = 0;

      this.displayWords.push(this.words[this.index])
      this.index++;
    }

    console.log(this.displayWords)
  }

}
