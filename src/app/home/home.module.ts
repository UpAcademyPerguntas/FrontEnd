import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferencesComponent } from './manager/conferences/conferences.component';

import { ManagerComponent } from './manager/manager.component';
import { HomeComponent } from './home.component';
import { ManagerModule } from './manager/manager.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
