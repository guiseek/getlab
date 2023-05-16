import {Team} from './team'

export type TimeStart =
  | '8h'
  | '8h:50m'
  | '10h'
  | '10h:50m'
  | '19h'
  | '19h:50m'
  | '21h'
  | '21h:50m'
export type TimeEnd =
  | '8h:50m'
  | '9h:40m'
  | '10h:50m'
  | '11h:30m'
  | '19h:50m'
  | '20h:40m'
  | '21h:50m'
  | '22h:30m'

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
