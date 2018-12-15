import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

import { CreateMaintenanceDTO } from './dto/creatMaintenance.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { MaintenanceService } from './maintenance.service';
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

// UseGuards()傳入@nest/passport下的AuthGuard
// strategy
@ApiUseTags('maintenances')

// @ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Unauthorized' })
// @UseGuards(AuthGuard())
@Controller('maintenances')
export class MaintenanceController {
  constructor(
    private maintenanceService: MaintenanceService,
  ) { }

  @ApiOkResponse({
    description: '维修记录列表',
    type: CreateMaintenanceDTO,
    isArray: true,
  })
  @Get('/')
  @ApiOperation({ title: '获取维修记录列表', description: '获取维修记录列表' })
  async maintenanceList(@Query() pagination: Pagination) {
    return await this.maintenanceService.findAll(pagination);
  }

  @Put('/:id/undefence')
  @ApiOkResponse({
    description: '撤防',
  })
  @ApiOperation({ title: '撤防', description: '撤防' })
  async unDefence(@Param('id', new MongodIdPipe()) id: string) {
    await this.maintenanceService.unDefence(id);
    return { statusCode: 200, msg: '撤防成功' };
  }

  @Put('/:id/defence')
  @ApiOkResponse({
    description: '布防',
  })
  @ApiOperation({ title: '布防', description: '布防' })
  async defence(@Param('id', new MongodIdPipe()) id: string) {
    await this.maintenanceService.defence(id);
    return { statusCode: 200, msg: '布防成功' };
  }

  @Put('/:id/feedback')
  @ApiOkResponse({
    description: '反馈成功',
  })
  @ApiOperation({ title: '反馈维修记录', description: '反馈维修记录' })
  async feedbackMaintenance(@Param('id', new MongodIdPipe()) id: string, @Body('feedback') feedback: string) {
    await this.maintenanceService.feedbackMaintenance(id, feedback);
    return { statusCode: 200, msg: '反馈成功' };
  }
}