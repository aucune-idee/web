import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '@environment';

export interface SigninInput{
  id: String;
  password: String;
}
export interface SigninOutput{
  token:String
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  
  public auth({id:String, password:String}:SigninInput):Observable<SigninOutput>{
    return this.http.get();
  }
}
