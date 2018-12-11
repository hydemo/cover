import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, UsePipes } from '@nestjs/common';

import { CreateMaintenanceDTO } from './dto/creatMaintenance.dto';
// import { UserDTOValidationPipe } from 'shared/pipes/userDTOValidation.pipe';
// import { UserQueryDTO } from 'shared/DTOs/userQueryDTO';
import { MaintenanceService } from './maintenance.service';
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
  maintenanceList(@Query() pagination: Pagination) {
    return this.maintenanceService.findAll(pagination);
  }

  @Put('/:id/response')
  @ApiOkResponse({
    description: '响应成功',
  })
  @ApiOperation({ title: '响应维修记录', description: '响应维修记录' })
  responseMaintenance(@Param('id') id: string) {
    return this.maintenanceService.responseMaintenance(id);
  }

  @Put('/:id/feedback')
  @ApiOkResponse({
    description: '反馈成功',
  })
  @ApiOperation({ title: '反馈维修记录', description: '反馈维修记录' })
  feedbackMaintenance(@Param('id') id: string, @Body('feedback') feedback: string) {
    return this.maintenanceService.feedbackMaintenance(id, feedback);
  }
}