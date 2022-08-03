import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {CookieService} from "../../../services/cookie/cookie.service";
import {LoginService} from "../../../services/login/login.service";

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  @Input("retracted") retracted : boolean = false;
  user: SocialUser | undefined;

  constructor(private readonly _authService: SocialAuthService, private loginService : LoginService) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      if(user){
        this.loginService.generateSession(user.idToken);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes[0]){
      this.retracted = changes[0].currentValue;
    }
  }

  signOut(): void {
    this._authService.signOut();
  }
}
