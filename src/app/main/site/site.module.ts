import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';

import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule
  ],
  declarations: [AboutComponent, MainComponent]
})
export class SiteModule { }