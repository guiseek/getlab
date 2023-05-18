import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Time, TypedForm } from '@getlab/util-core';

export class TimeForm extends FormGroup<TypedForm<Time>> {
  constructor() {
    super({
      start: new FormControl(null, [Validators.required]),
      end: new FormControl(null, [Validators.required]),
    });
  }
}
