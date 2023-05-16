import {Team} from './team'

export type TimeStart =
  | '08:00'
  | '08:50'
  | '10:00'
  | '10:50'
  | '19:00'
  | '19:50'
  | '21:00'
  | '21:50'
export type TimeEnd =
  | '08:50'
  | '09:40'
  | '10:50'
  | '11:30'
  | '19:50'
  | '20:40'
  | '21:50'
  | '22:30'

export interface Time {
  start: TimeStart
  end: TimeEnd
}

export interface Schedule {
  id: string
  team: Team
  byweekday: number
  // dtstart: Date
  // until: Date
  time: Time
  interval: 1 | 2
}

export interface DateRange {
  dtstart: Date
  until: Date
}
