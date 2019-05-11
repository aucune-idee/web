import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { environment } from '@environment';
import { Lobby } from '@models/lobby';

export interface GetLobbiesInput{
  start?:Number,
  size?:Number
}

export interface GetLobbiesOutput{
  lobbies:[Lobby],
  hasNext:boolean
}

export interface CreateLobbyInput{
  name:String
}

const LOBBY_PATH = "/lobbies";

@Injectable({
  providedIn: 'root'
})
export class LobbiesService {

  constructor(private http: HttpClient) {}

  public getLobbies():Observable<GetLobbiesOutput>{
    return this.http.get<GetLobbiesOutput>(environment.urls.game[0]+LOBBY_PATH);
  }

  public createLobby(input: CreateLobbyInput): Observable<Lobby>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Lobby>(environment.urls.game[0]+LOBBY_PATH, input, {headers:headers})
    .pipe(
      shareReplay(1)
    )
  }
}
