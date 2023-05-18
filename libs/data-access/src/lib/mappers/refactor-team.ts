import { Team } from '@getlab/domain';

export const refactorTeam = <T extends Team>(team: T) => {
  return 'team' in team
    ? ({
        id: team.id,
        name: team.name,
        people: team.people,
        ref: team.team as string,
        goal: team.goal,
      } satisfies Team)
    : team;
};
