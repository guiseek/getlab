import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from './confirm-dialog.decorator';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'getlab-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent<T = unknown> {
  constructor(
    readonly ref: MatDialogRef<ConfirmDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) readonly data: ConfirmDialogData
  ) {}
}
