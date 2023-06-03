import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/getlab', {
      connectionName: 'getlab',
    }),
    TeamsModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
