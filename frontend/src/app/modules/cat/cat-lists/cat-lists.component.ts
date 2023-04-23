import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IMAGE_NAME, IMAGE_PATH } from 'src/app/constants/image.constants';
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
  image: string[] = [];
  loading: boolean = false;

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
    this.loading = true;
    this.catService.getAvailableCats().subscribe({
      next: (data) => {
        this.catList = data;
        if (data.length) {
          // depand on data length random image and add to the image list
          for (let i = 0; i < data.length; i++) {
            this.image.push(
              IMAGE_PATH +
                IMAGE_NAME[Math.floor(Math.random() * IMAGE_NAME.length)]
            );
          }
        }
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Fetch Cat Error');
        this.loading = false;
      },
    });
  }

  isOwner(owner: string): boolean {
    return owner.toLocaleLowerCase() == this.address.toLocaleLowerCase();
  }

  openCreateOffer(cat: Cat): void {
    if (!this.coreService.isLogin()) {
      this.router.navigate(['login']);
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      catId: cat.id,
      catName: cat.name,
      catBreed: cat.breed,
    };

    const dialogRef = this.dialog.open(
      CreateEditOfferModalComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      result === 'success' && this.router.navigate(['application']);
    });
  }
}
