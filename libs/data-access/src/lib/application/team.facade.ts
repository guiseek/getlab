import {
  Team,
  CreateTeamDto,
  UpdateTeamDto,
  CreateTeamUseCase,
  UpdateTeamUseCase,
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
  hasNoTeams$ = this.select((state) => {
    return state.data.length === 0;
  });

  constructor(
    private readonly createUseCase: CreateTeamUseCase,
    private readonly updateUseCase: UpdateTeamUseCase,
    private readonly findAllUseCase: FindAllTeamsUseCase,
    private readonly findOneUseCase: FindTeamByIdUseCase,
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

  findTeam(id: string) {
    this.findOneUseCase.execute(id).then((team) => this.setState({ team }));
  }

  createTeam(team: CreateTeamDto) {
    this.createUseCase.execute(team).then(() => {
      this.setState({ team: null });
      this.load();
    });
  }

  updateTeam(team: UpdateTeamDto) {
    this.updateUseCase.execute(team).then(() => {
      this.setState({ team: null });
      this.load();
    });
  }

  removeTeam(id: string) {
    this.removeByIdUseCase.execute(id).then(() => this.load());
  }
}
