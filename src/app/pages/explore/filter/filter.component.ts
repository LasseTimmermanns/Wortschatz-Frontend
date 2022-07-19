import {ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, OnInit} from '@angular/core';
import {ExploreComponent} from "../explore.component";



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})


export class FilterComponent implements OnInit {
  @HostBinding('class.filter-extended') extended: boolean = false;
  @HostBinding('class.filter-retracted') retracted: boolean = true;

  constructor(private cdRef:ChangeDetectorRef, private elRef : ElementRef) { }

  ngOnInit(): void {
  }

  changeExtended(){
    this.extended = !this.extended;
    this.retracted = !this.retracted;
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }



}
