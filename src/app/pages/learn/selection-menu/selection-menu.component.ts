import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {WordlistRequestService} from "../../../services/learn/Wordlist-Request/wordlist-request.service";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-selection-menu',
  templateUrl: './selection-menu.component.html',
  styleUrls: ['./selection-menu.component.scss']
})
export class SelectionMenuComponent implements OnInit {

  @Input("fillmethod") fillMethod : string = "anyuser";
  @Input("title") title: string = "no title";
  myarr: any[] = [];
  alertMessage : string = "";
  showAlert : boolean = false;

  horizontalScroll(event : any){
    event.currentTarget.scrollLeft += event.deltaY / 2;
  }

  constructor(private wordlistRequestService : WordlistRequestService, private router : Router) { }

  async ngOnInit() {
    //this.myarr = await this.wordlistRequestService.getAnyWordlists();
    this.fillWithContent();
  }

  async fillWithContent(){
    this.myarr = await this.wordlistRequestService.getWordlists(this.fillMethod);
    console.log(this.myarr);
  }

  openWordlist(id : string, words : number){
    if(words <= 0){
      this.alertMessage = "Diese Wortliste hat keine Einträge"
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);

      return;
    }


    this.router.navigate(["/", "learn", id]);
  }

}
