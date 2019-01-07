import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { eventProviders } from './event.providers';
import { DatabaseModule } from '../database/database.module';
import { DataModule } from '../data/data.module';
import { WellModule } from '../wells/well.module';
import { MaintenanceModule } from '../maintenance/maintenance.module';
import { DeviceModule } from 'src/devices/device.module';

@Module({
  providers: [EventService, ...eventProviders],
  controllers: [EventController],
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
    DatabaseModule,
    DataModule,
    WellModule,
    DeviceModule,
    MaintenanceModule,
  ],
})

export class EventModule { }
