import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, mergeMap } from 'rxjs/operators';

import { Lobby } from '@models/lobby';
import { LobbiesService } from '@services/lobbies';
import { UsersService } from '@services/users';
import { SessionService } from '@services/session';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  lobby:Lobby;
  id:number;

  constructor(
    private route:ActivatedRoute,
    private lobbyService:LobbiesService,
    private userService:UsersService,
    private session:SessionService) {
      session.authState().subscribe(auth => {
        if(auth){
          this.id = auth.id;
        }
        else{
          this.id = null;
        }
      })
    }

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

  isMember():boolean{
    console.log(this.lobby.members.find(m => m._userId == this.id));
    return this.lobby.members.find(m => m._userId == this.id) != null;
  }

}
