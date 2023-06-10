import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserRepository } from '../../repository/user';
import { UseCase } from '../../base/use-case';
import { User } from '../../entities/user';

export class CreateUserUseCase implements UseCase<CreateUserDto, User> {
  constructor(private readonly repository: UserRepository) {}

  execute(input: CreateUserDto) {
    const user = { ...input, id: crypto.randomUUID() };
    return this.repository.createOne(user);
  }
}
