import {
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto,
  CreateScheduleUseCase,
  UpdateScheduleUseCase,
  FindAllSchedulesUseCase,
  RemoveScheduleByIdUseCase,
} from '@getlab/domain';
import { Store } from '../base/store';

interface ScheduleState {
  data: Schedule[];
  schedule: Schedule | null;
  loading: boolean;
}

export class ScheduleFacade extends Store<ScheduleState> {
  loading$ = this.select((state) => state.loading);
  schedule$ = this.select((state) => state.schedule);
  data$ = this.select((state) => state.data);

  constructor(
    private readonly createUseCase: CreateScheduleUseCase,
    private readonly updateUseCase: UpdateScheduleUseCase,
    private readonly findAllUseCase: FindAllSchedulesUseCase,
    private readonly removeByIdUseCase: RemoveScheduleByIdUseCase
  ) {
    super({
      data: [],
      schedule: null,
      loading: false,
    });
  }

  load() {
    this.findAllUseCase.execute().then((data) => this.setState({ data }));
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
