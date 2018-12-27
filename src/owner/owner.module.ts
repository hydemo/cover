import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { ownersProviders } from './owner.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [OwnerService, ...ownersProviders],
  exports: [OwnerService],
  controllers: [OwnerController],
  imports: [DatabaseModule],
})

export class OwnerModule { }
