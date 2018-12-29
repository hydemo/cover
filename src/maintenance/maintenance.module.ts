import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { maintenancesProviders } from './maintenance.providers';
import { DatabaseModule } from '../database/database.module';
import { WellModule } from '../wells/well.module';
import { UserModule } from '../users/user.module';
import { DeviceModule } from '../devices/device.module';

@Module({
  providers: [MaintenanceService, ...maintenancesProviders],
  exports: [MaintenanceService],
  controllers: [MaintenanceController],
  imports: [DatabaseModule, WellModule, UserModule, DeviceModule],
})

export class MaintenanceModule { }
