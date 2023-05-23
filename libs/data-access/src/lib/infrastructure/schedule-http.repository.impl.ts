import { Schedule, ScheduleRepository } from '@getlab/domain';
import { fromMongo } from '../mappers';

const headers = new Headers({
  'Content-Type': 'application/json',
});

export class ScheduleHttpRepositoryImpl implements ScheduleRepository {
  async createOne(input: Schedule): Promise<Schedule> {
    const body = JSON.stringify(input);
    const options = { headers, method: 'POST', body };
    const req = fetch(`/api/schedules`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async updateOne(id: string, input: Schedule): Promise<Schedule> {
    const body = JSON.stringify(input);
    const options = { headers, method: 'PUT', body };
    const req = fetch(`/api/schedules/${id}`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async removeOne(id: string): Promise<void> {
    const options = { headers, method: 'DELETE' };
    const req = fetch(`/api/schedules/${id}`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async filterBy<K extends keyof Schedule>(
    prop: K,
    ...values: Schedule[K][]
  ): Promise<Schedule[]> {
    const params = new URLSearchParams();
    params.set(prop, values.join(','));
    const req = fetch(`/api/schedules/filter?${params.toString()}`);
    return req.then((res) =>
      res.json().then((schedules) => schedules.map(fromMongo))
    );
  }

  async findOne(id: string): Promise<Schedule> {
    const req = fetch(`/api/schedules/${id}`);
    return req.then((res) => res.json().then(fromMongo));
  }

  async findAll(): Promise<Schedule[]> {
    const req = fetch(`/api/schedules`);
    return req.then((res) =>
      res.json().then((schedules) => schedules.map(fromMongo))
    );
  }
}
