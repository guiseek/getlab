import { Team, TeamRepository } from '@getlab/domain';
import { fromMongo } from '../mappers';

const headers = new Headers({
  'Content-Type': 'application/json',
});

export class TeamHttpRepositoryImpl implements TeamRepository {
  async createOne(input: Team): Promise<Team> {
    const body = JSON.stringify(input);
    const options = { headers, method: 'POST', body };
    const req = fetch(`/api/teams`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async updateOne(id: string, input: Team): Promise<Team> {
    const body = JSON.stringify(input);
    const options = { headers, method: 'PUT', body };
    const req = fetch(`/api/teams/${id}`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async removeOne(id: string): Promise<void> {
    const options = { headers, method: 'DELETE' };
    const req = fetch(`/api/teams/${id}`, options);
    return req.then((res) => res.json().then(fromMongo));
  }

  async findOne(id: string): Promise<Team> {
    const req = fetch(`/api/teams/${id}`);
    return req.then((res) => res.json().then(fromMongo));
  }

  async findAll(): Promise<Team[]> {
    const req = fetch(`/api/teams`);
    return req.then((res) => res.json().then((teams) => teams.map(fromMongo)));
  }
}
