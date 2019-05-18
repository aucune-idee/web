import { Component, OnInit, Input } from '@angular/core';

import { SessionService, AuthData} from '@services/session/session.service';
import { User } from '@models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input()
  public isTransparent:boolean=false;
  @Input()
  public isWide:boolean=false;

  public isBurgerActive:boolean=false;

  public loggedUser:AuthData;

  constructor(private session:SessionService) {
    session.authState().subscribe(user => this.loggedUser = user);
  }

  ngOnInit() {
  }

  public toogleBurger():void{
    this.isBurgerActive = !this.isBurgerActive;
  }

  signout(){
    this.session.logout();
  }
}