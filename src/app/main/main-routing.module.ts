import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from '@guards/index';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'}},
  { path: '', component: MainComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: '/home'},
    { path: 'about', component: AboutComponent, data: {animation: 'AboutPage'}},
    { path: 'signin', component: SigninComponent},
    { path: 'play', pathMatch: 'full', redirectTo: '/lobby'},
    { path: 'lobby',
      loadChildren: () => import('./lobby/lobby.module').then(m => m.LobbyModule),
      canActivate: [LoggedGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }