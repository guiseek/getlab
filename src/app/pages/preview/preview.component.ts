import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MatDateRangePicker} from '@angular/material/datepicker'
import {Preview, Schedule} from '../../shared/interfaces'
import {ScheduleStore} from '../../shared/store'
import {Spreadsheet} from '../../domain/entities'
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements AfterViewInit {
  @ViewChild('picker', {static: true})
  picker!: MatDateRangePicker<Date>

  #dataSource = new BehaviorSubject<Preview[]>([])
  dataSource$ = this.#dataSource.asObservable()

  readonly spreadsheet = new Spreadsheet()

  displayedColumns = [
    'date',
    'time',
    'team',
    'people',
    'goal',
    // 'remove',
  ]

  previewForm = new FormGroup({
    schedules: new FormControl<Schedule[]>([]),
    dtstart: new FormControl(null, Validators.required),
    until: new FormControl(null, Validators.required),
  })

  get schedules() {
    return this.previewForm.controls.schedules.value
  }

  constructor(readonly scheduleStore: ScheduleStore) {
    this.scheduleStore.load()
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      if (this.picker) {
        this.picker.open()
      }
    })

    this.previewForm.valueChanges.subscribe(({schedules, dtstart, until}) => {
      if (schedules && dtstart && until) {
        this.spreadsheet.build(schedules, {dtstart, until})
        this.#dataSource.next(this.spreadsheet.rows)

        // const spreadsheet = new Spreadsheet(schedules, {dtstart, until})
        // console.log(spreadsheet)
      }
    })
  }
}
