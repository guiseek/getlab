import {Team} from '../interfaces'
import {TeamService} from '../services'
import {Store} from './store'

interface TeamState {
  data: Team[]
  team?: Team
}

export class TeamStore extends Store<TeamState> {
  data$ = this.select((state) => state.data)
  team$ = this.select((state) => state.team)

  constructor(private service: TeamService) {
    super({
      data: [],
    })
  }

  loadTeam(id: string) {
    this.service.findById(id).then((team) => {
      this.setState({team})
    })
  }

  load() {
    this.service.findAll().then((data) => {
      this.setState({data})
    })
  }

  add(...team: Team[]) {
    this.service.add(...team)
  }
}
