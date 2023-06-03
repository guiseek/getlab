import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Provider } from '@nestjs/common';
import { TeamsServiceImpl } from './teams.service.impl';
import { TeamsService } from './teams.service';
import { Team } from '../schemas/team.schema';

export const teamModel = {
  async save() {
    return {};
  },
  async find(...params: unknown[]) {
    return {
      exec() {
        return [];
      },
    };
  },
  async findOne(...params: unknown[]) {
    return {};
  },
  async findOneAndUpdate(...params: unknown[]) {
    return {};
  },
  async findOneAndRemove(...params: unknown[]) {
    return {};
  },
};

export const providers: Provider[] = [
  {
    provide: getModelToken(Team.name),
    useValue: teamModel,
  },
  {
    provide: TeamsService,
    useFactory: (model) => new TeamsServiceImpl(model),
    inject: [getModelToken(Team.name)],
  },
];

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
