import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { EventService } from './event.service';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { EventsDTO } from './dto/event.dto';
import { WarningsDTO } from './dto/creatWarning.dto';
import { Pagination } from '../common/pagination.dto';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('events')

// @ApiBearerAuth()
// @ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('events')
export class EventController {
  constructor(
    private eventService: EventService,
  ) { }

  @ApiOkResponse({
    description: '数据接收成功',

  })
  @Post('/')
  @ApiOperation({ title: '接收数据', description: '接收数据' })
  receiveData(@Body() event: EventsDTO) {
    return this.eventService.receiveData(event);
  }

  @ApiOkResponse({
    description: '获取异常列表',
    type: WarningsDTO,
    isArray: true,
  })
  @Get('/warning')
  @ApiOperation({ title: '获取异常列表', description: '接获取异常列表收数据' })
  warningList(@Query() pagination: Pagination) {
    return this.eventService.getWarningList(pagination);
  }
}