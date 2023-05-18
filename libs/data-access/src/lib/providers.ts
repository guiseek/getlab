import { TeamStorageRepositoryImpl } from './infrastructure/team-storage.repository.impl';
import { TeamFacade } from './application/team.facade';
import { Token, di } from '@getlab/util-core';
import {
  TeamRepository,
  CreateTeamUseCase,
  FindAllTeamsUseCase,
  FindTeamByIdUseCase,
  RemoveTeamByIdUseCase,
} from '@getlab/domain';

const STORAGE_TOKEN = new Token('storage');
const TEAM_TOKEN = new Token('team');

export const providers = {
  infrastructure() {
    di.register(
      {
        key: STORAGE_TOKEN,
        use: localStorage,
      },
      {
        key: TEAM_TOKEN,
        use: 'team',
      },
      {
        key: TeamRepository,
        use: TeamStorageRepositoryImpl,
        add: [STORAGE_TOKEN, TEAM_TOKEN],
      }
    );
  },
  useCases() {
    di.register(
      {
        key: FindAllTeamsUseCase,
        use: FindAllTeamsUseCase,
        add: [TeamRepository],
      },
      {
        key: FindTeamByIdUseCase,
        use: FindTeamByIdUseCase,
        add: [TeamRepository],
      },
      {
        key: CreateTeamUseCase,
        use: CreateTeamUseCase,
        add: [TeamRepository],
      },
      {
        key: RemoveTeamByIdUseCase,
        use: RemoveTeamByIdUseCase,
        add: [TeamRepository],
      }
    );
  },
  application() {
    di.register({
      key: TeamFacade,
      use: TeamFacade,
      add: [
        FindAllTeamsUseCase,
        FindTeamByIdUseCase,
        CreateTeamUseCase,
        RemoveTeamByIdUseCase,
      ],
    });
  },
  transfer() {
    return di.transfer();
  },
};
