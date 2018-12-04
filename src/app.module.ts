import { Module } from '@nestjs/common';
import { CoverModule } from './covers/cover.module';

@Module({
  imports: [CoverModule],
})
export class AppModule { }
