import {ScheduleService} from './schedule.service'
import {BehaviorSubject} from 'rxjs'
import {Preview} from '../interfaces'

export class PreviewService {
  #data = new BehaviorSubject<Preview[]>([])
  data$ = this.#data.asObservable()

  constructor(private readonly scheduleService: ScheduleService) {}

  load(scheduleId: string) {
    const schedule = this.scheduleService.findById(scheduleId)
		console.log(schedule);
		
  }
}
