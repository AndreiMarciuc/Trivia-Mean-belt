import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AddquestionComponent } from './addquestion/addquestion.component'
import { PlaygameComponent } from './playgame/playgame.component';
import { SearchresComponent } from './searchres/searchres.component'


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'newquestion',
    pathMatch: 'full',
    component: AddquestionComponent
  },
  {
    path: 'play',
    pathMatch: 'full',
    component: PlaygameComponent
  },
  {
    path: 'search',
    pathMatch: 'full',
     component: SearchresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
