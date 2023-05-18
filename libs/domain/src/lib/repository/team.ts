import {
  FindAll,
  FindOne,
  CreateOne,
  RemoveOne,
  UpdateOne,
} from '../base/repository';
import { Team } from '../entities/team';

export abstract class TeamRepository
  implements
    CreateOne<Team, Team>,
    UpdateOne<Team, 'id', Team>,
    RemoveOne<Team, 'id', void>,
    FindOne<Team, 'id', Team>,
    FindAll<Team>
{
  abstract createOne(input: Team): Promise<Team>;
  abstract updateOne(id: string, input: Team): Promise<Team>;
  abstract removeOne(id: string): Promise<void>;
  abstract findOne(id: string): Promise<Team>;
  abstract findAll(): Promise<Team[]>;
}
