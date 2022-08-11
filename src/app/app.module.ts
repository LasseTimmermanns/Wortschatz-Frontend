import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { CardComponent } from './pages/explore/card/card.component';
import {RouterModule, Routes} from "@angular/router";
import { FilterComponent } from './pages/explore/filter/filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
SocialLoginModule,
  SocialAuthServiceConfig, GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { GoogleLoginComponent } from './pages/menu/google-login/google-login.component';
import {CookieService} from "./services/shared/cookie/cookie.service";
import { WordlistSelectionComponent } from './pages/explore/wordlist-selection/wordlist-selection.component';
import { LearnComponent } from './pages/learn/learn.component';
import { SelectionMenuComponent } from './pages/learn/selection-menu/selection-menu.component';
import { WordlistComponent } from './pages/learn/selection-menu/wordlist/wordlist.component';
import { LearnWordlistComponent } from './pages/learn-wordlist/learn-wordlist.component';
import { LearnWordlistMenuComponent } from './pages/learn-wordlist/learn-wordlist-menu/learn-wordlist-menu.component';
import { LearnWordlistCardComponent } from './pages/learn-wordlist/learn-wordlist-card/learn-wordlist-card.component';

const allRoutes: Routes = [
  {path: "", component: ExploreComponent},
  {path: "explore", component: ExploreComponent},
  {path: "learn", component: LearnComponent},
  {path: "learn/:wordlistid", component: LearnWordlistComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ExploreComponent,
    CardComponent,
    FilterComponent,
    GoogleLoginComponent,
    WordlistSelectionComponent,
    LearnComponent,
    SelectionMenuComponent,
    WordlistComponent,
    LearnWordlistComponent,
    LearnWordlistMenuComponent,
    LearnWordlistCardComponent
  ],
  imports: [
    RouterModule.forRoot(allRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('623953722915-s65tp1q2h696mk8fl0kv4uqibq5t702e.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
