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

const allRoutes: Routes = [
  {path: "", component: ExploreComponent},
  {path: "explore", component: ExploreComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ExploreComponent,
    CardComponent,
    FilterComponent
  ],
  imports: [
    RouterModule.forRoot(allRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
