import { Injectable } from '@angular/core';
import {CookieService} from "../cookie/cookie.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cookieService : CookieService, private httpClient : HttpClient) { }

  async generateSession(idToken : string) {
    let body = new URLSearchParams();
    body.set('idToken', idToken);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let url = "http://localhost:8080/api/create/session";
    let request = await lastValueFrom(this.httpClient.post<any>(url, body.toString(), options));

    if(request.response_code != 200) {
      console.log(request);
      return;
    }

    console.log("idToken: " + idToken);
    console.log("Generating cookies");
    this.cookieService.setCookie({name: "sessionToken", value: request.session_token});
    this.cookieService.setCookie({name: "sessionIat", value: request.session_iat});
    this.cookieService.setCookie({name: "sessionExp", value: request.session_exp});
  }

  removeSession(){
    this.cookieService.deleteCookie("sessionToken");
    this.cookieService.deleteCookie("sessionIat");
    this.cookieService.deleteCookie("sessionExp");
  }
}
