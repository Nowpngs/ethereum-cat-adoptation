import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { MarketListsComponent } from './market-lists/market-lists.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MarketListsComponent],
  imports: [
    CommonModule,
    MarketRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class MarketModule {}
