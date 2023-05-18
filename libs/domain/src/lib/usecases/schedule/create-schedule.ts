import { ScheduleRepository } from '../../repository/schedule';
import { CreateScheduleDto } from '../../dtos';
import { UseCase } from '../../base/use-case';
import { Schedule } from '../../entities';

export class CreateScheduleUseCase
  implements UseCase<CreateScheduleDto, Schedule>
{
  constructor(private readonly repository: ScheduleRepository) {}

  execute(input: CreateScheduleDto) {
    const schedule = { ...input, id: crypto.randomUUID() };
    return this.repository.createOne(schedule);
  }
}
