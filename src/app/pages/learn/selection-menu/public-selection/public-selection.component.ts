import { Component, OnInit } from '@angular/core';
import {SelectionMenuComponent} from "../selection-menu.component";

@Component({
  selector: 'app-public-selection',
  templateUrl: '../selection-menu.component.html',
  styleUrls: ['../selection-menu.component.scss']
})
export class PublicSelectionComponent extends SelectionMenuComponent implements OnInit {


  override title: string = "Öffentliche Listen";

}
