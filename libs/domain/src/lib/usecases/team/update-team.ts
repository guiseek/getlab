import { TeamRepository } from '../../repository/team';
import { UseCase } from '../../base/use-case';
import { UpdateTeamDto } from '../../dtos';
import { Team } from '../../entities';

export class UpdateTeamUseCase implements UseCase<UpdateTeamDto, Team> {
  constructor(private readonly repository: TeamRepository) {}

  async execute(input: UpdateTeamDto) {
    try {
      const team = await this.repository.findOne(input.id);
      return this.repository.updateOne(input.id, { ...team, ...input });
    } catch (err) {
      throw `Não foi possível alterar a turma ${input.id}`;
    }
  }
}
