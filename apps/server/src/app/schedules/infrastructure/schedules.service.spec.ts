import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Provider } from '@nestjs/common';
import { SchedulesServiceImpl } from './schedules.service.impl';
import { SchedulesService } from './schedules.service';
import { Schedule } from '../schemas/schedule.schema';

export const scheduleModel = {
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
    provide: getModelToken(Schedule.name),
    useValue: scheduleModel,
  },
  {
    provide: SchedulesService,
    useFactory: (model) => new SchedulesServiceImpl(model),
    inject: [getModelToken(Schedule.name)],
  },
];

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
