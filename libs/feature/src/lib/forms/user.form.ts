import { CreateUserDto, User, UpdateUserDto } from '@getlab/data-access';
import { FormControl, Validators } from '@angular/forms';
import { EntityForm } from '../containers/base';

export class UserForm extends EntityForm<User, CreateUserDto, UpdateUserDto> {
  constructor() {
    super({
      id: new FormControl<string | null>(null),
      name: new FormControl('', Validators.required),
      ref: new FormControl('', Validators.required),
    });
  }

  init() {
    this.patchValue({});
  }
}
