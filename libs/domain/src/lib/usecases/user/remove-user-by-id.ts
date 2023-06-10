import { UserRepository } from '../../repository/user';
import { UseCase } from '../../base/use-case';

export class RemoveUserByIdUseCase implements UseCase<string, void> {
  constructor(private readonly repository: UserRepository) {}

  execute(id: string) {
    return this.repository.removeOne(id);
  }
}
