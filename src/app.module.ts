import { Module } from '@nestjs/common';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';
import { DeviceModule } from './devices/device.module';
import { DataModule } from './data/data.module';
import { EventModule } from './events/event.module';
import { UserModule } from './users/user.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CoverModule,
    WellModule,
    DeviceModule,
    DataModule,
    EventModule,
    UserModule,
    MaintenanceModule,
    AuthModule,
  ],
})
export class AppModule { }
