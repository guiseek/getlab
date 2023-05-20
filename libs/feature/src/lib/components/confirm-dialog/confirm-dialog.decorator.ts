import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Token, inject } from '@getlab/util-core';

export const CONFIRM_DIALOG = new Token<MatDialog>('confirm.dialog');

export interface ConfirmDialogData<T = object> {
  title: string;
  message: string;
  prop: keyof T;
  value?: T;
}

export function ConfirmDialog<T>(data: ConfirmDialogData<T>) {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...[value]: T[]) {
      data = { ...data, value };
      const dialog = inject(CONFIRM_DIALOG);
      const ref = dialog.open(ConfirmDialogComponent, { data });
      ref.afterClosed().subscribe((result: any) => {
        return result ? original.call(this, value) : null;
      });
    };

    return descriptor;
  };
}
