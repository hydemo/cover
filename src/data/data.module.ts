import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { dataProviders } from './data.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [DataService, ...dataProviders],
  exports: [DataService],
  controllers: [DataController],
  imports: [DatabaseModule],
})

export class DataModule { }
