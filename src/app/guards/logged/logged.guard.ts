import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { SessionService } from '@services/index';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate{

  constructor(
    private router:Router,
    private sessionService: SessionService) {}

  canActivate():boolean{
    let isSigned = this.sessionService.authState().value != null;
    if(!isSigned){
      this.router.navigate(["/signin"]);
    }
    return isSigned;
  }
}
