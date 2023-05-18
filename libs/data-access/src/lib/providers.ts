import { ScheduleStorageRepositoryImpl } from './infrastructure/schedule-storage.repository.impl';
import { TeamStorageRepositoryImpl } from './infrastructure/team-storage.repository.impl';
import { SpreadsheetFacade } from './application/spreadsheet.facade';
import { ScheduleFacade } from './application/schedule.facade';
import { TeamFacade } from './application/team.facade';
import { Token, di } from '@getlab/util-core';
import {
  TeamRepository,
  ScheduleRepository,
  CreateTeamUseCase,
  FindAllTeamsUseCase,
  FindTeamByIdUseCase,
  RemoveTeamByIdUseCase,
  CreateScheduleUseCase,
  FindAllSchedulesUseCase,
  RemoveScheduleByIdUseCase,
  UpdateScheduleUseCase,
  UpdateTeamUseCase,
  BuildSpreadsheetUseCase,
  DownloadSpreadsheetUseCase,
  ParseSpreadsheetUseCase,
} from '@getlab/domain';

const STORAGE_TOKEN = new Token('storage');
const TEAM_TOKEN = new Token('team');
const SCHEDULE_TOKEN = new Token('schedule');

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
      },
      {
        key: SCHEDULE_TOKEN,
        use: 'schedule',
      },
      {
        key: ScheduleRepository,
        use: ScheduleStorageRepositoryImpl,
        add: [STORAGE_TOKEN, SCHEDULE_TOKEN],
      }
    );
  },
  useCases() {
    di.register(
      {
        key: CreateTeamUseCase,
        use: CreateTeamUseCase,
        add: [TeamRepository],
      },
      {
        key: UpdateTeamUseCase,
        use: UpdateTeamUseCase,
        add: [TeamRepository],
      },
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
        key: RemoveTeamByIdUseCase,
        use: RemoveTeamByIdUseCase,
        add: [TeamRepository],
      },
      {
        key: CreateScheduleUseCase,
        use: CreateScheduleUseCase,
        add: [ScheduleRepository],
      },
      {
        key: UpdateScheduleUseCase,
        use: UpdateScheduleUseCase,
        add: [ScheduleRepository],
      },
      {
        key: FindAllSchedulesUseCase,
        use: FindAllSchedulesUseCase,
        add: [ScheduleRepository],
      },
      {
        key: RemoveScheduleByIdUseCase,
        use: RemoveScheduleByIdUseCase,
        add: [ScheduleRepository],
      },
      {
        key: BuildSpreadsheetUseCase,
        use: BuildSpreadsheetUseCase,
      },
      {
        key: DownloadSpreadsheetUseCase,
        use: DownloadSpreadsheetUseCase,
      },
      {
        key: ParseSpreadsheetUseCase,
        use: ParseSpreadsheetUseCase,
      }
    );
  },
  application() {
    di.register(
      {
        key: TeamFacade,
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
        key: ScheduleFacade,
        use: ScheduleFacade,
        add: [
          CreateScheduleUseCase,
          UpdateScheduleUseCase,
          FindAllSchedulesUseCase,
          RemoveScheduleByIdUseCase,
        ],
      },
      {
        key: SpreadsheetFacade,
        use: SpreadsheetFacade,
        add: [
          BuildSpreadsheetUseCase,
          DownloadSpreadsheetUseCase,
          ParseSpreadsheetUseCase,
        ],
      }
    );
  },
  transfer() {
    return di.transfer();
  },
};
