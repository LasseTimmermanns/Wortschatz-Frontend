import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {CookieService} from "../../../services/cookie/cookie.service";

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  @Input("retracted") retracted : boolean = false;
  user: SocialUser | undefined;

  constructor(private readonly _authService: SocialAuthService, private cookieService : CookieService) {}

  ngOnInit() {
    this.cookieService.deleteCookie("idToken");
    this._authService.authState.subscribe((user) => {
      this.user = user;
      if(user){
        this.cookieService.setCookie({name: "idToken", value: user.idToken});
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
