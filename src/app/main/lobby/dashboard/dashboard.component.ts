import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';

import { Lobby } from '@models/lobby';
import { LobbiesService, GetLobbiesOutput } from '@services/lobbies';

@Component({
  selector: 'app-lobby-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lobbies:Array<Lobby> = [];
  showModal:boolean = false;

  constructor(
    private router:Router,
    public deviceDetector:DeviceDetectorService,
    private lobbiesService:LobbiesService
  ) {
    this.lobbiesService.getLobbies()
      .subscribe((output:GetLobbiesOutput) =>{
        console.log(output);
        this.lobbies = output.lobbies;
      });
  }

  createLobby():void{
    if(this.deviceDetector.isMobile()){
      this.router.navigate(['/lobby/create']);
    }
    else{
      this.showModal = true;
    }
  }

  onLobbyCreated(lobby):void{
    console.log(lobby);
    this.showModal = false;
  }

  ngOnInit() {
  }

}
