import { Schedule, ScheduleRepository } from '@getlab/domain';
import { StorageRepository } from './storage.repository';
import { refactorSchedule } from '../mappers';

export class ScheduleStorageRepositoryImpl
  extends StorageRepository<Schedule>
  implements ScheduleRepository
{
  createOne(input: Schedule) {
    const schedules = this.read();
    const schedule = { ...input, id: crypto.randomUUID() };

    schedules.push(schedule);
    this.rewrite(schedules);

    return Promise.resolve(schedule);
  }

  updateOne(id: string, input: Schedule) {
    const data = this.read();

    const index = this.#findIndex(id);
    data[index] = input;
    this.rewrite(data);

    return Promise.resolve(input);
  }

  removeOne(id: string) {
    const data = this.read();

    const index = this.#findIndex(id);
    data.splice(index, 1);

    return Promise.resolve(this.rewrite(data));
  }

  findOne(id: string) {
    const schedule = this.read().find((schedule) => schedule.id == id);

    if (!schedule) throw `Reserva ${id} não encontrada`;

    return Promise.resolve(schedule);
  }

  filterBy<P extends keyof Schedule>(
    prop: P,
    ...values: Schedule[P][]
  ): Promise<Schedule[]> {
    const schedules = this.read().filter((schedule) =>
      values.includes(schedule[prop])
    );
    return Promise.resolve(schedules);
  }

  findAll() {
    let data = this.read();

    const isOutdated = 'time' in (data[0] ?? {});
    // const isOutdated = 'time' in (data[0] ?? Object); 

    data = data.map(refactorSchedule);

    if (isOutdated) {
      this.rewrite(data);
    }

    return Promise.resolve(data);
  }

  #findIndex(id: string) {
    return this.read().findIndex((schedule) => schedule.id === id);
  }
}
