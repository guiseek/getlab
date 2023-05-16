import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Component, Inject, OnInit} from '@angular/core'
import {Team} from '../../../shared/interfaces'
import {TypedForm} from '../../../shared/types'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamFormComponent implements OnInit {
  teamForm = new FormGroup<TypedForm<Team>>({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required),
    people: new FormControl(
      0,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60),
      ])
    ),
    goal: new FormControl('', Validators.required),
  })

  constructor(
    readonly ref: MatDialogRef<TeamFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    readonly data?: Team
  ) {}

  ngOnInit() {
    if (this.data) {
      this.teamForm.patchValue(this.data)
    }
  }

  onSubmit() {
    if (this.teamForm.valid) {
      this.ref.close(this.teamForm.value)
    } else {
      this.teamForm.markAllAsTouched()
    }
  }
}
