import { Module } from '@nestjs/common';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';
import { DeviceModule } from './devices/device.module';
import { DataModule } from './data/data.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [CoverModule, WellModule, DeviceModule, DataModule, EventModule],
})
export class AppModule { }
