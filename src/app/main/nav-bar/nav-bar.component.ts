import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input()
  public isTransparent:boolean=false;

  public isBurgerActive:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  public toogleBurger():void{
    this.isBurgerActive = !this.isBurgerActive;
  }
}