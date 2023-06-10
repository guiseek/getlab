import { UserRepository } from '../../repository/user';
import { UseCase } from '../../base/use-case';
import { User } from '../../entities/user';

export class FindUserByIdUseCase implements UseCase<string, User> {
  constructor(private readonly repository: UserRepository) {}

  execute(id: string) {
    return this.repository.findOne(id);
  }
}
