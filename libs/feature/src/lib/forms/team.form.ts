import { CreateTeamDto, Team, UpdateTeamDto } from '@getlab/data-access';
import { FormControl, Validators } from '@angular/forms';
import { EntityForm } from '../containers/base';

export class TeamForm extends EntityForm<Team, CreateTeamDto, UpdateTeamDto> {
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

  init() {
    this.patchValue({ people: 0, goal: 'Desenvolvimento de Software' });
  }
}
