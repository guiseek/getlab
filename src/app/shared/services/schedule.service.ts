import {StorageService} from './storage.service'
import {Schedule} from '../interfaces'
import {BehaviorSubject} from 'rxjs'

export class ScheduleService extends StorageService<Schedule> {
  #data = new BehaviorSubject<Schedule[]>([])
  data$ = this.#data.asObservable()

  constructor(storage: Storage) {
    super(storage, 'schedule')
  }

  load() {
    this.#data.next(this.read())
  }

  findById(id: string) {
    return this.read().find((schedule) => schedule.id === id)
  }

  add(...schedule: Schedule[]) {
    this.write(
      ...schedule.map((schedule) => {
        return {...schedule, id: crypto.randomUUID()}
      })
    )
    this.#data.next(this.read())
  }
}
