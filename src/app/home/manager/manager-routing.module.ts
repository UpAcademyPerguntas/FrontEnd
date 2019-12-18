import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ConferencesComponent } from './conferences/conferences.component';

const routes: Routes = [
    {
    path: '',
    component: ManagerComponent,
    children: [
        {
            path: 'conferences',
            component: ConferencesComponent
        },
        {     // otherwise redirect to manager
            path: '',
            redirectTo: 'conferences',
            pathMatch: 'full'
        },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
