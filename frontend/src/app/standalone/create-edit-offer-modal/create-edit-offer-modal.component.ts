import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer.models';
import { MatInputModule } from '@angular/material/input';
import { OfferService } from 'src/app/services/offer.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-edit-offer-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-edit-offer-modal.component.html',
  styleUrls: ['./create-edit-offer-modal.component.scss'],
})
export class CreateEditOfferModalComponent implements OnInit {
  offerCreateEdit!: Offer;

  constructor(
    private offerService: OfferService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateEditOfferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Offer
  ) {}

  ngOnInit(): void {
    this.offerCreateEdit = this.data;
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  submit(): void {
    !this.offerCreateEdit.id ? this.createOffer() : this.editOffer();
  }

  createOffer(): void {
    const data = {
      catId: this.offerCreateEdit.catId,
      price: this.offerCreateEdit.price,
    };
    this.offerService.createOffer(data).subscribe({
      next: () => {
        this.dialogRef.close('success');
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Create Offer Error');
      },
    });
  }

  editOffer(): void {}
}
