import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { GameType } from '@enums/game-type';
import { LobbiesService, CreateLobbyInput } from '@services/lobbies';
import { Lobby } from '@models/lobby';

@Component({
  selector: 'app-lobby-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Output()
  onLobbyCreated = new EventEmitter<Lobby>();

  gameType = GameType;
  types = Object.values(GameType).filter(key => !isNaN(Number(GameType[key])));
  data:CreateLobbyInput;
  type:string;
  
  constructor(private lobbyService:LobbiesService) {
  }

  ngOnInit(){
    this.data = {
      name:null,
      type:GameType.CLASSIC,
      size:2
    }
    this.type = GameType[GameType.CLASSIC]
  }

  submit():boolean{
    this.lobbyService.createLobby(this.data).subscribe(lobby => {
      this.onLobbyCreated.emit(lobby);
    });
    return false;
  }

  selectType(type:string){
    this.data.type = GameType[type];
    this.type = type;
  }
}
