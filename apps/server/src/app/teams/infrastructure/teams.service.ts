import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { Team } from '../schemas/team.schema';

export abstract class TeamsService {
  abstract create(createTeamDto: CreateTeamDto): Promise<Team>;

  abstract findAll(): Promise<Team[]>;

  abstract findOne(id: string): Promise<Team>;

  abstract update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;

  abstract remove(id: string): Promise<Team>;
}
