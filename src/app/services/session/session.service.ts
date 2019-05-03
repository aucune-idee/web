import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable,BehaviorSubject, throwError } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';


import { environment } from '@environment';

export interface SigninInput{
  id: String;
  password: String;
}
export interface SigninOutput{
  id: String,
  username: String,
  roles: Array<String>
}
interface SigninResponse{
  token:string
} 

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly TOKEN_KEY:string = "token";
  private readonly jwt:JwtHelperService = new JwtHelperService();
  private readonly subject:BehaviorSubject<SigninOutput> = new BehaviorSubject<SigninOutput>(null);

  constructor(private http: HttpClient) { }
  
  public auth(input:SigninInput):Observable<SigninOutput>{
    return this.http.post<SigninResponse>(environment.urls.users[0]+"/auth", input)
      .pipe(
        shareReplay(1),
        tap((output:SigninResponse) => {
          localStorage.setItem(this.TOKEN_KEY, output.token);
          
        }),
        map((output:SigninResponse) => {
          let tokenData:SigninOutput = this.jwt.decodeToken(output.token) as SigninOutput;
          this.subject.next(tokenData);
          return tokenData
        })
      );
  }
  
  public authState():BehaviorSubject<SigninOutput>{
    return this.subject;
  }
  
  public getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  
}
