import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

export class Word {

  word : string;
  frequency : number = 0;
  synonyms : string[] = []
  kind : string = "";
  utilization : string = "";
  description : string = "";
  infosObtained : boolean = false;

  constructor(private httpClient : HttpClient, word: string) {
    this.word = word;
  }

  async getInfos(){
    if(this.infosObtained) return;
    let req = await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordinfo?word=" + this.word));

    this.frequency = req.frequency;
    this.synonyms = req.synonyms;
    this.kind = req.kind;
    this.utilization = req.utilization;
    this.description = req.description;
    this.infosObtained = true;
  }
}
