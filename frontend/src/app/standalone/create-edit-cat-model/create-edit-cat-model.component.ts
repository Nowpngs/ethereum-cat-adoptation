import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Cat, CatPayload } from 'src/app/models/cat.models';
import { CatService } from 'src/app/services/cat.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-edit-cat-model',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-edit-cat-model.component.html',
  styleUrls: ['./create-edit-cat-model.component.scss'],
})
export class CreateEditCatModelComponent implements OnInit {
  catPayload: CatPayload = new CatPayload();
  editCatId: number = 0;

  constructor(
    private catService: CatService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateEditCatModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cat
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.catPayload = new CatPayload(
        this.data.name,
        Number(this.data.age),
        this.data.breed,
        this.data.description
      );
    }
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.catService.addCat(this.catPayload).subscribe({
      next: (data) => {
        this.dialogRef.close();
      },
      error: (error) => {
        this.notificationService.showError(error.message, 'Add Cat Error');
      },
    });
  }
}
