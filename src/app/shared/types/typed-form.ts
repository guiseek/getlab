import {FormControl} from '@angular/forms'

export type TypedForm<T> = {
  [K in keyof T]: T[K] extends TypedForm<T[K]>
    ? FormControl<TypedForm<T[K] | null>>
    : FormControl<T[K] | null>
}
