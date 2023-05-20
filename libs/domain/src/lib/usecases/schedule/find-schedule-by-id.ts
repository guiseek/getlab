import { ScheduleRepository } from '../../repository/schedule';
import { UseCase } from '../../base/use-case';
import { Schedule } from '../../entities';

export class FindScheduleByIdUseCase implements UseCase<string, Schedule> {
  constructor(private readonly repository: ScheduleRepository) {}

  execute(id: string) {
    return this.repository.findOne(id);
  }
}
