import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  public isBurgerActive:boolean=false;
  
  constructor() { }

  ngOnInit() {
  }

  public toogleBurger():void{
    this.isBurgerActive = !this.isBurgerActive;
  }
}
