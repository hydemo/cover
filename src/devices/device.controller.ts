import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

import { CreateDeviceDTO } from './dto/creatDevice.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { DeviceService } from './device.service';
import { Pagination } from '../common/pagination.dto';
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
  findById(@Param('id') id: string) {
    return this.deviceService.findById(id);
  }

  @Post()
  @ApiOkResponse({
    description: '添加设备成功',
  })
  @ApiOperation({ title: '添加设备', description: '添加设备' })
  create(@Body() creatDeviceDTO: CreateDeviceDTO) {
    return this.deviceService.create(creatDeviceDTO);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改设备成功',
  })
  @ApiOperation({ title: '修改设备', description: '修改设备' })
  update(@Param('id') id: string, @Body() creatDeviceDTO: CreateDeviceDTO) {
    return this.deviceService.updateById(id, creatDeviceDTO);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除设备成功',
  })
  @ApiOperation({ title: '删除设备', description: '删除设备' })
  delete(@Param('id') id: string) {
    return this.deviceService.deleteById(id);
  }
}