import { User, UserRepository } from '@getlab/domain';
import { fromMongo } from '../mappers';

const headers = new Headers({
  'Content-Type': 'application/json',
});

export class UserHttpRepositoryImpl implements UserRepository {
  async createOne(input: User): Promise<User> {
    const body = JSON.stringify(input);
    const options = { headers, method: 'POST', body };
    const req = fetch(`/api/users`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async updateOne(id: string, input: User): Promise<User> {
    const body = JSON.stringify(input);
    const options = { headers, method: 'PUT', body };
    const req = fetch(`/api/users/${id}`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async removeOne(id: string): Promise<void> {
    const options = { headers, method: 'DELETE' };
    const req = fetch(`/api/users/${id}`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async findOne(id: string): Promise<User> {
    const req = fetch(`/api/users/${id}`);
    return req.then((res) => res.json().then(fromMongo));
  }

  async findAll(): Promise<User[]> {
    const req = fetch(`/api/users`);
    return req.then((res) => res.json().then((users) => users.map(fromMongo)));
  }
}
