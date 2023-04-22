import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketListsComponent } from './market-lists/market-lists.component';


@NgModule({
  declarations: [
    MarketListsComponent
  ],
  imports: [
    CommonModule,
    MarketRoutingModule
  ]
})
export class MarketModule { }
