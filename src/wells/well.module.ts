import { Module } from '@nestjs/common';
import { WellService } from './well.service';
import { WellController } from './well.controller';
import { wellsProviders } from './well.providers';
import { DatabaseModule } from '../database/database.module';
import { CoverModule } from 'src/covers/cover.module';
import { DeviceModule } from 'src/devices/device.module';

@Module({
  providers: [WellService, ...wellsProviders],
  exports: [WellService],
  controllers: [WellController],
  imports: [DatabaseModule, CoverModule, DeviceModule],
})

export class WellModule { }
