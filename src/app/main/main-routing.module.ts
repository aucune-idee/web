import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: MainComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: '/home'},
    { path: 'about', component: AboutComponent},
    { path: 'signin', component: SigninComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ]
})
export class MainRoutingModule { }