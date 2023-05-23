import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { getModelToken } from '@nestjs/mongoose';
import { Team } from './schemas/team.schema';

export const teamModel = {
  async save() {
    return {}
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

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getModelToken(Team.name),
          useValue: teamModel,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
