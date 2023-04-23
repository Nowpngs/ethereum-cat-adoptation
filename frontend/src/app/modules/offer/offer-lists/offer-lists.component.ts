import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarketTab } from 'src/app/models/market.models';
import { Offer } from 'src/app/models/offer.models';
import { NotificationService } from 'src/app/services/notification.service';
import { OfferService } from 'src/app/services/offer.service';

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

  isSelectedTab(tab: MarketTab) {
    return this.selectedTab === tab;
  }

  changeTab(tab: MarketTab) {
    this.selectedTab = tab;
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
