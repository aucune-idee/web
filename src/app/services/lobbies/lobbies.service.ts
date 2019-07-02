import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import { environment } from '@environment';
import { Lobby } from '@models/lobby';

import { GameType, Armies } from '@enums/index';

export interface GetLobbiesInput{
  start?:Number,
  size?:Number,
  type?:GameType,
  sizeMin?:number,
  sizeMax?:number,
  owner?:number,
}

export interface GetLobbiesOutput{
  lobbies:[Lobby],
  hasNext:boolean
}

export interface CreateLobbyInput{
  name:String,
  type:GameType,
  size:Number
}

export interface SelectArmyInput{
  lobbyId:number,
  army:Armies,
}

const LOBBY_PATH = "/lobbies";

@Injectable({
  providedIn: 'root'
})
export class LobbiesService {

  constructor(private http: HttpClient) {}

  public getLobbies(input?:GetLobbiesInput):Observable<GetLobbiesOutput>{
    return this.http.get<GetLobbiesOutput>(environment.urls.game[0]+LOBBY_PATH);
  }
  public getOwnLobbies():Observable<GetLobbiesOutput>{
    return this.http.get<GetLobbiesOutput>(environment.urls.game[0]+LOBBY_PATH+"/own");
  }
  public getLobby(id:Number):Observable<Lobby>{
    return this.http.get<Lobby>(environment.urls.game[0]+LOBBY_PATH+"/"+id);
  }
  public findLobby(input:GetLobbiesInput):Observable<GetLobbiesOutput>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<GetLobbiesOutput>(environment.urls.game[0]+LOBBY_PATH, input, {headers:headers})
    .pipe(
      shareReplay(1)
    )
  }

  public createLobby(input: CreateLobbyInput): Observable<Lobby>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Lobby>(environment.urls.game[0]+LOBBY_PATH, input, {headers:headers})
    .pipe(
      shareReplay(1)
    )
  }
  public leaveLobby(id: number): Observable<boolean>{
    return this.http.put(environment.urls.game[0]+LOBBY_PATH+"/"+ id+"/leave", {})
    .pipe(
      map(() => true)
    )
  }

  public joinLobby(id: number): Observable<boolean>{
    return this.http.put(environment.urls.game[0]+LOBBY_PATH+"/"+ id+"/join", {})
    .pipe(
      map(() => true)
    )
  }

  public selectArmy(input: SelectArmyInput): Observable<boolean>{
    return this.http.put(environment.urls.game[0]+LOBBY_PATH+"/"+ input.lobbyId +"/select-army", {
      army:input.army
    })
    .pipe(
      map(() => true)
    )
  }
}
