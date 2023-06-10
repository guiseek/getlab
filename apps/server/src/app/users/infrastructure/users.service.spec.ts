import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Provider } from '@nestjs/common';
import { UsersServiceImpl } from './users.service.impl';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';

export const userModel = {
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
    provide: getModelToken(User.name),
    useValue: userModel,
  },
  {
    provide: UsersService,
    useFactory: (model) => new UsersServiceImpl(model),
    inject: [getModelToken(User.name)],
  },
];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
