import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LobbyRoutingModule } from './lobby-routing.module';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent, CreateComponent],
  imports: [
    LobbyRoutingModule,
    CommonModule, FormsModule
  ]
})
export class LobbyModule { }
