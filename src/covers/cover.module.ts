import { Module } from '@nestjs/common';
import { CoverService } from './cover.service';
import { CoverController } from './cover.controller';
import { coversProviders } from './cover.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [CoverService, ...coversProviders],
  exports: [CoverService],
  controllers: [CoverController],
  imports: [DatabaseModule],
})

export class CoverModule { }
