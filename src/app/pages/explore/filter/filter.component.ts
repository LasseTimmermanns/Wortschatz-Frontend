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
import {FilterService} from "../../../services/filter/filter.service";



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

  public static filterComponent : FilterComponent;

  wortarten : string[] = ["Substantiv", "Verb", "Adjektiv", "Adverb"]
  nutzungen : any[] = [];
  texts : {} = {
    5: "Nur die populärsten Wörter",
    4: "Nur weit verbreitete Wörter",
    3: "Nur oft benutze Wörter Wörter",
    2: "Nur zumindest manchmal benutzte Wörter",
    1: "Alle Wörter"}

  constructor(private cardCreationService : CardCreationService, private filterService : FilterService) { }

  async ngOnInit() {
    FilterComponent.filterComponent = this;
    ExploreComponent.exploreComponent.filterExtended = this.extended;

    this.nutzungen = await this.filterService.getUtilizations();
  }

  changeExtended(){
    this.extended = !this.extended;
    this.retracted = !this.retracted;
    ExploreComponent.exploreComponent.filterExtended = this.extended;
  }

  retract(){
    this.extended = false;
    this.retracted = true;
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

    // @ts-ignore
    this.frequencyRangeText.nativeElement.innerHTML = this.texts[val];

    this.addFrequencyFilter(val);
  }

  addFrequencyFilter(filterValue : number){
    this.cardCreationService.setFilter(this.cardCreationService.FILTER_FREQUENCY, filterValue);
  }

}
