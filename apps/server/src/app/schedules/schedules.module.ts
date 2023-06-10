import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { SchedulesService, SchedulesServiceImpl } from './infrastructure';
import { Schedule, ScheduleSchema } from './schemas/schedule.schema';
import { SchedulesController } from './schedules.controller';
import { Model } from 'mongoose';

/**
 * O método `forFeature()` do módulo Mongoose configura o seu
 * módulo definindo quais *models* devem ser registrados no
 * escopo atual, caso  seja necessário utilizar seu model
 * em outro módulo da aplicação, você precisará adicionar
 * o `MongooseModule` a seção `exports` na configuração
 *
 * No entando, o mais recomendado neste caso é que você
 * adicione o SchedulesService a seção exports e mantenha
 * seus modelos e schemas somente aqui.
 */
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
      useFactory: (model: Model<Schedule>) => {
        return new SchedulesServiceImpl(model);
      },
      inject: [getModelToken(Schedule.name, 'getlab')],
    },
  ],
})
export class SchedulesModule {}
