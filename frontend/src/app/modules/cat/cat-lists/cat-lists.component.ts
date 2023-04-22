import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openCreateOffer(): void {
    if (!this.coreService.isLogin()) {
      this.router.navigate(['login']);
    }
    const dialogRef = this.dialog.open(CreateEditOfferModalComponent, {});
  }
}
