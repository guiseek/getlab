import { CreateTeamDto } from '../../dtos/create-team.dto';
import { TeamRepository } from '../../repository/team';
import { UseCase } from '../../base/use-case';
import { Team } from '../../entities/team';

export class CreateTeamUseCase implements UseCase<CreateTeamDto, Team> {
  constructor(private readonly repository: TeamRepository) {}

  execute(input: CreateTeamDto) {
    const team = { ...input, id: crypto.randomUUID() };
    return this.repository.createOne(team);
  }
}
