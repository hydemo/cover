import { Module } from '@nestjs/common';
import { CoverModule } from './covers/cover.module';
import { WellModule } from './wells/well.module';

@Module({
  imports: [CoverModule, WellModule],
})
export class AppModule { }
