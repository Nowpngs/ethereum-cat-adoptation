import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatListsComponent } from './cat-lists/cat-lists.component';

const routes: Routes = [
  {
    path: '',
    component: CatListsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatRoutingModule {}
