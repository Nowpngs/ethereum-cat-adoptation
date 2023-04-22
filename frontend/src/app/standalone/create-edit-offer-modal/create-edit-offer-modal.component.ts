import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create-edit-offer-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, MatFormFieldModule],
  templateUrl: './create-edit-offer-modal.component.html',
  styleUrls: ['./create-edit-offer-modal.component.scss'],
})
export class CreateEditOfferModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateEditOfferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
