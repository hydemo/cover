import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes, ExecutionContext } from '@nestjs/common';

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
import { Pagination } from '../common/dto/pagination.dto';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';
import { IUser } from 'src/users/interfaces/user.interfaces';
import { AuthGuard } from '@nestjs/passport';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('events')

// @ApiBearerAuth()
// @ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('')
export class EventController {
  constructor(
    private eventService: EventService,
  ) { }

  @ApiOkResponse({
    description: '数据接收成功',

  })
  @Post('/')
  @ApiOperation({ title: '接收数据', description: '接收数据' })
  async receiveData(@Body() event: EventsDTO) {
    await this.eventService.receiveData(event);
    return { statusCode: 200, msg: '数据接收成功' };
  }

  @ApiOkResponse({
    description: '获取异常列表',
    type: WarningsDTO,
    isArray: true,
  })
  @Get('/warning')
  @ApiOperation({ title: '获取异常列表', description: '获取异常列表' })
  warningList(@Query() pagination: Pagination) {
    return this.eventService.getWarningList(pagination);
  }

  @ApiOkResponse({
    description: '分配负责人',
  })
  @UseGuards(AuthGuard())
  @Post('/warning/:id/principal')
  @ApiOperation({ title: '分配负责人', description: '分配负责人' })
  async bindPrincipal(
    context: ExecutionContext,
    @Param('id', new MongodIdPipe()) id: string,
    @Body('userId') userId: string,
  ) {
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;
    await this.eventService.bindPrincipal(id, userId, user._id);
    // await this.eventService.bindPrincipal(id, userId, user._id);
    return { statusCode: 200, msg: '分配负责人成功' };
  }

  @ApiOkResponse({
    description: '取消警告',
  })
  @Post('/warning/:id/cancel')
  @ApiOperation({ title: '取消警告', description: '取消警告' })
  async cancelWarning(@Param('id', new MongodIdPipe()) id: string) {
    await this.eventService.cancelWarning(id);
    return { statusCode: 200, msg: '取消警告成功' };
  }

  @ApiOkResponse({
    description: '获取未处理警告数',
  })
  @Get('/warning/unhandle')
  @ApiOperation({ title: '获取未处理警告数', description: '获取未处理警告数' })
  async countUnhandleWarning() {
    const count: number = await this.eventService.countUnhandleWarning();
    return { statusCode: 200, msg: '获取未处理警告数成功', data: count };
  }
}