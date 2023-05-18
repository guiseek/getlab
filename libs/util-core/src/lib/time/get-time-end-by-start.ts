import {TimeEnd, TimeStart} from '../types'

export const getTimeEndByStart = (time: TimeStart): TimeEnd | null => {
  switch (time) {
    case '8h:50m':
      return '9h:40m'
    case '10h:50m':
      return '11h:30m'
    case '19h:50m':
      return '20h:40m'
    case '21h:50m':
      return '22h:30m'
    default:
      return null
  }
}
