import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { CryptoUtil } from '../utils/crypto.util';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [
    UserService,
    CryptoUtil,
    ...usersProviders,
  ],
  exports: [UserService],
  controllers: [UserController],
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

export class UserModule { }
