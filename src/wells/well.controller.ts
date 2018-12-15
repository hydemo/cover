import { Body, Controller, Delete, Get, Param, Post, Put, Query, ReflectMetadata, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { CreateWellDTO } from './dto/creatWell.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { WellService } from './well.service';
import { Pagination } from '../common/dto/pagination.dto';
import { CreateDeviceDTO } from '../devices/dto/creatDevice.dto';
import { CreateCoverDTO } from '../covers/dto/creatCover.dto';
import {
  ApiOperation,
  ApiUseTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('wells')
// @ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('wells')
export class WellController {
  constructor(
    private wellService: WellService,
  ) { }

  @ApiOkResponse({
    description: '窑井列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiOperation({ title: '获取窑井列表', description: '获取窑井列表' })
  @Get('/')
  async wellList(@Query() pagination: Pagination) {
    return await this.wellService.findPage(pagination);
  }

  @ApiOkResponse({
    description: '完整列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiOperation({ title: '获取窑井完整列表', description: '获取窑井完整列表' })
  @Get('/all')
  async wellListAll() {
    return await this.wellService.findAll();
  }

  @ApiOkResponse({
    description: '井盖打开列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiOperation({ title: '获取井盖打开列表', description: '获取井盖打开列表' })
  @Get('/open')
  async wellListOpen() {
    return await this.wellService.findOpen();
  }

  @ApiOkResponse({
    description: '漏气列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @ApiOperation({ title: '获取漏气列表', description: '获取漏气列表' })
  @Get('/leak')
  async wellListLeak() {
    return await this.wellService.findLeak();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取窑井成功',
  })
  @ApiCreatedResponse({ description: '获取窑井' })
  @ApiOperation({ title: '根据id获取窑井', description: '根据id获取窑井' })
  findById(@Param('id', new MongodIdPipe()) id: string) {
    return this.wellService.findById(id);
  }

  @Post('/')
  @ApiOkResponse({
    description: '添加窑井成功',
  })
  @ApiOperation({ title: '添加窑井', description: '添加窑井' })
  async create(@Body() creatWellDTO: CreateWellDTO) {
    await this.wellService.create(creatWellDTO);
    return { statusCode: 200, msg: '添加窑井成功' };
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改窑井成功',
  })
  @ApiOperation({ title: '修改窑井', description: '修改窑井' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() creatWellDTO: CreateWellDTO) {
    await this.wellService.updateById(id, creatWellDTO);
    return { statusCode: 200, msg: '修改窑井成功' };
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除窑井成功',
  })
  @ApiOperation({ title: '根据id删除窑井', description: '根据id删除窑井' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.wellService.deleteById(id);
    return { statusCode: 200, msg: '删除窑井成功' };
  }

  @Put('/:id/device/:deviceId')
  @ApiOkResponse({
    description: '绑定旧设备成功',
  })
  @ApiOperation({ title: '绑定旧设备', description: '绑定旧设备' })
  async bindOldDevice(@Param('id', new MongodIdPipe()) _id: string, @Param('deviceId', new MongodIdPipe()) deviceId: string) {
    this.wellService.bindOldDevice(_id, deviceId);
    return { statusCode: 200, msg: '绑定旧设备成功' };
  }

  @Post('/:id/device')
  @ApiOkResponse({
    description: '绑定新设备成功',
  })
  @ApiOperation({ title: '绑定新设备', description: '绑定新设备' })
  async bindNewDevice(@Param('id', new MongodIdPipe()) _id: string, @Body() device: CreateDeviceDTO) {
    await this.wellService.bindNewDevice(_id, device);
    return { statusCode: 200, msg: '绑定新设备成功' };
  }

  @Put('/:id/cover/:coverId')
  @ApiOkResponse({
    description: '绑定旧井盖成功',
  })
  @ApiOperation({ title: '绑定旧井盖', description: '绑定旧井盖' })
  async bindOldCover(@Param('id', new MongodIdPipe()) _id: string, @Param('coverId', new MongodIdPipe()) coverId: string) {
    await this.wellService.bindOldCover(_id, coverId);
    return { statusCode: 200, msg: '绑定旧井盖成功' };
  }

  @Post('/:id/cover')
  @ApiOkResponse({
    description: '绑定新井盖成功',
  })
  @ApiOperation({ title: '绑定新井盖', description: '绑定新井盖' })
  async bindNewCover(@Param('id', new MongodIdPipe()) _id: string, @Body() cover: CreateCoverDTO) {
    await this.wellService.bindNewCover(_id, cover);
    return { statusCode: 200, msg: '绑定新井盖成功' };

  }

  @Put('/:id/defence')
  @ApiOkResponse({
    description: '布防',
  })
  @ApiOperation({ title: '布防', description: '布防' })
  async defenceWell(@Param('id', new MongodIdPipe()) _id: string) {
    await this.wellService.defenceById(_id);
    return { statusCode: 200, msg: '布防成功' };
  }

  @Put('/:id/undefence')
  @ApiOkResponse({
    description: '布防',
  })
  @ApiOperation({ title: '布防', description: '布防' })
  async undefenceWell(@Param('id', new MongodIdPipe()) _id: string) {
    await this.wellService.unDefenceById(_id);
    return { statusCode: 200, msg: '撤防成功' };
  }
  // // @Put(':userId/:depId')
  // // updateUserDepById(@Param('userId') userId, @Param('depId') depId){
  // //   return this.usersService.updateUserDepById(userId, depId);
  // // }

  // @Put(':userId')
  // updateUserById(@Param('userId') id, @Body() userDTO: UserDTO) {
  //   return this.usersService.updateUserById(id, userDTO);
  //   // return this.usersService.updateUserRolesByIds(id, userDTO);
  // }

  // @Delete(':userId')
  // delete(@Param('userId') id) {
  //   return this.usersService.deleteUser(id);
  // }
}