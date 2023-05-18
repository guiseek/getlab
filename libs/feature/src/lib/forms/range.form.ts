import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypedForm, DateRange } from '@getlab/util-core';

export class RangeForm extends FormGroup<TypedForm<DateRange>> {
  constructor() {
    super({
      dtstart: new FormControl(null, Validators.required),
      until: new FormControl(null, Validators.required),
    });
  }
}
