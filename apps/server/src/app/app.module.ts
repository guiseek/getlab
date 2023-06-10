import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from './teams/teams.module';
import { SchedulesModule } from './schedules/schedules.module';
import { UsersModule } from './users/users.module';

/**
 * O método `forRoot()` aceita o mesmo objeto de configuração
 * do método `mongoose.connect()` do pacote Mongoose.
 *
 * Conforme descrito [aqui](https://mongoosejs.com/docs/connections.html)
 */
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/getlab', {
      connectionName: 'getlab',
    }),
    UsersModule,
    TeamsModule,
    SchedulesModule,
  ]
})
export class AppModule {}
