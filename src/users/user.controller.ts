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
  ApiOperation,
  ApiConsumes,
  ApiImplicitFile,
} from '@nestjs/swagger';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';
import { CreateUserDTO } from './dto/creatUsers.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ApiException } from 'src/common/expection/api.exception';
import { ApiErrorCode } from 'src/common/enum/api-error-code.enum';
import { CryptoUtil } from 'src/utils/crypto.util';

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('user')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly cryptoUtil: CryptoUtil,
  ) { }

  @Roles('0')
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

  @Roles('0')
  @Post('/')
  @ApiOkResponse({
    description: '添加用户成功',
  })
  @ApiOperation({ title: '添加用户', description: '添加用户' })
  async create(@Body() creatUserDTO: CreateUserDTO) {
    await this.userService.create(creatUserDTO);
    return { statusCode: 200, msg: '添加用户成功 ' };
  }

  @Roles('0')
  @Put('/:id')
  @ApiOkResponse({
    description: '修改用户成功',
  })
  @ApiOperation({ title: '修改用户', description: '修改用户' })
  async update(@Param('id', new MongodIdPipe()) id: string, @Body() creatUserDTO: CreateUserDTO) {
    await this.userService.updateById(id, creatUserDTO);
    return { statusCode: 200, msg: '修改用户成功 ' };
  }

  @Roles('0')
  @Delete('/:id')
  @ApiOkResponse({
    description: '删除用户成功',
  })
  @ApiOperation({ title: '删除用户', description: '删除用户' })
  async delete(@Param('id', new MongodIdPipe()) id: string) {
    await this.userService.deleteById(id);
    return { statusCode: 200, msg: '删除用户成功 ' };
  }

  @Roles('0')
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
  @ApiOperation({ title: '获取当前用户信息', description: '获取当前用户信息' })
  async getMe(@Request() req) {
    return { statusCode: 200, data: req.user };
  }

  @Put('/:id/me')
  @ApiOkResponse({
    description: '修改当前用户信息',
  })
  @ApiOperation({ title: '修改当前用户信息', description: '修改当前用户信息' })
  async updateMe(
    @Param('id', new MongodIdPipe()) id: string,
    @Request() req,
    @Body() creatUserDTO: CreateUserDTO) {
    if (req.user._id.toString() !== id) {
      throw new ApiException('无效的ID', ApiErrorCode.USER_ID_INVALID, 406);
    }
    await this.userService.updateMe(req.user._id, creatUserDTO);
    return { statusCode: 200, msg: '修改用户成功 ' };
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'List of cats' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Request() req, @UploadedFile() file) {
    await this.userService.upload(req.user._id, file.filename);
    return { statusCode: 200, msg: '上传成功 ', avatar: file.filename };
  }

  @Put('/:id/password/me')
  @ApiOkResponse({
    description: '修改用户密码成功',
  })
  @ApiOperation({ title: '修改密码', description: '修改密码' })
  async resetPassWordMe(
    @Request() req,
    @Param('id', new MongodIdPipe()) id: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string) {
    if (!this.cryptoUtil.checkPassword(oldPassword, req.user.password))
      throw new ApiException('密码有误', ApiErrorCode.PASSWORD_INVALID, 406);
    if (req.user._id.toString() !== id) {
      throw new ApiException('无效的ID', ApiErrorCode.USER_ID_INVALID, 406);
    }
    await this.userService.resetPassword(id, newPassword);
    return { statusCode: 200, msg: '修改用户密码成功' };
  }
}