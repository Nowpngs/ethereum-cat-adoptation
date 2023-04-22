import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  sekectedTab: MarketTab = MarketTab.SELL;

  constructor(
    private dialog: MatDialog,
    private catServive: CatService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getMyCats();
  }

  isSelectedTab(tab: MarketTab) {
    return this.sekectedTab === tab;
  }

  changeTab(tab: MarketTab) {
    this.sekectedTab = tab;
  }

  openCreateCat(): void {
    const dialogRef = this.dialog.open(CreateEditCatModelComponent, {});
  }

  getMyCats(): void {
    this.catServive.getMyCats().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Fetch Error');
      },
    });
  }
}
