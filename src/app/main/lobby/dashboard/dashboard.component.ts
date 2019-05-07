import { Component, OnInit } from '@angular/core';

import { Lobby } from '@models/lobby';
import { LobbiesService, GetLobbiesOutput } from '@services/lobbies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lobbies:Array<Lobby>;

  constructor(
    private lobbiesService:LobbiesService
  ) {
    this.lobbiesService.getLobbies()
      .subscribe((output:GetLobbiesOutput) =>{
        this.lobbies = output.lobbies;
        console.log(this.lobbies);
      });
  }

  ngOnInit() {
  }

}
