import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {WordlistRequestService} from "../../../services/learn/Wordlist-Request/wordlist-request.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-selection-menu',
  templateUrl: './selection-menu.component.html',
  styleUrls: ['./selection-menu.component.scss']
})
export class SelectionMenuComponent implements OnInit {

  @Input("fillmethod") fillMethod : string = "anyuser";
  @Input("title") title: string = "no title";
  myarr: any[] = [];

  horizontalScroll(event : any){
    event.currentTarget.scrollLeft += event.deltaY / 2;
  }

  constructor(private wordlistRequestService : WordlistRequestService) { }

  async ngOnInit() {
    //this.myarr = await this.wordlistRequestService.getAnyWordlists();
    this.fillWithContent();
  }

  async fillWithContent(){
    this.myarr = await this.wordlistRequestService.getWordlists(this.fillMethod);
    console.log(this.myarr);
  }

}
