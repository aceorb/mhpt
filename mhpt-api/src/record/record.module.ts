import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { Record } from "./entities/record.entity";
import { RecordController } from "./record.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UserModule],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
