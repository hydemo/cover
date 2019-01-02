import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SimService } from './sim.service';
import { SimController } from './sim.controller';
import { simsProviders } from './sim.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [SimService, ...simsProviders],
  exports: [SimService],
  controllers: [SimController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
    DatabaseModule,
  ],
})

export class SimModule { }
