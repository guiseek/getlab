export interface Preview {
  id: string
  date: Date
  name: string
  time: string
  team: string
  people: number
}

export interface PreviewRow {
  id: string
  name: string
  team: string
  people: number
  goal: string
  date: Date
  byweekday: number
  interval: 1 | 2
  time: string
}
