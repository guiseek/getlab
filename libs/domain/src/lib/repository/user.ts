import {
  FindAll,
  FindOne,
  CreateOne,
  RemoveOne,
  UpdateOne,
} from '../base/repository';
import { User } from '../entities/user';

export abstract class UserRepository
  implements
    CreateOne<User, User>,
    UpdateOne<User, 'id', User>,
    RemoveOne<User, 'id', void>,
    FindOne<User, 'id', User>,
    FindAll<User>
{
  abstract createOne(input: User): Promise<User>;
  abstract updateOne(id: string, input: User): Promise<User>;
  abstract removeOne(id: string): Promise<void>;
  abstract findOne(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
}
