import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cat } from 'src/app/models/cat.models';
import { CatService } from 'src/app/services/cat.service';
import { CoreService } from 'src/app/services/core.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CreateEditOfferModalComponent } from 'src/app/standalone/create-edit-offer-modal/create-edit-offer-modal.component';

@Component({
  selector: 'app-cat-lists',
  templateUrl: './cat-lists.component.html',
  styleUrls: ['./cat-lists.component.scss'],
})
export class CatListsComponent implements OnInit {
  catList: Cat[] = [];
  address: string = localStorage.getItem('address') || '';

  constructor(
    private router: Router,
    private coreService: CoreService,
    private catService: CatService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCats();
  }

  getCats(): void {
    this.catService.getAvailableCats().subscribe({
      next: (data) => {
        this.catList = data;
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Fetch Cat Error');
      },
    });
  }

  isOwner(owner: string): boolean {
    return owner.toLocaleLowerCase() == this.address.toLocaleLowerCase();
  }

  openCreateOffer(): void {
    if (!this.coreService.isLogin()) {
      this.router.navigate(['login']);
      return;
    }
    const dialogRef = this.dialog.open(CreateEditOfferModalComponent, {});
  }
}
