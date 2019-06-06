import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from '@guards/index';

const routes: Routes = [
  { path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule),
    canActivate: [LoggedGuard]},
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
