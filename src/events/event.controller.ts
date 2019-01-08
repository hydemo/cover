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
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';

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
  async receiveData(@Body() data: any) {
    if (data.notifyType === 'deviceInfoChanged') {
      await this.eventService.receiveDeviceInfoChange(data.deviceId, data.deviceInfo);
    } else if (data.notifyType === 'deviceDataChanged')
      await this.eventService.receiveData(data.deviceId, data.service, data.service.eventTime);
    return { statusCode: 200, msg: '数据接收成功' };
  }

  @Get('/sync/device')
  @ApiOperation({ title: '同步设备信息', description: '同步设备信息' })
  async syncDevice(@Query('token') token: string) {
    await this.eventService.syncDevice(token);
    return { statusCode: 200, msg: '同步完成' };
  }

  @Get('/sync/data')
  @ApiOperation({ title: '同步设备数据', description: '同步设备数据' })
  async syncData(@Query('token') token: string, @Query('id') id: string) {
    await this.eventService.syncData(token, id);
    return { statusCode: 200, msg: '同步完成' };
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
  async warningList(@Query() pagination: Pagination) {
    return await this.eventService.getWarningList(pagination);
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
    await this.eventService.bindPrincipal(id, userId, request.user._id);
    return { statusCode: 200, msg: '分配负责人成功' };
  }

  @ApiOkResponse({
    description: '取消警告',
  })
  @Post('/warning/:id/cancel')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('2')
  @ApiOperation({ title: '取消警告', description: '取消警告' })
  async cancelWarning(
    @Request() request,
    @Param('id', new MongodIdPipe()) id: string,
  ) {
    await this.eventService.cancelWarning(id, request.user._id);
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
    return await this.eventService.countUnhandleWarning();
  }
}