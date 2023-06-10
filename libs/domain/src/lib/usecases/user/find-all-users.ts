import { UserRepository } from '../../repository/user';
import { UseCase } from '../../base/use-case';
import { User } from '../../entities/user';

export class FindAllUsersUseCase implements UseCase<void, User[]> {
  constructor(private readonly repository: UserRepository) {}

  execute() {
    return this.repository.findAll();
  }
}
