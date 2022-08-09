import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-selection-menu',
  templateUrl: './selection-menu.component.html',
  styleUrls: ['./selection-menu.component.scss']
})
export class SelectionMenuComponent implements OnInit {

  title: string = "no title";
  myarr: number[] = [1,2,3,4,5,6,7,8,9,10];

  horizontalScroll(event : any){
    event.currentTarget.scrollLeft += event.deltaY / 2;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
