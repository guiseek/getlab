import { TeamRepository } from '../../repository/team';
import { UseCase } from '../../base/use-case';
import { Team } from '../../entities/team';

export class FindTeamByIdUseCase implements UseCase<string, Team> {
  constructor(private readonly repository: TeamRepository) {}

  execute(id: string) {
    return this.repository.findOne(id);
  }
}
