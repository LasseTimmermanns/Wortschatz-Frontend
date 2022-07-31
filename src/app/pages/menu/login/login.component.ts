import {Component, HostBinding, OnInit, ViewChild, ViewRef} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('password_input') password_input : any;
  @ViewChild('switchMarker') switchMarker : any;

  username : string = "";
  loginFormActive : boolean = true;


  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
  }

  logout(){
    this.username = "";
  }

  async onSubmit(action : string, data : any){
    console.log(action);
    let body = new URLSearchParams();
    body.set('username', data.username_input);
    body.set('password', data.password_input);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let url = "http://localhost:8080/login/" + action;
    this.httpClient.post<any>(url, body.toString(), options).subscribe(data => {
        console.log("success");
        this.username = data.username;
      },
      err => {
        console.log("error");
      },
      () => {
        console.log("ende");
      });

    //console.log(request.message);
  }

  gotoPassword(){
    this.password_input.nativeElement.select();
  }

  view_password(){
    this.password_input.nativeElement.type = this.password_input.nativeElement.type == "text" ? "password" : "text";
  }

  switch_forms(){
    this.loginFormActive = !this.loginFormActive;
    this.switchMarker.nativeElement.innerHTML = "";

    this.switchMarker.nativeElement.innerHTML = this.loginFormActive ? "Einloggen" : "Registrieren";

  }

}
