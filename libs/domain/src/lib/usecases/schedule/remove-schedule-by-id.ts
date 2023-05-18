import { ScheduleRepository } from '../../repository/schedule';
import { UseCase } from '../../base/use-case';

export class RemoveScheduleByIdUseCase implements UseCase<string, void> {
  constructor(private readonly repository: ScheduleRepository) {}

  execute(id: string) {
    return this.repository.removeOne(id);
  }
}
