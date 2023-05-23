import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './schemas/schedule.schema';
import { Model } from 'mongoose';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>
  ) {}

  create(createScheduleDto: CreateScheduleDto) {
    const createdSchedule = new this.scheduleModel(createScheduleDto);
    return createdSchedule.save();
  }

  findAll() {
    return this.scheduleModel.find().exec();
  }

  findOne(id: string) {
    return this.scheduleModel.findOne({ id });
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleModel.findOneAndUpdate({ id }, updateScheduleDto);
  }

  filterBy(...values: string[]) {
    const $or = values.map((v) => ({ _id: v }));
    return this.scheduleModel.find({ $or }).exec();
  }

  remove(id: string) {
    return this.scheduleModel.findOneAndRemove({ id });
  }
}
