import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent} from'./questions/questions.component';
 


const routes: Routes = [
  { 
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {     // otherwise redirect to home
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'questions', component: QuestionsComponent
  },


  {     // otherwise redirect to home
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
