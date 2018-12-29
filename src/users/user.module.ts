import { Module, MulterModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { CryptoUtil } from '../utils/crypto.util';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';

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
    MulterModule.registerAsync({
      useFactory: () => {
        const uploadPath = join(__dirname, '../..', 'upload');
        return { dest: uploadPath };
      },
    }),
    DatabaseModule,
  ],
})

export class UserModule { }
