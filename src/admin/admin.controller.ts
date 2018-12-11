import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

import { CreateAdminDTO } from './dto/creatAdmin.dto';
// import { AdminDTOValidationPipe } from 'shared/pipes/adminDTOValidation.pipe';
// import { AdminQueryDTO } from 'shared/DTOs/adminQueryDTO';
import { AdminService } from './admin.service';
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
@ApiUseTags('admin')

// @ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
  ) { }

  @ApiOkResponse({
    description: '管理员列表',
    type: CreateAdminDTO,
    isArray: true,
  })
  @Get('/')
  @ApiOperation({ title: '获取管理员列表', description: '获取管理员列表' })
  adminList(@Query() pagination: Pagination) {
    return this.adminService.findAll(pagination);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取管理员成功',
  })
  @ApiCreatedResponse({ description: '获取管理员' })
  @ApiOperation({ title: '根据id获取管理员信息', description: '根据id获取管理员信息' })
  findById(@Param('id') id: string) {
    return this.adminService.findById(id);
  }

  @Post('/')
  @ApiOkResponse({
    description: '添加管理员成功',
  })
  @ApiOperation({ title: '添加管理员', description: '添加管理员' })
  create(@Body() creatAdminDTO: CreateAdminDTO) {
    return this.adminService.create(creatAdminDTO);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改管理员成功',
  })
  @ApiOperation({ title: '修改管理员', description: '修改管理员' })
  update(@Param('id') id: string, @Body() creatAdminDTO: CreateAdminDTO) {
    return this.adminService.updateById(id, creatAdminDTO);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除管理员成功',
  })
  @ApiOperation({ title: '删除管理员', description: '删除管理员' })
  delete(@Param('id') id: string) {
    return this.adminService.deleteById(id);
  }

  @Put('/:id/password')
  @ApiOkResponse({
    description: '修改管理员密码成功',
  })
  @ApiOperation({ title: '修改密码', description: '修改密码' })
  resetPassWord(@Param('id') id: string, @Query('password') password: string) {
    return this.adminService.resetPassword(id, password);
  }
}