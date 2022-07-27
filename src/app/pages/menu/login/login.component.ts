import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(action : string, data : any){
    let body = new URLSearchParams();
    body.set('username', data.username_input);
    body.set('password', data.password_input);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let url = "http://localhost:8080/login/" + action;
    this.httpClient.post<any>(url, body.toString(), options).subscribe(data => {
      console.log(data);
    });
  }

}
