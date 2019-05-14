import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { filter } from 'rxjs/operators';

import { SessionService, SigninInput, SigninOutput } from '@services/session';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public data:SigninInput = {id:"",password: ""}

  private redirect:String;

  constructor(
    private service:SessionService,
    private router:Router,
    private route:ActivatedRoute) {
    }

  ngOnInit() {
    this.redirect = null;
    this.route.queryParams.pipe(
      filter(params => params.redirect)
    )
    .subscribe(param => {
      this.redirect = param.redirect
    })
  }


  onSubmit():void{
    this.service.auth(this.data).subscribe(
      (output:SigninOutput)=> {
        this.router.navigate(this.redirect ? [this.redirect] : ['/']);
      },
      (error:any)=>console.error(error)
    );
  }
}
