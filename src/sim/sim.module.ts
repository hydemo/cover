import { Module } from '@nestjs/common';
import { SimService } from './sim.service';
import { SimController } from './sim.controller';
import { simsProviders } from './sim.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [SimService, ...simsProviders],
  exports: [SimService],
  controllers: [SimController],
  imports: [DatabaseModule],
})

export class SimModule { }
