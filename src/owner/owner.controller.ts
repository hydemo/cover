import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { CreateOwnerDTO } from './dto/creatOwner.dto';
import { OwnerService } from './owner.service';
import { Pagination } from '../common/dto/pagination.dto';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';

@ApiUseTags('owners')

@ApiForbiddenResponse({ description: 'Unauthorized' })
@UseGuards(AuthGuard(), RolesGuard)
@Controller('owners')
export class OwnerController {
  constructor(
    private ownerService: OwnerService,
  ) { }

  @ApiOkResponse({
    description: '业主列表',
    type: CreateOwnerDTO,
    isArray: true,
  })
  @Roles('3')
  @Get('/')
  @ApiOperation({ title: '获取业主列表', description: '获取业主列表' })
  ownerList(@Query() pagination: Pagination) {
    return this.ownerService.findAll(pagination);
  }

  @Get('/:id')
  @Roles('3')
  @ApiOkResponse({
    description: '获取业主成功',
  })
  @ApiCreatedResponse({ description: '获取业主' })
  @ApiOperation({ title: '根据id获取业主信息', description: '根据id获取业主信息' })
  async findById(@Param('id', new MongodIdPipe()) id: string) {
    const data: CreateOwnerDTO = await this.ownerService.findById(id);
    return { statusCode: 200, msg: '获取业主成功', data };
  }

  @Post()
  @Roles('1')
  @ApiOkResponse({
    description: '添加业主成功',
  })
  @ApiOperation({ title: '添加业主', description: '添加业主' })
  async create(@Body() creatOwnerDTO: CreateOwnerDTO) {
    await this.ownerService.create(creatOwnerDTO);
    return { statusCode: 200, msg: '添加业主成功' };
  }

  @Put('/:id')
  @Roles('1')
  @ApiOkResponse({
    description: '修改业主成功',
  })
  @ApiOperation({ title: '修改业主', description: '修改业主' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() creatOwnerDTO: CreateOwnerDTO) {
    await this.ownerService.updateById(id, creatOwnerDTO);
    return { statusCode: 200, msg: '修改业主成功' };
  }

  @Delete('/:id')
  @Roles('1')
  @ApiOkResponse({
    description: '删除业主成功',
  })
  @ApiOperation({ title: '删除业主', description: '删除业主' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.ownerService.deleteById(id);
    return { statusCode: 200, msg: '删除业主成功' };
  }
}