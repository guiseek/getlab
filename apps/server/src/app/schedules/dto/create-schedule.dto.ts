import { IsNotEmpty } from 'class-validator';
import { CreateTeamDto } from '../../teams/dto/create-team.dto';

export class CreateScheduleDto {
  team: CreateTeamDto;

  @IsNotEmpty()
  timeStart: string;

  @IsNotEmpty()
  timeEnd: string;

  @IsNotEmpty()
  byweekday: number;

  @IsNotEmpty()
  interval: number;
}
