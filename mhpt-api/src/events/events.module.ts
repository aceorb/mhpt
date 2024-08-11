import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RecordModule } from "../record/record.module";

@Module({
  imports: [ScheduleModule.forRoot(), RecordModule],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}