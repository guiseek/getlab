import { Team } from '../entities';

export type UpdateTeamDto = Partial<Team> & { id: string };
