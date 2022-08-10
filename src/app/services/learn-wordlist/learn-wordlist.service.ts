import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {CookieService} from "../explore/cookie/cookie.service";

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
}
