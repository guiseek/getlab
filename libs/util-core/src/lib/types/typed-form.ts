import { FormControl } from '@angular/forms';

export type TypedForm<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
