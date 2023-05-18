import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTeamDto, Team, UpdateTeamDto } from '@getlab/data-access';
import { TypedForm } from '@getlab/util-core';

export class TeamForm extends FormGroup<TypedForm<CreateTeamDto | Team>> {
  constructor() {
    super({
      id: new FormControl<string | null>(null),
      name: new FormControl('', Validators.required),
      ref: new FormControl('', Validators.required),
      people: new FormControl(
        0,
        Validators.compose([Validators.required, Validators.min(5)])
      ),
      goal: new FormControl('Desenvolvimento de Software', Validators.required),
    });
  }

  get hasId() {
    return this.get('id')?.value;
  }

  getValue<T extends CreateTeamDto | UpdateTeamDto>() {
    return this.value as T;
  }
}
