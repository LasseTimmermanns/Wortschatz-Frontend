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
  @ViewChild('loginResponse') loginResponse : any;

  username : string = "";
  loginFormActive : boolean = true;
  response_status_success : boolean = true;

  public static loginComponent : LoginComponent;

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    LoginComponent.loginComponent = this;
  }

  logout(){
    this.username = "";
  }

  async onSubmit(data : any){
    let body = new URLSearchParams();
    body.set('username', data.username_input);
    body.set('password', data.password_input);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let url = "http://localhost:8080/login/" + (this.loginFormActive ? "login" : "register");
    this.httpClient.post<any>(url, body.toString(), options).subscribe(data => {
        this.username = data.username;
      },
      err => {
        this.show_error(err);
      },
      () => {});

    //console.log(request.message);
  }


  show_error(data : any){
    LoginComponent.loginComponent.show_message(data.error.display_message, false);
  }

  gotoPassword(){
    this.password_input.nativeElement.select();
  }

  view_password(){
    this.password_input.nativeElement.type = this.password_input.nativeElement.type == "text" ? "password" : "text";
  }

  switch_forms(){
    this.loginResponse.nativeElement.innerHTML = "";
    this.loginFormActive = !this.loginFormActive;
    this.switchMarker.nativeElement.innerHTML = "";

    this.switchMarker.nativeElement.innerHTML = this.loginFormActive ? "Einloggen" : "Registrieren";
  }

  show_message(message : string, status_success : boolean){
    this.response_status_success = status_success;
    this.loginResponse.nativeElement.innerHTML = message;
  }

}
