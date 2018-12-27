import { Module } from '@nestjs/common';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';
import { DataModule } from './data/data.module';
import { EventModule } from './events/event.module';
import { UserModule } from './users/user.module';
import { OwnerModule } from './owner/owner.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { AuthModule } from './auth/auth.module';
import { SimModule } from './sim/sim.module';
import { DeviceModule } from './devices/device.module';

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
    OwnerModule,
    SimModule,
  ],
})
export class AppModule { }
