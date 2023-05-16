import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {TimeEnd, Time, TimeStart} from '../../../shared/interfaces'
import {MatDialogRef} from '@angular/material/dialog'
import {TeamStore} from '../../../shared/store'
import {TypedForm} from '../../../shared/types'
import {BehaviorSubject} from 'rxjs'

const TIME = {
  START: [
    '8h',
    '8h:50m',
    '10h',
    '10h:50m',
    '19h',
    '19h:50m',
    '21h',
    '21h:50m',
  ] as TimeStart[],
  END: [
    '8h:50m',
    '9h:40m',
    '10h:50m',
    '11h:30m',
    '19h:50m',
    '20h:40m',
    '21h:50m',
    '22h:30m',
  ] as TimeEnd[],
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  #timeStart = new BehaviorSubject<TimeStart[]>([])
  timeStart$ = this.#timeStart.asObservable()

  #timeEnd = new BehaviorSubject<TimeEnd[]>([])
  timeEnd$ = this.#timeEnd.asObservable()

  scheduleForm = new FormGroup({
    team: new FormControl(null, Validators.required),
    byweekday: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(6),
    ]),
    // dtstart: new FormControl(null, Validators.required),
    // until: new FormControl(null, Validators.required),
    time: new FormGroup<TypedForm<Time>>({
      start: new FormControl('19h', [Validators.required]),
      end: new FormControl('20h:40m', [Validators.required]),
    }),
    interval: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(2),
    ]),
  })

  daysOfWeek = [0, 1, 2, 3, 4, 5, 6]
  everyWeeks = [1, 2]

  constructor(
    private ref: MatDialogRef<ScheduleComponent>,
    private readonly fb: FormBuilder,
    readonly teamStore: TeamStore
  ) {}

  ngOnInit() {
    this.#timeStart.next(TIME.START)
    this.#timeEnd.next(TIME.END)

    const timeGroup = this.scheduleForm.controls.time
    const startControl = timeGroup.controls.start
    const endControl = timeGroup.controls.end

    startControl.valueChanges.subscribe((start) => {
      if (start) this.#timeEnd.next(this.getTimeEnds(start as TimeStart))
      if (start === '8h:50m') endControl.setValue('9h:40m')
      if (start === '19h:50m') endControl.setValue('20h:40m')
      if (start === '21h:50m') endControl.setValue('22h:30m')
      if (start === '10h:50m') endControl.setValue('11h:30m')
    })
  }

  getTimeEnds(start: TimeStart): TimeEnd[] {
    switch (start) {
      case '8h':
        return ['8h:50m', '9h:40m']
      case '8h:50m':
        return ['9h:40m']
      case '10h':
        return ['10h:50m', '11h:30m']
      case '10h:50m':
        return ['11h:30m']
      case '19h':
        return ['19h:50m', '20h:40m']
      case '19h:50m':
        return ['20h:40m']
      case '21h':
        return ['21h:50m', '22h:30m']
      case '21h:50m':
        return ['22h:30m']
    }
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      this.ref.close(this.scheduleForm.value)
    } else {
      this.scheduleForm.markAllAsTouched()
    }
  }
}
