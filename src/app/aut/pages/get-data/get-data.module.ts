import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDataComponent } from './get-data.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    GetDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class GetDataModule { }
