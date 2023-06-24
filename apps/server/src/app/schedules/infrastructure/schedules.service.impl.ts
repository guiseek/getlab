import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { SchedulesService } from './schedules.service';
import { Schedule } from '../schemas/schedule.schema';
import { Model } from 'mongoose';

export class SchedulesServiceImpl implements SchedulesService {
  constructor(private scheduleModel: Model<Schedule>) {}

  create(createScheduleDto: CreateScheduleDto) {
    const createdSchedule = new this.scheduleModel(createScheduleDto);
    return createdSchedule.save();
  }

  findAll() {
    return this.scheduleModel.find().exec();
  }

  findOne(id: string) {
    return this.scheduleModel.findById(id);
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleModel.findOneAndUpdate({ id }, updateScheduleDto);
  }

  filterBy(...values: string[]) {
    const $or = values.map((v) => ({ _id: v }));
    return this.scheduleModel.find({ $or }).exec();
  }

  remove(id: string) {
    return this.scheduleModel.findByIdAndRemove(id);
  }
}
