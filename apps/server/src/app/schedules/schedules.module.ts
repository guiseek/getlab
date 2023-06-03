import { Module } from '@nestjs/common';
import { SchedulesService } from './infrastructure/schedules.service';
import { SchedulesController } from './schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './schemas/schedule.schema';
import { SchedulesServiceImpl } from './infrastructure/schedules.service.impl';
import { getModelToken } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Schedule.name, schema: ScheduleSchema }],
      'getlab'
    ),
  ],
  controllers: [SchedulesController],
  providers: [
    {
      provide: SchedulesService,
      useFactory: (model) => {
        return new SchedulesServiceImpl(model);
      },
      inject: [getModelToken(Schedule.name, 'getlab')],
    },
  ],
})
export class SchedulesModule {}
