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
  error: string | null;
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
      error: null,
      filtered: [],
      schedule: null,
      loading: false,
    });
  }

  load() {
    this.catch(
      this.findAllUseCase.execute().then((data) => this.setState({ data }))
    );
  }

  findSchedule(id: string) {
    this.catch(
      this.findOneUseCase
        .execute(id)
        .then((schedule) => this.setState({ schedule }))
    );
  }

  findSchedules(...ids: string[]) {
    this.catch(
      this.findManyUseCase
        .execute(...ids)
        .then((filtered) => this.setState({ filtered }))
    );
  }

  createSchedule(schedule: CreateScheduleDto) {
    this.catch(
      this.createUseCase.execute(schedule).then(() => {
        this.setState({ schedule: null });
        this.load();
      })
    );
  }

  updateSchedule(schedule: UpdateScheduleDto) {
    this.catch(
      this.updateUseCase.execute(schedule).then(() => {
        this.setState({ schedule: null });
        this.load();
      })
    );
  }

  removeSchedule(id: string) {
    this.catch(this.removeByIdUseCase.execute(id).then(() => this.load()));
  }

  catch<T extends Promise<unknown>>(promise: T) {
    promise.catch((error) => {
      this.setState({ error: error.message });
    });
  }
}
