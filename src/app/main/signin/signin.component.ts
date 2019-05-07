import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { SessionService, SigninInput, SigninOutput } from '@services/session';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public data:SigninInput = {id:"",password: ""}

  constructor(
    private service:SessionService,
    private router:Router) {}

  ngOnInit() {
  }


  onSubmit():void{
    this.service.auth(this.data).subscribe(
      (output:SigninOutput)=> {
        this.router.navigate(['/']);
      },
      (error:any)=>console.error(error)
    );
  }
}
