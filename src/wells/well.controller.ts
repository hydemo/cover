import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateWellDTO } from './dto/creatWell.dto';
import { WellService } from './well.service';
import { Pagination } from '../common/dto/pagination.dto';
import { CreateDeviceDTO } from '../devices/dto/creatDevice.dto';
import {
  ApiOperation,
  ApiUseTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';
import { CreateOwnerDTO } from '../owner/dto/creatOwner.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('wells')
@ApiForbiddenResponse({ description: 'Unauthorized' })
@UseGuards(AuthGuard(), RolesGuard)
@Controller('wells')
export class WellController {
  constructor(
    private wellService: WellService,
  ) { }

  @ApiOkResponse({
    description: '窨井列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiOperation({ title: '获取窨井列表', description: '获取窨井列表' })
  @Get('/')
  @Roles('3')
  async wellList(@Query() pagination: Pagination) {
    return await this.wellService.findPage(pagination);
  }

  @ApiOkResponse({
    description: '完整列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiOperation({ title: '获取窨井完整列表', description: '获取窨井完整列表' })
  @Get('/all')
  @Roles('3')
  async wellListAll() {
    return await this.wellService.findAll();
  }

  @ApiOkResponse({
    description: '获取异常个数',
  })
  @ApiOperation({ title: '获取异常个数', description: '获取异常个数' })
  @Get('/counts')
  @Roles('3')
  async getCounts() {
    return await this.wellService.getCounts();
  }
  @ApiOkResponse({
    description: '井盖打开列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiBearerAuth()
  @ApiOperation({ title: '获取井盖打开列表', description: '获取井盖打开列表' })
  @Get('/open')
  @Roles('3')
  async wellListOpen() {
    return await this.wellService.findOpen();
  }

  @ApiOkResponse({
    description: '异常列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiBearerAuth()
  @ApiOperation({ title: '获取异常列表', description: '获取异常列表' })
  @Get('/unnarmal')
  @Roles('3')
  async wellListUnnarmal() {
    return await this.wellService.findUnnormal();
  }

  @ApiOkResponse({
    description: '漏气列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiBearerAuth()
  @ApiOperation({ title: '获取漏气列表', description: '获取漏气列表' })
  @Get('/leak')
  @Roles('3')
  async wellListLeak() {
    return await this.wellService.findLeak();
  }

  @ApiOkResponse({
    description: '电量不足列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiBearerAuth()
  @ApiOperation({ title: '获取电量不足列表', description: '获取电量不足列表' })
  @Get('/battery')
  @Roles('3')
  async wellListBattery() {
    return await this.wellService.findBattery();
  }

  @Get('/:id')
  @Roles('3')
  @ApiOkResponse({
    description: '获取窨井成功',
  })
  @ApiCreatedResponse({ description: '获取窨井' })
  @ApiOperation({ title: '根据id获取窨井', description: '根据id获取窨井' })
  findById(@Param('id', new MongodIdPipe()) id: string) {
    return this.wellService.findById(id);
  }

  @Post('/')
  @Roles('1')
  @ApiOkResponse({
    description: '添加窨井成功',
  })
  @ApiOperation({ title: '添加窨井', description: '添加窨井' })
  async create(@Body() creatWellDTO: CreateWellDTO) {
    await this.wellService.create(creatWellDTO);
    return { statusCode: 200, msg: '添加窨井成功' };
  }

  @Put('/:id')
  @Roles('1')
  @ApiOkResponse({
    description: '修改窨井成功',
  })
  @ApiOperation({ title: '修改窨井', description: '修改窨井' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() creatWellDTO: CreateWellDTO) {
    await this.wellService.updateById(id, creatWellDTO);
    return { statusCode: 200, msg: '修改窨井成功' };
  }

  @Delete('/:id')
  @Roles('1')
  @ApiOkResponse({
    description: '删除窨井成功',
  })
  @ApiOperation({ title: '根据id删除窨井', description: '根据id删除窨井' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.wellService.deleteById(id);
    return { statusCode: 200, msg: '删除窨井成功' };
  }

  @Put('/:id/device/:deviceId')
  @Roles('1')
  @ApiOkResponse({
    description: '绑定旧设备成功',
  })
  @ApiOperation({ title: '绑定旧设备', description: '绑定旧设备' })
  async bindOldDevice(
    @Param('id', new MongodIdPipe()) _id: string,
    @Param('deviceId', new MongodIdPipe()) deviceId: string,
  ) {
    this.wellService.bindOldDevice(_id, deviceId);
    return { statusCode: 200, msg: '绑定旧设备成功' };
  }

  @Put('/:id/unbindDevice')
  @Roles('1')
  @ApiOkResponse({
    description: '解绑设备成功',
  })
  @ApiOperation({ title: '解绑设备', description: '解绑设备' })
  async unbindDevice(@Param('id', new MongodIdPipe()) _id: string) {
    this.wellService.unbindDevice(_id);
    return { statusCode: 200, msg: '解绑设备成功' };
  }
  // @Post('/:id/device')
  // @Roles('1')
  // @ApiOkResponse({
  //   description: '绑定新设备成功',
  // })
  // @ApiOperation({ title: '绑定新设备', description: '绑定新设备' })
  // async bindNewDevice(@Param('id', new MongodIdPipe()) _id: string, @Body() device: CreateDeviceDTO) {
  //   await this.wellService.bindNewDevice(_id, device);
  //   return { statusCode: 200, msg: '绑定新设备成功' };
  // }

  @Put('/:id/owner/:ownerId')
  @Roles('1')
  @ApiOkResponse({
    description: '绑定旧业主成功',
  })
  @ApiOperation({ title: '绑定旧业主', description: '绑定旧业主' })
  async bindOldOwner(@Param('id', new MongodIdPipe()) _id: string, @Param('ownerId', new MongodIdPipe()) ownerId: string) {
    await this.wellService.bindOldOwner(_id, ownerId);
    return { statusCode: 200, msg: '绑定旧业主成功' };
  }

  @Put('/:id/unbindOwner')
  @Roles('1')
  @ApiOkResponse({
    description: '解绑业主成功',
  })
  @ApiOperation({ title: '解绑业主成功', description: '解绑业主成功' })
  async unbindOwner(@Param('id', new MongodIdPipe()) _id: string) {
    await this.wellService.unbindOwner(_id);
    return { statusCode: 200, msg: '解绑业主成功' };
  }

  // @Post('/:id/owner')
  // @Roles('1')
  // @ApiOkResponse({
  //   description: '绑定新业主成功',
  // })
  // @ApiOperation({ title: '绑定新业主', description: '绑定新业主' })
  // async bindNewOwner(@Param('id', new MongodIdPipe()) _id: string, @Body() owner: CreateOwnerDTO) {
  //   await this.wellService.bindNewOwner(_id, owner);
  //   return { statusCode: 200, msg: '绑定新业主成功' };

  // }

  @Put('/:id/defence')
  @Roles('1')
  @ApiOkResponse({
    description: '布防',
  })
  @ApiOperation({ title: '布防', description: '布防' })
  async defenceWell(@Param('id', new MongodIdPipe()) _id: string) {
    await this.wellService.defenceById(_id);
    return { statusCode: 200, msg: '布防成功' };
  }

  @Put('/:id/undefence')
  @Roles('1')
  @ApiOkResponse({
    description: '撤防',
  })
  @ApiOperation({ title: '撤防', description: '撤防' })
  async undefenceWell(@Param('id', new MongodIdPipe()) _id: string) {
    await this.wellService.unDefenceById(_id);
    return { statusCode: 200, msg: '撤防成功' };
  }
}