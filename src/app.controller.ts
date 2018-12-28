import { Body, Controller, Post, UploadedFile, UseInterceptors, FileInterceptor } from '@nestjs/common';

import {
  ApiUseTags,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@ApiUseTags('upload')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('upload')
export class WellController {
  constructor(
  ) { }
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file) {
    return file;
  }
}