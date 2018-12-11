import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

import { CreateUserDTO } from './dto/creatUser.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { UserService } from './user.service';
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
@ApiUseTags('users')

// @ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @ApiOkResponse({
    description: '用户列表',
    type: CreateUserDTO,
    isArray: true,
  })
  @Get('/')
  @ApiOperation({ title: '获取用户列表', description: '获取用户列表' })
  userList(@Query() pagination: Pagination) {
    return this.userService.findAll(pagination);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取用户成功',
  })
  @ApiCreatedResponse({ description: '获取用户' })
  @ApiOperation({ title: '根据id获取用户信息', description: '根据id获取用户信息' })
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('/')
  @ApiOkResponse({
    description: '添加用户成功',
  })
  @ApiOperation({ title: '添加用户', description: '添加用户' })
  create(@Body() creatUserDTO: CreateUserDTO) {
    return this.userService.create(creatUserDTO);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改用户成功',
  })
  @ApiOperation({ title: '修改用户', description: '修改用户' })
  update(@Param('id') id: string, @Body() creatUserDTO: CreateUserDTO) {
    return this.userService.updateById(id, creatUserDTO);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除用户成功',
  })
  @ApiOperation({ title: '删除用户', description: '删除用户' })
  delete(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

  @Put('/:id/password')
  @ApiOkResponse({
    description: '修改用户密码成功',
  })
  @ApiOperation({ title: '修改密码', description: '修改密码' })
  resetPassWord(@Param('id') id: string, @Query('password') password: string) {
    return this.userService.resetPassword(id, password);
  }
}