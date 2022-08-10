import {LearnWordlistComponent} from "../learn-wordlist.component";

export class Wordlist {

  public static instance : Wordlist;
  id : string = "";
  firstWords : string[] = [];
  words : string[] = [];
  displayWords : string[] = [];
  private index : number = 0

  constructor(id : string, words: string[]) {
    this.id = id;
    this.firstWords = words
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

  shuffle(){
    let currentIndex = this.words.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.words[currentIndex], this.words[randomIndex]] = [
        this.words[randomIndex], this.words[currentIndex]];
    }
  }

}
