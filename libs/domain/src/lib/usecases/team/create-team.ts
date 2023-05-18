import { TeamRepository } from '../../repository/team';
import { UseCase } from '../../base/use-case';
import { Team } from '../../entities/team';

export class CreateTeamUseCase implements UseCase<Team, Team> {
  constructor(private readonly repository: TeamRepository) {}

  execute(input: Team) {
    return this.repository.createOne(input);
  }
}
