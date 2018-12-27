import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateSimDTO } from './dto/creatSim.dto';
import { SimService } from './sim.service';
import { Pagination } from '../common/dto/pagination.dto';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';

@ApiUseTags('sims')

@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('sims')
export class SimController {
  constructor(
    private simService: SimService,
  ) { }

  @ApiOkResponse({
    description: 'sim卡列表',
    type: CreateSimDTO,
    isArray: true,
  })
  @Get('/')
  @ApiOperation({ title: '获取sim卡列表', description: '获取sim卡列表' })
  simList(@Query() pagination: Pagination) {
    return this.simService.findAll(pagination);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取sim卡成功',
  })
  @ApiCreatedResponse({ description: '获取sim卡' })
  @ApiOperation({ title: '根据id获取sim卡信息', description: '根据id获取sim卡信息' })
  async findById(@Param('id', new MongodIdPipe()) id: string) {
    const data: CreateSimDTO = await this.simService.findById(id);
    return { statusCode: 200, msg: '获取sim卡成功', data };
  }

  @Post()
  @ApiOkResponse({
    description: '添加sim卡成功',
  })
  @ApiOperation({ title: '添加sim卡', description: '添加sim卡' })
  async create(@Body() creatSimDTO: CreateSimDTO) {
    await this.simService.create(creatSimDTO);
    return { statusCode: 200, msg: '添加sim卡成功' };
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改sim卡成功',
  })
  @ApiOperation({ title: '修改sim卡', description: '修改sim卡' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() creatSimDTO: CreateSimDTO) {
    await this.simService.updateById(id, creatSimDTO);
    return { statusCode: 200, msg: '修改sim卡成功' };
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除sim卡成功',
  })
  @ApiOperation({ title: '删除sim卡', description: '删除sim卡' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.simService.deleteById(id);
    return { statusCode: 200, msg: '删除sim卡成功' };
  }
}