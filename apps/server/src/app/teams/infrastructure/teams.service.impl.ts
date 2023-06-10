import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { TeamsService } from './teams.service';
import { Team } from '../schemas/team.schema';
import { Model } from 'mongoose';

export class TeamsServiceImpl implements TeamsService {
  constructor(private teamModel: Model<Team>) {}

  async create(createTeamDto: CreateTeamDto) {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAll() {
    return this.teamModel.find().exec();
  }

  async findOne(id: string) {
    return this.teamModel.findById(id);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamModel.findOneAndUpdate({ id }, updateTeamDto);
  }

  async remove(id: string) {
    return this.teamModel.findOneAndRemove({ id });
  }
}
