import { Directive, OnDestroy, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EntityForm } from './entity.form';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Directive()
export abstract class EntityContainer<
  T extends object,
  C = unknown,
  U = unknown
> implements OnDestroy
{
  protected subject = new Subject<void>();

  @ViewChild('resetRef', { static: true })
  resetButton!: MatButton;
  get resetRef() {
    return this.resetButton._elementRef;
  }

  abstract form: EntityForm<T, C, U>;

  constructor(protected readonly router: Router) {}

  onSubmit(path: string) {
    if (this.form.valid) {
      if (this.form.hasId) {
        this.update(this.form.getValue());
      } else {
        this.create(this.form.getValue());
      }
      this.resetRef.nativeElement.click();
      this.form.init();
      const url = ['/', path];
      this.router.navigate(url);
    } else {
      this.form.markAllAsTouched();
    }
  }

  abstract onRemove(entity: T): void;
  abstract create(updateDto: C): void;
  abstract update(updateDto: U): void;

  protected compareFn(e1: T, e2: T) {
    if (e1 && 'id' in e1 && e2 && 'id' in e2) {
      return e1.id === e2.id;
    }
    return false;
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }
}
