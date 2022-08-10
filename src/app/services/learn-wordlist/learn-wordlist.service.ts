import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {CookieService} from "../explore/cookie/cookie.service";
import {Wordlist} from "../../pages/learn-wordlist/Wordlist/wordlist";

@Injectable({
  providedIn: 'root'
})
export class LearnWordlistService {

  constructor(private httpClient : HttpClient, private cookieService : CookieService) { }

  async hasAccess(wordlistid : string) : Promise<any>{
    let token = this.cookieService.getToken();
    let suffix = "&token="+token;
    if(token) suffix = "";

    let request = await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordlist/hasaccess?wordlistid="+wordlistid+suffix));
    return request.access;
  }

  async getWordlist(wordlistid : string) : Promise<Wordlist>{
    let token = this.cookieService.getToken();
    let suffix = "&token="+token;
    if(token) suffix = "";

    let request = await firstValueFrom(this.httpClient.get<any>("http://localhost:8080/api/get/wordlist/byid?wordlistid="+wordlistid+suffix));
    console.log(request)
    return new Wordlist(request.id, request.words);
  }
}
