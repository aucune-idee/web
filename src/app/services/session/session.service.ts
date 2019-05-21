import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable,BehaviorSubject, of, Subscription } from 'rxjs';
import { tap, shareReplay, map, delay } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '@environment';

import { User } from '@models/user';

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

export interface AuthData {
  id: number;
  username: String;
  roles: Array<String>;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly TOKEN_KEY:string = "token";
  private readonly jwt:JwtHelperService = new JwtHelperService();
  private readonly subject:BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(null);
  private logoutSubscription:Subscription;

  constructor(
    private http: HttpClient,
    private router:Router) {
    this.updateTokenData();
  }
  
  public auth(input:SigninInput):Observable<SigninOutput>{
    return this.http.post<SigninResponse>(environment.urls.user[0]+"/auth", input)
      .pipe(
        shareReplay(1),
        tap((output:SigninResponse) => {
          sessionStorage.setItem(this.TOKEN_KEY, output.token);
        }),
        map((output:SigninResponse) => {
          let tokenData:SigninOutput = this.jwt.decodeToken(output.token) as SigninOutput;
          this.updateTokenData();
          return tokenData
        })
      );
  }
  
  public authState():BehaviorSubject<AuthData>{
    return this.subject;
  }
  
  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
  
  public getTokenData():AuthData{
    let token = this.getToken();
    if(token === undefined || token === null){
      return null;
    }
    if(this.jwt.isTokenExpired(token)){
      return null;
    }
    console.log(this.jwt.getTokenExpirationDate(this.getToken()), new Date())
    return this.jwt.decodeToken(token) as AuthData;
  }

  logout():void{
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.subject.next(null);
    this.router.navigate(["/signin"], { queryParams: { redirect: this.router.url}});
  }

  private updateTokenData(){
    this.subject.next(this.getTokenData() as AuthData);
    if(this.logoutSubscription !== undefined && this.logoutSubscription !== null){
      this.logoutSubscription.unsubscribe();
    }
    if(this.getToken() === null){
      return;
    }
    this.logoutSubscription = of(null)
    .pipe(
      delay(this.jwt.getTokenExpirationDate(this.getToken()).getTime() - new Date().getTime() - 1000)
    ).subscribe(()=>{
      console.log("auto logout")
      this.logout();
    })
  }
}