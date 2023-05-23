import { SpreadsheetFacade, ScheduleFacade, TeamFacade } from './application';
import { Token, register, transfer } from '@getlab/util-core';
import {
  ScheduleHttpRepositoryImpl,
  ScheduleStorageRepositoryImpl,
  TeamHttpRepositoryImpl,
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
        use: TeamHttpRepositoryImpl,
        // use: TeamStorageRepositoryImpl,
        // add: [STORAGE_TOKEN, TEAM_TOKEN],
      },
      {
        for: SCHEDULE_TOKEN,
        use: 'schedule',
      },
      {
        for: ScheduleRepository,
        use: ScheduleHttpRepositoryImpl,
        // use: ScheduleStorageRepositoryImpl,
        // add: [STORAGE_TOKEN, SCHEDULE_TOKEN],
      }
    );
  },
  useCases() {
    register(
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
        for: FindScheduleByIdUseCase,
        use: FindScheduleByIdUseCase,
        add: [ScheduleRepository],
      },
      {
        for: FindSchedulesByIdUseCase,
        use: FindSchedulesByIdUseCase,
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
