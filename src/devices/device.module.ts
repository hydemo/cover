import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { devicesProviders } from './device.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [DeviceService, ...devicesProviders],
  exports: [DeviceService],
  controllers: [DeviceController],
  imports: [DatabaseModule],
})

export class DeviceModule { }
