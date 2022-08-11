import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../../shared/cookie/cookie.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WordlistRequestService {

  constructor(private httpClient : HttpClient, private cookieService : CookieService) { }

  async getOwnWordlists() : Promise<any>{
    let token = this.cookieService.getToken();
    if(!token) return;

    return await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordlist/user?token="+token));
  }

  async getOtherWordlists() : Promise<any>{
    let token = this.cookieService.getToken();
    if(!token) return;

    return await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordlist/notuser?token="+token));
  }

  async getAnyWordlists() : Promise<any>{
    return await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordlist/anyuser"));
  }

  async getWordlists(method : string) : Promise<any>{
    let token = this.cookieService.getToken();
    let suffix = "?token=" + token;
    if(!token) suffix = "";

    return await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordlist/" + method + suffix));
  }

}
