import { Module, forwardRef } from '@nestjs/common';
import { WellService } from './well.service';
import { WellController } from './well.controller';
import { wellsProviders } from './well.providers';
import { DatabaseModule } from '../database/database.module';
import { DeviceModule } from '../devices/device.module';
import { OwnerModule } from '../owner/owner.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [WellService, ...wellsProviders],
  controllers: [WellController],
  exports: [WellService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
    DatabaseModule,
    forwardRef(() => OwnerModule),
    forwardRef(() => DeviceModule),
  ],
})

export class WellModule { }
