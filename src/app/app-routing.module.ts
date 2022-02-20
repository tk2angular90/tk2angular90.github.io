import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '@aut/pages/home/home.component';
import {GetDataComponent} from '@aut/pages/get-data/get-data.component';
import {UseParameterComponent} from '@aut/pages/use-parameter/use-parameter.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'get-data',
    component: GetDataComponent,
  },
  {
    path: 'use-parameter/:id',
    component: UseParameterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
