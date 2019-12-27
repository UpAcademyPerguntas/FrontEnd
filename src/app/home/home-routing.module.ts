import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ConferencesComponent } from './manager/conferences/conferences.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminGuard } from '../core/guard/admin.guard';
import { ManagerGuard } from '../core/guard/manager.guard';



const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
    children: [
        {
            path: 'admin',
            //loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
             component: AdminComponent,
             canActivate: [AdminGuard]
        },
        {
            path: 'manager',
            loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule),
            /* component: ManagerComponent */
            canActivate: [ManagerGuard]
        },
        {     // otherwise redirect to manager
            path: '',
            redirectTo: 'manager',
            pathMatch: 'full'
        },
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
