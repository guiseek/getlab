import { Schedule, ScheduleRepository } from '@getlab/domain';
import { MockRepository } from './mock.repository';

export class ScheduleMockRepositoryImpl
  extends MockRepository<Schedule, 'id'>
  implements ScheduleRepository
{
  override createOne(input: Schedule) {
    return super.createOne(input);
  }

  override updateOne(id: string, input: Schedule) {
    return super.updateOne(id, input, 'id');
  }

  override removeOne(id: string) {
    return super.removeOne(id, 'id');
  }

  override findOne(id: string) {
    return super.findOne(id, 'id');
  }

  override filterBy<P extends keyof Schedule>(prop: P, ...ids: Schedule[P][]) {
    return super.filterBy(prop, ...ids);
  }

  override findAll() {
    return super.findAll();
  }
}
