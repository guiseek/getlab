import { ScheduleRepository } from '../../repository/schedule';
import { UseCase } from '../../base/use-case';
import { Schedule } from '../../entities';

export class FindSchedulesByIdUseCase implements UseCase<string, Schedule[]> {
  constructor(private readonly repository: ScheduleRepository) {}

  execute(...ids: string[]) {
    return this.repository.filterBy('id', ...ids);
  }
}
