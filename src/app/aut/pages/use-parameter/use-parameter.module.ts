import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseParameterComponent } from './use-parameter.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    UseParameterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UseParameterModule { }
