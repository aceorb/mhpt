import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { Cron, Interval } from '@nestjs/schedule';
import { UserService } from "../user/user.service";
import { RecordService } from "../record/record.service";

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsGateway: EventsGateway,
    private recordService: RecordService,
  ) {}

  @Interval(5000) // 5000 ms = 5 seconds
  async handleInterval() {
    const data = this.getTrackingLogData();
    const records = await this.recordService.findAll();
    console.log('handleInterval');
    this.eventsGateway.server.emit('tracking-log', records);
  }

  private getTrackingLogData() {
    // Replace this with your actual logic to retrieve tracking log data
    return {
      timestamp: new Date(),
      value: Math.random() * 100, // Example data
    };
  }
}