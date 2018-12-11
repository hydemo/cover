import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { adminsProviders } from './admin.providers';
import { DatabaseModule } from '../database/database.module';
import { CryptoUtil } from '../utils/crypto.util';

@Module({
  providers: [AdminService, CryptoUtil, ...adminsProviders],
  exports: [AdminService],
  controllers: [AdminController],
  imports: [DatabaseModule],
})

export class AdminModule { }
