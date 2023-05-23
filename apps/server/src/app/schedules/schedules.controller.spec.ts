import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { getModelToken } from '@nestjs/mongoose';
import { Schedule } from './schemas/schedule.schema';
import { scheduleModel } from './schedules.service.spec';

describe('SchedulesController', () => {
  let controller: SchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        SchedulesService,
        {
          provide: getModelToken(Schedule.name),
          useValue: scheduleModel,
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
