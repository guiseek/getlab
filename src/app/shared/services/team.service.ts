import {StorageService} from './storage.service'
import {Team} from '../interfaces/team'

export class TeamService extends StorageService<Team> {
  constructor(storage: Storage) {
    super(storage, 'team')
  }

  findAll() {
    return Promise.resolve(this.read())
  }

  findById(id: string) {
    const team = this.read().find((team) => team.id === id)
    if (!team) Promise.reject(`Time ${id} não encontrado`)
    return Promise.resolve(team)
  }

  add(...team: Team[]) {
    this.write(
      ...team.map((team) => {
        return {...team, id: crypto.randomUUID()}
      })
    )
  }
}
