import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { maintenancesProviders } from './maintenance.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [MaintenanceService, ...maintenancesProviders],
  exports: [MaintenanceService],
  controllers: [MaintenanceController],
  imports: [DatabaseModule],
})

export class MaintenanceModule { }
