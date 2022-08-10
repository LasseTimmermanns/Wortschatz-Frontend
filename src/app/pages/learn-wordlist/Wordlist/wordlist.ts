export class Wordlist {

  id : string = "";
  words : string[] = [];


  constructor(id : string, words: string[]) {
    this.id = id;
    this.words = words;
  }
}
