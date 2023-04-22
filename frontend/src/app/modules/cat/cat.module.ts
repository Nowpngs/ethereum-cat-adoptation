import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CatRoutingModule } from './cat-routing.module';
import { CatListsComponent } from './cat-lists/cat-lists.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CatListsComponent],
  imports: [
    CommonModule,
    CatRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class CatModule {}
