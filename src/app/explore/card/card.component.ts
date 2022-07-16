import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() myIndex = 0
  private _top: boolean = true;



  constructor() { }

  get top(): boolean {
    return this._top;
  }

  ngOnInit(): void {
    if(this.myIndex == 0){
      this._top = true;
    }
  }
}
