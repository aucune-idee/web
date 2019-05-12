import { Component, Output, EventEmitter } from '@angular/core';

import { GameType } from '@enums/game-type';
import { LobbiesService, CreateLobbyInput } from '@services/lobbies';
import { Lobby } from '@models/lobby';

@Component({
  selector: 'app-lobby-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  @Output()
  onLobbyCreated = new EventEmitter<Lobby>();

  gameType = GameType;
  types = Object.keys(GameType).filter(key => !isNaN(Number(GameType[key])));
  data:CreateLobbyInput = {
    name:null,
    type:GameType.CLASSIC
  };

  constructor(private lobbyService:LobbiesService) {
    console.log(this.data)
  }

  submit():boolean{
    console.log(this.data);
    this.lobbyService.createLobby(this.data).subscribe(lobby => {
      this.onLobbyCreated.emit(lobby);
    });
    return false;
  }

}
