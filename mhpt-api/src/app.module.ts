import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordController } from './record/record.controller';
import { RecordModule } from './record/record.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('dbConfig'),
      inject: [ConfigService],
    }),
    UserModule,
    RecordModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController, RecordController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
