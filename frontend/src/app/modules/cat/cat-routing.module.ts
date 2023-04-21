import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatListsComponent } from './cat-lists/cat-lists/cat-lists.component';
import { CatDetailsComponent } from './cat-details/cat-details/cat-details.component';

const routes: Routes = [
  {
    path: '',
    component: CatListsComponent,
  },
  {
    path: 'cat-details/:id',
    component: CatDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatRoutingModule { }
