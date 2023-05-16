import {Schedule} from '../interfaces'
import {ScheduleService} from '../services'
import {Store} from './store'

interface ScheduleState {
  data: Schedule[]
  team?: Schedule
}

export class ScheduleStore extends Store<ScheduleState> {
  data$ = this.select((state) => state.data)
  team$ = this.select((state) => state.team)

  constructor(private service: ScheduleService) {
    super({
      data: [],
    })
  }

  loadSchedule(id: string) {
    this.service.findById(id).then((team) => {
      this.setState({team})
    })
  }

  load() {
    this.service.findAll().then((data) => {
      this.setState({data})
    })
  }

  add(...team: Schedule[]) {
    this.service.add(...team)
    this.load()
  }
}
