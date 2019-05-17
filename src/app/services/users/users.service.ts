import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environment';

import { User } from '@models/user';


const USERS_PATH = "/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(ids:Array<Number>):Observable<Array<User>>{
    console.log(ids);
    return this.http.get<Array<User> | User>(environment.urls.user[0]+USERS_PATH+"/"+ids.join("-"))
      .pipe(
        map(v => {
          if(v instanceof Array){
            return v as Array<User>;
          }
          return [v as User];
        })
  
      );
  }
}
