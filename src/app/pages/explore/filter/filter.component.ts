import {ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, OnInit} from '@angular/core';
import {ExploreComponent} from "../explore.component";



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})


export class FilterComponent implements OnInit {
  @HostBinding('class.filter-extended') extended: boolean = true;
  @HostBinding('class.filter-retracted') retracted: boolean = false;

  constructor() { }

  ngOnInit(): void {
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  changeExtended(){
    this.extended = !this.extended;
    this.retracted = !this.retracted;
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

}
