import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainRoutingModule } from './main-routing.module';

import { ComponentsModule } from '@components/components.module';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    ComponentsModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    MainComponent, AboutComponent, NavBarComponent, SigninComponent
  ]
})
export class MainModule { }
