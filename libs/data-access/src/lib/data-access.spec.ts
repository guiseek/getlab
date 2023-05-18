import { Team, TeamRepository } from '@getlab/domain';
import { TeamMockRepositoryImpl } from './infrastructure/team-mock.repository.impl';
import { Token, di } from '@getlab/util-core';
import { TeamFacade } from './application/team.facade';
import { providers } from './providers';

const TEAM_MOCK_TOKEN = new Token<Team[]>('team.mock');
di.register(
  {
    key: TEAM_MOCK_TOKEN,
    use: [
      {
        id: '1',
        name: 'Guilherme',
        ref: 'ESOFT7S-NA',
        goal: 'Desenvolvimento',
        people: 30,
      },
    ],
  },
  {
    key: TeamRepository,
    use: TeamMockRepositoryImpl,
    add: [TEAM_MOCK_TOKEN],
  }
);

providers.useCases();
providers.application();

describe('Data Access', () => {
  describe('Application', () => {
    let facade: TeamFacade;

    beforeEach(() => {
      facade = di.get(TeamFacade);
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
        id: '2',
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
