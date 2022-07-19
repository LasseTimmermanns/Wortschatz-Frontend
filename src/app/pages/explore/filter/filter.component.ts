import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ExploreComponent} from "../explore.component";



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', './checkboxes.scss']
})


export class FilterComponent implements OnInit {
  @HostBinding('class.filter-extended') extended: boolean = true;
  @HostBinding('class.filter-retracted') retracted: boolean = false;
  @ViewChild('checked') checkedBoxes! : ElementRef;
  @ViewChild('unchecked') uncheckedBoxes! : ElementRef;

  wortarten : string[] = ["Substantiv", "Verb", "Adjektiv", "Adverb"]
  nutzungen : string[] = [
    "umgangssprachlich",
    "bildungssprachlich",
    "gehoben",
    "Medizin",
    "veraltet",
    "abwertend",
    "Sprachwissenschaft",
    "umgangssprachlich abwertend",
    "Chemie",
    "Fachsprache",
    "Wirtschaft",
    "Computer",
    "Technik",
    "selten",
    "Biologie",
    "Rechtssprache",
    "Physik",
    "Sport",
    "früher",
    "landschaftlich",
    "Botanik",
    "Musik",
    "Mathematik",
    "Geologie",
    "Geschichte",
    "salopp",
    "Militär"
  ]

  constructor() { }

  ngOnInit(): void {
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  changeExtended(){
    this.extended = !this.extended;
    this.retracted = !this.retracted;
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  checkboxClicked(event : any){
    let boxContainer = event.currentTarget.parentElement;
    if(event.currentTarget.checked) return this.checkedBoxes.nativeElement.appendChild(boxContainer);

    let index = boxContainer.title;
    this.uncheckedBoxes.nativeElement.children[index].appendChild(boxContainer);
  }

}
