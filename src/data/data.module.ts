import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { dataProviders } from './data.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [DataService, ...dataProviders],
  exports: [DataService],
  controllers: [DataController],
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

export class DataModule { }
