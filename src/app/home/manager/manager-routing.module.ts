import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { CreateConferenceComponent } from './create-conference/create-conference.component';

const routes: Routes = [
    {
    path: '',
    component: ManagerComponent,
    children: [
        {
            path: 'conferences',
            component: ConferencesComponent
        },
        {
            path: 'create-conferences',
            component: CreateConferenceComponent
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
