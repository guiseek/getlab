import {OnInit, Component} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Preview, Schedule} from '../../shared/interfaces'
import {ScheduleStore} from '../../shared/store'
import {Spreadsheet} from '../../domain/entities'
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  #dataSource = new BehaviorSubject<Preview[]>([])
  dataSource$ = this.#dataSource.asObservable()

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

  ngOnInit(): void {
    this.previewForm.valueChanges.subscribe(({schedules, dtstart, until}) => {
      if (schedules && dtstart && until) {
        const spreadsheet = new Spreadsheet(schedules, {dtstart, until})
        this.#dataSource.next(spreadsheet.rows)
        console.log(spreadsheet)
      }
    })
  }
}
