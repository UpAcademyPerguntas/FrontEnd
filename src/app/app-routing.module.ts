import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { CreateConferenceComponent } from './create-conference/create-conference.component';


const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'conferences', component: ConferencesComponent
  },
  {
    path: 'create-conferences', component: CreateConferenceComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
