import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { OfferModal } from 'src/app/models/offer.models';
import { MatInputModule } from '@angular/material/input';

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
  offerCreateEdit!: OfferModal;

  constructor(
    public dialogRef: MatDialogRef<CreateEditOfferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OfferModal
  ) {}

  ngOnInit(): void {
    this.offerCreateEdit = this.data;
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close('success');
  }
}
