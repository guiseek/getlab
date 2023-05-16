import {RRule} from 'rrule'
import {Preview, Schedule, Time} from '../../shared/interfaces'

export class Spreadsheet {
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
      .reduce((prev = [], curr = []) => [...prev, ...curr], [])
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
