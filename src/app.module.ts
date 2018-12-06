import { Module } from '@nestjs/common';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';
import { DeviceModule } from './devices/device.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [CoverModule, WellModule, DeviceModule, DataModule],
})
export class AppModule { }
