import {
  FindAll,
  FindOne,
  CreateOne,
  RemoveOne,
  UpdateOne,
} from '../base/repository';
import { Schedule } from '../entities';

export abstract class ScheduleRepository
  implements
    CreateOne<Schedule, Schedule>,
    UpdateOne<Schedule, 'id', Schedule>,
    RemoveOne<Schedule, 'id', void>,
    FindOne<Schedule, 'id', Schedule>,
    FindAll<Schedule>
{
  abstract createOne(input: Schedule): Promise<Schedule>;
  abstract updateOne(id: string, input: Schedule): Promise<Schedule>;
  abstract removeOne(id: string): Promise<void>;
  abstract findOne(id: string): Promise<Schedule>;
  abstract findAll(): Promise<Schedule[]>;
}
