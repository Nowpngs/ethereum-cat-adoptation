import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatRoutingModule } from './cat-routing.module';
import { CatListsComponent } from './cat-lists/cat-lists/cat-lists.component';
import { CatDetailsComponent } from './cat-details/cat-details/cat-details.component';


@NgModule({
  declarations: [
    CatListsComponent,
    CatDetailsComponent
  ],
  imports: [
    CommonModule,
    CatRoutingModule
  ]
})
export class CatModule { }
