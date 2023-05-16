import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {TimeEnd, Time, TimeStart} from '../../../shared/interfaces'
import {MatDialogRef} from '@angular/material/dialog'
import { TeamStore } from '../../../shared/store'
import {TypedForm} from '../../../shared/types'
import {BehaviorSubject} from 'rxjs'

const TIME = {
  START: [
    '8',
    '08:50',
    '10',
    '10:50',
    '19',
    '19:50',
    '21',
    '21:50',
  ] as TimeStart[],
  END: [
    '08:50',
    '09:40',
    '10:50',
    '11:30',
    '19:50',
    '20:40',
    '21:50',
    '22:30',
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
      start: new FormControl('19', [Validators.required]),
      end: new FormControl('20:40', [Validators.required]),
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
      if (start === '08:50') endControl.setValue('09:40')
      if (start === '19:50') endControl.setValue('20:40')
      if (start === '21:50') endControl.setValue('22:30')
      if (start === '10:50') endControl.setValue('11:30')
    })
  }

  getTimeEnds(start: TimeStart): TimeEnd[] {
    switch (start) {
      case '8':
        return ['08:50', '09:40']
      case '08:50':
        return ['09:40']
      case '10':
        return ['10:50', '11:30']
      case '10:50':
        return ['11:30']
      case '19':
        return ['19:50', '20:40']
      case '19:50':
        return ['20:40']
      case '21':
        return ['21:50', '22:30']
      case '21:50':
        return ['22:30']
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
