import {StorageService} from './storage.service'
import {Team} from '../interfaces/team'
import {BehaviorSubject} from 'rxjs'

export class TeamService extends StorageService<Team> {
  // #data = new BehaviorSubject<Team[]>([])
  // data$ = this.#data.asObservable()

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
    // this.#data.next(this.read())
  }
}
