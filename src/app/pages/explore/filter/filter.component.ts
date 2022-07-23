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
import {CardCreationService} from "../../../services/card-creation.service";
import {filter} from "rxjs";



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', './checkboxes.scss', './range.scss']
})


export class FilterComponent implements OnInit {
  @HostBinding('class.filter-extended') extended: boolean = false;
  @HostBinding('class.filter-retracted') retracted: boolean = !this.extended;

  @ViewChild('utilizationChecked') utiliCheckedBoxes! : ElementRef;
  @ViewChild('utilizationUnchecked') utiliUncheckedBoxes! : ElementRef;
  @ViewChild('kindChecked') kindCheckedBoxes! : ElementRef;
  @ViewChild('kindUnchecked') kindUncheckedBoxes! : ElementRef;

  @ViewChild('frequencyRange') frequencyRange! : ElementRef;
  @ViewChild('frequencyRangeText') frequencyRangeText! : ElementRef;

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

  constructor(private cardCreationService : CardCreationService) { }

  ngOnInit(): void {
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  changeExtended(){
    this.extended = !this.extended;
    this.retracted = !this.retracted;
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  checkboxClicked(checkedBoxContainer : ElementRef, uncheckedBoxContainer : ElementRef, filter : string, event : any){
    let input = event.currentTarget;
    let boxContainer = event.currentTarget.parentElement;
    this.addCheckboxFilter(filter, input.id.replace("kind_box_", "").replace("utili_box_", ""), input.checked);

    if(event.currentTarget.checked) return checkedBoxContainer.nativeElement.appendChild(boxContainer);

    let index = boxContainer.getAttribute("placeholderfor");
    uncheckedBoxContainer.nativeElement.children[index].appendChild(boxContainer);
  }

  addCheckboxFilter(filterName : string, filterValue : any, filterState : boolean){
    if(filterState) return this.cardCreationService.appendFilter(filterName, filterValue);
    this.cardCreationService.spliceFilter(filterName, filterValue);
  }

  onRangeInput(){
    let val:number = this.frequencyRange.nativeElement.value;
    let texts = {
      1: "Nur die meistbenutzen Wörter",
      2: "Auch sehr oft benutze Wörter",
      3: "Auch oft benutzte Wörter",
      4: "Auch seltener benutze Wörter",
      5: "Alle Wörter"}

    // @ts-ignore
    this.frequencyRangeText.nativeElement.innerHTML = texts[val];

    this.addFrequencyFilter(val);
  }

  addFrequencyFilter(filterValue : number){
    this.cardCreationService.setFilter(this.cardCreationService.FILTER_FREQUENCY, filterValue);
  }

}
