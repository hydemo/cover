import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { ownersProviders } from './owner.providers';
import { DatabaseModule } from '../database/database.module';
import { WellModule } from 'src/wells/well.module';

@Module({
  providers: [OwnerService, ...ownersProviders],
  exports: [OwnerService],
  controllers: [OwnerController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
    DatabaseModule,
    forwardRef(() => WellModule),
  ],
})

export class OwnerModule { }
