import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    { path: 'dashboard', component: DashboardComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class LobbyRoutingModule { }