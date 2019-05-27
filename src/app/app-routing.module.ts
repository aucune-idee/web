import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from '@guards/index';

const routes: Routes = [
  { path: 'game', loadChildren: './game/game.module#GameModule',
    canActivate: [LoggedGuard]},
  { path: '', loadChildren: './main/main.module#MainModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
