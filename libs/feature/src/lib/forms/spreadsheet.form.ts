import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuildSpreadsheetDto } from '@getlab/data-access';
import { TypedForm } from '@getlab/util-core';

export class SpreadsheetForm extends FormGroup<TypedForm<BuildSpreadsheetDto>> {
  constructor() {
    super({
      schedules: new FormControl([]),
      dtstart: new FormControl(null, Validators.required),
      until: new FormControl(null, Validators.required),
    });
  }
}
