import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BatteryDTO } from './dto/battery.dto';
import { AlarmDTO } from './dto/alarm.dto';
import { AudioFreDTO } from './dto/audioFre.dto';
import { ConfigReportDTO } from './dto/configReport.dto';
import { DeviceInfoDTO } from './dto/deviceInfo.dto';
import { WellCoverDTO } from './dto/wellCover.dto';
import { DataService } from './data.service';
import { Pagination } from '../common/dto/pagination.dto';
import { MongodIdPipe } from '../common/pipe/mongodId.pipe';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('data')
@UseGuards(AuthGuard())
@ApiForbiddenResponse({ description: 'Unauthorized' })
@Controller('data')
export class DataController {
  constructor(
    private dataService: DataService,
  ) { }

  @ApiOkResponse({
    description: '电量历史数据列表',
    type: BatteryDTO,
    isArray: true,
  })
  @Get('/battery/well/:id')
  @ApiOperation({ title: '获取电量历史数据列表', description: '获取电量历史数据列表' })
  batteryList(@Param('id', new MongodIdPipe()) id: string, @Query() pagination: Pagination) {
    return this.dataService.findBattery(id, pagination);
  }

  @ApiOkResponse({
    description: '警报历史数据列表',
    type: AlarmDTO,
    isArray: true,
  })
  @Get('/alarm/well/:id')
  @ApiOperation({ title: '获取警报历史数据列表', description: '获取警报历史数据列表' })
  alarmList(@Param('id', new MongodIdPipe()) id: string, @Query() pagination: Pagination) {
    return this.dataService.findAllAlarm(id, pagination);
  }

  @ApiOkResponse({
    description: '超声波历史数据列表',
    type: AudioFreDTO,
    isArray: true,
  })
  @Get('/audioFre/well/:id')
  @ApiOperation({ title: '获取超声波历史数据列表', description: '获取超声波历史数据列表' })
  audioFreList(@Param('id', new MongodIdPipe()) id: string, @Query() pagination: Pagination) {
    return this.dataService.findAudioFre(id, pagination);
  }

  @ApiOkResponse({
    description: '配置报告历史数据列表',
    type: ConfigReportDTO,
    isArray: true,
  })
  @Get('/configReport/well/:id')
  @ApiOperation({ title: '获取配置报告历史数据列表', description: '获取配置报告历史数据列表' })
  configReportList(@Param('id', new MongodIdPipe()) id: string, @Query() pagination: Pagination) {
    return this.dataService.findAllConfigReport(id, pagination);
  }

  @ApiOkResponse({
    description: '设备信息历史数据列表',
    type: DeviceInfoDTO,
    isArray: true,
  })
  @Get('/deviceInfo/well/:id')
  @ApiOperation({ title: '获取设备信息历史数据列表', description: '获取设备信息历史数据列表' })
  deviceInfoList(@Param('id', new MongodIdPipe()) id: string, @Query() pagination: Pagination) {
    return this.dataService.findAllDeviceInfo(id, pagination);
  }

  @ApiOkResponse({
    description: '窨井信息历史数据列表',
    type: WellCoverDTO,
    isArray: true,
  })
  @Get('/wellCover/well/:id')
  @ApiOperation({ title: '获取窨井信息历史数据列表', description: '获取窨井信息历史数据列表' })
  wellCoverList(@Param('id', new MongodIdPipe()) id: string, @Query() pagination: Pagination) {
    return this.dataService.findWellCover(id, pagination);
  }

  @ApiOkResponse({
    description: '电量历史数据列表',
    type: BatteryDTO,
    isArray: true,
  })
  @Get('/battery/well/:id/all')
  @ApiOperation({ title: '获取电量历史数据列表', description: '获取电量历史数据列表' })
  batteryListAll(@Param('id', new MongodIdPipe()) id: string) {
    return this.dataService.findBatteryAll(id);
  }

  @ApiOkResponse({
    description: '超声波历史数据列表',
    type: AudioFreDTO,
    isArray: true,
  })
  @Get('/audioFre/well/:id/all')
  @ApiOperation({ title: '获取超声波历史数据列表', description: '获取超声波历史数据列表' })
  audioFreListAll(@Param('id', new MongodIdPipe()) id: string) {
    return this.dataService.findAudioFreAll(id);
  }

  @ApiOkResponse({
    description: '窨井信息历史数据列表',
    type: WellCoverDTO,
    isArray: true,
  })
  @Get('/wellCover/well/:id/all')
  @ApiOperation({ title: '获取窨井信息历史数据列表', description: '获取窨井信息历史数据列表' })
  wellCoverListALl(@Param('id', new MongodIdPipe()) id: string, @Query() pagination: Pagination) {
    return this.dataService.findWellCoverAll(id);
  }

}