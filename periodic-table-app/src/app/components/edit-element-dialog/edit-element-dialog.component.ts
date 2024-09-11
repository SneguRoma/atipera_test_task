import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../../data';

@Component({
  selector: 'app-edit-element-dialog',
  templateUrl: './edit-element-dialog.component.html',
  styleUrl: './edit-element-dialog.component.css',
})
export class EditElementDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditElementDialogComponent>);
  readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA);
  dataCopy!: PeriodicElement;

  constructor() {
    this.dataCopy = { ...this.data };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
