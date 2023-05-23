import { IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ref: string;

  @IsNotEmpty()
  people: number;

  @IsNotEmpty()
  goal: string;
}
