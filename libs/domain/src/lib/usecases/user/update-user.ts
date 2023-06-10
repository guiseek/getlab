import { UserRepository } from '../../repository/user';
import { UseCase } from '../../base/use-case';
import { UpdateUserDto } from '../../dtos';
import { User } from '../../entities';

export class UpdateUserUseCase implements UseCase<UpdateUserDto, User> {
  constructor(private readonly repository: UserRepository) {}

  async execute(input: UpdateUserDto) {
    try {
      const user = await this.repository.findOne(input.id);
      return this.repository.updateOne(input.id, { ...user, ...input });
    } catch (err) {
      throw `Não foi possível alterar a turma ${input.id}`;
    }
  }
}
