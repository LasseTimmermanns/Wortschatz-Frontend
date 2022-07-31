import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @HostBinding('class.menu-retracted') retracted: boolean = false;

  pages = [
    {name: "Explore", img: "explore_stroke.svg", routerLink: "#"},
    {name: "Learn", img: "learn_stroke.svg", routerLink: "#"},
    {name: "Manage", img: "manage_stroke.svg", routerLink: "#"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changeMenuRetracted(){
    this.retracted = !this.retracted;
  }

}
