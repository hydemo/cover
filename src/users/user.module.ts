import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { CryptoUtil } from '../utils/crypto.util';

@Module({
  providers: [UserService, CryptoUtil, ...usersProviders],
  exports: [UserService],
  controllers: [UserController],
  imports: [DatabaseModule],
})

export class UserModule { }
