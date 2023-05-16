import {DateRange, PreviewRow, Schedule, Time} from '../../shared/interfaces'
import {
  createFile,
  downloadFile,
  getDatePrefixFile,
} from '../../shared/utilities'
import {RRule} from 'rrule'

export class Spreadsheet {
  rows: PreviewRow[] = []

  build(schedules: Schedule[], dateRange: DateRange) {
    this.rows = this.#merge(schedules, dateRange)
    return this
  }

  download() {
    const spreadsheet = this.#parse(this.rows)
    const blob = createFile(spreadsheet, 'text/csv')

    const prefix = getDatePrefixFile(this.rows[0].date)
    const name = `Solicitação de reserva laboratórios`

    downloadFile(blob, `${prefix} - ${name}.csv`)
  }

  #parse(rows: PreviewRow[]) {
    const parsedRows = rows.map(({date, time, team, people, goal}) => {
      return `${date.toLocaleDateString()},${time},${team},${people},${goal}`
    })
    const headerRow = `Data,Horário (Início e término),Turma,Nº de alunos,Finalidade`
    return [headerRow, parsedRows.join('\n')].join('\n')
  }

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
