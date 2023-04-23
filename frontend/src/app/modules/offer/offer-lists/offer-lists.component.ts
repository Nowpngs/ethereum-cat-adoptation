import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MarketTab } from 'src/app/models/market.models';
import { Offer } from 'src/app/models/offer.models';
import { NotificationService } from 'src/app/services/notification.service';
import { OfferService } from 'src/app/services/offer.service';
import { CreateEditOfferModalComponent } from 'src/app/standalone/create-edit-offer-modal/create-edit-offer-modal.component';

@Component({
  selector: 'app-offer-lists',
  templateUrl: './offer-lists.component.html',
  styleUrls: ['./offer-lists.component.scss'],
})
export class OfferListsComponent implements OnInit {
  selectedTab: MarketTab = MarketTab.BUY;
  buyingOffers: Offer[] = [];

  constructor(
    private dialog: MatDialog,
    private offerService: OfferService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getMyBuyingOffers();
  }

  isSelectedTab(tab: MarketTab): boolean {
    return this.selectedTab === tab;
  }

  changeTab(tab: MarketTab): void {
    this.selectedTab = tab;
  }

  openEditOffer(offer: Offer): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      catId: offer.catId,
      catName: offer.catName,
      price: offer.price,
      id: offer.id,
      catBreed: offer.catBreed,
    };

    const dialogRef = this.dialog.open(
      CreateEditOfferModalComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.getMyBuyingOffers();
    });
  }

  getMyBuyingOffers(): void {
    this.offerService.getMyBuyingOffers().subscribe({
      next: (data) => {
        this.buyingOffers = data;
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Fetch Error');
      },
    });
  }
}
