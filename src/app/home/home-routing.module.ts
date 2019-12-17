import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ConferencesComponent } from './manager/conferences/conferences.component';
import { CreateConferenceComponent } from './manager/create-conference/create-conference.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';



const routes: Routes = [
    { 
    path: '',
    component: HomeComponent,
    children: [
        {
            path: 'admin',
            loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
            /* component: AdminComponent */
        },
        {
            path: 'manager', 
            loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
            /* component: ManagerComponent */
        },
        {     // otherwise redirect to manager
            path: '', 
            redirectTo: 'manager',
            pathMatch: 'full'
        },   
    ]},
  
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }