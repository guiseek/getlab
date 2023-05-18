import { TeamRepository } from '../../repository/team';
import { UseCase } from '../../base/use-case';
import { Team } from '../../entities/team';

export class FindAllTeamsUseCase implements UseCase<void, Team[]> {
  constructor(private readonly repository: TeamRepository) {}

  execute() {
    return this.repository.findAll();
  }
}
