import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { TeamsService, TeamsServiceImpl } from './infrastructure';
import { Team, TeamSchema } from './schemas/team.schema';
import { TeamsController } from './teams.controller';
import { Model } from 'mongoose';

/**
 * O método `forFeature()` do módulo Mongoose configura o seu
 * módulo definindo quais models devem ser registrados no
 * escopo atual, caso  seja necessário utilizar seu model
 * em outro módulo da aplicação, você precisará adicionar
 * o `MongooseModule` a seção `exports` na configuração
 *
 * No entando, o mais recomendado neste caso é que você
 * adicione o SchedulesService a seção exports e mantenha
 * seus modelos e schemas somente aqui.
 *
 * Exemplo:
 * ```ts
 * @Module({
 *   imports: [
 *     MongooseModule.forFeature(
 *       [{ name: Team.name, schema: TeamSchema }],
 *       'getlab'
 *     ),
 *   ],
 *   controllers: [TeamsController],
 *   providers: [
 *     {
 *       provide: TeamsService,
 *       useFactory: (model: Model<Team>) => {
 *         return new TeamsServiceImpl(model);
 *       },
 *       inject: [getModelToken(Team.name, 'getlab')],
 *     },
 *   ],
 *   exports: [TeamsService]
 * ```
 */
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
      useFactory: (model: Model<Team>) => {
        return new TeamsServiceImpl(model);
      },
      inject: [getModelToken(Team.name, 'getlab')],
    },
  ],
})
export class TeamsModule {}
