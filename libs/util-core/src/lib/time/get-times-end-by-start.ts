import {TimeEnd, TimeStart} from '../types'

export const getTimesEndByStart = (start: TimeStart): TimeEnd[] => {
  switch (start) {
    case '8h':
      return ['8h:50m', '9h:40m']
    case '8h:50m':
      return ['9h:40m']
    case '10h':
      return ['10h:50m', '11h:30m']
    case '10h:50m':
      return ['11h:30m']
    case '19h':
      return ['19h:50m', '20h:40m']
    case '19h:50m':
      return ['20h:40m']
    case '21h':
      return ['21h:50m', '22h:30m']
    case '21h:50m':
      return ['22h:30m']
  }
}
