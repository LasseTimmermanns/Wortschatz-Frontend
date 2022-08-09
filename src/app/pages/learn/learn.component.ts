import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  readonly FILLMETHOD_ANY = "anyuser";
  readonly FILLMETHOD_OWN = "user";
  readonly FILLMETHOD_PUBLIC = "notuser";

  constructor() { }

  ngOnInit(): void {
  }

}
