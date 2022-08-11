import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {CardComponent} from "../../../../pages/explore/card/card.component";
import {HttpClient} from "@angular/common/http";
import {filter, lastValueFrom} from "rxjs";
import {ExploreComponent} from "../../../../pages/explore/explore.component";

@Injectable({
  providedIn: 'root'
})


export class CardCreationService {

  HOSTNAME : string = "http://localhost:8080/api";
  FILTER_MAP : string = "/get/words";
  FILTER_KIND : string = "kind";
  FILTER_UTILIZATION : string = "utilization";
  FILTER_FREQUENCY : string = "frequency";
  FILTER_LIMIT : string = "limit";

  constructor(private httpClient : HttpClient) { }

  //filters : { [id : number] : any; } = { FILTER_KIND : [], FILTER_UTILIZATION: [], FILTER_FREQUENCY: 5}; ???????????
  filters : { [id : string] : any} = { "kind" : [], "utilization" : [], "limit" : 5, "frequency" : 0};
  readonly filtersDefault : { [id : string] : any} = { "kind" : [], "utilization" : [], "limit" : 5, "frequency" : 0};

  filtersUpdated(){
    ExploreComponent.exploreComponent.createNewCards();
  }

  setFilter(filterKey : string, filterValue : any){
    this.filters[filterKey] = filterValue;
    this.filtersUpdated();
  }

  appendFilter(filterKey : string, filterValue : string){
    let val : string[] = this.filters[filterKey];
    val.push(filterValue);
    this.setFilter(filterKey, val);
  }

  spliceFilter(filterKey : string, filterValue : string){
    let val : string[] = this.filters[filterKey];
    const index = val.indexOf(filterValue);
    if (index > -1) val.splice(index, 1);
    this.setFilter(filterKey, val);
  }

  removeFilter(filterKey : string){
    if(this.filtersDefault[filterKey] == null) throw new Error("FilterKey " + filterKey + " not existing");
    this.filters[filterKey] = this.filtersDefault[filterKey];
    this.filtersUpdated();
  }

  applyFilters(url : string) : string{
    url = this.applyFilter(url, this.FILTER_FREQUENCY, false);
    url = this.applyFilter(url, this.FILTER_LIMIT, false);
    url = this.applyFilter(url, this.FILTER_KIND, true);
    url = this.applyFilter(url, this.FILTER_UTILIZATION, true);
    return url;
  }

  applyFilter(url : string, key : string, list : boolean){
    let firstChar = url.includes("?") ? "&" : "?";

    if(this.filters[key] == undefined) return url;
    let value = list ? this.filters[key].join(",") : this.filters[key];
    if(value == "") return url;
    return url + firstChar + key + "=" + value;
  }

  async createCards(viewContainerRef : ViewContainerRef, destroyOld : boolean = true, limit : number = 5) : Promise<ComponentRef<CardComponent>[]>{

    let url = this.HOSTNAME + this.FILTER_MAP;
    url = this.applyFilters(url);
    let out : ComponentRef<CardComponent>[] = [];
    const req = await lastValueFrom(this.httpClient.get<any>(url));

    if(destroyOld) ExploreComponent.exploreComponent.destroyCards();
    for(let i = 0; i < req.length; i++){
      out.push(this.createCard(viewContainerRef, i, req[i]));
    }

    return out;
  }


  private createCard(viewContainerRef : ViewContainerRef, index : number, data : any) : ComponentRef<CardComponent>{
    let component : ComponentRef<CardComponent> = viewContainerRef.createComponent(CardComponent);
    component.instance.index = index;
    component.instance.synonyms = data.synonyms == undefined ? data.synonyms : data.synonyms.split("|")
    component.instance.frequency = data.frequency;
    component.instance.kind = data.kind;
    component.instance.utilization = data.utilization;
    component.instance.description = data.description;
    component.instance.word = data.word;
    component.instance.updateFrequency();
    return component;
  }


}
