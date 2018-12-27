import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { devicesProviders } from './device.providers';
import { DatabaseModule } from '../database/database.module';
import { SimModule } from '../sim/sim.module';

@Module({
  providers: [DeviceService, ...devicesProviders],
  exports: [DeviceService],
  controllers: [DeviceController],
  imports: [DatabaseModule, SimModule],
})

export class DeviceModule { }
