import { Schedule } from '../entities';

export type UpdateScheduleDto = Partial<Schedule> & { id: string };
