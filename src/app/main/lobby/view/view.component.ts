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
    ).subscribe(lobby => {
      this.lobby = lobby;
      this.userService
          .getUsers(lobby.members.map(member => member._userId)).subscribe(users => console.log(users))
    })
  }

}
