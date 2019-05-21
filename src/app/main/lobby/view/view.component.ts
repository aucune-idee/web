import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, mergeMap, map } from 'rxjs/operators';

import { Lobby } from '@models/lobby';
import { LobbiesService } from '@services/lobbies';
import { UsersService } from '@services/users';
import { SessionService } from '@services/session';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  lobby:Lobby;
  userId:number;

  constructor(
    private route:ActivatedRoute,
    private lobbyService:LobbiesService,
    private userService:UsersService,
    session:SessionService) {
      session.authState().subscribe(auth => {
        if(auth){
          this.userId = auth.id;
        }
        else{
          this.userId = null;
        }
      })
    }

  ngOnInit() {
    this.refreshLobby();
  }

  isMember():boolean{
    return this.lobby.members.find(m => m._userId == this.userId) != null;
  }

  public leave():void{
    console.log(this.lobby)
    this.lobbyService.leaveLobby(this.lobby._id).subscribe(() => {
      let index = this.lobby.members.findIndex( m => m._userId == this.userId);
      if(index !== -1){
        this.lobby.members.splice(index, 1)
      }
    });
  }
  public join():void{
    console.log(this.lobby)
    this.lobbyService.joinLobby(this.lobby._id).subscribe(() => {
      this.refreshLobby();
    });
  }
  
  private refreshLobby(){
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
        }),
        map(lobby => {
          let toAdd = lobby.size-lobby.members.length;
          for(let i=0;i<toAdd;++i){
            lobby.members.push({
              _userId : -1
            });
          }
          return lobby;
        })
    ).subscribe(lobby => {
      this.lobby = lobby;
    })
  }
}
