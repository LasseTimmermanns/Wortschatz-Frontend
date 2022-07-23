import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {CardComponent} from "../pages/explore/card/card.component";
import {HttpClient} from "@angular/common/http";
import {filter} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class CardCreationService {

  HOSTNAME : string = "http://localhost:8080/api";
  FILTER_MAP : string = "/getWords";
  FILTER_KIND : string = "kind";
  FILTER_UTILIZATION : string = "utilization";
  FILTER_FREQUENCY : string = "frequency";
  FILTER_LIMIT : string = "limit";

  constructor(private httpClient : HttpClient) { }

  //filters : { [id : number] : any; } = { FILTER_KIND : [], FILTER_UTILIZATION: [], FILTER_FREQUENCY: 5}; ???????????
  filters : { [id : string] : any} = { "kind" : [], "utilization" : [], "limit" : 5, "frequency" : 0};
  readonly filtersDefault : { [id : string] : any} = { "kind" : [], "utilization" : [], "limit" : 5, "frequency" : 0};

  setFilter(filterKey : string, filterValue : any){
    this.filters[filterKey] = filterValue;
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
    if(this.filtersDefault[filterKey] == null) throw new Error("FILTERKEY NOT FOUND");
    this.filters[filterKey] = this.filtersDefault[filterKey];
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

  createCards(viewContainerRef : ViewContainerRef, limit : number = 5) : ComponentRef<CardComponent>[]{
    this.setFilter(this.FILTER_LIMIT, 5);
    let url = this.HOSTNAME + this.FILTER_MAP;
    url = this.applyFilters(url);
    console.log(url);
    let out : ComponentRef<CardComponent>[] = [];
    this.httpClient.get<any>(url).subscribe(data =>{
      for(let i = 0; i < data.length; i++){
        //console.log(data[i]);
        out.push(this.createCard(viewContainerRef, i, data[i]));
      }
    })
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



/*
  createCards(viewContainerRef : ViewContainerRef, stack_size: number) : ComponentRef<CardComponent>[]{
    let out : ComponentRef<CardComponent>[] = [];

    for(let i = 0; i < stack_size; i++){
      out.push(this.createCard(viewContainerRef, i, "skurril"))
    }

    return out;
  }*/


}
