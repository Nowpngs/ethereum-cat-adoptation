import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketListsComponent } from './market-lists/market-lists.component';

const routes: Routes = [
  {
    path: '',
    component: MarketListsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {}
