import { Component } from '@angular/core';
import { MarketTab } from 'src/app/models/market.models';

@Component({
  selector: 'app-market-lists',
  templateUrl: './market-lists.component.html',
  styleUrls: ['./market-lists.component.scss'],
})
export class MarketListsComponent {
  sekectedTab: MarketTab = MarketTab.SELL;

  constructor() {}

  isSelectedTab(tab: MarketTab) {
    return this.sekectedTab === tab;
  }

  changeTab(tab: MarketTab) {
    this.sekectedTab = tab;
  }
}
