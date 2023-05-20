import {
  FindAll,
  FindOne,
  CreateOne,
  RemoveOne,
  UpdateOne,
} from '@getlab/domain';
export class MockRepository<T, K extends keyof T>
  implements
    CreateOne<T, T>,
    UpdateOne<T, K, T>,
    RemoveOne<T, K, void>,
    FindOne<T, K, T>,
    FindAll<T>
{
  constructor(protected readonly collection: T[] = []) {}

  findAll() {
    return Promise.resolve(this.collection);
  }

  findOne(id: T[K], prop?: K) {
    const entity = this.collection.find((entity) => {
      return entity[prop!] === id;
    });

    if (!entity) throw `${id} não encontrado`;

    return Promise.resolve(entity);
  }

  createOne(value: Omit<T, K>) {
    const id = this.collection.length + 1;
    const entity = { ...value, id } as T;
    this.collection.push(entity);
    return Promise.resolve(entity);
  }

  filterBy<P extends keyof T>(prop: P, ...values: T[P][]): Promise<T[]> {
    const schedules = this.collection.filter((schedule) =>
      values.includes(schedule[prop])
    );

    return Promise.resolve(schedules);
  }

  updateOne(id: T[K], value: T, prop?: K) {
    const index = this.#findIndex(id, prop!);
    const entity = { ...this.collection[index], ...value };
    this.collection[index] = entity;
    return Promise.resolve(entity);
  }

  removeOne(id: T[K], prop?: K) {
    const index = this.#findIndex(id, prop!);
    this.collection.splice(index, 1);
    return Promise.resolve();
  }

  #findIndex(id: T[K], prop: K) {
    return this.collection.findIndex((entity) => entity[prop] === id);
  }
}
