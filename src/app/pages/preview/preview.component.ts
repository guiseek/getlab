import {OnInit, Component} from '@angular/core'
import {FormControl} from '@angular/forms'
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

  schedulesControl = new FormControl<Schedule[]>([])

  constructor(readonly scheduleStore: ScheduleStore) {
    this.scheduleStore.load()
  }

  ngOnInit(): void {
    this.schedulesControl.valueChanges.subscribe((values) => {
      if (values) {
        const spreadsheet = new Spreadsheet(values)
        this.#dataSource.next(spreadsheet.rows)
        console.log(spreadsheet)
      }
    })
  }
}
