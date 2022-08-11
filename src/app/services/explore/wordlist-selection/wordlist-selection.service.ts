import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "../../shared/cookie/cookie.service";
import {firstValueFrom} from "rxjs";
import {WordlistSelectionComponent} from "../../../pages/explore/wordlist-selection/wordlist-selection.component";

@Injectable({
  providedIn: 'root'
})
export class WordlistSelectionService {

  constructor(private httpClient : HttpClient, private cookieService : CookieService) { }

  createWordlist(){
    let token = this.cookieService.getToken();
    if(!token){
      console.log("No token");
      return;
    }

    let url = "http://localhost:8080/api/create/wordlist";
    let body = new URLSearchParams();
    body.set("token", token);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };

    firstValueFrom(this.httpClient.post(url, body.toString(), options)).then(res => {
      WordlistSelectionComponent.wordlistSelectionComponent.generateWordlists();
    })
  }

  deleteWordlist(wordlistId : string){
    let token = this.cookieService.getToken();
    if(!token){
      console.log("No token");
      return;
    }

    let url = "http://localhost:8080/api/delete/wordlist";
    let bodyParam = new URLSearchParams();
    bodyParam.set("token", token);
    bodyParam.set("wordlist", wordlistId);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      body: bodyParam.toString()
    };

    this.httpClient.delete(url, options)
  }

  async getWordlists(){
    console.log("trying to get wordlists")
    let url = "http://localhost:8080/api/get/wordlists";
    let token = this.cookieService.getToken();
    if(!token) return null;

    let request = await firstValueFrom(this.httpClient.get<any>(url + "?token=" + token));

    let out = [];
    for(let i = 0; i < request.length; i++){
      out.push({id: request[i].id, name: request[i].name})
    }

    return out;
  }
}
