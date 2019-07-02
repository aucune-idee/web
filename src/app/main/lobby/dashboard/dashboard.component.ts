import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';

import { Lobby } from '@models/lobby';
import { LobbiesService, GetLobbiesOutput } from '@services/lobbies';
import { ModalComponent } from '@components/index';
import { GameType } from '@enums/index';

@Component({
  selector: 'app-lobby-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lobbies:Array<Lobby> = [];
  showModal:boolean = false;
  gameTypes = GameType;

  @ViewChild(ModalComponent, { static: true })
  private modal:ModalComponent;

  constructor(
    private router:Router,
    public deviceDetector:DeviceDetectorService,
    private lobbiesService:LobbiesService
  ) {
    this.lobbiesService.getOwnLobbies()
      .subscribe((output:GetLobbiesOutput) =>{
        this.lobbies = output.lobbies;
      });
  }

  createLobby():void{
    if(this.deviceDetector.isMobile()){
      this.router.navigate(['/lobby/create']);
    }
    else{
      this.modal.show();
    }
  }

  onLobbyCreated(lobby):void{
    this.lobbies.push(lobby);
    this.modal.close();
  }

  ngOnInit() {
  }

}
