import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UsersService, UsersServiceImpl } from './infrastructure';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'getlab'
    ),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useFactory: (model: Model<User>) => {
        return new UsersServiceImpl(model);
      },
      inject: [getModelToken(User.name, 'getlab')],
    },
  ],
})
export class UsersModule {}
