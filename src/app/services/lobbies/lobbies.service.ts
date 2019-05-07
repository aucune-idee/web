import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@environment';
import { Lobby } from '@models/lobby';

export interface GetLobbiesInput{
  start?:Number,
  size?:Number
}

export interface GetLobbiesOutput{
  lobbies:[Lobby]
}

@Injectable({
  providedIn: 'root'
})
export class LobbiesService {

  constructor(private http: HttpClient) {}

  public getLobbies():Observable<GetLobbiesOutput>{
    let path = "/lobbies";
    return this.http.get<GetLobbiesOutput>(environment.urls.lobbies[0]+path);
  }
}
