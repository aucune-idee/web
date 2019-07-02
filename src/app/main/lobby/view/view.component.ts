import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, mergeMap, map } from 'rxjs/operators';

import { Lobby } from '@models/lobby';
import { LobbiesService } from '@services/lobbies';
import { UsersService } from '@services/users';
import { Armies } from '@enums/index';
import { SessionService } from '@services/session';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  lobby:Lobby;
  userId:number;
  armies = Armies;
  types = Object.keys(Armies).filter(key => !isNaN(Number(key)));
  currentArmy:string = null;

  constructor(
    private route:ActivatedRoute,
    private lobbyService:LobbiesService,
    private userService:UsersService,
    session:SessionService) {
      session.authState().subscribe(auth => {
        if(auth){
          this.userId = auth.id;
          this.updateCurrentArmy();
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

  public selectArmy(type):void{
    this.currentArmy = type;
    this.lobby.members.find(m => m._userId == this.userId).army = this.currentArmy;
    this.lobbyService.selectArmy({
      lobbyId: this.lobby._id,
      army : type
    }).subscribe(()=>{})
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
      this.updateCurrentArmy();
    })
  }

  private updateCurrentArmy(){
    if(this.userId != null && this.userId != undefined &&
      this.lobby != null && this.lobby != undefined){
        this.currentArmy = this.lobby.members
        .find(m => m._userId == this.userId).army;
      }
  }
}
