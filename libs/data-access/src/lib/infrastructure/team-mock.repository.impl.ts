import { Team, TeamRepository } from '@getlab/domain';
import { MockRepository } from './mock.repository';

export class TeamMockRepositoryImpl
  extends MockRepository<Team, 'id'>
  implements TeamRepository
{
  override createOne(input: Team) {
    return super.createOne(input);
  }

  override updateOne(id: string, input: Team) {
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
