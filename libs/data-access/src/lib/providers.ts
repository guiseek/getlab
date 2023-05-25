import { SpreadsheetFacade, ScheduleFacade, TeamFacade } from './application';
import { Token, register, transfer } from '@getlab/util-core';
import {
  ScheduleStorageRepositoryImpl,
  TeamStorageRepositoryImpl,
} from './infrastructure';
import {
  TeamRepository,
  CreateTeamUseCase,
  UpdateTeamUseCase,
  ScheduleRepository,
  FindAllTeamsUseCase,
  FindTeamByIdUseCase,
  UpdateScheduleUseCase,
  RemoveTeamByIdUseCase,
  CreateScheduleUseCase,
  ParseSpreadsheetUseCase,
  BuildSpreadsheetUseCase,
  FindAllSchedulesUseCase,
  FindScheduleByIdUseCase,
  RemoveScheduleByIdUseCase,
  DownloadSpreadsheetUseCase,
  FindSchedulesByIdUseCase,
} from '@getlab/domain';

const STORAGE_TOKEN = new Token('storage');
const TEAM_TOKEN = new Token('team');
const SCHEDULE_TOKEN = new Token('schedule');

export const providers = {
  infrastructure() {
    register(
      {
        for: STORAGE_TOKEN,
        use: localStorage,
      },
      {
        for: TEAM_TOKEN,
        use: 'team',
      },
      {
        for: TeamRepository,
        use: TeamStorageRepositoryImpl,
        add: [STORAGE_TOKEN, TEAM_TOKEN],
      },
      {
        for: SCHEDULE_TOKEN,
        use: 'schedule',
      },
      {
        for: ScheduleRepository,
        use: ScheduleStorageRepositoryImpl,
        add: [STORAGE_TOKEN, SCHEDULE_TOKEN],
      }
    );
  },
  useCases() {
    register(
      {
        for: CreateTeamUseCase,
        add: [TeamRepository],
      },
      {
        for: UpdateTeamUseCase,
        add: [TeamRepository],
      },
      {
        for: FindAllTeamsUseCase,
        add: [TeamRepository],
      },
      {
        for: FindTeamByIdUseCase,
        add: [TeamRepository],
      },
      {
        for: RemoveTeamByIdUseCase,
        add: [TeamRepository],
      },
      {
        for: CreateScheduleUseCase,
        add: [ScheduleRepository],
      },
      {
        for: UpdateScheduleUseCase,
        add: [ScheduleRepository],
      },
      {
        for: FindAllSchedulesUseCase,
        add: [ScheduleRepository],
      },
      {
        for: FindScheduleByIdUseCase,
        add: [ScheduleRepository],
      },
      {
        for: FindSchedulesByIdUseCase,
        add: [ScheduleRepository],
      },
      {
        for: RemoveScheduleByIdUseCase,
        add: [ScheduleRepository],
      },
      {
        for: BuildSpreadsheetUseCase,
      },
      {
        for: DownloadSpreadsheetUseCase,
      },
      {
        for: ParseSpreadsheetUseCase,
      }
    );
  },
  application() {
    register(
      {
        for: TeamFacade,
        use: TeamFacade,
        add: [
          CreateTeamUseCase,
          UpdateTeamUseCase,
          FindAllTeamsUseCase,
          FindTeamByIdUseCase,
          RemoveTeamByIdUseCase,
        ],
      },
      {
        for: ScheduleFacade,
        use: ScheduleFacade,
        add: [
          CreateScheduleUseCase,
          UpdateScheduleUseCase,
          FindAllSchedulesUseCase,
          FindScheduleByIdUseCase,
          FindSchedulesByIdUseCase,
          RemoveScheduleByIdUseCase,
        ],
      },
      {
        for: SpreadsheetFacade,
        use: SpreadsheetFacade,
        add: [
          ParseSpreadsheetUseCase,
          BuildSpreadsheetUseCase,
          DownloadSpreadsheetUseCase,
        ],
      }
    );
  },
  transfer() {
    return transfer();
  },
};
