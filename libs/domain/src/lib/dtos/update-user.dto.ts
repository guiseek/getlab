import { User } from '../entities';

export type UpdateUserDto = Partial<User> & { id: string };
