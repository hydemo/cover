import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
} from '@nestjs/common';

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
  ApiConsumes,
  ApiImplicitFile,
} from '@nestjs/swagger';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';
import { IUser } from './interfaces/user.interfaces';
import { CreateUserDTO } from './dto/creatUsers.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { MulterField } from '@nestjs/common/interfaces/external/multer-options.interface';

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
  async resetPassWord(@Param('id', new MongodIdPipe()) id: string, @Body('password') password: string) {
    await this.userService.resetPassword(id, password);
    return { statusCode: 200, msg: '修改用户密码成功 ' };
  }
  @Get('/me')
  @ApiOkResponse({
    description: '获取当前用户信息',
  })
  @UseGuards(AuthGuard())
  @ApiOperation({ title: '获取当前用户信息', description: '获取当前用户信息' })
  async getMe(@Request() req) {
    return { statusCode: 200, data: req.user };
  }

  @Post('/upload')
  // @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'List of cats' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Request() req, @UploadedFile() file) {
    return file;
    // const array = (file.originalname).split('.');
    // const length = array.length;
    // const filename = `${file.filename}.${array[length - 1]}`;
    // return await this.userService.upload(req.user._id, filename);
  }
}