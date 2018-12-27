import { Module } from '@nestjs/common';
import { WellService } from './well.service';
import { WellController } from './well.controller';
import { wellsProviders } from './well.providers';
import { DatabaseModule } from '../database/database.module';
import { DeviceModule } from '../devices/device.module';
import { OwnerModule } from '../owner/owner.module';

@Module({
  providers: [WellService, ...wellsProviders],
  controllers: [WellController],
  exports: [WellService],
  imports: [DatabaseModule, OwnerModule, DeviceModule],
})

export class WellModule { }
