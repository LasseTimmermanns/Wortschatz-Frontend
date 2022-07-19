import {ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, OnInit} from '@angular/core';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})


export class FilterComponent implements OnInit {
  @HostBinding('class.filter-extended') extend: boolean = false;
  @HostBinding('class.filter-retracted') retract: boolean = true;

  constructor(private cdRef:ChangeDetectorRef, private elRef : ElementRef) { }

  ngOnInit(): void {
  }

  changeExtended(){
    this.extend = !this.extend;
    this.retract = !this.retract;
  }



}
