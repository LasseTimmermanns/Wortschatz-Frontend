import { Injectable } from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private httpClient : HttpClient) { }

  async getUtilizations(limit : number = 200){
    const req = await lastValueFrom(this.httpClient.get<any>("http://localhost:8080/api/utilization?limit=" + limit));
    let out = [];
    for(let i = 0; i < req.length; i++){
      out.push(req[i]);
    }

    return out;
  }
}
