import { Component, OnInit } from '@angular/core';
import {SelectionMenuComponent} from "../selection-menu.component";

@Component({
  selector: 'app-own-selection',
  templateUrl: '../selection-menu.component.html',
  styleUrls: ['../selection-menu.component.scss']
})
export class OwnSelectionComponent extends SelectionMenuComponent implements OnInit {

  override title: string = "Eigene Listen";

}
