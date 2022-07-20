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

  constructor() { }

  ngOnInit(): void {
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  changeExtended(){
    this.extended = !this.extended;
    this.retracted = !this.retracted;
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  checkboxClicked(checkedBoxContainer : ElementRef, uncheckedBoxContainer : ElementRef, event : any){
    let boxContainer = event.currentTarget.parentElement;
    if(event.currentTarget.checked) return checkedBoxContainer.nativeElement.appendChild(boxContainer);

    let index = boxContainer.getAttribute("placeholderfor");
    uncheckedBoxContainer.nativeElement.children[index].appendChild(boxContainer);
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
  }

}
