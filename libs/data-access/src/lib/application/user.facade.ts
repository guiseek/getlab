import {
  User,
  CreateUserDto,
  UpdateUserDto,
  CreateUserUseCase,
  UpdateUserUseCase,
  FindAllUsersUseCase,
  FindUserByIdUseCase,
  RemoveUserByIdUseCase,
} from '@getlab/domain';
import { Store } from '../base/store';

interface UserState {
  data: User[];
  user: User | null;
  loading: boolean;
}

export class UserFacade extends Store<UserState> {
  loading$ = this.select((state) => state.loading);
  user$ = this.select((state) => state.user);
  data$ = this.select((state) => state.data);
  hasNoUsers$ = this.select((state) => {
    return state.data.length === 0;
  });

  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly updateUseCase: UpdateUserUseCase,
    private readonly findAllUseCase: FindAllUsersUseCase,
    private readonly findOneUseCase: FindUserByIdUseCase,
    private readonly removeByIdUseCase: RemoveUserByIdUseCase
  ) {
    super({
      data: [],
      user: null,
      loading: false,
    });
  }

  load() {
    this.findAllUseCase.execute().then((data) => this.setState({ data }));
  }

  findUser(id: string) {
    this.findOneUseCase.execute(id).then((user) => this.setState({ user }));
  }

  createUser(user: CreateUserDto) {
    this.createUseCase.execute(user).then(() => {
      this.setState({ user: null });
      this.load();
    });
  }

  clearUser() {
    this.setState({ user: null });
  }

  updateUser(user: UpdateUserDto) {
    this.updateUseCase.execute(user).then(() => {
      this.setState({ user: null });
      this.load();
    });
  }

  removeUser(id: string) {
    this.removeByIdUseCase.execute(id).then(() => this.load());
  }
}
