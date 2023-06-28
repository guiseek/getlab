import { inject, Directive, ViewChild, DestroyRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityForm } from './entity.form';

/**
 * @description
 * Fake directive
 * Class is using Angular features but is not decorated.
 * Please add an explicit Angular decorator.
 *
 * It's just a base abstraction for the schedule and team components
 */
@Directive()
export abstract class EntityContainer<
  T extends object,
  C = unknown,
  U = unknown
> {
  @ViewChild(FormGroupDirective, { static: true })
  private formGroup!: FormGroupDirective;

  protected router = inject(Router);
  protected snackBar = inject(MatSnackBar);
  protected destroyRef = inject(DestroyRef);

  protected label = 'Registro';

  abstract form: EntityForm<T, C, U>;
  abstract onRemove(entity: T): void;
  abstract create(updateDto: C): void;
  abstract update(updateDto: U): void;

  onSubmit(path: string) {
    if (this.form.valid) {
      let message: string;

      if (this.form.hasId) {
        this.update(this.form.getValue());
        message = `${this.label} alterado(a)`;
      } else {
        this.create(this.form.getValue());
        message = `${this.label} cadastrado(a)`;
      }

      message = `${message} com sucesso`;

      this.snackBar.open(message, 'OK', {
        duration: 3000,
      });

      this.formGroup.resetForm();

      this.router.navigate(['/', path]);
    } else {
      this.form.markAllAsTouched();
    }
  }

  protected compareFn(e1: T, e2: T) {
    if (e1 && 'id' in e1 && e2 && 'id' in e2) {
      return e1.id === e2.id;
    }
    return false;
  }
}
