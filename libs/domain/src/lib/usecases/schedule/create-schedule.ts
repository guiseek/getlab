import { ScheduleRepository } from '../../repository/schedule';
import { UseCase } from '../../base/use-case';
import { Schedule } from '../../entities';

export class CreateScheduleUseCase implements UseCase<Schedule, Schedule> {
  constructor(private readonly repository: ScheduleRepository) {}

  execute(input: Schedule) {
    return this.repository.createOne(input);
  }
}
