import { Module } from '@nestjs/common';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';
import { DeviceModule } from './devices/device.module';

@Module({
  imports: [CoverModule, WellModule, DeviceModule],
})
export class AppModule { }
