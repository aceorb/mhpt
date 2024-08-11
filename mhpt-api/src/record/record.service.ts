import { Injectable } from '@nestjs/common';
import * as moment from "moment";
import { Repository } from "typeorm";

import { Record } from "./entities/record.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRecordDto } from "./dto/create-record.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async create(user: User, payload: CreateRecordDto): Promise<Record> {
    const {
      date,
      mood,
      anxiety,
      sleepHours,
      sleepQuality,
      sleepDisturb,
      physicalActivity,
      physicalActivityDuration,
      socialInteractions,
      stressLevels,
      symptoms,
      symptomLevels,
      symptomsPresence
    } = payload;

    let record = await this.recordRepository.findOne({
      where: {
        date,
       user: { id: user.id },
     }
    });

    if (!record){
      record = new Record();
    }

    record.date = date;
    record.mood = mood;
    record.anxiety = anxiety;
    record.sleepHours = sleepHours;
    record.sleepQuality = sleepQuality;
    record.sleepDisturb = sleepDisturb;
    record.physicalActivity = physicalActivity;
    record.physicalActivityDuration = physicalActivityDuration;
    record.socialInteractions = socialInteractions;
    record.stressLevels = stressLevels;
    record.symptoms = symptoms;
    record.symptomLevels = symptomLevels;
    record.symptomsPresence = symptomsPresence;
    record.user = user;

    return this.recordRepository.save(record);
  }

  findByUser(user: User): Promise<Record[]> {
    return this.recordRepository.find({
      where: {
        user: { id: user.id },
      },
      order: {
        date: 'ASC',
      }});
  }

  findAll() :Promise<Record[]> {
    return this.recordRepository.find({
      order: {
        date: 'ASC',
      }
    });
  }
}
