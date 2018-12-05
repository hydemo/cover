import { Body, Controller, Delete, Get, Param, Post, Put, Query, ReflectMetadata, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { CreateCoverDTO } from './dto/creatCover.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { CoverService } from './cover.service';
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
@ApiUseTags('covers')

// @ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('covers')
export class CoverController {
  constructor(
    private coverService: CoverService,
  ) { }

  @ApiOkResponse({
    description: '井盖列表',
    type: CreateCoverDTO,
    isArray: true,
  })
  @Get('/')
  @ApiOperation({ title: '获取井盖列表', description: '获取井盖列表' })
  coverList(@Query() pagination: Pagination) {
    return this.coverService.findAll(pagination);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: '获取井盖成功',
  })
  @ApiCreatedResponse({ description: '获取井盖' })
  findById(@Param('id') id: string) {
    return this.coverService.findById(id);
  }

  @Post()
  @ApiOkResponse({
    description: '添加井盖成功',
  })
  create(@Body() creatCoverDTO: CreateCoverDTO) {
    return this.coverService.create(creatCoverDTO);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: '修改井盖成功',
  })
  update(@Param('id') id: string, @Body() creatCoverDTO: CreateCoverDTO) {
    return this.coverService.updateById(id, creatCoverDTO);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: '删除井盖成功',
  })
  delete(@Param('id') id: string) {
    return this.coverService.deleteById(id);
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