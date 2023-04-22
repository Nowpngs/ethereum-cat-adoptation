import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cat } from 'src/app/models/cat.models';
import { MarketTab } from 'src/app/models/market.models';
import { CatService } from 'src/app/services/cat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CreateEditCatModelComponent } from 'src/app/standalone/create-edit-cat-model/create-edit-cat-model.component';

@Component({
  selector: 'app-market-lists',
  templateUrl: './market-lists.component.html',
  styleUrls: ['./market-lists.component.scss'],
})
export class MarketListsComponent implements OnInit {
  selectedTab: MarketTab = MarketTab.SELL;
  sellingCatList: Cat[] = [];
  buyingCatList: Cat[] = [];

  constructor(
    private dialog: MatDialog,
    private catServive: CatService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getMyCats();
  }

  isSelectedTab(tab: MarketTab) {
    return this.selectedTab === tab;
  }

  changeTab(tab: MarketTab) {
    this.selectedTab = tab;
  }

  openCreateEditCat(cat?: Cat): void {
    const catData = cat ? cat : {};
    const dislogConfig = new MatDialogConfig();
    dislogConfig.width = '500px';
    dislogConfig.data = catData;
    const dialogRef = this.dialog.open(
      CreateEditCatModelComponent,
      dislogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getMyCats();
    });
  }

  getMyCats(): void {
    this.catServive.getMyCats().subscribe({
      next: (data) => {
        this.sellingCatList = data.filter((cat) => cat.availableForAdoption);
        this.buyingCatList = data.filter((cat) => !cat.availableForAdoption);
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Fetch Error');
      },
    });
  }
}
