import { Component, OnInit } from '@angular/core';

import { Lobby } from '@models/lobby';
import { LobbiesService, GetLobbiesInput, GetLobbiesOutput } from '@services/lobbies';
import { GameType } from '@enums/index';

@Component({
  selector: 'app-find-lobby',
  templateUrl: './find-lobby.component.html',
  styleUrls: ['./find-lobby.component.scss']
})
export class FindLobbyComponent implements OnInit {

  gameType = GameType;
  types = Object.keys(GameType)
    .filter(key => !isNaN(Number(GameType[key])))
    .map(key => Number(GameType[key]));
  lobbies:Array<Lobby> = null;
  data:GetLobbiesInput = {};

  sizeMenuVisible:boolean = false;
  
  constructor(private lobbyService:LobbiesService) {
    console.log(this.types);
  }


  ngOnInit() {
  }

  search(){
    this.lobbyService
      .findLobby(this.data)
      .subscribe((output:GetLobbiesOutput) => {
        this.lobbies = output.lobbies;
      });
  }

}
