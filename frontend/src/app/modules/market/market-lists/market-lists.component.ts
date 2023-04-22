import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarketTab } from 'src/app/models/market.models';
import { CreateEditCatModelComponent } from 'src/app/standalone/create-edit-cat-model/create-edit-cat-model.component';

@Component({
  selector: 'app-market-lists',
  templateUrl: './market-lists.component.html',
  styleUrls: ['./market-lists.component.scss'],
})
export class MarketListsComponent {
  sekectedTab: MarketTab = MarketTab.SELL;

  constructor(private dialog: MatDialog) {}

  isSelectedTab(tab: MarketTab) {
    return this.sekectedTab === tab;
  }

  changeTab(tab: MarketTab) {
    this.sekectedTab = tab;
  }

  openCreateCat(): void {
    const dialogRef = this.dialog.open(CreateEditCatModelComponent, {});
  }
}
