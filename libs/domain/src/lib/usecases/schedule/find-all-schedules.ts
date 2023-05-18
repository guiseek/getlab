import { ScheduleRepository } from '../../repository/schedule';
import { UseCase } from '../../base/use-case';
import { Schedule } from '../../entities';

export class FindAllSchedulesUseCase implements UseCase<void, Schedule[]> {
  constructor(private readonly repository: ScheduleRepository) {}

  execute() {
    return this.repository.findAll();
  }
}
