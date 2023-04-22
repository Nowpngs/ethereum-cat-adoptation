import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferListsComponent } from './offer-lists/offer-lists.component';


@NgModule({
  declarations: [
    OfferListsComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule
  ]
})
export class OfferModule { }
