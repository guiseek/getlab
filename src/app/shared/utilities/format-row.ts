import {PreviewRow} from '../interfaces'

const months = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

export const formatRow = (row: PreviewRow) => {
  const date = `${row.date.getDate()}/${months[row.date.getMonth()]}.		`
  return date + `${row.time}		` + `${row.team}		` + `${row.people}	` + row.goal
}
