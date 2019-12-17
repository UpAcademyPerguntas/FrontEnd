import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { CreateConferenceComponent } from './create-conference/create-conference.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '',
  component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'conferences', component: ConferencesComponent
  },
  {
    path: 'create-conferences', component: CreateConferenceComponent
  },
  {     // otherwise redirect to home
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
