import { Team, TeamRepository } from '@getlab/domain';
import { StorageRepository } from './storage.repository';
import { refactorTeam } from '../mappers';

export class TeamStorageRepositoryImpl
  extends StorageRepository<Team>
  implements TeamRepository
{
  createOne(input: Team) {
    const teams = this.read();

    const team = { ...input, id: crypto.randomUUID() };

    teams.push(team);
    this.rewrite(teams);

    return Promise.resolve(team);
  }

  updateOne(id: string, input: Team) {
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
    const team = this.read().find((team) => team.id == id);

    if (!team) throw `Turma ${id} não encontrada`;

    return Promise.resolve(team);
  }

  findAll() {
    let data = this.read();

    const isOutdated = 'team' in (data[0] ?? {});

    data = data.map(refactorTeam);

    if (isOutdated) {
      this.rewrite(data);
    }

    return Promise.resolve(data);
  }

  #findIndex(id: string) {
    return this.read().findIndex((team) => team.id === id);
  }
}
