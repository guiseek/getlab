import {AfterViewInit, Component, ViewChild} from '@angular/core'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'
import {MatTable} from '@angular/material/table'
import {FormControl} from '@angular/forms'
import {Time, Preview, Schedule} from '../../shared/interfaces'
import {ScheduleService} from '../../shared/services'
import {PreviewDataSource} from './preview-datasource'
import {Frequency, RRule} from 'rrule'

class Spreadsheet {
  // rows: (Schedule & {date: Date})[]
  rows: Preview[]

  constructor(schedules: Schedule[]) {
    this.rows = this.#merge(schedules)
  }

  #parse() {}

  #getTime(time: Time) {
    return `${time.start}h as ${time.end}h`
  }

  #merge(schedules: Schedule[]) {
    return schedules
      .map((schedule) => {
        const dates = this.#getDates(this.#getRRuleOptions(schedule))
        return dates.map((date) => ({...schedule, date}))
      })
      .reduce((prev, curr) => [...prev, ...curr])
      .map(({team, time, ...schedule}) => {
        return {
          time: this.#getTime(time),
          ...schedule,
          ...team,
        }
      })
  }

  #getRRuleOptions({byweekday, interval, dtstart, until}: Schedule) {
    return {
      interval,
      byweekday,
      dtstart: new Date(dtstart),
      until: new Date(until),
    }
  }

  #getDates(options: Omit<Schedule, 'id' | 'team' | 'time'>) {
    return new RRule(options).all()
  }
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatTable) table!: MatTable<Preview>
  dataSource: PreviewDataSource

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name']

  schedulesControl = new FormControl<Schedule[]>([])

  constructor(readonly scheduleService: ScheduleService) {
    this.dataSource = new PreviewDataSource()
    this.scheduleService.load()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.table.dataSource = this.dataSource

    const getTime = (time: Time) => `${time.start}h as ${time.end}h`

    const freq = Frequency.WEEKLY
    this.schedulesControl.valueChanges.subscribe((values) => {
      if (values && values.length) {
        const spreadsheet = new Spreadsheet(values)
        console.log(spreadsheet)

        // values.map((value) => {
        //   const dtstart = value.dtstart
        //   const byweekday = value.byweekday
        //   const until = value.until
        //   const interval = value.interval
        //   const rrule = new RRule({dtstart, byweekday, until, interval, freq})
        //   rrule.all().map((date) => {
        //     const id = crypto.randomUUID()
        //   })
        // })
      }
    })
  }
}
