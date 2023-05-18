import { TeamRepository } from '../../repository/team';
import { UseCase } from '../../base/use-case';

export class RemoveTeamByIdUseCase implements UseCase<string, void> {
  constructor(private readonly repository: TeamRepository) {}

  execute(id: string) {
    return this.repository.removeOne(id);
  }
}
