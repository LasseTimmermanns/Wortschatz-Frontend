import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {CookieService} from "../cookie/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class WordlistSelectionCreatorService {

  constructor(private cookieService : CookieService, private httpClient : HttpClient) { }

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
