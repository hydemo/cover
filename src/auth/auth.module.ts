import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthStrategy } from './auth.strategy';
import { CryptoUtil } from '../utils/crypto.util';
import { AuthController } from './auth.controller';

@Module({
  providers: [
    AuthService,
    AuthStrategy,
    CryptoUtil,
  ],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 24 * 60 * 60,
      },
    }),
  ],
})

export class AuthModule { }
