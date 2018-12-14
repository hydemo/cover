import { Body, Controller, Post, Inject } from '@nestjs/common';

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
import { CreateUserDTO } from '../users/dto/creatUsers.dto';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@ApiUseTags('')

@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  /*
   * 用户登录成功后，返回的 data 是授权令牌；
   * 在调用有 @UseGuards(AuthGuard()) 注解的路由时，会检查当前请求头中是否包含 Authorization: Bearer xxx 授权令牌，
   * 其中 Authorization 是用于告诉服务端本次请求有令牌，并且令牌前缀是 Bearer，而令牌的具体内容是登录之后返回的 data(accessToken)。
   */
  @Post('/login')
  @ApiOkResponse({
    description: '登录成功',
  })
  @ApiOperation({ title: '登录', description: '登录' })
  async login(@Body() createUserDTO: CreateUserDTO): Promise<any> {
    const user: CreateUserDTO = await this.authService.login(createUserDTO.email, createUserDTO.password);
    return { code: 200, message: '登录成功', data: user };
  }
}