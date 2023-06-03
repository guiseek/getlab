import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { Schedule } from '../schemas/schedule.schema';

export abstract class SchedulesService {
  abstract create(createScheduleDto: CreateScheduleDto): Promise<Schedule>;

  abstract findAll(): Promise<Schedule[]>;

  abstract findOne(id: string): Promise<Schedule>;

  abstract update(
    id: string,
    updateScheduleDto: UpdateScheduleDto
  ): Promise<Schedule>;

  abstract filterBy(...values: string[]): Promise<Schedule[]>;

  abstract remove(id: string): Promise<Schedule>;
}
