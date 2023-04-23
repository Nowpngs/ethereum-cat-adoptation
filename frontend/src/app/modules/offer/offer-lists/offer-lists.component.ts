import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MarketTab } from 'src/app/models/market.models';
import { Offer, SellerOffer } from 'src/app/models/offer.models';
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
  sellerOffers: SellerOffer[] = [];
  loading: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private offerService: OfferService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getMyBuyingOffers();
    this.getMySellerOffers();
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
      id: offer.id,
      catBreed: offer.catBreed,
      buyerName: offer.buyerName,
      buyerEmail: offer.buyerEmail,
      buyerPhone: offer.buyerPhone,
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
    this.loading = true;
    this.offerService.getMyBuyingOffers().subscribe({
      next: (data) => {
        this.buyingOffers = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Fetch Error');
        this.loading = false;
      },
    });
  }

  getMySellerOffers(): void {
    this.loading = true;
    this.offerService.geyMySellingOffers().subscribe({
      next: (data) => {
        this.sellerOffers = data;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Fetch Error');
        this.loading = false;
      },
    });
  }

  onConfirm(id: number): void {
    this.offerService.confirmOffer(id).subscribe({
      next: (data) => {
        this.router.navigate(['market']);
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Confirm Error');
      },
    });
  }
}
