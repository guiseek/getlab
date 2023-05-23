import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { getModelToken } from '@nestjs/mongoose';
import { Schedule } from './schemas/schedule.schema';

export const scheduleModel = {
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

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: getModelToken(Schedule.name),
          useValue: scheduleModel,
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
