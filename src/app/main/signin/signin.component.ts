import { Component, OnInit } from '@angular/core';

import { SessionService, SigninInput, SigninOutput } from '@services/session';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public data:SigninInput = {id:"",password: ""}

  constructor(private service:SessionService) {
    console.log(this.service);
  }

  ngOnInit() {
  }


  onSubmit():void{
    this.service.auth(this.data).subscribe(
      (output:SigninOutput)=> console.log(output),
      (error:any)=>console.error(error)
    );
  }
}
