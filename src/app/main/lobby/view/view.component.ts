import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, mergeMap } from 'rxjs/operators';

import { Lobby } from '@models/lobby';
import { LobbiesService } from '@services/lobbies';
import { UsersService } from '@services/users';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  lobby:Lobby;

  constructor(
    private route:ActivatedRoute,
    private lobbyService:LobbiesService,
    private userService:UsersService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.lobbyService.getLobby(+params.get('id'))),
        mergeMap(lobby => this.userService
          .getUsers(lobby.members.map(member => member._userId)),
          (lobby, users) => {
            console.log(users);
            for(let member of lobby.members){
              member.username = users.find(u => u._id == member._userId).username;
            }
            return lobby;
          })
    ).subscribe(lobby => {
      this.lobby = lobby;
      console.log(lobby);
    })
  }

}
