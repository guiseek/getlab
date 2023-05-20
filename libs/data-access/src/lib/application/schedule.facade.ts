import {
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto,
  CreateScheduleUseCase,
  UpdateScheduleUseCase,
  FindAllSchedulesUseCase,
  RemoveScheduleByIdUseCase,
  FindScheduleByIdUseCase,
  FindSchedulesByIdUseCase,
} from '@getlab/domain';
import { Store } from '../base/store';

interface ScheduleState {
  data: Schedule[];
  schedule: Schedule | null;
  filtered: Schedule[];
  loading: boolean;
}

export class ScheduleFacade extends Store<ScheduleState> {
  loading$ = this.select((state) => state.loading);
  schedule$ = this.select((state) => state.schedule);
  data$ = this.select((state) => state.data);
  filtered$ = this.select((state) => state.filtered);

  constructor(
    private readonly createUseCase: CreateScheduleUseCase,
    private readonly updateUseCase: UpdateScheduleUseCase,
    private readonly findAllUseCase: FindAllSchedulesUseCase,
    private readonly findOneUseCase: FindScheduleByIdUseCase,
    private readonly findManyUseCase: FindSchedulesByIdUseCase,
    private readonly removeByIdUseCase: RemoveScheduleByIdUseCase
  ) {
    super({
      data: [],
      filtered: [],
      schedule: null,
      loading: false,
    });
  }

  load() {
    this.findAllUseCase.execute().then((data) => this.setState({ data }));
  }

  findSchedule(id: string) {
    this.findOneUseCase
      .execute(id)
      .then((schedule) => this.setState({ schedule }));
  }

  findSchedules(...ids: string[]) {
    this.findManyUseCase
      .execute(...ids)
      .then((filtered) => this.setState({ filtered }));
  }

  createSchedule(schedule: CreateScheduleDto) {
    this.createUseCase.execute(schedule).then((schedule) => {
      this.setState({ schedule });
      this.load();
    });
  }

  updateSchedule(schedule: UpdateScheduleDto) {
    this.updateUseCase.execute(schedule).then((schedule) => {
      this.setState({ schedule });
      this.load();
    });
  }

  removeSchedule(id: string) {
    this.removeByIdUseCase.execute(id).then(() => this.load());
  }
}
