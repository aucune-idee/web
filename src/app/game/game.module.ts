import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { GameRoutingModule } from './game-routing.module';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const socketConfig: SocketIoConfig = {
  url: environment.urls.game[0],
  options: {}
};

@NgModule({
  declarations: [MainComponent, NavBarComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    //SocketIoModule.forRoot(socketConfig),
  ]
})
export class GameModule { }
