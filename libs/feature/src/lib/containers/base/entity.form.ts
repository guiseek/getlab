import { FormGroup } from '@angular/forms';
import { TypedForm } from '@getlab/util-core';

export abstract class EntityForm<T, C = unknown, U = unknown> extends FormGroup<
  TypedForm<T>
> {
  get hasId() {
    return this.get('id')?.value;
  }

  getValue<T extends C | U>() {
    return this.value as T;
  }

  abstract init(): void;
}
