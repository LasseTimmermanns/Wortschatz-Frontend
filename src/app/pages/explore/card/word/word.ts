import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

export class Word {

  id: string;
  word : string;
  frequency : number = 0;
  synonyms : string[] = []
  kind : string = "";
  utilization : string = "";
  description : string = "";
  infosObtained : boolean = false;

  constructor(private httpClient : HttpClient, word: string, id : string) {
    this.word = word;
    this.id = id;
  }

  async getInfos(){
    if(this.infosObtained) return;
    console.log(this.id);
    let req = await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordinfo?wordid=" + this.id));

    this.frequency = req.frequency;
    this.synonyms = req.synonyms != null ? req.synonyms.split("|") : req.synonyms;
    this.kind = req.kind;
    this.utilization = req.utilization;
    this.description = req.description;
    this.infosObtained = true;
  }
}
