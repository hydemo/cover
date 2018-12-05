import { Body, Controller, Delete, Get, Param, Post, Put, Query, ReflectMetadata, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { CreateWellDTO } from './dto/creatWell.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { WellService } from './well.service';
import { Pagination } from '../common/pagination.dto';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

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
    description: '井盖列表',
    type: CreateWellDTO,
    isArray: true,
  })
  @Get('/')
  wellList(@Query() pagination: Pagination) {
    return this.wellService.findAll(pagination);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取井盖成功',
  })
  @ApiCreatedResponse({ description: '获取井盖' })
  findById(@Param('id') id: string) {
    return this.wellService.findById(id);
  }

  @Post()
  @ApiOkResponse({
    description: '添加井盖成功',
  })
  create(@Body() creatWellDTO: CreateWellDTO) {
    return this.wellService.create(creatWellDTO);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改井盖成功',
  })
  update(@Param('id') id: string, @Body() creatWellDTO: CreateWellDTO) {
    return this.wellService.updateById(id, creatWellDTO);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除井盖成功',
  })
  delete(@Param('id') id: string) {
    return this.wellService.deleteById(id);
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