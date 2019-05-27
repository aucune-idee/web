import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [MainComponent, NavBarComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
