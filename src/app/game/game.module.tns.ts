import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { GameRoutingModule } from './game-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [MainComponent, NavBarComponent],
  imports: [
    GameRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GameModule { }
