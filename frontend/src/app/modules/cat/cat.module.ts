import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CatRoutingModule } from './cat-routing.module';
import { CatListsComponent } from './cat-lists/cat-lists.component';
import { CatDetailsComponent } from './cat-details/cat-details.component';

@NgModule({
  declarations: [CatListsComponent, CatDetailsComponent],
  imports: [CommonModule, CatRoutingModule, MatCardModule],
})
export class CatModule {}
