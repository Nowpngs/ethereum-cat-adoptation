import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CatService } from 'src/app/services/cat.service';
import { CoreService } from 'src/app/services/core.service';
import { CreateEditOfferModalComponent } from 'src/app/standalone/create-edit-offer-modal/create-edit-offer-modal.component';

@Component({
  selector: 'app-cat-lists',
  templateUrl: './cat-lists.component.html',
  styleUrls: ['./cat-lists.component.scss'],
})
export class CatListsComponent implements OnInit {
  constructor(
    private router: Router,
    private coreService: CoreService,
    private catService: CatService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCats();
  }

  getCats(): void {
    this.catService.getAvailableCats().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openCreateOffer(): void {
    if (!this.coreService.isLogin()) {
      this.router.navigate(['login']);
      return;
    }
    const dialogRef = this.dialog.open(CreateEditOfferModalComponent, {});
  }
}
