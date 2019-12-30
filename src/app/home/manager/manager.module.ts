import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConferencesComponent } from './conferences/conferences.component';
import { ManagerComponent } from './manager.component';
import { AdminComponent } from '../admin/admin.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerQuestionsComponent } from './manager-questions/manager-questions.component';



@NgModule({
  declarations: [
    ManagerComponent,
    ConferencesComponent,
    ManagerQuestionsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  exports: [
    ManagerComponent,
    ConferencesComponent,
  ]
})
export class ManagerModule { }
