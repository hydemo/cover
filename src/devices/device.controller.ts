import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

import { CreateDeviceDTO } from './dto/creatDevice.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { DeviceService } from './device.service';
import { Pagination } from '../common/dto/pagination.dto';
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
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('devices')

// @ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('devices')
export class DeviceController {
  constructor(
    private deviceService: DeviceService,
  ) { }

  @ApiOkResponse({
    description: '设备列表',
    type: CreateDeviceDTO,
    isArray: true,
  })
  @Get('/')
  @ApiOperation({ title: '获取设备列表', description: '获取设备列表' })
  deviceList(@Query() pagination: Pagination) {
    return this.deviceService.findAll(pagination);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取设备成功',
  })
  @ApiCreatedResponse({ description: '获取设备' })
  @ApiOperation({ title: '根据id获取设备信息', description: '根据id获取设备信息' })
  async findById(@Param('id', new MongodIdPipe()) id: string) {
    const data: CreateDeviceDTO = await this.deviceService.findById(id);
    return { statusCode: 200, msg: '获取设备成功', data };
  }

  @Post()
  @ApiOkResponse({
    description: '添加设备成功',
  })
  @ApiOperation({ title: '添加设备', description: '添加设备' })
  async create(@Body() creatDeviceDTO: CreateDeviceDTO) {
    await this.deviceService.create(creatDeviceDTO);
    return { statusCode: 200, msg: '添加设备成功' };
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改设备成功',
  })
  @ApiOperation({ title: '修改设备', description: '修改设备' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() creatDeviceDTO: CreateDeviceDTO) {
    await this.deviceService.updateById(id, creatDeviceDTO);
    return { statusCode: 200, msg: '修改设备成功' };
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除设备成功',
  })
  @ApiOperation({ title: '删除设备', description: '删除设备' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.deviceService.deleteById(id);
    return { statusCode: 200, msg: '删除设备成功' };
  }

  @Put('/:_id/sim/:simId')
  @ApiOkResponse({
    description: '绑定旧sim卡成功',
  })
  @ApiOperation({ title: '绑定旧sim卡', description: '绑定旧sim卡' })
  async bindOldDevice(@Param('_id', new MongodIdPipe()) _id: string, @Param('simId', new MongodIdPipe()) simId: string) {
    this.deviceService.bindOldSim(_id, simId);
    return { statusCode: 200, msg: '绑定旧sim卡成功' };
  }
}