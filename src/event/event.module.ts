import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { eventProviders } from './event.providers';
import { DatabaseModule } from '../database/database.module';
import { DataModule } from '../data/data.module';
import { WellModule } from '../wells/well.module';

@Module({
  providers: [EventService, ...eventProviders],
  controllers: [EventController],
  imports: [DatabaseModule, DataModule, WellModule],
})

export class EventModule { }
