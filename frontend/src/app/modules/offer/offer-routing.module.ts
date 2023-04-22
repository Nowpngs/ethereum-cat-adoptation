import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListsComponent } from './offer-lists/offer-lists.component';

const routes: Routes = [
  {
    path: '',
    component: OfferListsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferRoutingModule {}
