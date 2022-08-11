import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "../../shared/cookie/cookie.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WordAddService {

  lists: string[] = [];
  url = "http://localhost:8080/api/update/word";

  constructor(private httpClient : HttpClient, private cookieService : CookieService) { }

  addToWordlists(wordlistId : string){
    console.log("added " + wordlistId)
    this.lists.push(wordlistId);
  }

  removeFromWordlists(wordlistId : string){
    console.log("removed " + wordlistId)
    const index = this.lists.indexOf(wordlistId);
    if (index > -1) {
      this.lists.splice(index, 1);
    }
  }

  async addWord(word : string){
    console.log("added " + word)
    let token = this.cookieService.getToken();
    if(!token){
      console.log("Invalid Token while adding word");
      return;
    }

    let body = new URLSearchParams();
    body.set('token', token);
    body.set('word', word);
    body.set('wordlistids', this.lists.join(","));

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let response = await firstValueFrom(this.httpClient.put(this.url, body.toString(), options));
  }

}
