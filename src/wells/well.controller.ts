import { Body, Controller, Delete, Get, Param, Post, Put, Query, ReflectMetadata, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { CreateWellDTO } from './dto/creatWell.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { WellService } from './well.service';
import { Pagination } from '../common/pagination.dto';
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
  wellList(@Query() pagination: Pagination) {
    return this.wellService.findAll(pagination);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取窑井成功',
  })
  @ApiCreatedResponse({ description: '获取窑井' })
  @ApiOperation({ title: '根据id获取窑井', description: '根据id获取窑井' })
  findById(@Param('id') id: string) {
    return this.wellService.findById(id);
  }

  @Post()
  @ApiOkResponse({
    description: '添加窑井成功',
  })
  @ApiOperation({ title: '添加窑井', description: '添加窑井' })
  create(@Body() creatWellDTO: CreateWellDTO) {
    return this.wellService.create(creatWellDTO);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改窑井成功',
  })
  @ApiOperation({ title: '修改窑井', description: '修改窑井' })
  update(@Param('id') id: string, @Body() creatWellDTO: CreateWellDTO) {
    return this.wellService.updateById(id, creatWellDTO);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除窑井成功',
  })
  @ApiOperation({ title: '根据id删除窑井', description: '根据id删除窑井' })
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