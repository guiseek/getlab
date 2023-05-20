import {
  TIMES,
  TimeEnd,
  TimeStart,
  getTimeEndByStart,
} from '@getlab/util-core';
import {
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto,
} from '@getlab/data-access';
import { FormControl, Validators } from '@angular/forms';
import { EntityForm } from '../containers/base';
import { BehaviorSubject } from 'rxjs';

export class ScheduleForm extends EntityForm<
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto
> {
  #timeStart = new BehaviorSubject<TimeStart[]>([]);
  timeStart$ = this.#timeStart.asObservable();

  #timeEnd = new BehaviorSubject<TimeEnd[]>([]);
  timeEnd$ = this.#timeEnd.asObservable();

  daysOfWeek = [0, 1, 2, 3, 4, 5];

  constructor() {
    super({
      id: new FormControl(),
      team: new FormControl(null, Validators.required),
      byweekday: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
      ]),
      interval: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(2),
      ]),
      timeStart: new FormControl(null, [Validators.required]),
      timeEnd: new FormControl(null, [Validators.required]),
    });
  }

  init() {
    this.patchValue({ interval: 1 });
  }

  onInit() {
    this.#timeStart.next(TIMES.start);
    this.#timeEnd.next(TIMES.end);

    this.controls.timeStart;
    this.controls.timeStart.valueChanges.subscribe((start) => {
      if (start) {
        const endTime = getTimeEndByStart(start);
        if (endTime) {
          this.controls.timeEnd.setValue(endTime);
        }
      }
    });
  }
}
