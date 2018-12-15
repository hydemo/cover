import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { UserService } from './user.service';
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
import { IUser } from './interfaces/user.interfaces';
import { CreateUserDTO } from './dto/creatUsers.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('user')
// @UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  // @Roles('1')
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

  @Post('/')
  @ApiOkResponse({
    description: '添加用户成功',
  })
  @ApiOperation({ title: '添加用户', description: '添加用户' })
  async create(@Body() creatUserDTO: CreateUserDTO) {
    await this.userService.create(creatUserDTO);
    return { statusCode: 200, msg: '添加用户成功 ' };
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改用户成功',
  })
  @ApiOperation({ title: '修改用户', description: '修改用户' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() creatUserDTO: CreateUserDTO) {
    await this.userService.updateById(id, creatUserDTO);
    return { statusCode: 200, msg: '修改用户成功 ' };
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除用户成功',
  })
  @ApiOperation({ title: '删除用户', description: '删除用户' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.userService.deleteById(id);
    return { statusCode: 200, msg: '删除用户成功 ' };
  }

  @Put('/:id/password')
  @ApiOkResponse({
    description: '修改用户密码成功',
  })
  @ApiOperation({ title: '修改密码', description: '修改密码' })
  async resetPassWord(@Param('id', new MongodIdPipe()) id: string, @Body() password: string) {
    await this.userService.resetPassword(id, password);
    return { statusCode: 200, msg: '修改用户密码成功 ' };
  }
}