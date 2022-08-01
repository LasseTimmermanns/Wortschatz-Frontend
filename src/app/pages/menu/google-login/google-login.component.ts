import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {

  @Input("retracted") retracted : boolean = false;
  user: SocialUser | undefined;

  constructor(private readonly _authService: SocialAuthService) {}

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
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
