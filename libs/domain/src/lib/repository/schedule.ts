import {
  FindAll,
  FindOne,
  CreateOne,
  RemoveOne,
  UpdateOne,
  FilterBy,
} from '../base/repository';
import { Schedule } from '../entities';

export abstract class ScheduleRepository
  implements
    CreateOne<Schedule, Schedule>,
    UpdateOne<Schedule, 'id', Schedule>,
    RemoveOne<Schedule, 'id', void>,
    FindOne<Schedule, 'id', Schedule>,
    FilterBy<Schedule, Schedule>,
    FindAll<Schedule>
{
  abstract createOne(input: Schedule): Promise<Schedule>;
  abstract updateOne(id: string, input: Schedule): Promise<Schedule>;
  abstract removeOne(id: string): Promise<void>;
  abstract findOne(id: string): Promise<Schedule>;
  abstract findAll(): Promise<Schedule[]>;
  abstract filterBy<K extends keyof Schedule>(
    prop: K,
    ...values: Schedule[K][]
  ): Promise<Schedule[]>;
}
