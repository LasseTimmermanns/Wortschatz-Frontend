import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LearnWordlistService} from "../../services/learn-wordlist/learn-wordlist.service";

@Component({
  selector: 'app-learn-wordlist',
  templateUrl: './learn-wordlist.component.html',
  styleUrls: ['./learn-wordlist.component.scss']
})
export class LearnWordlistComponent implements OnInit {

  wordlistId : string = "";

  constructor(private route: ActivatedRoute, private learnWordlistService : LearnWordlistService, private router : Router) {
    this.route.params.subscribe(async params => {
      if (!await learnWordlistService.hasAccess(params['wordlistid'])) {
        await router.navigate(["/learn"]);
      }
      this.wordlistId = params['wordlistid'];
    });
  }

  ngOnInit(): void {
  }

}
