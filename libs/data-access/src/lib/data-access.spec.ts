import { Token, inject, register } from '@getlab/util-core';
import {
  UserMockRepositoryImpl,
  TeamMockRepositoryImpl,
  ScheduleMockRepositoryImpl,
} from './infrastructure';
import {
  User,
  Team,
  Schedule,
  UserRepository,
  TeamRepository,
  ScheduleRepository,
} from '@getlab/domain';
import { TeamFacade } from './application/team.facade';
import { providers } from './providers';

const TEAM_MOCK_TOKEN = new Token<Team[]>('team.mock');
const USER_MOCK_TOKEN = new Token<User[]>('user.mock');
const SCHEDULE_MOCK_TOKEN = new Token<Schedule[]>('schedule.mock');

const USERS = [
  {
    id: '1',
    name: 'Guilherme',
    ref: '5345',
  },
];

const TEAMS = [
  {
    id: '1',
    name: 'Guilherme',
    ref: 'ESOFT7S-NA',
    goal: 'Desenvolvimento',
    people: 30,
  },
];

const SCHEDULES: Schedule[] = [
  {
    id: '1',
    team: TEAMS[0],
    byweekday: 2,
    timeStart: '19h',
    timeEnd: '20h:40m',
    interval: 1,
  },
];

register(
  {
    for: USER_MOCK_TOKEN,
    use: USERS,
  },
  {
    for: TEAM_MOCK_TOKEN,
    use: TEAMS,
  },
  {
    for: SCHEDULE_MOCK_TOKEN,
    use: SCHEDULES,
  },
  {
    for: UserRepository,
    use: UserMockRepositoryImpl,
    add: [USER_MOCK_TOKEN],
  },
  {
    for: TeamRepository,
    use: TeamMockRepositoryImpl,
    add: [TEAM_MOCK_TOKEN],
  },
  {
    for: ScheduleRepository,
    use: ScheduleMockRepositoryImpl,
    add: [TEAM_MOCK_TOKEN],
  }
);

providers.useCases();
providers.application();

describe('Data Access', () => {
  describe('Application', () => {
    let facade: TeamFacade;

    beforeEach(() => {
      facade = inject(TeamFacade);
    });

    it('data should be empty', () => {
      jest.spyOn(facade, 'load');

      const { value } = facade['_state'];
      expect(value.data.length).toBe(0);
      facade.load();
    });

    it('data should has 1 item', () => {
      jest.spyOn(facade, 'load');

      const { value } = facade['_state'];
      expect(value.data.length).toBe(1);
      facade.load();
    });

    it('data should has 2 items', () => {
      jest.spyOn(facade, 'createTeam');

      facade.createTeam({
        name: 'Guilherme',
        ref: 'ADSIS5S-NA',
        goal: 'Desenvolvimento',
        people: 20,
      });

      const { value } = facade['_state'];
      expect(value.data.length).toBe(2);
    });

    it('data should has 0 items', () => {
      jest.spyOn(facade, 'createTeam');

      facade.removeTeam('1');
      facade.removeTeam('2');

      const { value } = facade['_state'];
      expect(value.data.length).toBe(0);
    });
  });
});
