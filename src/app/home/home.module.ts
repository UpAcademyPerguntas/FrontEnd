import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferencesComponent } from './manager/conferences/conferences.component';
import { ManagerComponent } from './manager/manager.component';
import { HomeComponent } from './home.component';
import { ManagerModule } from './manager/manager.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { AdminComponent } from './admin/admin.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents: [ ModalComponent]
})
export class HomeModule { }
