import { ScheduleRepository } from '../../repository/schedule';
import { UpdateScheduleDto } from '../../dtos';
import { UseCase } from '../../base/use-case';
import { Schedule } from '../../entities';

export class UpdateScheduleUseCase
  implements UseCase<UpdateScheduleDto, Schedule>
{
  constructor(private readonly repository: ScheduleRepository) {}

  async execute(input: UpdateScheduleDto) {
    try {
      const schedule = await this.repository.findOne(input.id);
      return this.repository.updateOne(input.id, { ...schedule, ...input });
    } catch (err) {
      throw `Não foi possível alterar o horário de aula ${input.id}`;
    }
  }
}
