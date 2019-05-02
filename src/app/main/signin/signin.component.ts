import { Component, OnInit } from '@angular/core';

import { UsersService, SigninInput, SigninOutput } from '@services/users';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public data:SigninInput = {id:"",password: ""}

  constructor() { }

  ngOnInit() {
  }

}
