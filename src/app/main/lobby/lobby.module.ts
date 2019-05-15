import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LobbyRoutingModule } from './lobby-routing.module';

import { ComponentsModule } from '@components/components.module';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent, CreateComponent, ViewComponent],
  imports: [
    LobbyRoutingModule,
    CommonModule, FormsModule, ComponentsModule
  ]
})
export class LobbyModule { }
