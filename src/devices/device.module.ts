import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { devicesProviders } from './device.providers';
import { DatabaseModule } from '../database/database.module';
import { SimModule } from '../sim/sim.module';
import { WellModule } from 'src/wells/well.module';

@Module({
  providers: [DeviceService, ...devicesProviders],
  exports: [DeviceService],
  controllers: [DeviceController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
    DatabaseModule,
    forwardRef(() => SimModule),
    forwardRef(() => WellModule),
  ],
})

export class DeviceModule { }
