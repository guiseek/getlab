import { SpreadsheetFacade, ScheduleFacade, TeamFacade } from './application';
import { Token, di } from '@getlab/util-core';
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
  RemoveScheduleByIdUseCase,
  DownloadSpreadsheetUseCase,
} from '@getlab/domain';

const STORAGE_TOKEN = new Token('storage');
const TEAM_TOKEN = new Token('team');
const SCHEDULE_TOKEN = new Token('schedule');

export const providers = {
  infrastructure() {
    di.register(
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
    di.register(
      {
        for: CreateTeamUseCase,
        use: CreateTeamUseCase,
        add: [TeamRepository],
      },
      {
        for: UpdateTeamUseCase,
        use: UpdateTeamUseCase,
        add: [TeamRepository],
      },
      {
        for: FindAllTeamsUseCase,
        use: FindAllTeamsUseCase,
        add: [TeamRepository],
      },
      {
        for: FindTeamByIdUseCase,
        use: FindTeamByIdUseCase,
        add: [TeamRepository],
      },
      {
        for: RemoveTeamByIdUseCase,
        use: RemoveTeamByIdUseCase,
        add: [TeamRepository],
      },
      {
        for: CreateScheduleUseCase,
        use: CreateScheduleUseCase,
        add: [ScheduleRepository],
      },
      {
        for: UpdateScheduleUseCase,
        use: UpdateScheduleUseCase,
        add: [ScheduleRepository],
      },
      {
        for: FindAllSchedulesUseCase,
        use: FindAllSchedulesUseCase,
        add: [ScheduleRepository],
      },
      {
        for: RemoveScheduleByIdUseCase,
        use: RemoveScheduleByIdUseCase,
        add: [ScheduleRepository],
      },
      {
        for: BuildSpreadsheetUseCase,
        use: BuildSpreadsheetUseCase,
      },
      {
        for: DownloadSpreadsheetUseCase,
        use: DownloadSpreadsheetUseCase,
      },
      {
        for: ParseSpreadsheetUseCase,
        use: ParseSpreadsheetUseCase,
      }
    );
  },
  application() {
    di.register(
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
    return di.transfer();
  },
};
