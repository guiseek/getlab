import {
  Team,
  CreateTeamUseCase,
  FindAllTeamsUseCase,
  FindTeamByIdUseCase,
  RemoveTeamByIdUseCase,
} from '@getlab/domain';
import { Store } from '../base/store';

interface TeamState {
  data: Team[];
  team: Team | null;
  loading: boolean;
}

export class TeamFacade extends Store<TeamState> {
  loading$ = this.select((state) => state.loading);
  team$ = this.select((state) => state.team);
  data$ = this.select((state) => state.data);

  constructor(
    private readonly findAllUseCase: FindAllTeamsUseCase,
    private readonly findByIdUseCase: FindTeamByIdUseCase,
    private readonly createUseCase: CreateTeamUseCase,
    private readonly removeByIdUseCase: RemoveTeamByIdUseCase
  ) {
    super({
      data: [],
      team: null,
      loading: false,
    });
  }

  load() {
    this.findAllUseCase.execute().then((data) => this.setState({ data }));
  }

  loadTeam(id: string) {
    this.findByIdUseCase.execute(id).then((team) => this.setState({ team }));
  }

  createTeam(team: Team) {
    this.createUseCase.execute(team).then((team) => {
      this.setState({ team });
    });
  }

  removeTeam(id: string) {
    this.removeByIdUseCase.execute(id).then(() => this.load());
  }
}
