import {DateRange, Preview, Schedule, Time} from '../../shared/interfaces'
import {RRule} from 'rrule'

export class Spreadsheet {
  rows: Preview[]

  constructor(schedules: Schedule[], dateRange: DateRange) {
    this.rows = this.#merge(schedules, dateRange)
  }

  #parse() {}

  #getTime(time: Time) {
    return `${time.start}h as ${time.end}h`
  }

  #merge(schedules: Schedule[], dateRange: DateRange) {
    return schedules
      .map((schedule) => {
        const dates = this.#getDates(this.#getRRuleOptions(schedule, dateRange))
        return dates.map((date) => ({...schedule, date}))
      })
      .reduce((prev = [], curr = []) => [...prev, ...curr], [])
      .map(({team, time, ...schedule}) => {
        return {
          time: this.#getTime(time),
          ...schedule,
          ...team,
        }
      })
      .sort((a, b) => (a.date < b.date ? -1 : 1))
  }

  #getRRuleOptions(
    {byweekday, interval}: Schedule,
    {dtstart, until}: DateRange
  ) {
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
