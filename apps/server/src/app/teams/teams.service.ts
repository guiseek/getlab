import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schemas/team.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

  async create(createTeamDto: CreateTeamDto) {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAll() {
    return this.teamModel.find().exec();
  }

  async findOne(id: string) {
    return this.teamModel.findOne({ id });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamModel.findOneAndUpdate({ id }, updateTeamDto);
  }

  async remove(id: string) {
    return this.teamModel.findOneAndRemove({ id });
  }
}
