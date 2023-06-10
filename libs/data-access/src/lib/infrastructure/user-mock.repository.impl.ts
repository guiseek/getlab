import { User, UserRepository } from '@getlab/domain';
import { MockRepository } from './mock.repository';

export class UserMockRepositoryImpl
  extends MockRepository<User, 'id'>
  implements UserRepository
{
  override createOne(input: User) {
    return super.createOne(input);
  }

  override updateOne(id: string, input: User) {
    return super.updateOne(id, input, 'id');
  }

  override removeOne(id: string) {
    return super.removeOne(id, 'id');
  }

  override findOne(id: string) {
    return super.findOne(id, 'id');
  }

  override findAll() {
    return super.findAll();
  }
}
