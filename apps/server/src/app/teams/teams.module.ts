import { Module } from '@nestjs/common';
import { TeamsServiceImpl } from './infrastructure/teams.service.impl';
import { TeamsService } from './infrastructure/teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schemas/team.schema';
import { getModelToken } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Team.name, schema: TeamSchema }],
      'getlab'
    ),
  ],
  controllers: [TeamsController],
  providers: [
    {
      provide: TeamsService,
      useFactory: (model) => {
        return new TeamsServiceImpl(model);
      },
      inject: [getModelToken(Team.name, 'getlab')],
    },
  ],
})
export class TeamsModule {}
