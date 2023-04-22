import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketListsComponent } from './market-lists/market-lists.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MarketListsComponent],
  imports: [CommonModule, MarketRoutingModule, FormsModule, MatButtonModule],
})
export class MarketModule {}
