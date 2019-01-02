import { Body, Controller, Get, Param, Post, Query, UseGuards, Request } from '@nestjs/common';

import { EventService } from './event.service';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { EventsDTO } from './dto/event.dto';
import { WarningsDTO } from './dto/creatWarning.dto';
import { Pagination } from '../common/dto/pagination.dto';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';
import { IUser } from '../users/interfaces/user.interfaces';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('events')

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
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('3')
  @ApiOperation({ title: '获取异常列表', description: '获取异常列表' })
  warningList(@Query() pagination: Pagination) {
    return this.eventService.getWarningList(pagination);
  }

  @ApiOkResponse({
    description: '分配负责人',
  })
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('2')
  @Post('/warning/:id/principal')
  @ApiOperation({ title: '分配负责人', description: '分配负责人' })
  async bindPrincipal(
    @Request() request,
    @Param('id', new MongodIdPipe()) id: string,
    @Body('userId') userId: string,
  ) {

    const user: IUser = request.user;
    await this.eventService.bindPrincipal(id, userId, user._id);
    return { statusCode: 200, msg: '分配负责人成功' };
  }

  @ApiOkResponse({
    description: '取消警告',
  })
  @Post('/warning/:id/cancel')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('2')
  @ApiOperation({ title: '取消警告', description: '取消警告' })
  async cancelWarning(@Param('id', new MongodIdPipe()) id: string) {
    await this.eventService.cancelWarning(id);
    return { statusCode: 200, msg: '取消警告成功' };
  }

  @ApiOkResponse({
    description: '获取未处理警告数',
  })
  @Get('/warning/unhandle')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('3')
  @ApiOperation({ title: '获取未处理警告数', description: '获取未处理警告数' })
  async countUnhandleWarning() {
    const count: number = await this.eventService.countUnhandleWarning();
    return { statusCode: 200, msg: '获取未处理警告数成功', data: count };
  }
}