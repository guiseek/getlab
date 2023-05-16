import {StorageService} from './storage.service'
import {Schedule} from '../interfaces'
import {BehaviorSubject} from 'rxjs'

export class ScheduleService extends StorageService<Schedule> {
  #data = new BehaviorSubject<Schedule[]>([])
  data$ = this.#data.asObservable()

  constructor(storage: Storage) {
    super(storage, 'schedule')
  }

  findAll() {
    return Promise.resolve(this.read())
  }

  findById(id: string) {
    const team = this.read().find((team) => team.id === id)
    if (!team) Promise.reject(`Time ${id} não encontrado`)
    return Promise.resolve(team)
  }

  add(...team: Schedule[]) {
    this.write(
      ...team.map((team) => {
        return {...team, id: crypto.randomUUID()}
      })
    )
  }
}
